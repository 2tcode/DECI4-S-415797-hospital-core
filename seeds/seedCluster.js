connectDB();

await Admin.deleteMany({});
await Doctor.deleteMany({});
await Patient.deleteMany({});

await seedAdmins();
await seedDoctors();
await seedPatients();

disconnect();