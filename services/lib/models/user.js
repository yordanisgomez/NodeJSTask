const {COLLECTIONS, USER_ROLE} = require('../common/constants')
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

const deleteOne = async (dbClient, dbName, email) => {
    const collection = _collection(dbClient, dbName)
    return collection.deleteOne({_id: email})
}

const updateOne = async (dbClient, dbName, email, data) => {
    const collection = _collection(dbClient, dbName)
    return collection.updateOne({_id: email}, {$set: data})
}

/*
* @return Array users with author roles (noes not include admins)
* */
const list = async (dbClient, dbName, page, limit) => {
    const collection = _collection(dbClient, dbName)
    const cursor = collection.find({role: USER_ROLE.USER})
    const skip = page*limit
    cursor.skip(skip).limit(limit)
    return cursor.toArray()
}

const _collection = (dbClient, dbName) => {
    const db = dbClient.db(dbName)
    return db.collection(COLLECTIONS.USER)
}

module.exports = {findOne, save, signUp, deleteOne, updateOne, list}
