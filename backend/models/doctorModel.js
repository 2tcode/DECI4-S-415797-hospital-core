const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: Number,
        required: true,
        unique: true,
        min: 100000,
        max: 999999
    },
    specialization: {
        type: String,
        required: true
    },
    workDays: {
        type: [
            {
                type: String,
                enum: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ]
            }
        ],
        required: true
    },
    workHours: {
        from: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model("Doctor", doctorSchema);