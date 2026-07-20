import { useState } from "react";
import AppointmentCard from "../../../components/appointmentCard";

function Cancel() {
  const appointments = [
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
      patientName: "Mohamed Hassan",
      doctorId: 202,
      doctorName: "Sarah Ali",
      date: "2026-07-20",
      startTime: "11:00 AM",
      endTime: "11:30 AM",
      status: "completed",
    },
    {
      id: 503,
      patientId: 303,
      patientName: "Omar Ahmed",
      doctorId: 203,
      doctorName: "Youssef Adel",
      date: "2026-07-21",
      startTime: "02:00 PM",
      endTime: "02:30 PM",
      status: "cancelled",
    },
    {
      id: 504,
      patientId: 304,
      patientName: "Sara Hassan",
      doctorId: 201,
      doctorName: "Mohamed Ali",
      date: "2026-07-22",
      startTime: "09:00 AM",
      endTime: "09:30 AM",
      status: "booked",
    },
  ];

  const [appointmentSearch, setAppointmentSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesAppointment =
      appointment.id.toString().includes(appointmentSearch);

    const matchesPatient =
      appointment.patientName
        .toLowerCase()
        .includes(patientSearch.toLowerCase()) ||
      appointment.patientId.toString().includes(patientSearch);

    return matchesAppointment && matchesPatient;
  });

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
            key={appointment.id}
            selected={appointment}
            role="cancel"
            onCancel={(id) => {
              console.log("Cancelled:", id);
            }}
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