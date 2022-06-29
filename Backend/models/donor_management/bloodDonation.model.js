const mongoose = require('mongoose');
const BloodType = require('../blood_component/bloodTypes.model');
const DonationType = require('../blood_component/donationTypes.model');
const ResultStatuses = require('../donor_management/resultStatuses.model');

/**
 * Represents a donor's blood donation record
 */
const BloodDonation = mongoose.model(
    "BloodDonation",
    new mongoose.Schema({
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        healthProvider:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        date: {
            type: Date,
            required: true,
        },
        bloodBag: {
            type: String,
            required: true,
        },
        bloodType: {
            type: String,
            enum: BloodType,
            required: true
        },
        donationType: {
            type: String,
            enum: DonationType,
        },
        expiryDate:{
            type: Date,
            required: true
        },
        labTest:{
            type: String,
            enum: ResultStatuses
        }
    })
);

module.exports = BloodDonation;