const mongoose = require('mongoose');
const { stringify } = require('uuid');

/**
 * Represents a donor's appointment record
 */
const Appointment = mongoose.model(
    "Appointment",
    new mongoose.Schema({
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BloodDriveSlot"
        },
        provider:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        profile:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        }
    })
);

module.exports = Appointment;