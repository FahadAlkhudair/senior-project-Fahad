const ROLES = ['Administrator','Health Provider', 'Donor','User']
module.exports = {
    backend_url: "http://localhost:8080/",
    roles:ROLES,
    selfServiceRoles: [ROLES[1], ROLES[2]]
}