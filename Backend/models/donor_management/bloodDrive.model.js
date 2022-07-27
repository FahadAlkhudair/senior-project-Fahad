const mongoose = require('mongoose');
const pointSchema = require('../map/point.schema');

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
        zipCode: {
            type: String,
            required: true
        },
        coordinates:{
            type: pointSchema,
            required: true,
            index: '2dsphere'
        },
        booked: Boolean,
        full: {
            type: Boolean,
            default: false
        }
    })
);

module.exports = BloodDrive;