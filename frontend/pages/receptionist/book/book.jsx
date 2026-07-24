import { useState } from "react";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import DoctorCard from "../../../components/doctorCard";
import PatientCard from "../../../components/patientCard";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const microApi = axios.create({
  baseURL: import.meta.env.VITE_MICRO_API_URL,
});

function Book() {
  const queryClient = useQueryClient();

  const [nextAppointmentId] = useState(
    Math.floor(Math.random() * 900000) + 100000,
  );

  const [doctorSearch, setDoctorSearch] = useState("");
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Doctors
  const {
    data: doctors = [],
    isLoading: doctorsLoading,
    isError: doctorsError,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const { data } = await api.get("/api/doctor");
      return data;
    },
  });

  // Patients
  const {
    data: patients = [],
    isLoading: patientsLoading,
    isError: patientsError,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data } = await api.get("/api/patient");
      return data;
    },
  });

  // Appointments
  const {
    data: appointments = [],
    isLoading: appointmentsLoading,
    isError: appointmentsError,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data } = await microApi.get("/appointments");
      return data;
    },
  });

  const bookAppointmentMutation = useMutation({
    mutationFn: (appointment) =>
      microApi.post("/appointments", appointment),

    onSuccess: () => {
      alert("Appointment booked successfully!");

      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });

      setSelectedDoctor(null);
      setSelectedPatient(null);
      setSelectedDate("");
      setSelectedTime("");
    },

    onError: (err) => {
      console.error(err);
      alert("Couldn't book appointment.");
    },
  });

  const isLoading =
    doctorsLoading || patientsLoading || appointmentsLoading;

  const isError =
    doctorsError || patientsError || appointmentsError;

  if (isLoading) return <p>Loading booking page...</p>;

  if (isError) return <p>Couldn't load booking page.</p>;

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
      patient.name
        .toLowerCase()
        .includes(patientSearch.toLowerCase()) ||
      patient.id.toString().includes(patientSearch)
    );
  });

  const handleBookAppointment = () => {
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

    bookAppointmentMutation.mutate(newAppointment);
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
        <strong>Date:</strong> {selectedDate || "None"}
      </p>

      <p>
        <strong>Time:</strong> {selectedTime || "None"}
      </p>

      <button
        disabled={
          !selectedDoctor ||
          !selectedPatient ||
          !selectedDate ||
          !selectedTime ||
          bookAppointmentMutation.isPending
        }
        onClick={handleBookAppointment}
      >
        {bookAppointmentMutation.isPending
          ? "Booking..."
          : "Book Appointment"}
      </button>
    </div>
  );
}

export default Book;