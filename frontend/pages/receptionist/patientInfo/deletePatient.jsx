import { useState } from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import PatientCard from "../../../components/patientCard";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function DeletePatient() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const {
    data: patients = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data } = await api.get("/api/patient");
      return data;
    },
  });

  const deletePatientMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/patient/${id}`),

    onSuccess: () => {
      alert("Patient deleted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },

    onError: (err) => {
      console.error(err);
      alert("Couldn't delete patient.");
    },
  });

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toString().includes(search),
  );

  if (isLoading) return <p>Loading patients...</p>;

  if (isError) return <p>Couldn't load patients.</p>;

  return (
    <div>
      <h1>Delete Patient</h1>

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
              role="delete"
              onDelete={(id) => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this patient?",
                );

                if (!confirmed) return;

                deletePatientMutation.mutate(id);
              }}
            />
          ))
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
}

export default DeletePatient;