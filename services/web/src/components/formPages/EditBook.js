import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import UserService from "../../services/user.service";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditBook = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    const {state} = useLocation();

    const [title, setTitle] = useState(state.title);
    const [isbn, setIsbn] = useState(state.isbn);
    const [editorial, setEditorial] = useState(state.editorial);
    const [year, setYear] = useState(state.year);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeIsbn = (e) => {
        const isbn = e.target.value;
        setIsbn(isbn);
    };

    const onChangeEditorial = (e) => {
        const editorial = e.target.value;
        setEditorial(editorial);
    };

    const onChangeYear = (e) => {
        const year = e.target.value;
        setYear(year);
    };

    const handleUpdateBook = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            UserService.updateBook(state._id, title, isbn, editorial, year).then(
                () => {
                    navigate("/profile");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <Form onSubmit={handleUpdateBook} ref={form}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="title"
                            value={title}
                            onChange={onChangeTitle}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="isbn">ISBN</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="isbn"
                            value={isbn}
                            onChange={onChangeIsbn}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="editorial">Editorial</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="isbn"
                            value={editorial}
                            onChange={onChangeEditorial}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="year"
                            value={year}
                            onChange={onChangeYear}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Update Book</span>
                        </button>
                    </div>

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default EditBook;
