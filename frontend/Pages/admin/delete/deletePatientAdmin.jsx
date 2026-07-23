import { useEffect, useState } from "react";
import axios from "axios";
import PatientCard from "../../../components/patientCard";

function DeletePatient() {
 const [patients, setPatients] = useState([]);

const fetchPatients = async () => {
  try {
    const response = await axios.get("/api/patient");
    setPatients(response.data);
  } catch (err) {
    console.error(err);
    alert("Couldn't load patients.");
  }
};

useEffect(() => {
  fetchPatients();
}, []);

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
            onDelete={async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this patient?"
  );

  if (!confirmed) return;

  try {
    await axios.delete(`/api/patient/${id}`);

    alert("Patient deleted successfully!");

    fetchPatients();
  } catch (err) {
    console.error(err);
    alert("Couldn't delete patient.");
  }
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

export default DeletePatient;