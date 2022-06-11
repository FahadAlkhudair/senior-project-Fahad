const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    phoneNumber: String,
    email: String,
});

const AddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zipcode: String,
});

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
        contacts: [ContactSchema],
        addresses: [AddressSchema],
    })
);

module.exports = Profile;