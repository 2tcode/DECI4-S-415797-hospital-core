import { useState } from "react";

function AddNew() {
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

  const handleSubmit = () => {
    const patient = {
      id,
      name,
      age,
      gender,
      medicalHistory: history,
    };

    console.log("New Patient:");
    console.log(patient);

    // Clear form
    setId("");
    setName("");
    setAge("");
    setGender("");
    setHistory([]);
    setNewHistory("");
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

      <button onClick={addHistory}>
        Add History
      </button>

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

      <button onClick={handleSubmit}>
        Add Patient
      </button>
    </div>
  );
}

export default AddNew;