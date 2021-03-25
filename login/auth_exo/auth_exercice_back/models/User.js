const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
});
const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;