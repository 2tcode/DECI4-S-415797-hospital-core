import { Link, Outlet, useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const navigate = useNavigate();
  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      navigate("/");
    }
  }
  return (
    <div>
      <div className="top">
        <h1 className="title">Doctor Dashboard</h1>
        <p>Welcome, Doctor!</p>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div className="dashboard">
        <div className="nav">
          <Link to="appointments/history">Appointment history</Link>
          <br />
          <Link to="appointments/view">View appointments</Link>
          <br />
          <Link to="patients/view">View Patients</Link>
        </div>
        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
