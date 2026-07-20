import { useState } from "react";
import PatientCard from "../../../components/patientCard";

function ViewPatient() {
  const patients = [
    {
      id: 301,
      name: "Ahmed Hassan",
      age: 35,
      gender: "Male",
      medicalHistory: [
        "Diabetes",
        "High Blood Pressure",
        "Appendectomy (2020)",
      ],
    },
    {
      id: 302,
      name: "Mohamed Hassan",
      age: 35,
      gender: "Male",
      medicalHistory: [],
    },
    {
      id: 303,
      name: "Sara Ali",
      age: 28,
      gender: "Female",
      medicalHistory: [
        "Asthma",
      ],
    },
  ];

  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toString().includes(search)
  );

  return (
    <div>
      <h1>View Patient</h1>

      <input
        type="text"
        placeholder="Search by patient name or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />
      <div className="cardContainer">

      {filteredPatients.length > 0 ? (
        filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            selected={patient}
            role="edit"
            onSave={(id, updatedHistory) => {
              console.log(id);
              console.log(updatedHistory);
            }}
          />
        ))
      ) : (
        <p>No patients found.</p>
      )}
      </div>
    </div>
  );
}

export default ViewPatient;