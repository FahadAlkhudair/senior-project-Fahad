const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../models');
const User = db.user;
const ROLES = db.ROLES;

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Unauthorized. Token Expired!' });
    } else {
        return res.status(401).json({ error: 'Unauthorized!' });
    }
}

// Verify validity of token
verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ error: "please provide a token" });
    }

    jwt.verify(token.split(" ")[1], config.jwt.Secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }

        req.userId = decoded.id;
        next();
    });
};

// Check if user is an administrator
isAdministrator = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            if (user.role === db.ROLES[0]) {
                next();
                return;
            } else {
                res.status(403).send({ message: 'Only Administrators allowed' });
                return;
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

// Check if user is a health provider
isHealthProvider = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            if (user.role === db.ROLES[1]) {
                next();
                return;
            } else {
                res.status(403).send({ message: 'Only Health Providers allowed' });
                return;
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

// Check if user is a donor
isDonor = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            if (user.role === db.ROLES[2]) {
                next();
                return;
            } else {
                res.status(403).send({ message: 'Only Donors allowed' });
                return;
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

// Check if user is an authenticated user; implies staff
isUser = (req, res, next) => {
    User.findById(req.userId)
        .then((user) => {
            if (user.role === db.ROLES[3]) {
                next();
                return;
            } else {
                res.status(403).send({ message: 'Only Authorized Users allowed' });
                return;
            }
        })
        .catch((err) => {
            res.status(500).send({ message: err });
            return;
        });
};

const auth = {
    verifyToken,
    isAdministrator,
    isHealthProvider,
    isDonor,
    isUser
};

module.exports = auth;