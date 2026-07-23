function ReceptionistCard({ selected, role, onDelete }) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selected.name}?`,
    );

    if (confirmed) {
      onDelete(selected.id);
    }
  };

  return (
    <div className="card">
      <h2>Receptionist</h2>

      <p>
        <strong>ID:</strong> {selected.id}
      </p>

      <p>
        <strong>Name:</strong> {selected.name}
      </p>

      {role === "delete" && (
        <button onClick={handleDelete} className="deleteButton">
          Delete
        </button>
      )}
    </div>
  );
}

export default ReceptionistCard;
