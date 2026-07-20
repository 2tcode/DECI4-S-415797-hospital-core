import { useState } from "react";
import DoctorCard from "../../../components/doctorCard";
import PatientCard from "../../../components/patientCard";

function Book() {
  const doctors = [
    {
      id: 123,
      name: "Ahmed Mohamed",
      specialization: "Cardiology",
      workDays: ["Monday", "Tuesday", "Thursday"],
      startTime: "09:00",
      endTime: "17:00",
    },
    {
      id: 124,
      name: "Sarah Ali",
      specialization: "Neurology",
      workDays: ["Sunday", "Monday", "Wednesday"],
      startTime: "10:00",
      endTime: "18:00",
    },
    {
      id: 125,
      name: "Omar Hassan",
      specialization: "Pediatrics",
      workDays: ["Tuesday", "Wednesday", "Thursday"],
      startTime: "08:00",
      endTime: "02:00",
    },
  ];

  const patients = [
    {
      id: 301,
      name: "Ahmed Hassan",
      age: 35,
      gender: "Male",
      medicalHistory: [
        "Diabetes",
        "High Blood Pressure",
        "Appendectomy (2020)",
      ],
    },
    {
      id: 302,
      name: "Mohamed Hassan",
      age: 35,
      gender: "Male",
      medicalHistory: [],
    },
  ];

  const appointments = [
    { id: 501 },
    { id: 502 },
    { id: 503 },
  ];

  const nextAppointmentId =
    Math.max(...appointments.map((appointment) => appointment.id)) + 1;

  const [doctorSearch, setDoctorSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredDoctors = doctors.filter((doctor) => {
    const search = doctorSearch.toLowerCase();

    const matchesSearch =
      doctor.name.toLowerCase().includes(search) ||
      doctor.id.toString().includes(search) ||
      doctor.specialization.toLowerCase().includes(search);

    let matchesDate = true;

    if (selectedDate) {
      const [year, month, day] = selectedDate.split("-").map(Number);

      const weekday = new Date(
        year,
        month - 1,
        day
      ).toLocaleDateString("en-US", {
        weekday: "long",
      });

      matchesDate = doctor.workDays.includes(weekday);
    }

    let matchesTime = true;

    if (selectedTime) {
      matchesTime =
        selectedTime >= doctor.startTime &&
        selectedTime < doctor.endTime;
    }

    return matchesSearch && matchesDate && matchesTime;
  });

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      patient.id.toString().includes(patientSearch)
    );
  });

  const handleBookAppointment = () => {
    const newAppointment = {
      id: nextAppointmentId,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialization: selectedDoctor.specialization,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      date: selectedDate,
      startTime: selectedTime,
    };

    console.log("Appointment Booked!");
    console.log(newAppointment);
  };

  return (
    <div>
      <h1>Booking Page</h1>

      <h3>Select Doctor</h3>

      <input
        type="text"
        placeholder="Search by doctor name, ID, or speciality..."
        value={doctorSearch}
        onChange={(e) => setDoctorSearch(e.target.value)}
      />

      {"  "}

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {"  "}

      <input
        type="time"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      />

      <br />
      <br />
      <div className="cardContainer">

      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            selected={doctor}
            role="book"
            onBook={() => {
              setSelectedDoctor(doctor);
            }}
          />
        ))
      ) : (
        <p>No doctors available.</p>
      )}
      </div>
      <hr />

      <h3>Select Patient</h3>

      <input
        type="text"
        placeholder="Search patient by name or ID..."
        value={patientSearch}
        onChange={(e) => setPatientSearch(e.target.value)}
      />

      <br />
      <br />

      <div className="cardContainer">
      {filteredPatients.length > 0 ? (
        filteredPatients.map((patient) => (
          <PatientCard
            key={patient.id}
            selected={patient}
            role="book"
            onSelect={() => {
              setSelectedPatient(patient);
            }}
          />
        ))
      ) : (
        <p>No patients found.</p>
      )}
      </div>

      <hr />

      <h2>Selected Appointment</h2>

      <p>
        <strong>Appointment ID:</strong> {nextAppointmentId}
      </p>

      <p>
        <strong>Doctor:</strong>{" "}
        {selectedDoctor ? selectedDoctor.name : "None"}
      </p>

      <p>
        <strong>Speciality:</strong>{" "}
        {selectedDoctor ? selectedDoctor.specialization : "None"}
      </p>

      <p>
        <strong>Patient:</strong>{" "}
        {selectedPatient ? selectedPatient.name : "None"}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {selectedDate || "None"}
      </p>

      <p>
        <strong>Time:</strong>{" "}
        {selectedTime || "None"}
      </p>

      <button
        disabled={
          !selectedDoctor ||
          !selectedPatient ||
          !selectedDate ||
          !selectedTime
        }
        onClick={handleBookAppointment}
      >
        Book Appointment
      </button>
    </div>
  );
}

export default Book;