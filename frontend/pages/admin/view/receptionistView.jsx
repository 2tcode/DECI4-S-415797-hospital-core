import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ReceptionistCard from "../../../components/receptionistCard";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function ReceptionistView() {
  const [search, setSearch] = useState("");

  const {
    data: receptionists = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["receptionists"],
    queryFn: async () => {
      const { data } = await api.get("/api/receptionist");
      return data;
    },
  });

  const filteredReceptionists = receptionists.filter(
    (receptionist) =>
      receptionist.name.toLowerCase().includes(search.toLowerCase()) ||
      receptionist.id.toString().includes(search),
  );

  if (isLoading) return <p>Loading receptionists...</p>;

  if (isError) return <p>Couldn't load receptionists.</p>;

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