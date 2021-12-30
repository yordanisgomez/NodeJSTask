import React, {useEffect, useState} from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import BookList from "./booksByAuthors/book";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBooks().then(
            (response) => {console.log(response)
                setContent(response.data.data);
            },
            (error) => {console.log(error)
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
                <h3>
                    <strong>{currentUser.email}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.role &&
                    <li key={0}>{currentUser.role}</li>}
            </ul>
            <strong>My Books:</strong>
            {
                Array.isArray(content) ? (
                    <BookList books={content} editMode={true}/>
                ) : (
                    content
                )
            }
        </div>
    );
};

export default Profile;
