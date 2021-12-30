import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AuthorList from "./booksByAuthors/authorList";

const BoardUser = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{"Books by authors"}</h3>
                {
                    Array.isArray(content) ? (
                        <AuthorList authorList={content}/>
                    ) : (
                        content
                    )
                }

            </header>
        </div>
    );
};

export default BoardUser;
