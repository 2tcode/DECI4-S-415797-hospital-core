const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    id:{
        type: Number,
        required: true,
        unique: true,
        min: 100000,
        max: 999999
    },
    medicalHistory: [
       { type: String }
    ]
});

module.exports = mongoose.model("Patient", patientSchema);