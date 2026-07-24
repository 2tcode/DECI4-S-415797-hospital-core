const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const Receptionist = require("../models/receptionistModel");
const mongoose = require("mongoose");

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Receptionist.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Receptionist API", () => {
  test("creates a receptionist", async () => {
    const response = await request(app).post("/api/receptionist").send({
      id: 123456,
      name: "Emily Johnson",
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Emily Johnson");
    expect(response.body.id).toBe(123456);
  });

  test("gets all receptionists", async () => {
    await request(app).post("/api/receptionist").send({
      id: 123456,
      name: "Emily Johnson",
    });

    const response = await request(app).get("/api/receptionist");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toBe("Emily Johnson");
  });

  test("receptionist can log in with valid credentials", async () => {
    await request(app).post("/api/receptionist").send({
      id: 123456,
      name: "Emily Johnson",
    });

    const response = await request(app).post("/api/receptionist/login").send({
      id: 123456,
      name: "Emily Johnson",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("receptionist login fails with invalid credentials", async () => {
    const response = await request(app).post("/api/receptionist/login").send({
      id: 999999,
      name: "Nobody",
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
  });

  test("deletes an existing receptionist", async () => {
    await request(app).post("/api/receptionist").send({
      id: 123456,
      name: "Emily Johnson",
    });

    const response = await request(app).delete("/api/receptionist/123456");

    expect(response.status).toBe(200);
    expect(response.body.message).toMatch(/deleted successfully/i);
  });
});
