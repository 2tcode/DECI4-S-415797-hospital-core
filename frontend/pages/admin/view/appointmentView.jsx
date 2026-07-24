import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import AppointmentCard from "../../../components/appointmentCard";

const microApi = axios.create({
  baseURL: import.meta.env.VITE_MICRO_API_URL,
});

function AppointmentView() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.appointmentID.toString().includes(search) ||
      appointment.doctorID.toString().includes(search) ||
      appointment.doctorName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) return <p>Loading appointments...</p>;

  if (isError) return <p>Couldn't load appointments.</p>;

  return (
    <div>
      <h1>Appointments Viewing</h1>

      <input
        type="text"
        placeholder="Search by appointment ID, doctor name, or doctor ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {" "}

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