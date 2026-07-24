import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const microApi = axios.create({
  baseURL: import.meta.env.VITE_MICRO_API_URL,
});

function GeneralView() {
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

  const {
    data: receptionists = [],
    isLoading: receptionistsLoading,
    isError: receptionistsError,
  } = useQuery({
    queryKey: ["receptionists"],
    queryFn: async () => {
      const { data } = await api.get("/api/receptionist");
      return data;
    },
  });

  const {
    data: admins = [],
    isLoading: adminsLoading,
    isError: adminsError,
  } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data } = await api.get("/api/admin");
      return data;
    },
  });

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

  const isLoading =
    doctorsLoading ||
    receptionistsLoading ||
    adminsLoading ||
    appointmentsLoading;

  const isError =
    doctorsError ||
    receptionistsError ||
    adminsError ||
    appointmentsError;

  if (isLoading) return <p>Loading dashboard...</p>;

  if (isError) return <p>Couldn't load dashboard.</p>;

  const bookedAppointments = appointments.filter(
    (appointment) => appointment.status === "Booked",
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled",
  ).length;

  return (
    <div className="container">
      <h1>General Viewing</h1>

      <div>
        <div className="box">
          <h3>Doctors' number:</h3>
          <p>{doctors.length}</p>
        </div>

        <div className="box">
          <h3>Receptionists' number:</h3>
          <p>{receptionists.length}</p>
        </div>

        <div className="box">
          <h3>Admins' number:</h3>
          <p>{admins.length}</p>
        </div>

        <div className="box">
          <h3>Appointments' Status</h3>

          <ul>
            <li>
              <h5>Total Appointments:</h5>
              <p>{appointments.length}</p>
            </li>

            <li>
              <h5>Booked Appointments:</h5>
              <p>{bookedAppointments}</p>
            </li>

            <li>
              <h5>Completed Appointments:</h5>
              <p>{completedAppointments}</p>
            </li>

            <li>
              <h5>Cancelled Appointments:</h5>
              <p>{cancelledAppointments}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GeneralView;