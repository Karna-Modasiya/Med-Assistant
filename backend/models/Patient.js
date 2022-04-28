const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 30
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 10,
        max: 255
    },
    password: {
        type: String,
        required: true,
    },
    uhid: {
        type: String,
        required: true,
        min: 4,
        max: 4
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Patient', patientSchema);
