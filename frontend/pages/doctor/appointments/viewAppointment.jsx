import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import AppointmentCard from "../../../components/appointmentCard";

const microApi = axios.create({
  baseURL: import.meta.env.VITE_MICRO_API_URL,
});

function ViewAppointment() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [patientSearch, setPatientSearch] = useState("");
  const [appointmentSearch, setAppointmentSearch] = useState("");

  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appointments", "doctor", id],
    queryFn: async () => {
      const { data } = await microApi.get(`/appointments/doctor/${id}`);
      return data;
    },
    enabled: !!id,
  });

  const completeAppointmentMutation = useMutation({
    mutationFn: (appointmentId) =>
      microApi.put(`/appointments/${appointmentId}/complete`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments", "doctor", id],
      });
    },

    onError: (err) => {
      console.error(err);
      alert("Couldn't update appointment.");
    },
  });

  const handleComplete = (appointmentId) => {
    completeAppointmentMutation.mutate(appointmentId);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesPatient =
      appointment.patientName
        .toLowerCase()
        .includes(patientSearch.toLowerCase()) ||
      appointment.patientID.toString().includes(patientSearch);

    const matchesAppointment = appointment.appointmentID
      .toString()
      .includes(appointmentSearch);

    return matchesPatient && matchesAppointment;
  });

  if (isLoading) return <p>Loading appointments...</p>;

  if (isError) return <p>Couldn't load appointments.</p>;

  return (
    <div>
      <h1>View Appointment</h1>

      <input
        type="text"
        placeholder="Search by patient name or patient ID..."
        value={patientSearch}
        onChange={(e) => setPatientSearch(e.target.value)}
      />

      {" "}

      <input
        type="text"
        placeholder="Search by appointment ID..."
        value={appointmentSearch}
        onChange={(e) => setAppointmentSearch(e.target.value)}
      />

      <br />
      <br />

      <div className="cardContainer">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.appointmentID}
              selected={appointment}
              role="completed"
              onComplete={handleComplete}
            />
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewAppointment;