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
            type: Number,
            required: true,
            default: 1000
        },
        endTime: {
            type: Number,
            require: true,
            default: 1800
        },
        donationType: {
            type: String,
            enum: DonationType,
            required: true
        },
        seats: Number,
        Booked: Number
    })
);

module.exports = BloodDriveSlot;