import { useState } from "react";

function NewAdmin() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleNameChange = (e) => {
    // Allow letters and spaces only
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      id,
    });

    setName("");
    setId("");
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