const mongoose = require('mongoose');
const DonationType = require('../blood_component/donationTypes.model');

/**
 * Represents an allocatable slot for a donor in a blood drive campaign
 */
const BloodDriveSlot = mongoose.model(
    "BloodDriveSlot",
    new mongoose.Schema({
        bloodDrive: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BloodDrive"
        },
        startTime: {
            type: String,
            required: true,
            default: "10:00"
        },
        endTime: {
            type: String,
            require: true,
            default: "19:00"
        },
        donationType: {
            type: String,
            enum: DonationType,
            required: true
        },
        seats: Number,
        booked: {
            type: Number,
            default: 0
        }
    })
);

module.exports = BloodDriveSlot;