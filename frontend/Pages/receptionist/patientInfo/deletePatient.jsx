import { useState } from "react";
import PatientCard from "../../../components/patientCard";

function DeletePatient() {
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
      name: "Sarah Ali",
      age: 28,
      gender: "Female",
      medicalHistory: ["Asthma"],
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
      <h1>Delete Patient</h1>

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
            role="delete"
            onDelete={(id) => console.log("Delete patient:", id)}
          />
        ))
      ) : (
        <p>No patients found.</p>
      )}
      </div>
    </div>
  );
}

export default DeletePatient;