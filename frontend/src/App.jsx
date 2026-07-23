import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Home from "./Home";

import PatientCard from "../components/patientCard";
import DoctorCard from "../components/doctorCard";
import AppointmentCard from "../components/appointmentCard";

import AdminDashboard from "../pages/admin/dashboard"; 
import DeleteReceptionist from "../pages/admin/delete/deleteReceptionist";
import DeleteDoctor from "../pages/admin/delete/deleteDoctor";
import DeletePatientAdmin from "../pages/admin/delete/deletePatientAdmin";
import AddReceptionist from "../pages/admin/add/newReceptionist";
import AddDoctor from "../pages/admin/add/newDoctor";
import AddAdmin from "../pages/admin/add/newAdmin";
import AppointmentView from "../pages/admin/view/appointmentView";
import ReceptionistView from "../pages/admin/view/receptionistView";
import DoctorView from "../pages/admin/view/doctorView";
import PatientView from "../pages/admin/view/patientView";
import GeneralView from "../pages/admin/view/generalView";

import DoctorDashboard from "../pages/doctor/dashboard";
import AppointmentHistory from "../pages/doctor/appointments/appointmentHistory"; 
import ViewAppointment from "../pages/doctor/appointments/viewAppointment";
import ViewPatient from "../pages/doctor/configPatient/viewPatient";

import ReceptionistDashboard from "../pages/receptionist/dashboard";
import Book from "../pages/receptionist/book/book";
import Cancel from "../pages/receptionist/book/cancel";
import AddNew from "../pages/receptionist/patientInfo/addNew";
import DeletePatient from "../pages/receptionist/patientInfo/deletePatient";

import AsAdmin from "../pages/visitor/login/asAdmin";
import AsDoctor from "../pages/visitor/login/asDoctor";
import AsReceptionist from "../pages/visitor/login/asReceptionist";


function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login/admin" element={<AsAdmin />} />
        <Route path="/login/doctor" element={<AsDoctor />} />
        <Route path="/login/receptionist" element={<AsReceptionist />} />


        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route path="add/admin" element={<AddAdmin />} />
          <Route path="add/doctor" element={<AddDoctor />} />
          <Route path="add/receptionist" element={<AddReceptionist />} />
          <Route path="delete/patient" element={<DeletePatientAdmin />} />
          <Route path="delete/doctor" element={<DeleteDoctor />} />
          <Route path="delete/receptionist" element={<DeleteReceptionist />} />
          <Route path="view/general" element={<GeneralView />} />
          <Route path="view/patients" element={<PatientView />} />
          <Route path="view/doctors" element={<DoctorView />} />
          <Route path="view/receptionists" element={<ReceptionistView />} />
          <Route path="view/appointments" element={<AppointmentView />} />
        </Route>

        <Route path="/doctor/dashboard" element={<DoctorDashboard />}>
          <Route path="appointments/history" element={<AppointmentHistory />}/>
          <Route path="appointments/view" element={<ViewAppointment />}/>
          <Route path="patients/view" element={<ViewPatient />}/>
        </Route>

        <Route path="/receptionist/dashboard"element={<ReceptionistDashboard />}>
          <Route path="appointments/book" element={<Book />}/>
          <Route path="appointments/cancel" element={<Cancel />}/>
          <Route path="patients/add" element={<AddNew />}/>
          <Route path="patients/delete" element={<DeletePatient />}/>
        </Route>

      </Routes>
    </>
  );
}

export default App;