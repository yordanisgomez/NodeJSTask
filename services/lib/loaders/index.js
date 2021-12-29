const dbLoader = require('./db')

const admin = {}
const init = async () => {
    const dbClient = await dbLoader.init()
    admin.dbClient = dbClient
    return dbClient
}

module.exports = {init, admin}