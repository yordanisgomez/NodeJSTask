import axios from "axios"
import authHeader from "./auth-header"

const API_URL = "http://localhost:8000/api/"

const getUserBoard = () => {
    return axios.get(API_URL + "listBooksByAuthors", { headers: authHeader() })
}

const getUserBooks = () => {
    return axios.get(API_URL + "listMyBooks", { headers: authHeader() })
}

const addBook = (title, isbn, editorial, year) => {
    return axios.post(API_URL + "addBook", {title, isbn, editorial, year}, { headers: authHeader() })
}

const deleteBook = (bookId) => {
    return axios.delete(API_URL + `deleteBook/${bookId}`, { headers: authHeader() })
}

const updateBook = (bookId, title, isbn, editorial, year) => {
    const data = {bookId}
    if(title) {
        data.title = title
    }
    if(isbn) {
        data.isbn = isbn
    }
    if(editorial) {
        data.editorial = editorial
    }
    if(year) {
        data.year = year
    }
    return axios.patch(API_URL + "updateBook", data, { headers: authHeader() })
}

export default {
    getUserBoard,
    getUserBooks,
    addBook,
    deleteBook,
    updateBook
}
