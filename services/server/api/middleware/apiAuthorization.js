const authorizeRequest = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]

        // using the external auth service
        userService.getMyProfileData(token).then(userData => {
            res.locals.user = userData
            res.locals.token = token
            next()
        }).catch(e => {
            res.status(401).json('UNAUTHORIZED: Invalid token.')
        })
    } else {
        res.status(401).json('UNAUTHORIZED: Authorization header is missing.')
    }
}

module.exports = {authorizeRequest}