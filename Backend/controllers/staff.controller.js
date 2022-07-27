const db = require('../models');
const { PROFESSION_TYPES, ROLES , profile: Profile } = db;

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

    Profile.findByIdAndUpdate(req.body.staff, {
        institution: req.userId,
        profession: req.body.profession
    })
        .then(() => {
            res.status(200).send({ message: "User successfully added to staff roll!" });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
};

// Get All Staff
exports.getAllStaff = (req, res,) => {
    Profile.find({ institution: req.userId },{
        coordinates:0, address:0, contact:0, dob:0, ssn:0, user:0
    })
        .then(staff => {
            return res.status(200).send(staff);
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        });
};

// Delete 
exports.deleteStaff = (req, res) => {
    Profile.findByIdAndUpdate(req.params.staffId,{
        $unset: {institution: 1}
    })
        .then((staff) => {
            return res.status(204).send({ message: "Staff successfully removed from institution" });
        })
        .catch(err => {
            res.status(500).send({ message: err });
        })
};