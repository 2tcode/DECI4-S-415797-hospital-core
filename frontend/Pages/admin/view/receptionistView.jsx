import { useEffect, useState } from "react";
import axios from "axios";
import ReceptionistCard from "../../../components/receptionisCard";

function ReceptionistView() {
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