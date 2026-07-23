import { useEffect, useState } from "react";
import axios from "axios";
import ReceptionistCard from "../../../components/receptionisCard";

function DeleteReceptionist() {
const [receptionists, setReceptionists] = useState([]);

const fetchReceptionists = async () => {
  try {
    const response = await axios.get("/api/receptionist");
    setReceptionists(response.data);
  } catch (err) {
    console.error(err);
    alert("Couldn't load receptionists.");
  }
};

useEffect(() => {
  fetchReceptionists();
}, []);

  const [search, setSearch] = useState("");

  const filteredReceptionists = receptionists.filter(
    (receptionist) =>
      receptionist.name.toLowerCase().includes(search.toLowerCase()) ||
      receptionist.id.toString().includes(search)
  );

const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this receptionist?"
  );

  if (!confirmed) return;

  try {
    await axios.delete(`/api/receptionist/${id}`);

    alert("Receptionist deleted successfully!");

    fetchReceptionists();
  } catch (err) {
    console.error(err);
    alert("Couldn't delete receptionist.");
  }
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