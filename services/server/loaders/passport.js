const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../../lib/common/config')
const User = require('../../lib/models/user')
const passport = require('passport')

const init = (dbClient) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.JWT_SECRET
    }
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findOne(dbClient, config.MONGO_DB_NAME, {_id: jwt_payload._id})
        if (user && user.signedUp) {
            done(null, user)
        } else {
            done(null, false)
        }
    }))

    return passport
}
module.exports = {init}