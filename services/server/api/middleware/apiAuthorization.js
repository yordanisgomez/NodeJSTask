const passport = require('passport')

const authorizeRequest = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]
        if(token) {
            // using the passport auth middleware
            next()
        } else {
            res.status(401).json('UNAUTHORIZED: The token is missing.')
        }

    } else {
        res.status(401).json('UNAUTHORIZED: Authorization header is missing.')
    }
}

/*
* @pre passport middleware
*/
const authorizeAdmin = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader.split(' ')[1]

    const {user} = req
    console.log(user)
    // todo check user role here
    next()
}

module.exports = {authorizeRequest, authorizeAdmin}
