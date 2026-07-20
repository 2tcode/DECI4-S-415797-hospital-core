import { useState } from "react";
import AppointmentCard from "../../../components/appointmentCard";

function ViewAppointment() {
  const [appointments, setAppointments] = useState([
  {
    id: 501,
    patientId: 301,
    patientName: "Ahmed Hassan",
    doctorId: 201,
    doctorName: "Mohamed Ali",
    date: "2026-07-19",
    startTime: "10:00 AM",
    endTime: "10:30 AM",
    status: "booked",
  },
  {
    id: 502,
    patientId: 302,
    patientName: "Sarah Ahmed",
    doctorId: 202,
    doctorName: "Mona Hassan",
    date: "2026-07-20",
    startTime: "1:00 PM",
    endTime: "1:30 PM",
    status: "completed",
  },
  {
    id: 503,
    patientId: 303,
    patientName: "Mohamed Hassan",
    doctorId: 201,
    doctorName: "Mohamed Ali",
    date: "2026-07-21",
    startTime: "3:00 PM",
    endTime: "3:30 PM",
    status: "cancelled",
  },
]);

const handleComplete = (id) => {
  setAppointments((prev) =>
    prev.map((appointment) =>
      appointment.id === id
        ? { ...appointment, status: "completed" }
        : appointment
    )
  );
};

  const [patientSearch, setPatientSearch] = useState("");
  const [appointmentSearch, setAppointmentSearch] = useState("");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesPatient =
      appointment.patientName
        .toLowerCase()
        .includes(patientSearch.toLowerCase()) ||
      appointment.patientId.toString().includes(patientSearch);

    const matchesAppointment =
      appointment.id.toString().includes(appointmentSearch);

    return matchesPatient && matchesAppointment;
  });

  return (
    <div>
      <h1>View Appointment</h1>

      <input
        type="text"
        placeholder="Search by patient name or patient ID..."
        value={patientSearch}
        onChange={(e) => setPatientSearch(e.target.value)}
      />

      {"  "}

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
            key={appointment.id}
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