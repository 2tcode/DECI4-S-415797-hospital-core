import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppointmentCard from "../../../components/appointmentCard";

function ViewAppointment() {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [patientSearch, setPatientSearch] = useState("");
  const [appointmentSearch, setAppointmentSearch] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/appointments/doctor/${id}`);
      setAppointments(response.data);
    } catch (err) {
      console.error(err);
      alert("Couldn't load appointments.");
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`/appointments/${id}/complete`);
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Couldn't update appointment.");
    }
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
