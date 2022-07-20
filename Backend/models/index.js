const mongoose = require('mongoose');
const db = {};

// User Management
db.user = require('./auth/user.model');
db.profile = require('./auth/profile.model');
db.refreshToken = require('./auth/refreshToken.model');

// Blood Component Management 
db.donation = require('./blood_component/donation.model');

// Donor Managment
db.bloodDonation = require('./donor_management/bloodDonation.model');
db.questionnaire = require('./donor_management/questionnaire.model');
db.examResult = require('./donor_management/examResult.model');
db.bloodDrive = require('./donor_management/bloodDrive.model');
db.bloodDriveSlot = require('./donor_management/bloodDriveSlot.model');
db.appointment = require('./donor_management/appointment.model');

// Staff
db.staff = require('./staff/staff.model');

// Enums
db.ROLES = require('./auth/roles.model');
db.BLOOD_TYPES = require('./blood_component/bloodTypes.model');
db.DONATION_TYPES = require('./blood_component/donationTypes.model');
db.RESULT_STATUSES = require('./donor_management/resultStatuses.model');
db.PROFESSION_TYPES =require('./staff/professions.model');

db.mongoose = mongoose;

module.exports = db;