const db = require('../models');
const { PROFESSION_TYPES, ROLES , staff: Staff, profile: Profile } = db;

// Check staff
exports.findStaff = (req, res,) => {
    Profile.findOne({ ssn: req.params.ssn })
        .populate('user')
        .then((profile) => {
            if (profile && profile.user.role == ROLES[3]) {
                return res.status(200).send({ user: profile._id, found: true});
            } else {
                return res.status(200).send({found: false});
            }
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        });
};

// Add staff to roll
exports.addStaff = (req, res) => {
    // Check if Kind is provided
    if (!req.body.profession || PROFESSION_TYPES.indexOf(req.body.profession) == -1) {
        return res.status(400).send({
            message: "Valid profession must be provided"
        });
    }

    // Check if frequency is provided
    if (!req.body.staff) {
        return res.status(400).send({
            message: "Must specify a user"
        });
    }

    // Create Staff
    const staff = new Staff({
        profession: req.body.profession,
        staff: req.body.staff,
        institution: req.userId
    });

    staff.save()
        .then(() => {
            res.status(200).send({ message: "User successfully added to staff roll!" });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};

// Get All Staff
exports.getAllStaff = (req, res,) => {
    Staff.find({ institution: req.userId })
        .populate({path: 'staff', select: 'name'})
        .then(staff => {
            return res.status(200).send(staff);
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        });
};

// Delete 
exports.deleteStaff = (req, res) => {
    Staff.findByIdAndDelete(req.params.staffId)
        .then((staff) => {
            return res.status(204).send({ message: "Staff successfully removed from role" });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })
};