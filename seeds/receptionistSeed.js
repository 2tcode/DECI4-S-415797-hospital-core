const { faker } = require("@faker-js/faker");
const Receptionist = require("../backend/models/receptionistModel.js");

async function seedReceptionists() {
    const receptionists = [];
    const usedIDs = new Set();

    for (let i = 0; i < 19; i++) {

        let id;
        do {
            id = faker.number.int({ min: 100000, max: 999999 });
        } while (usedIDs.has(id));

        usedIDs.add(id);

        receptionists.push({
            name: faker.person.fullName().toLowerCase(),
            id
        });
    }

    receptionists.push({
        name: "emily carter",
        id: 100001
    });

    await Receptionist.insertMany(receptionists);
}

module.exports = seedReceptionists;