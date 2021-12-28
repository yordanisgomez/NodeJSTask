const libLoader = require('../../lib/loaders')
const passportLoader = require('./passport')
const appLoader = require('./app')
const {DEBUG_COLORS} = require('../../lib/common/constants')

/*
* Init all services and return the socket.io server instance
* @return Promise<io> socket.io Server
* @param httpServer global http server instance
* @param app Express app instance
* */
const init = async () => {
    await libLoader.init()
    const {admin} = libLoader
    process.on('unhandledRejection', error => {
        console.log(DEBUG_COLORS.RED, "unhandledRejection " + error.message)
    })
    const passport = passportLoader.init(admin.dbClient)
    appLoader.init(passport)
}

module.exports = {init}
