const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../../lib/common/config')
const User = require('../../lib/models/user')
const passport = require('passport')

const init = (dbClient) => {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromHeader()
    opts.secretOrKey = config.JWT_SECRET
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findOne(dbClient, config.MONGO_DB_NAME, {id: jwt_payload.id})
        if (user) {
            done(null, user)
        } else {
            done(null, false)
        }
    }))

    return passport
}
module.exports = {init}