import { useState } from "react";

function NewDoctor() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [workDays, setWorkDays] = useState([]);

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday"
  ];

  const handleDayChange = (day) => {
    if (workDays.includes(day)) {
      setWorkDays(workDays.filter((d) => d !== day));
    } else {
      setWorkDays([...workDays, day]);
    }
  };

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
      speciality,
      workHours: `${startTime} - ${endTime}`,
      workDays,
    });

    setName("");
    setId("");
    setSpeciality("");
    setStartTime("");
    setEndTime("");
    setWorkDays([]);
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
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Work Hours:</label>
          <br />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          {" "}to{" "}
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
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