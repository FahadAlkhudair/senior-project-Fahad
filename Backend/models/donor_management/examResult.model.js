const mongoose = require('mongoose');
const ResultStatuses = require('./resultStatuses.model');

/**
 * Represent and examination result report for a donor
 */
const ExamResult = mongoose.model(
    "ExamResult",
    new mongoose.Schema({
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        questionnaire: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Questionnaire"
        },
        answers:{
            type: String,
            required: true  
        },
        remarks: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ResultStatuses,
            required:true
        },
        physician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = ExamResult;