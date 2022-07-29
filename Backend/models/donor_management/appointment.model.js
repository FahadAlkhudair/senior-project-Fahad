const mongoose = require('mongoose');
const ResultStatuses = require('./resultStatuses.model');

const ExamResult = new mongoose.Schema({
    questions: {
        type: Array,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ResultStatuses,
        required: true
    },
    physician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    haemoglobin: {
        type: Number,
        required: true
    },
    pulse: {
        type: Number,
        required: true
    },
    pressure: {
        type: String,
        required: true
    },
    din: {
        type: Number,
        required: true
    }
});

/**
 * Represents a donor's appointment record
 */
const Appointment = mongoose.model(
    "Appointment",
    new mongoose.Schema({
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "BloodDriveSlot"
        },
        provider:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        profile:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        },
        examResult: ExamResult,
        examCompleted:  {
            type: Boolean,
            default: false
        },
        consumed: {
            type:Boolean,
            default: false
        }
    })
);

module.exports = Appointment;