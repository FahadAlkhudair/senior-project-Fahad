const ROLES = ['Administrator','Health Provider', 'Donor','Medical Practitioner']
module.exports = {
    backend_url: "http://localhost:8080/",
    roles:ROLES,
    selfServiceRoles: [ROLES[1], ROLES[2], ROLES[3]]
}