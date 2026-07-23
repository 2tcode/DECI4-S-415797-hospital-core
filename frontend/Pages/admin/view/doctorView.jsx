import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../../../components/doctorCard";

function DoctorView() {
const [doctors, setDoctors] = useState([]);

const fetchDoctors = async () => {
  try {
    const response = await axios.get("/api/doctor");
    setDoctors(response.data);
  } catch (err) {
    console.error(err);
    alert("Couldn't load doctors.");
  }
};

useEffect(() => {
  fetchDoctors();
}, []);

  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.id.toString().includes(search)
  );

  return (
    <div>
      <h1>Doctor Viewing</h1>

      <input
        type="text"
        placeholder="Search by doctor name or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />
      <div className="cardContainer">
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            selected={doctor}
            role="view"
          />
        ))
      ) : (
        <p>No doctors found.</p>
      )}
      </div>
    </div>
  );
}

export default DoctorView;