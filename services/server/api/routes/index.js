const express = require('express')
const {authorizeRequest, authorizeAdmin} = require('../middleware/apiAuthorization')
const userController = require('../controllers/user')
const adminController = require('../controllers/admin')
const passport = require('passport')
const bodyParser = require('body-parser')

const Router = express.Router()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false})

/*
* admin routes
* */
Router.route('/createUser')
    .post(authorizeRequest, passport.authenticate('jwt', { session: false}),
        authorizeAdmin, urlencodedParser, adminController.createUser)

Router.route('/deleteUser/:email')
    .delete(authorizeRequest, passport.authenticate('jwt', { session: false}),
        authorizeAdmin, adminController.deleteUser)

Router.route('/updateUser')
    .patch(authorizeRequest, passport.authenticate('jwt', { session: false}),
        authorizeAdmin, urlencodedParser, adminController.createUser)

/*
* user routes
* */
Router.route('/signup')
    .post(urlencodedParser, userController.signUp)

Router.route('/login')
    .post(urlencodedParser, userController.login)


module.exports = Router
