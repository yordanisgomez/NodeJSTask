const {COLLECTIONS} = require('../common/constants')

const findOne = async (dbClient, dbName, filter) => {
    const collection = _collection(dbClient, dbName)
    return collection.findOne(filter)
}

const save = async (dbClient, dbName, data) => {
    const collection = _collection(dbClient, dbName)
    return collection.insertOne(data)
}

const _collection = (dbClient, dbName) => {
    const db = dbClient.db(dbName)
    return db.collection(COLLECTIONS.USER)
}

module.exports = {findOne, save}