import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div>
      <div className="top">
        <h1 className="title">Admin Dashboard</h1>
        <p>Welcome, Admin!</p>
        <Link to="/">
          <button>Log Out</button>
        </Link>
      </div>
      <div className="dashboard">
        <div className="nav">
          <Link to="add/admin">Add Admin</Link>
          <br />
          <Link to="add/doctor">Add Doctor</Link>
          <br />
          <Link to="add/receptionist">Add Receptionist</Link>
          <br />
          <Link to="delete/patient">Delete Patient</Link>
          <br />
          <Link to="delete/doctor">Delete Doctor</Link>
          <br />
          <Link to="delete/receptionist">Delete Receptionist</Link>
          <br />
          <Link to="view/general">View General</Link>
          <br />
          <Link to="view/patients">View Patients</Link>
          <br />
          <Link to="view/doctors">View Doctors</Link>
          <br />
          <Link to="view/receptionists">View Receptionists</Link>
          <br />
          <Link to="view/appointments">View Appointments</Link>
        </div>
        <div className="page">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
