import React, {useEffect, useState} from "react";
import AuthService from "../services/auth.service";
import Login from "./Login";

import { useNavigate } from "react-router-dom";

const Home = () => {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.role=="ROLE_ADMIN");
        }
    }, []);

    if(currentUser) {
        if(showAdminBoard) {
            navigate("/admin");
            window.location.reload();
        } else {
            navigate("/user");
            window.location.reload();
        }
    }

    return (
        <Login/>
    )
};

export default Home;
