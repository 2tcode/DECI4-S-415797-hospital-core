import { useState, useEffect } from "react";
import axios from "axios";

function NewReceptionist() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleNameChange = (e) => {
    // Allow letters and spaces only
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const receptionist = {
      name,
      id: Number(id),
    };

    try {
      await axios.post("/api/receptionist", receptionist);

      alert("Receptionist added successfully!");

      setName("");
      setId("");
    } catch (err) {
      console.error(err);
      alert("Couldn't add receptionist.");
    }
  };

  return (
    <div>
      <h1>Add Receptionist</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Receptionist Name:</label>
          <br />
          <input
            type="text"
            placeholder="Enter receptionist name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Receptionist ID:</label>
          <br />
          <input
            type="number"
            placeholder="Enter receptionist ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Add Receptionist</button>
      </form>
    </div>
  );
}

export default NewReceptionist;
