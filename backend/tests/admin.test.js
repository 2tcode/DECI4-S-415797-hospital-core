const request = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const Admin = require("../models/adminModel");

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Admin.deleteMany({});
});

describe("Admin Tests", () => {
  test("creates a new admin", async () => {
    const response = await request(app).post("/api/admin").send({
      name: "Ahmed",
      id: 123456,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Ahmed");
    expect(response.body.id).toBe(123456);
  });
});

const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close();
});
