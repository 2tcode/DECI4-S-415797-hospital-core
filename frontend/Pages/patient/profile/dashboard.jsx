import { Link } from 'react-router-dom';

function PatientDashboard() {
  return (
    <div>
      <h1>Patient Dashboard</h1>
      <p>Welcome, Patient!</p>
      <Link to="/">Log out</Link>
    </div>
    
  );
}

export default PatientDashboard;