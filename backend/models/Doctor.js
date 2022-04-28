const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 30
    },
    degree: {
        type: String,
        required: true
    },
    specialisation: {
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);
