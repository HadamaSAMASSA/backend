const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    Prénom: String,
    Nom: String,
    Age: Number
});

const adminModel = mongoose.model("admins", adminSchema);
module.exports = adminModel;