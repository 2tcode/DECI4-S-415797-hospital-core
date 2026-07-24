import { useEffect, useState } from "react";
import axios from "axios";

function GeneralView() {
  const [doctors, setDoctors] = useState([]);
  const [receptionists, setReceptionists] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchData = async () => {
    try {
      const [doctorsRes, receptionistsRes, adminsRes, appointmentsRes] =
        await Promise.all([
          axios.get("/api/doctor"),
          axios.get("/api/receptionist"),
          axios.get("/api/admin"),
          axios.get("/appointments"),
        ]);

      setDoctors(doctorsRes.data);
      setReceptionists(receptionistsRes.data);
      setAdmins(adminsRes.data);
      setAppointments(appointmentsRes.data);
    } catch (err) {
      console.error(err);
      alert("Couldn't load dashboard.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const bookedAppointments = appointments.filter(
    (appointment) => appointment.status === "Booked",
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled",
  ).length;

  return (
    <div className="container">
      <h1>General Viewing</h1>

      <div>
        <div className="box">
          <h3>Doctors' number:</h3>
          <p>{doctors.length}</p>
        </div>

        <div className="box">
          <h3>Receptionists' number:</h3>
          <p>{receptionists.length}</p>
        </div>

        <div className="box">
          <h3>Admins' number:</h3>
          <p>{admins.length}</p>
        </div>

        <div className="box">
          <h3>Appointments' Status</h3>

          <ul>
            <li>
              <h5>Total Appointments:</h5>
              <p>{appointments.length}</p>
            </li>

            <li>
              <h5>Booked Appointments:</h5>
              <p>{bookedAppointments}</p>
            </li>

            <li>
              <h5>Completed Appointments:</h5>
              <p>{completedAppointments}</p>
            </li>

            <li>
              <h5>Cancelled Appointments:</h5>
              <p>{cancelledAppointments}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GeneralView;
