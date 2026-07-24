const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Patient.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Patient Test", () => {
  test("creates a patient", async () => {
    const response = await request(app)
      .post("/api/patient")
      .send({
        id: 123456,
        name: "John Smith",
        age: 30,
        gender: "Male",
        medicalHistory: ["Asthma"],
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Smith");
    expect(response.body.id).toBe(123456);
  });

  test("gets all patients", async () => {
    await request(app)
      .post("/api/patient")
      .send({
        id: 123456,
        name: "John Smith",
        age: 30,
        gender: "Male",
        medicalHistory: ["Asthma"],
      });

    const response = await request(app).get("/api/patient");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe("John Smith");
  });

  test("updates a patient's medical history", async () => {
    await request(app)
      .post("/api/patient")
      .send({
        id: 123456,
        name: "John Smith",
        age: 30,
        gender: "Male",
        medicalHistory: ["Asthma"],
      });

    const response = await request(app)
      .put("/api/patient/123456")
      .send({
        medicalHistory: ["Asthma", "Diabetes"],
      });

    expect(response.status).toBe(200);
    expect(response.body.medicalHistory).toContain("Diabetes");
  });

  test("deletes an existing patient", async () => {
    await request(app)
      .post("/api/patient")
      .send({
        id: 123456,
        name: "John Smith",
        age: 30,
        gender: "Male",
        medicalHistory: ["Asthma"],
      });

    const response = await request(app).delete("/api/patient/123456");

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/deleted successfully/i);
  });
});
