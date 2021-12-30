import React from "react";
import "./books.css"
import Form from "react-validation/build/form";
import {useNavigate} from "react-router";
import UserService from "../../services/user.service";

const Book = (props) => {
    const {book, editMode} = props

    const navigate = useNavigate();

    const handleEditBook = (e) => {
        e.preventDefault()
        navigate("/editBook", {state: book})
        window.location.reload();
    }

    const handleDeleteBook = (e) => {
        e.preventDefault()
        UserService.deleteBook(book._id).then(
            () => {
                window.location.reload();
            }
        );
        window.location.reload();
    }

    return (
        <div className="card">
            <div className="form-group">
                <label>Title</label>
                {book.title}
            </div>
            <div className="form-group">
                <label>ISBN</label>
                {book.isbn}
            </div>
            <div className="form-group">
                <label>Editorial</label>
                {book.editorial}
            </div>
            <div className="form-group">
                <label>Year</label>
                {book.year}
            </div>
            {
                editMode && (
                    <div className="listRow">
                        <button className="btn btn-primary btn-block" onClick={handleEditBook}>
                            <span>Edit</span>
                        </button>
                        <button className="btn btn-primary btn-block" onClick={handleDeleteBook}>
                            <span>Remove</span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

const BookList = (props) => {
    const navigate = useNavigate();
    const {books, editMode} = props

    const bookList = books.map(book =>
        <li key={book._id}>
            <Book book={book} editMode={editMode}/>
        </li>
    )

    const handleNewBook = (e) => {
        e.preventDefault()
        navigate("/addNewBook")
        window.location.reload();
    }

    return (
        <div>
            {
                editMode && (
                    <button className="btn btn-primary btn-block" onClick={handleNewBook}>
                        <span>Add New Book</span>
                    </button>
                )
            }
            <div className="listRow">
                <ul>{bookList}</ul>
            </div>
        </div>
    )
}

export default BookList