
import React from "react";
import User from "./user";

const UserList = (props) => {
    const {userList} = props

    const users = userList.map(user =>
        <li key={user._id}>
            <User user={user} editMode={true}/>
        </li>
    )

    return (
        <ul>{users}</ul>
    )
}

export default UserList