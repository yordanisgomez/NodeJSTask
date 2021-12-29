const {COLLECTIONS} = require('../common/constants')
const ObjectID = require('mongodb').ObjectId

const findOne = async (dbClient, dbName, filter) => {
    const collection = _collection(dbClient, dbName)
    return collection.findOne(filter)
}

const insertOne = async (dbClient, dbName, data) => {
    const collection = _collection(dbClient, dbName)
    return collection.insertOne(data)
}

const updateOne = async (dbClient, dbName, id, data) => {
    const collection = _collection(dbClient, dbName)
    return collection.updateOne({_id: new ObjectID(id)}, {$set: data})
}

const deleteOne = async (dbClient, dbName, id) => {
    const collection = _collection(dbClient, dbName)
    return collection.deleteOne({_id: new ObjectID(id)})
}

/*
* @return Array books
* */
const list = async (dbClient, dbName, page, limit, filter) => {
    const collection = _collection(dbClient, dbName)
    const cursor = collection.find(filter)
    const skip = page*limit
    cursor.skip(skip).limit(limit)
    return cursor.toArray()
}

/*
* @return Array books
* */
const listByAuthors = async (dbClient, dbName, page, limit) => {
    const collection = _collection(dbClient, dbName)
    const skip = page*limit
    const aggregator = collection.aggregate([
        {
            $group: {
                _id: "$author._id",
                author: {$first: "$author"},
                books: {
                    $push: {
                        title: "$title",
                        isbn: "$isbn",
                        editorial: "$editorial",
                        year: "$year"
                    }
                }
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        },
    ])
    return aggregator.toArray()
}

const _collection = (dbClient, dbName) => {
    const db = dbClient.db(dbName)
    return db.collection(COLLECTIONS.BOOK)
}

module.exports = {findOne, insertOne, updateOne, deleteOne, list, listByAuthors}
