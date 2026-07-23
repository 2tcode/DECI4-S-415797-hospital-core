const { faker } = require("@faker-js/faker");
const Admin = require("../backend/models/adminModel.js");

async function seedAdmins() {
    const admins = [];

    for (let i = 0; i < 4; i++) {
        admins.push({
            name: faker.person.fullName().toLowerCase(),
            id: faker.number.int({ min: 100000, max: 999999 })
        });
    }

    admins.push({
        name: "ali ali",
        id: 999999
    });

    await Admin.insertMany(admins);
}

module.exports = seedAdmins;