import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AdminService from "../../services/admin.service";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditUser = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const navigate = useNavigate();
    const {state} = useLocation();

    const [firstName, setFirstName] = useState(state.firstName);
    const [lastName, setLastName] = useState(state.lastName);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeFN = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLN = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const handleUpdateUser = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AdminService.updateUser(state._id, firstName, lastName).then(
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

                <Form onSubmit={handleUpdateUser} ref={form}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={firstName}
                            onChange={onChangeFN}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={lastName}
                            onChange={onChangeLN}
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Update User</span>
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

export default EditUser;
