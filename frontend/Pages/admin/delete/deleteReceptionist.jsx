import { useState } from "react";
import ReceptionistCard from "../../../components/receptionisCard";

function DeleteReceptionist() {
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

  const handleDelete = (id) => {
    console.log("Deleting receptionist:", id);
    // Later you'll call your backend here.
  };

  return (
    <div>
      <h1>Delete Receptionist</h1>

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
            role="delete"
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No receptionists found.</p>
      )}
      </div>
    </div>
  );
}

export default DeleteReceptionist;