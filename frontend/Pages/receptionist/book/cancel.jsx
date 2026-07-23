import { useEffect, useState } from "react";
import axios from "axios";
import AppointmentCard from "../../../components/appointmentCard";

function Cancel() {
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

  const [appointmentSearch, setAppointmentSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesAppointment =
      appointment.appointmentID.toString().includes(appointmentSearch);

    const matchesPatient =
      appointment.patientName
        .toLowerCase()
        .includes(patientSearch.toLowerCase()) ||
      appointment.patientID.toString().includes(patientSearch);

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
            key={appointment.appointmentID}
            selected={appointment}
            role="cancel"
            onCancel={async (id) => {
                try {
                  await axios.put(`/appointments/${id}/cancel`);

                  alert("Appointment cancelled!");

                  fetchAppointments();
                } catch (err) {
                  console.error(err);
                  alert("Couldn't cancel appointment.");
                }
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