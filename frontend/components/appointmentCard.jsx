function AppointmentCard({ selected, role, onCancel, onComplete }) {
  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (confirmed) {
      onCancel(selected.id);
    }
  };

  const handleComplete = () => {
    const confirmed = window.confirm(
      "Mark this appointment as completed?"
    );

    if (confirmed) {
      onComplete(selected.id);
    }
  };

  if (role === "history" && selected.status !== "completed") {
    return null;
  }

  if (role === "cancel" && selected.status.toLowerCase() !== "booked") {
    return null;
  }

  return (
    <div className="card">
      <h2>Appointment</h2>

      <p>
        <strong>Appointment ID:</strong> {selected.id}
      </p>

      <p>
        <strong>Patient:</strong> {selected.patientName} (ID: {selected.patientId})
      </p>

      <p>
        <strong>Doctor:</strong> Dr. {selected.doctorName} (ID: {selected.doctorId})
      </p>

      <p>
        <strong>Date:</strong> {selected.date}
      </p>

      <p>
        <strong>Time:</strong> {selected.startTime} - {selected.endTime}
      </p>

      <p>
        <strong>Status:</strong> {selected.status}
      </p>

      {role === "cancel" && selected.status === "booked" && (
        <button onClick={handleCancel} className="deleteButton">
          Cancel Appointment
        </button>
      )}

      {role === "completed" && selected.status === "booked" && (
        <button onClick={handleComplete} className="completeButton">
          Mark as Completed
        </button>
      )}
    </div>
  );
}

export default AppointmentCard;