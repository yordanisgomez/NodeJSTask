import BookList from "./book";
import React from "react";

const AuthorList = (props) => {
    const {authorList} = props

    const authors = authorList.map(item =>
        <li key={item._id}>
            {item.author.firstName + " " + item.author.lastName}
            <BookList books={item.books}/>
        </li>
    )

    return (
        <ul>{authors}</ul>
    )
}

export default AuthorList