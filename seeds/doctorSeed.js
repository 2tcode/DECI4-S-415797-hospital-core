const departments = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Pediatrics",
    "Psychiatry",
    "General"
];

const { faker } = require("@faker-js/faker");
const Doctor = require("../backend/models/doctorModel.js");

async function seedDoctors() {
    const doctors = [];
    const usedIDs = new Set();


    for (let i = 0; i < 19; i++) {

        let id;
        do {
            id = faker.number.int({ min: 100000, max: 999999 });
        } while (usedIDs.has(id));
        usedIDs.add(id);


        const workDays = faker.helpers.arrayElements(
            [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Saturday"
            ],
            faker.number.int({ min: 2, max: 5 })
        );

        const startHour = faker.number.int({ min: 8, max: 10 });
        const endHour = faker.number.int({ min: 15, max: 18 });

        doctors.push({
            name: faker.person.fullName().toLowerCase(),
            id,
            specialization: faker.helpers.arrayElement(departments).toLowerCase(),
            workDays,
            workHours: {
                from: `${String(startHour).padStart(2, "0")}:00`,
                to: `${String(endHour).padStart(2, "0")}:00`
            }
        });
    }

    doctors.push({
        name: "ahmed mohammed",
        id: 100001,
        specialization: "general",
        workDays: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Saturday"
        ],
        workHours: {
            from: "08:00",
            to: "18:00"
        }
    });

    await Doctor.insertMany(doctors);
}

module.exports = seedDoctors;