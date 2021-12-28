const express = require('express')
const {authorizeRequest, authorizeAdmin} = require('../middleware/apiAuthorization')
const userController = require('../controllers/user')
const adminController = require('../controllers/admin')

const Router = express.Router()

/*
* admin routes
* */

Router.route('/createUser')
    .get(authorizeRequest, passport.authenticate('jwt', { session: false}), authorizeAdmin, adminController.createUser)

/*
* user routes
* */
Router.route('/signup')
    .get(userController.signUp)


module.exports = Router
