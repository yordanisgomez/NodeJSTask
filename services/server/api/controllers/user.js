const {admin} = require('../../../lib/loaders')
const User = require('../../../lib/models/user')

const signUp = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        const newUserData = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        // save the user
        try {
            await User.save(newUserData)
            res.json({success: true, msg: 'Successful created new user.'});
        } catch (err) {
            return res.json({success: false, msg: 'Username already exists.'});
        }
    }
}

module.exports = {signUp}