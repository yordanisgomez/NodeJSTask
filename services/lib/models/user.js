const {COLLECTIONS} = require('../common/constants')
const bcrypt = require('bcrypt')

const findOne = async (dbClient, dbName, filter) => {
    const collection = _collection(dbClient, dbName)
    return collection.findOne(filter)
}

const save = async (dbClient, dbName, data) => {
    const collection = _collection(dbClient, dbName)
    return collection.updateOne({_id: data.email}, {$set: data}, {upsert: true})
}

const signUp = async (dbClient, dbName, email, password) => {
    const collection = _collection(dbClient, dbName)
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    const data = {
        password: hash,
        signedUp: true
    }
    return collection.updateOne({_id: email}, {$set: data})
}

const _collection = (dbClient, dbName) => {
    const db = dbClient.db(dbName)
    return db.collection(COLLECTIONS.USER)
}

module.exports = {findOne, save, signUp}
