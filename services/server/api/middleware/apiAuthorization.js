const User = require('../../../lib/models/user')
const {admin} = require('../../../lib/loaders')
const {MONGO_DB_NAME} = require('../../../lib/common/config')
const {USER_ROLE} = require('../../../lib/common/constants')

const authorizeRequest = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]
        if(token) {
            next()
        } else {
            res.status(401).json('UNAUTHORIZED: The token is missing.')
        }

    } else {
        res.status(401).json('UNAUTHORIZED: Authorization header is missing.')
    }
}

/*
* @pre passport middleware authenticated first
*/
const authorizeAdmin = async (req, res, next) => {
    const {user} = req
    const {_id} = user
    // check user role
    const dbUser = await User.findOne(admin.dbClient, MONGO_DB_NAME, {_id: _id})
    if(dbUser && dbUser.role == USER_ROLE.ADMIN) {
        next()
    } else {
        res.status(401).json('UNAUTHORIZED: You are not an admin.')
    }
}

module.exports = {authorizeRequest, authorizeAdmin}
