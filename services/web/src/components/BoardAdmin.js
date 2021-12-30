import React, { useState, useEffect } from "react";

import AdminService from "../services/admin.service";
import UserList from "./users/userList";
import {useNavigate} from "react-router";

const BoardAdmin = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");

    useEffect(() => {
        AdminService.getAdminBoard().then(
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

    const handleNewUser = (e) => {
        e.preventDefault()
        navigate("/addNewUser")
        window.location.reload();
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{"Users"}</h3>
                <div>
                    <button className="btn btn-primary btn-block" onClick={handleNewUser}>
                        <span>Add New User</span>
                    </button>
                    {
                        Array.isArray(content) ? (
                            <UserList userList={content}/>
                        ) : (
                            <p>{content}</p>
                        )
                    }
                </div>

            </header>
        </div>
    );
};

export default BoardAdmin;
