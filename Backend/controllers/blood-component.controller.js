const db = require('../models');
const { DONATION_TYPES, donation: Donation } = db;

//  =========================================== 
// =========== Blood Donations Types =========== 
//  ===========================================

// Create Blood Donation Type
exports.createDonationType = (req, res) => {
    // Check if Kind is provided
    if (!req.body.kind || DONATION_TYPES.indexOf(req.body.kind) == -1) {
        return res.status(400).send({
            message: "Donation kind must be provided"
        });
    }

    // Check if frequency is provided
    if (!req.body.frequency) {
        return res.status(400).send({
            message: "Frequency must be specified"
        });
    }

    // Check if expiresAfter is provided
    if (!req.body.expiresAfter) {
        return res.status(400).send({
            message: "Number of days after which the donation type expires must be provided."
        });
    }

    // Check if description provided
    if (!req.body.description) {
        return res.status(400).send({
            message: "A description of the donation type must be provided"
        });
    }

    // Create Donation
    const donation = new Donation({
        kind: req.body.kind,
        frequency: req.body.frequency,
        expiresAfter: req.body.expiresAfter,
        description: req.body.description
    });

    donation.save()
        .then(() => {
            res.status(200).send({ message: "Blood Donation Type successfully created!" });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};

// Delete Blood Donation Type
exports.deleteDonationType = (req, res) => {
    Donation.findByIdAndDelete(req.params.donationTypeId)
        .then((donation) => {
            return res.status(204).send({ message: "Blood Donation Type successfully deleted" });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })
};

// List Blood Donation Types
exports.findAllDonationTypes = (req, res) => {
    Donation
        .find()
        .then(donations => {
            res.status(200).send(donations);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving blood donation types" });
        });
}

// Update Blood Donation Type
exports.updateDonationType = (req, res) => {
    // Check if Kind is provided
    if (!req.body.kind && DONATION_TYPES.indexOf(req.body.kind) != -1) {
        return res.status(400).send({
            message: "Donation kind must be provided"
        });
    }

    // Check if frequency is provided
    if (!req.body.frequency) {
        return res.status(400).send({
            message: "Frequency must be specified"
        });
    }

    // Check if expiresAfter is provided
    if (!req.body.expiresAfter) {
        return res.status(400).send({
            message: "Number of days after which the donation type expires must be provided."
        });
    }

    // Check if description provided
    if (!req.body.description) {
        return res.status(400).send({
            message: "A description of the donation type must be provided"
        });
    }

    Donation.findByIdAndUpdate(req.params.donationTypeId, {
        kind: req.body.kind,
        frequency: req.body.frequency,
        expiresAfter: req.body.expiresAfter,
        description: req.body.description
    }, { new: true })
        .then(donation => {
            if (!donation) {
                return res.status(404).send({
                    message: "Blood Donation Type not found with id " + req.params.donationTypeId
                });
            }

            return res.status(200).send(donation);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Blood Donation Type not found with id " + req.params.donationTypeId
                });
            }
            return res.status(500).send({
                message: "Error updating Blood Donation Type with id " + req.params.donationTypeId
            });
        });
};


