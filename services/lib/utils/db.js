const {COLLECTIONS, USER_ROLE} = require('../common/constants')
const {ADMIN_PASSWORD, ADMIN_EMAIL} = require('../common/config')
const bcrypt = require('bcrypt')

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

const setupAdminAccount = async (db) => {
    const collection = db.collection(COLLECTIONS.USER)
    const admin = await collection.findOne({_id: ADMIN_EMAIL})
    if(!admin) {
        const saltRounds = 10
        const hash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds)
        await collection.insertOne({
            _id: ADMIN_EMAIL,
            email: ADMIN_EMAIL,
            password: hash,
            role: USER_ROLE.ADMIN,
            signedUp: true
        })
    }
}

module.exports = {createDBIndexes, setupAdminAccount}
