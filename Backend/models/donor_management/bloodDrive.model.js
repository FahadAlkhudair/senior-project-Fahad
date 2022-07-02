const mongoose = require('mongoose');

/**
 * Represents a blood drive campaign
 */
const BloodDrive = mongoose.model(
    "BloodDrive",
    new mongoose.Schema({
        healthProvider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            required: true
        },
    })
);

module.exports = BloodDrive;