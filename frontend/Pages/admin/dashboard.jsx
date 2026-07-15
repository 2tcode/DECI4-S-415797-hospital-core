import { Link , Outlet } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <Link to="/">Log out</Link>


      <div>
        <Link to="/admin/dashboard/general">View General</Link>
        <Link to="/admin/dashboard/patients">View Patients</Link>
        <Link to="/admin/dashboard/unverifieddoc">View Unverified Doctors</Link>
        <Link to="/admin/dashboard/verifieddoc">View Verified Doctors</Link>
        <Link to="/admin/dashboard/appointments">View Appointments</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default AdminDashboard;