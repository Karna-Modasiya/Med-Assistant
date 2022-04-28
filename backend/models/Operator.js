const mongoose = require('mongoose');

const operatorSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 30
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

module.exports = mongoose.model('Operator', operatorSchema);
