const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    accountNumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    inn: {
        type: Number,
        required: true,
    },
    fullNameResponsiblePerson: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "В работе",
    },
});

module.exports = model("Client", userSchema);
