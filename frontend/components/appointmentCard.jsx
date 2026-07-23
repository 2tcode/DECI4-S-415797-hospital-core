function AppointmentCard({ selected, role, onCancel, onComplete }) {
  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (confirmed) {
      onCancel(selected.appointmentID);
    }
  };

  const handleComplete = () => {
    const confirmed = window.confirm(
      "Mark this appointment as completed?"
    );

    if (confirmed) {
      onComplete(selected.appointmentID);
    }
  };

  if (role === "history" && selected.status !== "Completed") {
    return null;
  }

  if (role === "cancel" && selected.status !== "Booked") {
    return null;
  }

  return (
    <div className="card">
      <h2>Appointment</h2>

      <p>
        <strong>Appointment ID:</strong> {selected.appointmentID}
      </p>

      <p>
        <strong>Patient:</strong> {selected.patientName} (ID: {selected.patientID})
      </p>

      <p>
        <strong>Doctor:</strong> Dr. {selected.doctorName} (ID: {selected.doctorID})
      </p>

      <p>
        <strong>Date:</strong> {selected.appointmentDate}
      </p>

      <p>
        <strong>Time:</strong> {selected.appointmentTime.from} - {selected.appointmentTime.to}
      </p>

      <p>
        <strong>Status:</strong> {selected.status}
      </p>

      {role === "cancel" && selected.status === "Booked" && (
        <button onClick={handleCancel} className="deleteButton">
          Cancel Appointment
        </button>
      )}

      {role === "completed" && selected.status === "Booked" && (
        <button onClick={handleComplete} className="completeButton">
          Mark as Completed
        </button>
      )}
    </div>
  );
}

export default AppointmentCard;