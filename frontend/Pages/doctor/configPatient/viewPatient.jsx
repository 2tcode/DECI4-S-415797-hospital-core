import { useEffect, useState } from "react";
import axios from "axios";
import PatientCard from "../../../components/patientCard";

function ViewPatient() {

const [patients, setPatients] = useState([]);

useEffect(() => {
  fetchPatients();
}, []);

const fetchPatients = async () => {
  try {
    const response = await axios.get("/api/patient");
    setPatients(response.data);
    console.log(response.data);
  } catch (err) {
    console.error(err);
    alert("Couldn't load patients.");
  }
};

  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toString().includes(search)
  );

  const handleSave = async (id, updatedHistory) => {
  try {
    await axios.put(`/api/patient/${id}`, {
        medicalHistory: updatedHistory,
    });

    fetchPatients();
  } catch (err) {
    console.error(err);
    alert("Couldn't update patient.");
  }
};

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
            onSave={handleSave}
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