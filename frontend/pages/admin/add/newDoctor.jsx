import { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctor = {
      name,
      id: Number(id),
      specialization: specialization,
      workDays,
      workHours,
    };

    try {
      await axios.post("/api/doctor", doctor);

      alert("Doctor added successfully!");

      setName("");
      setId("");
      setSpecialization("");
      setWorkDays([]);
      setWorkHours({
        from: "",
        to: "",
      });
    } catch (err) {
      console.error(err);
      alert("Couldn't add doctor.");
      if (err.code === 11000) {
        return res.status(409).json({
          message: "A doctor with this ID already exists.",
        });
      }
    }
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

        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
}

export default NewDoctor;
