const db = require('../models');
const { questionnaire: Questionnaire, examResult: ExamResult, bloodDrive: BloodDrive, bloodDriveSlot: BloodDriveSlot, appointment: Appointment } = db;

// Questionnaires 
// Create Questionnaire
exports.createQuestionnaire = (req, res) => {
    // Check if title is present
    if (!req.body.title) {
        return res.status(400).send({
            message: "Questionnaire title cannot be empty"
        });
    }

    // Check if questions are present
    if (!req.body.questions || !Array.isArray(req.body.questions)) {
        return res.status(400).send({
            message: "Questionnaire must have atleast one question"
        });
    }

    // Create Questionnaire
    const questionnaire = new Questionnaire({
        title: req.body.title,
        questions: req.body.questions
    });

    questionnaire.save()
        .then(() => {
            res.status(200).send({ message: "Questionnaire successfully created!" });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};

// Delete Questionnaire
exports.deleteQuestionnaire = (req, res) => {
    Questionnaire.findById(req.params.questionnaireId)
        .then((questionnaire) => {
            if (!questionnaire) {
                return res.status(400).send({ message: "Questionnaire not found with id " + req.params.questionnaireId });
            }

            if (questionnaire.deployed) {
                return res.status(404).send({ message: "Cannot delete already deployed questionnaire" });
            }

            Questionnaire.findByIdAndDelete(req.params.questionnaireId)
                .then((questionnaire) => {
                    return res.status(204).send({ message: "Questionnaire successfully deleted" });
                })
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })
};

// Mark Questionnaire as Active
exports.markQuestionnaireAsActive = (req, res) => {
    Questionnaire.findByIdAndUpdate(req.params.questionnaireId, {
        isActive: true
    }, {})
        .then(questionnaire => {
            if (!questionnaire) {
                return res.status(404).send({
                    message: "Questionnaire not found with id " + req.params.questionnaireId
                });
            }

            return res.status(200).send(questionnaire);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Questionnaire not found with id " + req.params.questionnaireId
                });
            }
            return res.status(500).send({
                message: "Error updating questionnaire with id " + req.params.questionnaireId
            });
        });
};

// List Questionnaires
exports.findAllQuestionnaires = (req, res) => {
    Questionnaire
        .find()
        .then(questionnaires => {
            res.status(200).send(questionnaires);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving questionnaires" });
        });
}