import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AsAdmin() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isNameValid = /^[A-Za-z\s]+$/.test(name.trim());
  const isIdValid = id.trim() !== "" && !isNaN(id);

  const isValid = isNameValid && isIdValid;

  async function handleLogin() {
    try {
      const response = await axios.post("/api/admin/login", {
        name: name.trim().toLowerCase(),
        id: Number(id),
      });

      if (response.data.success) {
        navigate("/admin/dashboard");
      } else {
        alert("Invalid name or ID.");
      }
    } catch (err) {
      console.error(err);
      alert("Couldn't connect to the server.");
    }
  }

  return (
    <div>
      <h1>Login as Admin</h1>

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

      <button disabled={!isValid} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default AsAdmin;
