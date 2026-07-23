function DoctorCard({ selected, role, onDelete, onBook }) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Dr. ${selected.name}?`,
    );

    if (confirmed) {
      onDelete(selected.id);
    }
  };

  const handleBook = () => {
    onBook(selected.id);
  };

  return (
    <div className="card">
      <h2>Doctor</h2>

      <p>
        <strong>ID:</strong> {selected.id}
      </p>

      <p>
        <strong>Name:</strong> Dr. {selected.name}
      </p>

      <p>
        <strong>Specialization:</strong> {selected.specialization}
      </p>

      {role === "delete" && (
        <button onClick={handleDelete} className="deleteButton">
          Delete
        </button>
      )}

      {role === "book" && (
        <button onClick={handleBook} className="completeButton">
          Book Appointment
        </button>
      )}
    </div>
  );
}

export default DoctorCard;
