import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function AddNew() {
  const queryClient = useQueryClient();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [history, setHistory] = useState([]);
  const [newHistory, setNewHistory] = useState("");

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

  const addHistory = () => {
    if (newHistory.trim() !== "") {
      setHistory([...history, newHistory]);
      setNewHistory("");
    }
  };

  const removeHistory = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  const addPatientMutation = useMutation({
    mutationFn: (patient) => api.post("/api/patient", patient),

    onSuccess: () => {
      alert("Patient added successfully!");

      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });

      setId("");
      setName("");
      setAge("");
      setGender("");
      setHistory([]);
      setNewHistory("");
    },

    onError: (err) => {
      console.error(err);

      if (err.response?.status === 409) {
        alert("A patient with this ID already exists.");
      } else {
        alert("Couldn't add patient.");
      }
    },
  });

  const handleSubmit = () => {
    const patient = {
      id: Number(id),
      name,
      age: Number(age),
      gender,
      medicalHistory: history,
    };

    addPatientMutation.mutate(patient);
  };

  return (
    <div>
      <h1>Add New Patient</h1>

      <p>
        <strong>Patient ID:</strong>
      </p>

      <input
        type="number"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter patient ID"
      />

      <p>
        <strong>Patient Name:</strong>
      </p>

      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter patient name"
      />

      <p>
        <strong>Age:</strong>
      </p>

      <input
        type="number"
        min="0"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Enter age"
      />

      <p>
        <strong>Gender:</strong>
      </p>

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <p>
        <strong>Medical History:</strong>
      </p>

      <input
        type="text"
        value={newHistory}
        onChange={(e) => setNewHistory(e.target.value)}
        placeholder="Enter a medical condition"
      />

      <button onClick={addHistory}>Add History</button>

      <ul>
        {history.map((item, index) => (
          <li key={index}>
            {item}{" "}
            <button onClick={() => removeHistory(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <br />

      <button
        onClick={handleSubmit}
        disabled={addPatientMutation.isPending}
      >
        {addPatientMutation.isPending
          ? "Adding..."
          : "Add Patient"}
      </button>
    </div>
  );
}

export default AddNew;