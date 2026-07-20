import { useState } from "react";
import ReceptionistCard from "../../../components/receptionisCard";

function ReceptionistView() {
  const receptionists = [
    {
      id: 101,
      name: "Sarah Ahmed",
    },
    {
      id: 102,
      name: "Mohamed Ali",
    },
    {
      id: 103,
      name: "Nour Hassan",
    },
  ];

  const [search, setSearch] = useState("");

  const filteredReceptionists = receptionists.filter(
    (receptionist) =>
      receptionist.name.toLowerCase().includes(search.toLowerCase()) ||
      receptionist.id.toString().includes(search)
  );

  return (
    <div>
      <h1>Receptionists Viewing</h1>

      <input
        type="text"
        placeholder="Search by receptionist name or ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />
      <div className="cardContainer">
      {filteredReceptionists.length > 0 ? (
        filteredReceptionists.map((receptionist) => (
          <ReceptionistCard
            key={receptionist.id}
            selected={receptionist}
            role="view"
          />
        ))
      ) : (
        <p>No receptionists found.</p>
      )}
      </div>
    </div>
  );
}

export default ReceptionistView;