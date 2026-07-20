const { faker } = require("@faker-js/faker");
const Patient = require("../models/patient.js");

function getRandomDisease() {

    const diseases = [
        "Hypertension",
        "Type 2 Diabetes",
        "Asthma",
        "Coronary Artery Disease",
        "Hyperlipidemia",
        "Migraine",
        "Hypothyroidism",
        "Osteoarthritis",
        "Chronic Kidney Disease",
        "Chronic Obstructive Pulmonary Disease (COPD)",
        "Depression",
        "Anxiety Disorder",
        "Gastroesophageal Reflux Disease (GERD)",
        "Allergic Rhinitis",
        "Iron Deficiency Anemia",
        "Epilepsy",
        "Psoriasis",
        "Tuberculosis",
        "Obesity"
    ];

    const numberOfDiseases = Math.floor(Math.random() * 4);

    const list = [];

    for (let i = 0; i < numberOfDiseases; i++) {

        const randomIndex = Math.floor(Math.random() * diseases.length);

        if (!list.includes(diseases[randomIndex])) {
            list.push(diseases[randomIndex]);
        }

    }

    if (list.length === 0) {
        list.push("None");
    }

    return list;
}


async function seedPatients() {
    const patients = [];

    for (let i = 0; i < 20; i++) {
        const patient = new Patient({
            name: faker.person.fullName(),
            DOB: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }),
            gender: faker.helpers.arrayElement(['Male', 'Female']),
            insuranceID: faker.datatype.uuid(),
            medicalHistory: getRandomDisease()
        });
        patients.push(patient);
    }

    await Patient.insertMany(patients);
}


module.exports = seedPatients;