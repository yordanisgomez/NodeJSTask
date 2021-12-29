const {admin} = require('../../../lib/loaders')
const {USER_ROLE} = require('../../../lib/common/constants')
const {MONGO_DB_NAME} = require('../../../lib/common/config')
const User = require('../../../lib/models/user')

const createUser = async (req, res) => {
    if (!req.body.email || !req.body.firstName || !req.body.lastName) {
        res.json({success: false, msg: 'Please pass email, firstName and lastName.'});
    } else {
        const newUserData = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: USER_ROLE.USER,
            signedUp: false
        }
        // save the user
        try {
            await User.save(admin.dbClient, MONGO_DB_NAME,  newUserData)
            res.json({success: true, msg: 'Successful created new user.'});
        } catch (err) {
            return res.json({success: false, msg: 'Username already exists.'});
        }
    }
}

const deleteUser = async (req, res) => {
    if (!req.params.email) {
        res.json({success: false, msg: 'Please pass email.'});
    } else {
        // delete the user
        try {
            await User.deleteOne(admin.dbClient, MONGO_DB_NAME, req.params.email)
            res.json({success: true, msg: 'Successful deleted the user.'});
        } catch (err) {
            return res.json({success: false, msg: 'Unable to delete the user.'});
        }
    }
}

module.exports = {createUser, deleteUser}
