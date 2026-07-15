const departments = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Psychiatry",
    "General"
];

const { faker } = require("@faker-js/faker");
const doctor = require("../models/doctor.js");

async function seedDoctors() {
    const doctors = [];

    for (let i = 0; i < 20; i++) {
        const doctorData = new doctor({
            name: faker.person.fullName(),
            specialization: faker.helpers.arrayElement(departments),
            licenseNumber: faker.datatype.uuid(),
            verificationStatus: faker.helpers.arrayElement(["Pending", "Verified", "Rejected"]),
            schedule: [
                {
                    day: faker.helpers.arrayElement([
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ]),
                    start: faker.time.recent(),
                    end: faker.time.recent()
                }
            ]
        });
        doctors.push(doctorData);
    }

    await doctor.insertMany(doctors);
}

module.exports = seedDoctors;