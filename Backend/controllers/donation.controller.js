const db = require('../models');
const { questionnaire: Questionnaire, examResult: ExamResult, bloodDrive: BloodDrive, bloodDriveSlot: BloodDriveSlot, appointment: Appointment } = db;

//  =========================================== 
// ============== Questionnaires ============== 
//  ===========================================

// Create Questionnaire
exports.updateQuestionnaire = (req, res) => {
    // Check if questions are present
    if (!req.body.questions || !Array.isArray(req.body.questions)) {
        return res.status(400).send({
            message: "Questionnaire must have atleast one question"
        });
    }

        Questionnaire.findByIdAndUpdate(req.params.questionnaireId, {
            title: req.body.title,
            questions: req.body.questions
        }, { new: true })
            .then(questionnaire => {
                if (!questionnaire) {
                    return res.status(404).send({
                        message: "Questionnaire not found with id " + req.params.questionnaireId
                    });
                }
    
                return res.status(200).send(questionnaire);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Questionnaire not found with id " + req.params.questionnaireId
                    });
                }
                return res.status(500).send({
                    message: "Error updating Questionnaire with id " + req.params.questionnaireId
                });
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
            res.status(200).send(questionnaires[0]);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving questionnaires" });
        });
}

//  =========================================== 
// ============== Exam Resulsts ============== 
//  ===========================================

// Post Donor exam results
exports.postExamResults = (req, res) => {
    // Check if donor id is present
    if (!req.body.donor) {
        return res.status(400).send({
            message: "Donor must be specified"
        });
    }

    // Check if questionnaire id is present
    if (!req.body.questionnaire) {
        return res.status(400).send({
            message: "Questionnaire must be specified"
        });
    }

    // Check if answers present
    if (!req.body.answers) {
        return res.status(400).send({
            message: "Answers must be specified"
        });
    }

    // Check status
    if (!req.body.status) {
        return res.status(400).send({
            message: "Exam status must be specified"
        });
    }

    // Check physician id
    if (!req.body.physician) {
        return res.status(400).send({
            message: "Physician must be specified"
        });
    }

    // Check remarks
    if (!req.body.remarks) {
        return res.status(400).send({
            message: "Remarks must be specified"
        });
    }

    // Create Exam Result
    const examResult = new ExamResult({
        donor: req.body.donor,
        physician: req.body.physician,
        questionnaire: req.body.questionnaire,
        answers: req.body.answers,
        status: req.body.status,
        remarks: req.body.remarks,
    });

    examResult.save()
        .then(() => {
            res.status(200).send({ message: "Donor exam results successfully created!" });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};

// List All Exam Results
exports.findAllExamResults = (req, res) => {
    ExamResult
        .find()
        .then(exams => {
            res.status(200).send(exams);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving donor exams result" });
        });
}

// List All Donor Exams
exports.findAllExamResultsForDonor = (req, res) => {
    ExamResult
        .find({
            "donor": { "$eq": req.params.donorId }
        })
        .then(exams => {
            res.status(200).send(exams);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving donor exams result" });
        });
}

//  =========================================== 
// =========== Blood Drives & Slots =========== 
//  ===========================================

// Create Blood Drive Campaign
exports.createCampaign = (req, res) => {
    // Check date
    if (!req.body.date) {
        return res.status(400).send({
            message: "Must specify campaing date"
        });
    }

    // Check Location
    if (!req.body.location) {
        return res.status(400).send({
            message: "Must specify location"
        });
    }

    // Check street
    if (!req.body.street) {
        return res.status(400).send({
            message: "Must specify street"
        });
    }

    // Check city
    if (!req.body.city) {
        return res.status(400).send({
            message: "Must specify city"
        });
    }

    // Check state
    if (!req.body.state) {
        return res.status(400).send({
            message: "Must specify state"
        });
    }

    // Check zipcode
    if (!req.body.zipCode) {
        return res.status(400).send({
            message: "Must specify zipcode"
        });
    }

    // Create Blood Drive Campaign
    const bloodDrive = new BloodDrive({
        healthProvider: req.userId,
        date: req.body.date,
        location: req.body.location,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        coordinates: {type: "Point",coordinates: req.body.coordinates}
    });

    bloodDrive.save()
        .then((data) => {
            res.status(200).send({ message: "Blood Drive Campaign successfully created!", id: data._id });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};

// List All Campaigns
exports.findAllCampaigns = (req, res) => {
    BloodDrive
        .find()
        .then(campaigns => {
            res.status(200).send(campaigns);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving campaigns" });
        });
}

// Get Campaign
exports.findCampaign= (req,res) =>{
    BloodDrive
    .findOne({_id: req.params.bloodDriveId})
    .then(campaign => {
        res.status(200).send(campaign);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Some error occurred while retrieving campaigns" });
    });
}

exports.updateCampaign=(req,res)=>{
    // Check date
    if (!req.body.date) {
        return res.status(400).send({
            message: "Must specify campaing date"
        });
    }

    // Check Location
    if (!req.body.location) {
        return res.status(400).send({
            message: "Must specify location"
        });
    }

    // Check street
    if (!req.body.street) {
        return res.status(400).send({
            message: "Must specify street"
        });
    }

    // Check city
    if (!req.body.city) {
        return res.status(400).send({
            message: "Must specify city"
        });
    }

    // Check state
    if (!req.body.state) {
        return res.status(400).send({
            message: "Must specify state"
        });
    }

    // Check zipcode
    if (!req.body.zipCode) {
        return res.status(400).send({
            message: "Must specify zipcode"
        });
    }

    BloodDrive.findByIdAndUpdate(req.params.bloodDriveId, {
        data: req.body.date,
        location: req.body.location,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        coordinates: {type: "Point",coordinates: req.body.coordinates}
    }, { new: true })
        .then(campaign => {
            if (!campaign) {
                return res.status(404).send({
                    message: "Blood Drive Campaign not found with id " + req.params.bloodDriveId
                });
            }

            return res.status(200).send(campaign);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Blood Drive Campaign not found with id " + req.params.bloodDriveId
                });
            }
            return res.status(500).send({
                message: "Error updating Blood Drive Campaign with id " + req.params.bloodDriveId
            });
        });
}

// Delete Campaign
exports.deleteCampaign = (req, res) => {
    BloodDrive.findById(req.params.bloodDriveId)
        .then(campaign => {
            if (!campaign) {
                return res.status(400).send({ message: "Blood Drive campaign not found with id " + req.params.bloodDriveId });
            }

    // Check ownership of campaign
    if (req.userId != campaign.healthProvider) {
        return res.status(403).send({ message: "You can only delete your own campaigns" })
    }

            // TODO: Check if campaign has slots already booked,
            // if booked, restrict deletion
            // Also delete all child slots implicitly

            BloodDrive.findByIdAndDelete(req.params.bloodDriveId)
                .then(() => {
                    return res.status(204).send({ message: "Blood Drive successfully deleted" });
                })
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })
};

// Create Blood Drive Campaign Slot
exports.createSlot = (req, res) => {
    // Check blood drive id
    if (!req.body.bloodDrive) {
        return res.status(400).send({
            message: "Slot must be associated to a blood drive campaign"
        });
    }

    // Check start time
    if (!req.body.startTime) {
        return res.status(400).send({
            message: "Must specify the start time"
        });
    }

    // Check end time
    if (!req.body.endTime) {
        return res.status(400).send({
            message: "Must specify the end time"
        });
    }

    // Check donation type
    if (!req.body.donationType) {
        return res.status(400).send({
            message: "Must specify the donation type"
        });
    }

    // Check Seats
    if (!req.body.seats) {
        return res.status(400).send({
            message: "Must specify seats"
        });
    }

    // Create Blood Drive Slot
    const slot = new BloodDriveSlot({
        bloodDrive: req.body.bloodDrive,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        donationType: req.body.donationType,
        seats: req.body.seats,
    });

    slot.save()
        .then((slot) => {
            res.status(200).send({ message: "Campagn Slot successfully created!"});
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};

// Update Blood Drive Campaign Slot
exports.updateSlot = (req, res) => {
    // Check blood drive id
    if (!req.body.bloodDrive) {
        return res.status(400).send({
            message: "Slot must be associated to a blood drive campaign"
        });
    }

    // Check start time
    if (!req.body.startTime) {
        return res.status(400).send({
            message: "Must specify the start time"
        });
    }

    // Check end time
    if (!req.body.endTime) {
        return res.status(400).send({
            message: "Must specify the end time"
        });
    }

    // Check donation type
    if (!req.body.donationType) {
        return res.status(400).send({
            message: "Must specify the donation type"
        });
    }

    // Check Seats
    if (!req.body.seats) {
        return res.status(400).send({
            message: "Must specify seats"
        });
    }

    BloodDriveSlot.findByIdAndUpdate(req.params.slotId, {
        bloodDrive: req.body.bloodDrive,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        donationType: req.body.donationType,
        seats: req.body.seats,
    }, { new: true })
        .then(slot => {
            if (!slot) {
                return res.status(404).send({
                    message: "Blood Drive Campaign Slot not found with id " + req.params.slotId
                });
            }

            return res.status(200).send(campaign);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Blood Drive Campaign Slot not found with id " + req.params.slotId
                });
            }
            return res.status(500).send({
                message: "Error updating Blood Drive Campaign Slot with id " + req.params.slotId,
                err: err
            });
        });
};

// Delete Campaign Slot
exports.deleteSlot = (req, res) => {
    BloodDriveSlot.findById(req.params.slotId)
        .populate({ path: 'bloodDrive', select: 'healthProvider' })
        .then(slot => {
            if (!slot) {
                return res.status(400).send({ message: "Blood Drive campaign Slot not found with id " + req.params.slotId });
            }

            // Check ownership of campaign
            if (req.userId != slot.bloodDrive.healthProvider) {
                return res.status(403).send({ message: "You can only delete your own campaign slots" })
            }

            // TODO: Check if campaign has slots already booked,
            // if booked, restrict deletion
            // Also delete all child slots implicitly

            BloodDriveSlot.findByIdAndDelete(req.params.slotId)
                .then(() => {
                    return res.status(204).send({ message: "Blood Drive Slot successfully deleted" });
                })
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })
};

// List all slots for campaign
exports.findAllSlotsForCampaign=(req,res)=>{
    BloodDriveSlot
        .find({bloodDrive: req.params.bloodDriveId})
        .then(slots => {
            res.status(200).send(slots);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving campaigns slots" });
        });
}

// Make Appointment
exports.makeAppointment = (req, res) => {
    // Check donor id
    if (!req.body.donor) {
        return res.status(400).send({
            message: "Donor ID must be specified"
        });
    }

    // Check Blood Drive Slot Id
    if (!req.body.slot) {
        return res.status(400).send({
            message: "A slot within a campaign must be specified"
        });
    }

    BloodDriveSlot
        .findById(req.body.slot)
        .then(slot => {
            if (!slot) {
                return res.status(404).send({ message: "Campaign slot with id " + req.body.slot + " does not exist!" });
            }

            // Check if fully booked
            if (slot.seats == slot.booked) {
                return res.status(400).send({ message: "Campaign slot fully booked" });
            }

            // Reserve seat in slot
            BloodDriveSlot.findByIdAndUpdate(req.body.slot,
                {
                    booked: slot.booked + 1
                })
                .then((slot) => {
                    // Make Appointment
                    const appointment = new Appointment({
                        donor: req.body.donor,
                        slot: slot._id
                    });

                    appointment.save()
                        .then(() => {
                            res.status(200).send({ message: "Blood donation appointment has been made successfully!" });
                        });
                })
                .catch(err => {
                    res.status(500).send({ message: err });
                });
        });
}

