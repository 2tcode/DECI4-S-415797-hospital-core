import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function NewDoctor() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [workDays, setWorkDays] = useState([]);
  const [workHours, setWorkHours] = useState({
    from: "",
    to: "",
  });

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  const handleDayChange = (day) => {
    if (workDays.includes(day)) {
      setWorkDays(workDays.filter((d) => d !== day));
    } else {
      setWorkDays([...workDays, day]);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setName(value);
  };

  const addDoctorMutation = useMutation({
    mutationFn: (doctor) => api.post("/api/doctor", doctor),

    onSuccess: () => {
      alert("Doctor added successfully!");

      setName("");
      setId("");
      setSpecialization("");
      setWorkDays([]);
      setWorkHours({
        from: "",
        to: "",
      });
    },

    onError: (err) => {
      console.error(err);

      if (err.response?.status === 409) {
        alert("A doctor with this ID already exists.");
      } else {
        alert("Couldn't add doctor.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoctorMutation.mutate({
      name,
      id: Number(id),
      specialization,
      workDays,
      workHours,
    });
  };

  return (
    <div>
      <h1>Add Doctor</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor Name:</label>
          <br />
          <input
            type="text"
            placeholder="Enter doctor's name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Doctor ID:</label>
          <br />
          <input
            type="number"
            placeholder="Enter doctor ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Speciality:</label>
          <br />
          <input
            type="text"
            placeholder="Enter speciality"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Work Hours:</label>
          <br />
          <input
            type="time"
            value={workHours.from}
            onChange={(e) =>
              setWorkHours({
                ...workHours,
                from: e.target.value,
              })
            }
            required
          />{" "}
          to{" "}
          <input
            type="time"
            value={workHours.to}
            onChange={(e) =>
              setWorkHours({
                ...workHours,
                to: e.target.value,
              })
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Work Days:</label>
          <br />
          {days.map((day) => (
            <label key={day} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={workDays.includes(day)}
                onChange={() => handleDayChange(day)}
              />
              {day}
            </label>
          ))}
        </div>

        <br />

        <button
          type="submit"
          disabled={addDoctorMutation.isPending}
        >
          {addDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
        </button>
      </form>
    </div>
  );
}

export default NewDoctor;