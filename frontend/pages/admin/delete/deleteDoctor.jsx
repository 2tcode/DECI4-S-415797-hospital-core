import { useState } from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import DoctorCard from "../../../components/doctorCard";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function DeleteDoctor() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const {
    data: doctors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data } = await api.get("/api/doctor");
      return data;
    },
  });

  const deleteDoctorMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/doctor/${id}`),

    onSuccess: () => {
      alert("Doctor deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },

    onError: (err) => {
      console.error(err);
      alert("Couldn't delete doctor.");
    },
  });

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.id.toString().includes(search),
  );

  if (isLoading) return <p>Loading doctors...</p>;

  if (isError) return <p>Couldn't load doctors.</p>;

  return (
    <div>
      <h1>Delete Doctor</h1>

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
              role="delete"
              onDelete={(id) => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this doctor?",
                );

                if (!confirmed) return;

                deleteDoctorMutation.mutate(id);
              }}
            />
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}

export default DeleteDoctor;