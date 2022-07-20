const professionKind = require('./professions.model');

const mongoose = require('mongoose');

const Staff = mongoose.model(
    "Staff",
    new mongoose.Schema({
        staff:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile'
        },
        institution: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        profession:{
            type: String,
            enum: professionKind,
            required: true,
        }
    })
);

module.exports = Staff;