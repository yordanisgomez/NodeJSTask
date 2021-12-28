const express = require('express')
const {authorizeRequest} = require('../middleware/apiAuthorization')
const userController = require('../controllers/user')

const Router = express.Router()

Router.route('/signup')
    .get(authorizeRequest, userController.signUp)

module.exports = Router