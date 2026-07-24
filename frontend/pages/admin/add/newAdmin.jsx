import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function NewAdmin() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

  const addAdminMutation = useMutation({
    mutationFn: (admin) => api.post("/api/admin", admin),
    onSuccess: () => {
      alert("Admin added successfully!");
      setName("");
      setId("");
    },
    onError: (err) => {
      console.error(err);
      alert("Couldn't add admin.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addAdminMutation.mutate({
      name,
      id: Number(id),
    });
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

        <button
          type="submit"
          disabled={addAdminMutation.isPending}
        >
          {addAdminMutation.isPending ? "Adding..." : "Add Admin"}
        </button>
      </form>
    </div>
  );
}

export default NewAdmin;