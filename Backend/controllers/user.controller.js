const db = require('../models');
const Profile = db.profile;

// Get Profile
exports.getProfile = (req, res,) => { 
    Profile.findOne({ user: req.userId })
        .then(profile=>{
            return res.status(200).send(profile);
        })
        .catch(err => {
            return res.status(500).send({ message: err });
        });
};

// Update Profile 
exports.updateProfile = (req, res) => {    
    if(!req.body.name){
        return res.status(404).send({message: "Name is required"});
    }

    Profile.findOne({user: req.userId})
    .then(profile=>{
        if(!profile){
            profile = Profile({});
        }

        profile.user = req.userId;
        profile.name = req.body.name;
        profile.contacts = req.body.contacts;
        profile.addresses = req.body.addresses;

        profile.save()
        .then(()=>{
            return res.status(200).send(profile);
        })
        .catch(err=>{
            return res.status(500).send({message: 'An error occured while saving profile!'});
        });
    })
    .catch(err=>{
        return res.status(500).send({message: err});
    });
};