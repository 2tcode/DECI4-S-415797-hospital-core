const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const Doctor = require("../models/doctorModel");

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Doctor.deleteMany({});
});

describe("Doctor tests", () => {
  test("creates a doctor", async () => {
    const response = await request(app)
      .post("/api/doctor")
      .send({
        id: 999999,
        name: "Gregory House",
        specialization: "Diagnostics",
        workDays: ["Monday"],
        workHours: {
          from: "09:00",
          to: "17:00",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Gregory House");
    expect(response.body.id).toBe(999999);
  });

  test("gets all doctors", async () => {
    const response = await request(app).get("/api/doctor");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("doctor can log in", async () => {
    await request(app)
      .post("/api/doctor")
      .send({
        id: 999999,
        name: "Gregory House",
        specialization: "Diagnostics",
        workDays: ["Monday"],
        workHours: {
          from: "09:00",
          to: "17:00",
        },
      });

    const response = await request(app).post("/api/doctor/login").send({
      name: "Gregory House",
      id: 999999,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("doctor login fails with invalid inputs", async () => {
    const response = await request(app).post("/api/doctor/login").send({
      name: "Nobody",
      id: 111111,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
  });

  test("deletes an existing doctor", async () => {
    await request(app)
      .post("/api/doctor")
      .send({
        id: 999999,
        name: "Gregory House",
        specialization: "Diagnostics",
        workDays: ["Monday"],
        workHours: {
          from: "09:00",
          to: "17:00",
        },
      });

    const response = await request(app).delete("/api/doctor/999999");

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/deleted successfully/i);
  });
});

const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close();
});
