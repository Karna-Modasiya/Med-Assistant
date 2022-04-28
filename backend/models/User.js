const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    usertype: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        min: 4,
        max: 15
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

module.exports = mongoose.model('User', userSchema);