const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    insuranceID:{
        type: String,
        required: true,
        unique: true
    },
    medicalHistory: [
       { type: String }
    ]
});

module.exports = mongoose.model("Patient", patientSchema);