const request = require("supertest");
const mongoose = require("mongoose");

const backendApp = require("../app");
const connectBackendDB = require("../config/db");

const appointmentApp = require("../../microservices/appointmentservice/app");
const connectAppointmentDB = require("../../microservices/appointmentservice/db");

const Patient = require("../models/patientModel");
const Appointment = require("../../microservices/appointmentservice/models/appointmentModel");

beforeAll(async () => {
  await connectBackendDB();
  await connectAppointmentDB();
});

beforeEach(async () => {
  await Patient.deleteMany({});
  await Appointment.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("End-to-End Workflow", () => {
  test("register patient, book appointment and update dashboard statistics", async () => {
    const patientResponse = await request(backendApp)
      .post("/api/patient")
      .send({
        id: 123456,
        name: "John Smith",
        age: 30,
        gender: "Male",
        medicalHistory: [],
      });

    expect(patientResponse.status).toBe(201);

    const appointmentResponse = await request(appointmentApp)
      .post("/appointments")
      .send({
        appointmentID: 1,
        patientID: 123456,
        patientName: "John Smith",
        doctorID: 999999,
        doctorName: "Gregory House",
        appointmentDate: new Date(),
        appointmentTime: {
          from: "09:00",
          to: "09:30",
        },
        status: "Booked",
      });

    expect(appointmentResponse.status).toBe(201);

    const patients = await request(backendApp).get("/api/patient");

    expect(patients.status).toBe(200);
    expect(patients.body).toHaveLength(1);

    const appointments = await request(appointmentApp).get("/appointments");

    expect(appointments.status).toBe(200);
    expect(appointments.body).toHaveLength(1);
  });
});
