const {COLLECTIONS} = require('../common/constants')

const createDBIndexes = async (db) => {
    const userIndexes = [
        {key: {email: 1}},
    ]
    await db.collection(COLLECTIONS.USER).createIndexes(userIndexes)

    const conversationIndexes = [
        {key: {"author._id": 1}},
    ]
    await db.collection(COLLECTIONS.BOOK).createIndexes(conversationIndexes)
}

module.exports = {createDBIndexes}