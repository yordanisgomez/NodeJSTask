const {admin} = require('../../../lib/loaders')
const {MONGO_DB_NAME, JWT_SECRET} = require('../../../lib/common/config')
const User = require('../../../lib/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        // update the user
        try {
            await User.signUp(admin.dbClient, MONGO_DB_NAME, req.body.email, req.body.password)
            res.json({success: true, msg: 'Successful sign-up new user.'});
        } catch (err) {
            return res.json({success: false, msg: 'The user is not registered, contact the administrator.'});
        }
    }
}

const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        try {
            console.log(req.body.email, " - ", req.body.password)
            const user = await User.findOne(admin.dbClient, MONGO_DB_NAME, {_id: req.body.email})
            if(user) {
                // check if password matches
                const isMatch = await bcrypt.compare(req.body.password, user.password)
                if(isMatch) {
                    // if user is found and password is right create a token
                    const token = jwt.sign(user, JWT_SECRET);
                    console.log("token: ", token)
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
                }
            } else {
                res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
            }
        } catch (err) {
            console.log(err)
            //return res.json({success: false, msg: 'The user is not registered, contact the administrator.'});
            res.status(500).send({success: false, msg: 'Internal error.'})
        }
    }
}

module.exports = {signUp, login}
