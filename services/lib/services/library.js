const Book = require('../models/book')
const ObjectID = require('mongodb').ObjectId

const authorUpdateBook = async (dbClient, dbName, user, bookId, data) => {
    const userId = user._id
    const book = await Book.findOne(dbClient, dbName, {_id: new ObjectID(bookId)})
    if(book) {
        const {author} = book
        if(author._id == userId) { // business rule: user can modify a book only if he is the author
            return Book.updateOne(dbClient, dbName, bookId, data)
        } // else
        return Promise.reject(new Error("The user is not the author of this book"))
    }
    return Promise.reject(new Error("The book was not found"))
}

const authorDeleteBook = async (dbClient, dbName, user, bookId) => {
    const userId = user._id
    const book = await Book.findOne(dbClient, dbName, {_id: new ObjectID(bookId)})
    if(book) {
        const {author} = book
        if(author._id == userId) { // business rule: user can delete a book only if he is the author
            return Book.deleteOne(dbClient, dbName, bookId)
        } // else
        return Promise.reject(new Error("The user is not the author of this book"))
    }
    return Promise.reject(new Error("The book was not found"))
}

const listAuthorBooks = async (dbClient, dbName, user, page, limit) => {
    const userId = user._id
    return Book.list(dbClient, dbName, page, limit, {"author._id": userId})
}

module.exports = {authorUpdateBook, authorDeleteBook, listAuthorBooks}