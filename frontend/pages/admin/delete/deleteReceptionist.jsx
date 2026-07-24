import { useState } from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import ReceptionistCard from "../../../components/receptionisCard";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function DeleteReceptionist() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

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

  const deleteReceptionistMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/receptionist/${id}`),

    onSuccess: () => {
      alert("Receptionist deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["receptionists"],
      });
    },

    onError: (err) => {
      console.error(err);
      alert("Couldn't delete receptionist.");
    },
  });

  const filteredReceptionists = receptionists.filter(
    (receptionist) =>
      receptionist.name.toLowerCase().includes(search.toLowerCase()) ||
      receptionist.id.toString().includes(search),
  );

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this receptionist?",
    );

    if (!confirmed) return;

    deleteReceptionistMutation.mutate(id);
  };

  if (isLoading) return <p>Loading receptionists...</p>;

  if (isError) return <p>Couldn't load receptionists.</p>;

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