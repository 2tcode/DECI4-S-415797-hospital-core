const { faker } = require("@faker-js/faker");
const Patient = require("../backend/models/patientModel.js");

function getRandomDisease() {
    const diseases = [
        "Type 2 Diabetes",
        "Asthma",
        "Coronary Artery Disease",
        "Hyperlipidemia",
        "Migraine",
        "Hypothyroidism",
        "Osteoarthritis",
        "Chronic Kidney Disease",
        "Chronic Obstructive Pulmonary Disease (COPD)",
        "Gastroesophageal Reflux Disease (GERD)",
        "Allergic Rhinitis",
        "Iron Deficiency Anemia",
        "Psoriasis",
        "Tuberculosis",
        "Obesity"
    ];

    const numberOfDiseases = faker.number.int({ min: 0, max: 5 });
    const history = [];

    while (history.length < numberOfDiseases) {
        const disease = faker.helpers.arrayElement(diseases);
        if (!history.includes(disease)) {
            history.push(disease);
        }
    }

    return history.length === 0 ? [] : history;
}

async function seedPatients() {
    const patients = [];
    const usedIDs = new Set();

    for (let i = 0; i < 40; i++) {

        let id;
        do {
            id = faker.number.int({ min: 100000, max: 999999 });
        } while (usedIDs.has(id));

        usedIDs.add(id);

        patients.push({
            name: faker.person.fullName(),
            age: faker.number.int({ min: 18, max: 90 }),
            gender: faker.helpers.arrayElement(["Male", "Female"]),
            id,
            medicalHistory: getRandomDisease()
        });
    }
    await Patient.insertMany(patients);
}

module.exports = seedPatients;