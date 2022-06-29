const mongoose = require('mongoose');

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
        }
    })
);

module.exports = Appointment;