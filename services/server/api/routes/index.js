const express = require('express')
const {authorizeRequest, authorizeAdmin} = require('../middleware/apiAuthorization')
const userController = require('../controllers/user')
const adminController = require('../controllers/admin')
const passport = require('passport')
const bodyParser = require('body-parser')

const Router = express.Router()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({extended: false})// create application/json parser
const jsonParser = bodyParser.json()

/*
* admin routes
* */
Router.route('/createUser')
    .post(authorizeRequest, passport.authenticate('jwt', { session: false}),
        authorizeAdmin, jsonParser, adminController.createUser)

Router.route('/deleteUser/:email')
    .delete(authorizeRequest, passport.authenticate('jwt', { session: false}),
        authorizeAdmin, adminController.deleteUser)

Router.route('/updateUser')
    .patch(authorizeRequest, passport.authenticate('jwt', { session: false}),
        authorizeAdmin, jsonParser, adminController.updateUser)

Router.route('/listUsers')
    .get(authorizeRequest, passport.authenticate('jwt', { session: false}),
        authorizeAdmin, jsonParser, adminController.listUsers)

/*
* user routes
* */
Router.route('/auth/signup')
    .post(jsonParser, userController.signUp)

Router.route('/auth/signin')
    .post(jsonParser, userController.login)

Router.route('/addBook')
    .post(authorizeRequest, passport.authenticate('jwt', { session: false}),
        jsonParser, userController.addBook)

Router.route('/deleteBook/:bookId')
    .delete(authorizeRequest, passport.authenticate('jwt', { session: false}),
        userController.deleteBook)

Router.route('/updateBook')
    .patch(authorizeRequest, passport.authenticate('jwt', { session: false}),
        jsonParser, userController.updateBook)

Router.route('/listMyBooks')
    .get(authorizeRequest, passport.authenticate('jwt', { session: false}),
        jsonParser, userController.listMyBooks)

Router.route('/listBooksByAuthors')
    .get(authorizeRequest, passport.authenticate('jwt', { session: false}),
        jsonParser, userController.listBooksByAuthors)

module.exports = Router
