import { useState } from "react";
import axios from "axios";

function NewAdmin() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const admin = {
    name,
    id: Number(id),
  };

  try {
    await axios.post("/api/admin", admin);

    alert("Admin added successfully!");

    setName("");
    setId("");
  } catch (err) {
    console.error(err);
    alert("Couldn't add admin.");
  }
};

  return (
    <div>
      <h1>Add Admin</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Admin Name:</label>
          <br />
          <input
            id="name"
            type="text"
            placeholder="Enter admin name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="id">Admin ID:</label>
          <br />
          <input
            id="id"
            type="number"
            placeholder="Enter admin ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Add Admin
        </button>
      </form>
    </div>
  );
}

export default NewAdmin;