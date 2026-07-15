import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "./Home";

import SignupAsDoctor from "../Pages/visitor/signup/asdoctor";
import SignupAsAdmin from "../Pages/visitor/signup/asadmin";
import SignupAsPatient from "../Pages/visitor/signup/aspatient";

import LoginAsDoctor from "../Pages/visitor/login/asdoctor";
import LoginAsAdmin from "../Pages/visitor/login/asadmin";
import LoginAsPatient from "../Pages/visitor/login/aspatient";

import PatientDashboard from "../Pages/patient/profile/dashboard";
import DoctorDashboard from "../Pages/doctor/profile/dashboard";
import AdminDashboard from "../Pages/admin/dashboard";

import Booking from "../Pages/patient/book/book";
import Search from "../Pages/patient/book/search";

import ViewAppointment from "../Pages/admin/view/appointments";
import ViewPatient from "../Pages/admin/view/patients";
import ViewUnverified from "../Pages/admin/view/unverifieddoc";
import ViewVerified from "../Pages/admin/view/verifieddoc";
import ViewGeneral from "../Pages/admin/view/general";

import appointmentCard from "../components/appointment";
import doctorCard from "../components/doctorcard";
import schedule from "../components/docsched";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/asdoctor" element={<SignupAsDoctor />} />
        <Route path="/signup/asadmin" element={<SignupAsAdmin />} />
        <Route path="/signup/aspatient" element={<SignupAsPatient />} />

        <Route path="/login/asdoctor" element={<LoginAsDoctor />} />
        <Route path="/login/asadmin" element={<LoginAsAdmin />} />
        <Route path="/login/aspatient" element={<LoginAsPatient />} />

        <Route path="/patient/profile/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/profile/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route path="general" element={<ViewGeneral />} />
            <Route path="patients" element={<ViewPatient />} />
            <Route path="verifieddoc" element={<ViewVerified />} />
            <Route path="unverifieddoc" element={<ViewUnverified />} />
            <Route path="appointments" element={<ViewAppointment />} />
        </Route>

        <Route path="/patient/book/book" element={<Booking />} />
        <Route path="/patient/book/search" element={<Search />} />

      </Routes>
    </>
  );
}

export default App;