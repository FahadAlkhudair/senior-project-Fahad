const bcrypt = require('bcrypt');
const config = require('./config');
const db = require('./models');
const User = db.user;
const Profile = db.profile;

const users = [
    {
        email: "falkhudair@stetson.edu",
        password: "admin",
        role: "Administrator",
        profile: {
            name: "System Administrator",
            ssn: "NONE",
            contact:  {
                phoneNumber: "+11229992992",
                email: "falkhudair@stetson.edu"
            },
            address: {
                street: "",
                state: "Florida",
                city: "Deland",
                zipcode: 0
            }
        }
    }
];

exports.seedDb = async () => {
    // Seed Users
    if (User.estimatedDocumentCount(function (err, count) {
        if (!err && count === 0) {
            for (let index = 0; index < users.length; index++) {
                const user = users[index];
                bcrypt.hash(user.password, config.jwt.rounds, (error, hash) => {
                    if (error) {
                        console.log("Error occured while seeding users");
                    }
                    else {
                        const newUser = User({ email: user.email, password: hash, role: user.role})
                        newUser
                        .save()
                        .then((res)=>{
                            const profile = Profile({ user: res._id , name: user.profile.name, ssn: user.profile.ssn, contacts:user.profile.contacts, addresses: user.profile.addresses });
                            profile
                            .save(); // Fire and Forget :)
                        }); 
                    }
                })
            }
        }
    }));
}
