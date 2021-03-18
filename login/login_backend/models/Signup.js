const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    confirmPassword: String,
    firstName: String,
    surname: String,
    dateOfBirth: Date
});

const signUpModel = mongoose.model("signup", signUpSchema);
module.exports = signUpModel;