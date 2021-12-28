require('dotenv').config()

module.exports = {
    mongoDBUri: process.env.MONGODB_CONNECTION,
    port: process.env.PORT || 3000,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
}
