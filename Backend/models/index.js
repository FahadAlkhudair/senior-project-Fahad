const mongoose = require('mongoose');
const db = {};

// User Management - Login and Profiles
db.user = require('./auth/user.model');
db.profile = require('./auth/profile.model');
db.refreshToken = require('./auth/refreshToken.model');

// Enums
db.ROLES = require('./auth/roles.model');

db.mongoose = mongoose;

module.exports = db;