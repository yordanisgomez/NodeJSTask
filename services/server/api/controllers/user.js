const {admin} = require('../../../lib/loaders')
const {MONGO_DB_NAME, JWT_SECRET} = require('../../../lib/common/config')
const User = require('../../../lib/models/user')
const Book = require('../../../lib/models/book')
const Library = require('../../../lib/services/library')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('../utils/validators')

const signUp = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        // update the user
        try {
            await User.signUp(admin.dbClient, MONGO_DB_NAME, req.body.email, req.body.password)
            res.json({success: true, msg: 'Successful sign-up new user.'});
        } catch (err) {
            return res.json({success: false, msg: 'The user is not registered, contact the administrator.'});
        }
    }
}

const login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        try {
            console.log(req.body.email, " - ", req.body.password)
            const user = await User.findOne(admin.dbClient, MONGO_DB_NAME, {_id: req.body.email})
            if(user) {
                // check if the user is signed up:
                if(user.signedUp) {
                    // check if password matches
                    const isMatch = await bcrypt.compare(req.body.password, user.password)
                    if(isMatch) {
                        // if user is found and password is right create a token
                        const token = jwt.sign(user, JWT_SECRET);
                        console.log("token: ", token)
                        // return the information including token as JSON
                        delete user.password
                        res.json({success: true, accessToken: 'JWT ' + token, ...user});
                    } else {
                        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'})
                    }
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. You need to sign up first.'})
                }
            } else {
                res.status(401).send({success: false, msg: 'Authentication failed. User not found.'})
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({success: false, msg: 'Internal error.'})
        }
    }
}

/*
* @param req.body.title string
* @param req.body.isbn string
* @param req.body.editorial string
* @param req.body.year int
* */
const addBook = async (req, res) => {
    const {user} = req
    if(validator.validateAddBookParams(req)) {
        const {title, isbn, editorial, year} = req.body
        const author = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        }
        try {
            await Book.insertOne(admin.dbClient, MONGO_DB_NAME, {title, isbn, editorial, year, author})
            res.json({success: true, msg: 'Successful added the new book.'});
        } catch (err) {
            console.log(err)
            res.status(500).send({success: false, msg: 'Internal error.'})
        }
    } else {
        return res.json({success: false, msg: 'Invalid params, you need to pass title, isbn, editorial and year.'});
    }
}

/*
* @param req.body.bookId string the book._id unique id
* @param req.body.title optional string
* @param req.body.isbn optional string
* @param req.body.editorial optional string
* @param req.body.year optional int
* */
const updateBook = async (req, res) => {
    const {user} = req

    if (!req.body.bookId) {
        res.json({success: false, msg: 'Please pass bookId.'});
    } else {
        try {
            const data = {}
            if(req.body.title) {
                data.title = req.body.title
            }
            if(req.body.isbn) {
                data.isbn = req.body.isbn
            }
            if(req.body.editorial) {
                data.editorial = req.body.editorial
            }
            if(req.body.year) {
                data.year = req.body.year
            }
            if(Object.keys(data).length > 0) {
                const {modifiedCount} = await Library.authorUpdateBook(admin.dbClient, MONGO_DB_NAME, user, req.body.bookId, data)
                if(modifiedCount == 1) {
                    res.json({success: true, msg: 'Successful updated the book.'});
                } else {
                    return res.json({success: false, msg: 'Unable to update the book, not found.'});
                }
            } else {
                return res.json({success: false, msg: 'Unable to update the book, data to update is missing (title, isbn, editorial or year).'});
            }
        } catch (err) {

            return res.json({success: false, msg: 'Unable to update the book.'});
        }
    }
}

const deleteBook = async (req, res) => {
    const {user} = req

    if (!req.params.bookId) {
        res.json({success: false, msg: 'Please pass the bookId.'});
    } else {
        try {
            await Library.authorDeleteBook(admin.dbClient, MONGO_DB_NAME, user, req.params.bookId)
            res.json({success: true, msg: 'Successful deleted the book.'});
        } catch (err) {
            console.log(err)
            return res.json({success: false, msg: 'Unable to delete the book.'});
        }
    }
}

/*
* @param req.body.page int 0 based page, optional, default 0
* @param req.body.limit int the amount of books per page, optional, default 30
* */
const listMyBooks = async (req, res) => {
    const {user} = req
    const page = req.body.page ? parseInt(req.body.page) : 0
    const limit = req.body.limit ? parseInt(req.body.limit) : 30

    try {
        const books = await Library.listAuthorBooks(admin.dbClient, MONGO_DB_NAME, user, page, limit)
        res.json({success: true, msg: 'Successful listing the books.', data: books});
    } catch (err) {
        console.log(err)
        return res.json({success: false, msg: 'Unable to list the books.'});
    }
}

/*
* @param req.body.page int 0 based page, optional, default 0
* @param req.body.limit int the amount of books per page, optional, default 30
* */
const listBooksByAuthors = async (req, res) => {
    const {user} = req
    const page = req.body.page ? parseInt(req.body.page) : 0
    const limit = req.body.limit ? parseInt(req.body.limit) : 30

    try {
        const books = await Book.listByAuthors(admin.dbClient, MONGO_DB_NAME, page, limit)
        res.json({success: true, msg: 'Successful listing the books by authors.', data: books});
    } catch (err) {
        console.log(err)
        return res.json({success: false, msg: 'Unable to list the books by authors.'});
    }
}

module.exports = {signUp, login, addBook, updateBook, deleteBook, listMyBooks, listBooksByAuthors}
