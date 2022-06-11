const db = require('../models');
const { user: User, refreshToken: RefreshToken, ROLES: ROLES } = db;

// Signup
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, config.jwt.rounds, (error, hash) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        else {
            const newUser = User({
                email: req.body.email,
                password: hash,
                role: req.body.role
            });

            newUser.save()
                .then((user) => {
                    res.status(200).send({message: "You've Successfully Signed Up!"});
                })
                .catch(err => {
                    res.status(500).send({ message: err });
                });
        }
    });
};

exports.signin = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                res.status(404).json({ error: `User '${req.body.email}' not found` });
                return;
            } else {
                bcrypt.compare(req.body.password, user.password, (error, match) => {
                    if (error) {
                        res.status(500).send({ message: error });
                        return;
                    } else if (match) {
                        RefreshToken.createToken(user)
                            .then((refreshToken) => {
                                let token = generateToken(user._id);

                                res.status(200).json({
                                    token: token,
                                    refreshToken: refreshToken,
                                    role: user.role
                                });
                            })
                            .catch(err => {
                                return res.status(500).send({ message: err });
                            });
                    } else {
                        res.status(403).send({ error: 'Passwords do not match' });
                        return;
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
}

exports.refreshToken = (req, res, next) => {
    const { refreshToken: token } = req.body;
    
    if (!token) {
        return res.status(404).send({ message: 'Refresht token is required!' });
    }

    try {
        RefreshToken.findOne({ token: token })
            .then((refreshToken) => {
                if (!refreshToken) {
                    return res.status(401).send({ message: 'Invalid refresh token' });
                }

                // Check if expired
                if (RefreshToken.verifyExpiration(refreshToken)) {
                    RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false });

                    return res.status(403).send({ message: 'Refresh Token Expired!' });
                }
                
                // Generate new access token
                const newToken = generateToken(refreshToken.user._id);

                return res.status(200).send({
                    token: newToken,
                    refreshToken: refreshToken.token
                });
            })
            .catch(err => {
                res.status(500).send({ message: err });
            });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

