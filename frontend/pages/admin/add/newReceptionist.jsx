import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function NewReceptionist() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleNameChange = (e) => {
    // Allow letters and spaces only
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

  const addReceptionistMutation = useMutation({
    mutationFn: (receptionist) =>
      api.post("/api/receptionist", receptionist),

    onSuccess: () => {
      alert("Receptionist added successfully!");

      setName("");
      setId("");
    },

    onError: (err) => {
      console.error(err);

      if (err.response?.status === 409) {
        alert("A receptionist with this ID already exists.");
      } else {
        alert("Couldn't add receptionist.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addReceptionistMutation.mutate({
      name,
      id: Number(id),
    });
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

        <button
          type="submit"
          disabled={addReceptionistMutation.isPending}
        >
          {addReceptionistMutation.isPending
            ? "Adding..."
            : "Add Receptionist"}
        </button>
      </form>
    </div>
  );
}

export default NewReceptionist;