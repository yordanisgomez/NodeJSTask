const {MongoClient} = require('mongodb')
const config = require('../common/config')
const {createDBIndexes, setupAdminAccount} = require('../utils/db')
const {USER_ROLE, COLLECTIONS} = require('../common/constants')
const User = require('../models/user')
const Book = require('../models/book')
const Library = require('../services/library')

describe('library test suits', () => {
    let connection
    let db
    const testDBName = "Jest_NodeJSTask"

    beforeAll(async () => {
        connection = await MongoClient.connect(config.mongoDBUri);
        db = await connection.db(testDBName);
        // create indexes
        await createDBIndexes(db)
        // create the default admin account
        await setupAdminAccount(db)

        // insert the userId_1 dummy user:

        // clean some collections:
        await Promise.all([
            db.collection(COLLECTIONS.BOOK).deleteMany({}),
        ])
    });

    afterAll(async () => {
        await connection.close();
    });

    const addNewUser = async (email, firstName, lastName) => {

        const newUserData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: USER_ROLE.USER,
            signedUp: false
        }
        await User.save(connection, testDBName, newUserData)
    }

    it('should add a new author in the users collection', async () => {
        const email = "jhon@example.com"
        await addNewUser(email, "Jhon", "Smith")

        const user = await db.collection(COLLECTIONS.USER).findOne({_id: email})
        expect(user._id).toBe(email)
    })

    it('should delete an author form the users collection', async () => {
        const email = "alan@example.com"
        await addNewUser(email, "Alan", "Key")
        await User.deleteOne(connection, testDBName, email)

        const user = await db.collection(COLLECTIONS.USER).findOne({_id: email})
        expect(user).toBeNull()
    })

    it('should update an author from the users collection', async () => {
        const email = "morgan@example.com"
        await addNewUser(email, "Morgan", "McccGuire")
        const updatedLastName = "McGuire"
        await User.updateOne(connection, testDBName, email, {lastName: updatedLastName})

        const user = await db.collection(COLLECTIONS.USER).findOne({_id: email})
        expect(user.lastName).toBe(updatedLastName)
    })

    const addNewBook = async (title, isbn, editorial, year, author) => {
        const {insertedId} = await Book.insertOne(connection, testDBName, {title, isbn, editorial, year, author})
        return insertedId
    }

    it('should add a new book to the books collection', async () => {
        const title = "Game Dev"
        const isbn = "isbn-000"
        const email = "corey@example.com"
        const author = {
            _id: email,
            firstName: "Corey",
            lastName: "Taylor"
        }
        await addNewBook(title, isbn, "editorial", "2000", author)

        const book = await db.collection(COLLECTIONS.BOOK).findOne({"author._id": email})
        expect({title: title, isbn: isbn}).toEqual({title: book.title, isbn: book.isbn})
    })

    it('should update a book from the books collection', async () => {
        const title = "G3D"
        const isbn = "isbn-001"
        const email = "morgan@university.com"
        const author = {
            _id: email,
            firstName: "Morgan",
            lastName: "McGuire"
        }
        await addNewUser(email, "Morgan", "McGuire")
        const insertedId = await addNewBook(title, isbn, "editorial", "2000", author)

        const updatedIsbn = "isbn-updated"
        const user = {_id: email}
        await Library.authorUpdateBook(connection, testDBName, user, insertedId, {isbn: updatedIsbn})

        const book = await db.collection(COLLECTIONS.BOOK).findOne({_id: insertedId})
        expect(book.isbn).toBe(updatedIsbn)
    })

    it('should delete a book from the books collection', async () => {
        const title = "G3D"
        const isbn = "isbn-002"
        const email = "morgan2@university.com"
        const author = {
            _id: email,
            firstName: "Morgan",
            lastName: "McGuire"
        }
        await addNewUser(email, "Morgan", "McGuire")
        const insertedId = await addNewBook(title, isbn, "editorial", "2000", author)

        const user = {_id: email}
        await Library.authorDeleteBook(connection, testDBName, user, insertedId)

        const book = await db.collection(COLLECTIONS.BOOK).findOne({_id: insertedId})
        expect(book).toBeNull()
    })

    it('should reject with an error', async () => {
        const title = "G3D"
        const isbn = "isbn-002"
        const email = "morgan3@university.com"
        const author = {
            _id: email,
            firstName: "Morgan",
            lastName: "McGuire"
        }
        await addNewUser(email, "Morgan", "McGuire")
        const insertedId = await addNewBook(title, isbn, "editorial", "2000", author)

        // add another user to try to delete the book
        const secondEmail = "elider@university.com"
        await addNewUser(secondEmail, "Elider", "Gomez")

        const user = {_id: secondEmail}
        expect.assertions(1)
        try {
            await Library.authorDeleteBook(connection, testDBName, user, insertedId)
        } catch (e) {
            expect(e.message).toMatch("The user is not the author of this book")
        }
    })
})
