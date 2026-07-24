import { useState } from "react";
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

function Cancel() {
  const queryClient = useQueryClient();

  const [appointmentSearch, setAppointmentSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");

  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data } = await microApi.get("/appointments");
      return data;
    },
  });

  const cancelAppointmentMutation = useMutation({
    mutationFn: (appointmentId) =>
      microApi.put(`/appointments/${appointmentId}/cancel`),

    onSuccess: () => {
      alert("Appointment cancelled!");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },

    onError: (err) => {
      console.error(err);
      alert("Couldn't cancel appointment.");
    },
  });

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesAppointment = appointment.appointmentID
      .toString()
      .includes(appointmentSearch);

    const matchesPatient =
      appointment.patientName
        .toLowerCase()
        .includes(patientSearch.toLowerCase()) ||
      appointment.patientID.toString().includes(patientSearch);

    return matchesAppointment && matchesPatient;
  });

  if (isLoading) return <p>Loading appointments...</p>;

  if (isError) return <p>Couldn't load appointments.</p>;

  return (
    <div>
      <h1>Cancel Booking</h1>

      <input
        type="text"
        placeholder="Search by appointment ID..."
        value={appointmentSearch}
        onChange={(e) => setAppointmentSearch(e.target.value)}
      />

      {"  "}

      <input
        type="text"
        placeholder="Search by patient name or ID..."
        value={patientSearch}
        onChange={(e) => setPatientSearch(e.target.value)}
      />

      <br />
      <br />

      <div className="cardContainer">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.appointmentID}
              selected={appointment}
              role="cancel"
              onCancel={(id) => cancelAppointmentMutation.mutate(id)}
            />
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
}

export default Cancel;