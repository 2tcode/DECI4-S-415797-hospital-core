import { useState } from "react";
import AppointmentCard from "../../../components/appointmentCard";

function AppointmentView() {
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
      patientName: "Sarah Ahmed",
      doctorId: 202,
      doctorName: "Mona Hassan",
      date: "2026-07-19",
      startTime: "1:00 PM",
      endTime: "1:30 PM",
      status: "completed",
    },
    {
      id: 503,
      patientId: 303,
      patientName: "Omar Ali",
      doctorId: 201,
      doctorName: "Mohamed Ali",
      date: "2026-07-20",
      startTime: "3:00 PM",
      endTime: "3:30 PM",
      status: "cancelled",
    },
  ];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.id.toString().includes(search) ||
      appointment.doctorId.toString().includes(search) ||
      appointment.doctorName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1>Appointments Viewing</h1>

      <input
        type="text"
        placeholder="Search by appointment ID, doctor name, or doctor ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {"  "}

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All Statuses</option>
        <option value="booked">Booked</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <br />
      <br />
      <div className="cardContainer">

      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            selected={appointment}
            role="view"
          />
        ))
      ) : (
        <p>No appointments found.</p>
      )}
      </div>
    </div>
  );
}

export default AppointmentView;