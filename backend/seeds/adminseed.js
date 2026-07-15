const {faker} = require("@faker-js/faker");
const Admin = require("../models/admin.js");

async function seedAdmins() {
    const admins = [];
    
    for (let i = 0; i < 5; i++) {
        const adminData = new Admin({
            name: faker.person.fullName(),
            id: faker.datatype.uuid()
        });
        admins.push(adminData);
    }
    await Admin.insertMany(admins);
}

module.exports = seedAdmins;