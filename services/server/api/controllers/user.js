const {admin} = require('../../../lib/loaders')
const {MONGO_DB_NAME} = require('../../../lib/common/config')
const User = require('../../../lib/models/user')

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

module.exports = {signUp}
