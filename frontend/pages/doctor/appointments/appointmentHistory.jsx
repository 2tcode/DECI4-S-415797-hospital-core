import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AppointmentCard from "../../../components/appointmentCard";

const microApi = axios.create({
  baseURL: import.meta.env.VITE_MICRO_API_URL,
});

function AppointmentHistory() {
  const { id } = useParams();

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
      <h1>Appointment History</h1>

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
              role="history"
            />
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
}

export default AppointmentHistory;