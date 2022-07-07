const db = require('../models');
const { DONATION_TYPES, donation: Donation } = db;

// =========== Blood Donations Types =========== 


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