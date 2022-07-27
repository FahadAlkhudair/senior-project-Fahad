const pointSchema = require('../map/point.schema');
const professionKind = require('./professions.model');

const mongoose = require('mongoose');

const Profile = mongoose.model(
    "Profile",
    new mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        ssn: {
            type: String,
            required: true,
            index: true
        },
        donorNumber: {
            type: String,
            default: undefined,
            index: true
        },
        dob:{
            type: Date,
            required: true
        },
        contact: {
            phoneNumber: String,
            email: String,
        },
        address:{
            street: String,
            city: String,
            state: String,
            zipCode: Number,
        },
        coordinates:{
            type: pointSchema,
            required: true,
            index: '2dsphere'
        },
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        profession:{
            type: String,
            enum: professionKind,
        }
    })
);

module.exports = Profile;