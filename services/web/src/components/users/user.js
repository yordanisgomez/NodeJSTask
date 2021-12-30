import {useNavigate} from "react-router";
import AdminService from "../../services/admin.service";
import React from "react";

const User = (props) => {
    const {user, editMode} = props

    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.preventDefault()
        navigate("/editUser", {state: user})
        window.location.reload();
    }

    const handleDelete = (e) => {
        e.preventDefault()
        AdminService.deleteUser(user._id).then(
            () => {
                window.location.reload();
            }
        );
        window.location.reload();
    }

    return (
        <div className="card">
            <div className="form-group">
                <label>First Name</label>
                {user.firstName}
            </div>
            <div className="form-group">
                <label>Last Name</label>
                {user.lastName}
            </div>
            {
                editMode && (
                    <div className="listRow">
                        <button className="btn btn-primary btn-block" onClick={handleEdit}>
                            <span>Edit</span>
                        </button>
                        <button className="btn btn-primary btn-block" onClick={handleDelete}>
                            <span>Remove</span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default User