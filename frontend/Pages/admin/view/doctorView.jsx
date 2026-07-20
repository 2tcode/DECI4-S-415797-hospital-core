import { useState } from "react";
import DoctorCard from "../../../components/doctorCard";

function DoctorView() {
  const doctors = [
    {
      id: 123,
      name: "Ahmed Mohamed",
      specialization: "Cardiology",
    },
    {
      id: 124,
      name: "Sarah Ali",
      specialization: "Neurology",
    },
    {
      id: 125,
      name: "Omar Hassan",
      specialization: "Pediatrics",
    },
  ];

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