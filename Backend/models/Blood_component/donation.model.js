const mongoose = require('mongoose');
const DonationType = require('./donationTypes.model');

/**
 * Represents Kinds of Blood Donations
 */
const Donation = mongoose.model(
    "Donation",
    new mongoose.Schema({
        kind: {
            type: String,
            enum: DonationType,
            required: true,
            unique: true
        },
        frequency: {
            type: Number,
            required: true,
        },
        expiresAfter: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    })
);

module.exports = Donation;