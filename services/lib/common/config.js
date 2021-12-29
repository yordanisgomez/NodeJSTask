require('dotenv').config()

module.exports = {
    mongoDBUri: process.env.MONGODB_CONNECTION,
    port: process.env.PORT || 8000,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_PASSWORD: "adminSecretPassw",
    ADMIN_EMAIL: "admin@email.com"
}
