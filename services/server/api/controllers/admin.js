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

const updateUser = async (req, res) => {
    if (!req.body.email) {
        res.json({success: false, msg: 'Please pass email.'});
    } else {
        try {
            const data = {}
            if(req.body.firstName) {
                data.firstName = req.body.firstName
            }
            if(req.body.lastName) {
                data.lastName = req.body.lastName
            }
            if(Object.keys(data).length > 0) {
                const {modifiedCount} = await User.updateOne(admin.dbClient, MONGO_DB_NAME, req.body.email, data)
                if(modifiedCount == 1) {
                    res.json({success: true, msg: 'Successful updated the user.'});
                } else {
                    return res.json({success: false, msg: 'Unable to update the user, user not found.'});
                }
            } else {
                return res.json({success: false, msg: 'Unable to update the user, data to update is missing (firstName, lastName or both).'});
            }
        } catch (err) {
            return res.json({success: false, msg: 'Unable to update the user.'});
        }
    }
}

/*
* @param req.body.page int 0 based page, optional, default 0
* @param req.body.limit int the amount of users per page, optional, default 30
* */
const listUsers = async (req, res) => {
    const page = req.body.page ? parseInt(req.body.page) : 0
    const limit = req.body.limit ? parseInt(req.body.limit) : 30

    try {
        const users = await User.list(admin.dbClient, MONGO_DB_NAME, page, limit)
        res.json({success: true, msg: 'Successful listing users.', data: users});
    } catch (err) {
        return res.json({success: false, msg: 'Unable to list users.'});
    }
}

module.exports = {createUser, deleteUser, updateUser, listUsers}
