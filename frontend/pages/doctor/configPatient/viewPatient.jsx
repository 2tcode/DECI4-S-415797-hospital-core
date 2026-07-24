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

function ViewPatient() {
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

  const updatePatientMutation = useMutation({
    mutationFn: ({ id, medicalHistory }) =>
      api.put(`/api/patient/${id}`, {
        medicalHistory,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["patients"],
      });
    },

    onError: (err) => {
      console.error(err);
      alert("Couldn't update patient.");
    },
  });

  const handleSave = (id, updatedHistory) => {
    updatePatientMutation.mutate({
      id,
      medicalHistory: updatedHistory,
    });
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toString().includes(search),
  );

  if (isLoading) return <p>Loading patients...</p>;

  if (isError) return <p>Couldn't load patients.</p>;

  return (
    <div>
      <h1>View Patient</h1>

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
              role="edit"
              onSave={handleSave}
            />
          ))
        ) : (
          <p>No patients found.</p>
        )}
      </div>
    </div>
  );
}

export default ViewPatient;