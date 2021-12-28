const { MongoClient } = require('mongodb')
const { mongoDBUri, MONGO_DB_NAME } = require('../common/config')
const {createDBIndexes, setupAdminAccount} = require('../utils/db')

/*
* @return Promise<mongoClient>
* */
const init = async () => {
    const client = new MongoClient(mongoDBUri)
    await client.connect()
    console.log("mongo connected ***")
    // create indexes:
    const db = client.db(MONGO_DB_NAME)
    await createDBIndexes(db)
    console.log("mongo indexes created ***")

    await setupAdminAccount(db)
    console.log("admin account ready ***")

    return client
}

module.exports = {init}
