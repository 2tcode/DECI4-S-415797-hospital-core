import { Link } from "react-router-dom";

function Home() {
  return (
    <div classname="container">
      <h1 className="title">Welcome to Healthcare!</h1>

      <br />
      <br />

      <Link to="/login/doctor">
        <button>Login as Doctor</button>
      </Link>

      <br />
      <br />

      <Link to="/login/receptionist">
        <button>Login as Receptionist</button>
      </Link>
      <br />
      <br />
      <Link to="/login/admin">
        {" "}
        <button>Login as Admin</button>
      </Link>
    </div>
  );
}

export default Home;
