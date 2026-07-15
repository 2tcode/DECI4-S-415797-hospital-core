
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to React</h1>

      <Link to="/login/asdoctor">Login as Doctor</Link>
      <br/>
        <Link to="/login/asadmin">Login as Admin</Link>
        <br/>
        <Link to="/login/aspatient">Login as Patient</Link>
        <br/>
        <Link to="/signup/asdoctor">Sign up as Doctor</Link>
        <br/>
        <Link to="/signup/asadmin">Sign up as Admin</Link>
        <br/>
        <Link to="/signup/aspatient">Sign up as Patient</Link>
    </div>
  );
}

export default Home;