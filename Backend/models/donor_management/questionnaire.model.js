const mongoose = require('mongoose');

/**
 * Represents a question with category
 */
const QuestionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true
    },
});

/** 
 * Represents a Questionnaire form containing collection of Yes/No questions 
*/
const Questionnaire = mongoose.model(
    "Questionnaire",
    new mongoose.Schema({
        questions:[QuestionSchema],
    })
);

module.exports = Questionnaire;