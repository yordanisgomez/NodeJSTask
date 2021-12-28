const dbLoader = require('./db')

const admin = {}
const init = async () => {
    const dbClient = await dbLoader.init()
    return dbClient
}

module.exports = {init, admin}