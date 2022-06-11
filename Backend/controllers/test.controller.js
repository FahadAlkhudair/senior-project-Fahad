// Public
exports.all = (req, res) => {
    res.status(200).send('Public Content');
};

// Administrators
exports.admin = (req, res) => {
    res.status(200).send("Administrator Content");
};

// Health Providers
exports.healthProvder = (req, res) => {
    res.status(200).send("Health Providers Content");
};

// Donors
exports.donor = (req, res) => {
    res.status(200).send("Donors Content");
};

// Users
exports.donor = (req, res) => {
    res.status(200).send("Users Content");
};

