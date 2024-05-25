import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Chat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    //const { name } = location.state;

    const handleLogout = () => {
        // Clear the state and navigate to the login page
        navigate("/", { state: { name: null } });
    };

    return (
        <div className="flex h-screen">
            <div className="bg-blue-100 w-1/3">left</div>
            <div className="bg-blue-200 w-2/3">right</div>
        </div>
    );
};

export default Chat;
