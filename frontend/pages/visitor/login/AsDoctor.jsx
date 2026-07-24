import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function AsDoctor() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const isNameValid = /^[A-Za-z\s]+$/.test(name.trim());
  const isIdValid = id.trim() !== "" && !isNaN(id);
  const isValid = isNameValid && isIdValid;

  const loginMutation = useMutation({
    mutationFn: (credentials) =>
      api.post("/api/doctor/login", credentials),

    onSuccess: (response) => {
      console.log(response.data);

      if (response.data.success) {
        navigate(`/doctor/dashboard/${id}`);
      } else {
        alert("Invalid name or ID.");
      }
    },

    onError: (err) => {
      console.error(err);
      alert("Couldn't connect to the server.");
    },
  });

  function handleLogin() {
    loginMutation.mutate({
      name: name.trim().toLowerCase(),
      id: Number(id),
    });
  }

  return (
    <div>
      <h1>Login as Doctor</h1>

      <div>
        <label>Name: </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>ID: </label>
        <input
          type="number"
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      <br />

      <button
        disabled={!isValid || loginMutation.isPending}
        onClick={handleLogin}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}

export default AsDoctor;