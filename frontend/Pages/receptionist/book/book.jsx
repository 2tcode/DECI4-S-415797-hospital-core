import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../../../components/doctorCard";
import PatientCard from "../../../components/patientCard";

function Book() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/doctor");
      setDoctors(response.data);
    } catch (err) {
      console.error(err);
      alert("Couldn't load doctors.");
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get("/api/patient");
      setPatients(response.data);
    } catch (err) {
      console.error(err);
      alert("Couldn't load patients.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/appointments");
      setAppointments(response.data);
    } catch (err) {
      console.error(err);
      alert("Couldn't load appointments.");
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchAppointments();
  }, []);

  const [nextAppointmentId] = useState(
    Math.floor(Math.random() * 900000) + 100000,
  );

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

      const weekday = new Date(year, month - 1, day).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
        },
      );

      matchesDate = doctor.workDays.includes(weekday);
    }

    let matchesTime = true;

    if (selectedTime) {
      matchesTime =
        selectedTime >= doctor.workHours.from &&
        selectedTime < doctor.workHours.to;
    }

    return matchesSearch && matchesDate && matchesTime;
  });

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
      patient.id.toString().includes(patientSearch)
    );
  });

  const handleBookAppointment = async () => {
    const [hours, minutes] = selectedTime.split(":").map(Number);

    const end = new Date();
    end.setHours(hours, minutes + 30);

    const endTime = end.toTimeString().slice(0, 5);

    const newAppointment = {
      appointmentID: nextAppointmentId,
      doctorID: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      patientID: selectedPatient.id,
      patientName: selectedPatient.name,
      appointmentDate: selectedDate,
      appointmentTime: {
        from: selectedTime,
        to: endTime,
      },
      status: "Booked",
    };

    try {
      await axios.post("/appointments", newAppointment);

      alert("Appointment booked successfully!");

      fetchAppointments();

      setSelectedDoctor(null);
      setSelectedPatient(null);
      setSelectedDate("");
      setSelectedTime("");
    } catch (err) {
      console.error(err);
      alert("Couldn't book appointment.");
    }
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
        <strong>Doctor:</strong> {selectedDoctor ? selectedDoctor.name : "None"}
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
        <strong>Date:</strong> {selectedDate || "None"}
      </p>

      <p>
        <strong>Time:</strong> {selectedTime || "None"}
      </p>

      <button
        disabled={
          !selectedDoctor || !selectedPatient || !selectedDate || !selectedTime
        }
        onClick={handleBookAppointment}
      >
        Book Appointment
      </button>
    </div>
  );
}

export default Book;
