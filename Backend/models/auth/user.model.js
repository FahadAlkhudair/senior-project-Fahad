const mongoose = require('mongoose');
const Roles = require('./roles.model');
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role:{
            type: String,
            enum: Roles,
            required: true
        }
    })
);

module.exports  = User;