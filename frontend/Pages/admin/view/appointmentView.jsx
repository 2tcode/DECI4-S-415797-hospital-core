import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentCard from "../../../components/appointmentCard";

function AppointmentView() {
const [appointments, setAppointments] = useState([]);

const fetchAppointments = async () => {
  try {
    const response = await axios.get("/appointments");
    setAppointments(response.data);
  } catch (err) {
    console.error(err);
    alert("Couldn't load appointments.");
  }
};

useEffect(() => {
  fetchAppointments();
}, []);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.appointmentID.toString().includes(search) ||
      appointment.doctorID.toString().includes(search) ||
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
        <option value="Booked">Booked</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <br />
      <br />
      <div className="cardContainer">

      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.appointmentID}
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