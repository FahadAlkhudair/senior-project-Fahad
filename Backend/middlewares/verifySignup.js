const db = require('../models');
const User = db.user;
const ROLES = db.ROLES;

// Check for duplicate emails
checkDuplicate = (req, res, next) => {
    // Email
    User.findOne(
        {
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                res.status(400).send({ message: "Email already in use!" });
                return;
            }

            next();
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

// Check if provided roles exist
checkRole = (req, res, next)=>{
    if(req.body.role){
        if(!ROLES.includes(req.body.role)){
            res.status(400).send({ message: `Role '${ req.body.role }' is not valid!` });
            return;
        }
    }

    next();
};

const verifySignup = {
    checkDuplicate,
    checkRole
};

module.exports = verifySignup;