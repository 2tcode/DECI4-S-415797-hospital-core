import { useState } from "react";
import { Link } from "react-router-dom";

function AsReceptionist() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const isNameValid = /^[A-Za-z\s]+$/.test(name.trim());


  const isIdValid = id.trim() !== "" && !isNaN(id);

  const isValid = isNameValid && isIdValid;

  return (
    <div>
      <h1>Login as Receptionist</h1>

      <div>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>ID: </label>
        <input
          type="number"
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      <br />

      {isValid ? (
        <Link to="/receptionist/dashboard">
          <button>Login</button>
        </Link>
      ) : (
        <button disabled>Login</button>
      )}
    </div>
  );
}

export default AsReceptionist;