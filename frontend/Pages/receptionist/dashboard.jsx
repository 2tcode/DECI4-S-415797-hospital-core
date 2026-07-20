import { Link, Outlet, useNavigate } from "react-router-dom";

function ReceptionistDashboard() {
      const navigate = useNavigate();

  function handleLogout() {
    const confirmLogout = window.confirm(
      "Are you sure you want to log out?"
    );

    if (confirmLogout) {
      navigate("/");
    }
  }
    return (
        <div>
      <div className="top">
      <h1 className="title">receptionist Dashboard</h1>
      <p>Welcome, receptionist!</p>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div className="dashboard">
            <div className="nav">
                <Link to="appointments/book">Book Appointment</Link>
                <br />
                <Link to="appointments/cancel">Cancel Appointment</Link>
                <br />
                <Link to="patients/add">Add New Patient</Link>
                <br />
                <Link to="patients/delete">Delete Patient</Link>
                <br />
            </div>
            <div className="page">
            <Outlet />
            </div>
            </div>
        </div>
    )
}

export default ReceptionistDashboard