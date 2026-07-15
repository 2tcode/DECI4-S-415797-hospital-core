import { Link } from 'react-router-dom';

function DoctorDashboard() {
  return (
    <div>
      <h1>Doctor Dashboard</h1>
      <p>Welcome, Doctor!</p>
      <Link to="/">Log out</Link>
    </div>
  );
}

export default DoctorDashboard;