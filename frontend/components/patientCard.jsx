import { useState } from "react";

function PatientCard({ selected, role, onDelete, onSelect, onSave }) {
  const [history, setHistory] = useState(selected.medicalHistory);
  const [newHistory, setNewHistory] = useState("");

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selected.name}?`,
    );

    if (confirmed) {
      onDelete(selected.id);
    }
  };

  const handleSelect = () => {
    onSelect(selected.id);
  };

  const addHistory = () => {
    if (newHistory.trim() === "") return;

    setHistory([...history, newHistory]);
    setNewHistory("");
  };

  const removeHistory = (index) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  const saveHistory = () => {
    onSave(selected.id, history);
  };

  return (
    <div className="card">
      <h2>Patient</h2>

      <p>
        <strong>ID:</strong> {selected.id}
      </p>
      <p>
        <strong>Name:</strong> {selected.name}
      </p>
      <p>
        <strong>Age:</strong> {selected.age}
      </p>
      <p>
        <strong>Gender:</strong> {selected.gender}
      </p>

      <div>
        <strong>Medical History:</strong>

        <ul>
          {history.length > 0 ? (
            history.map((item, index) => (
              <li key={index}>
                {item}

                {role === "edit" && (
                  <button
                    onClick={() => removeHistory(index)}
                    className="deleteButton"
                  >
                    Remove
                  </button>
                )}
              </li>
            ))
          ) : (
            <li>No medical history available.</li>
          )}
        </ul>

        {role === "edit" && (
          <>
            <input
              type="text"
              placeholder="Add medical history..."
              value={newHistory}
              onChange={(e) => setNewHistory(e.target.value)}
            />

            <button onClick={addHistory}>Add</button>

            <button onClick={saveHistory} className="completeButton">
              Save Changes
            </button>
          </>
        )}
      </div>

      {role === "delete" && (
        <button onClick={handleDelete} className="deleteButton">
          Delete
        </button>
      )}

      {role === "book" && (
        <button onClick={handleSelect}>Select Patient</button>
      )}
    </div>
  );
}

export default PatientCard;
