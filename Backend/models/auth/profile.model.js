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
    })
);

module.exports = Profile;