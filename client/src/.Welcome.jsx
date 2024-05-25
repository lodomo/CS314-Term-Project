// THIS SCRIPT DEPRECATED REMOVE FOR FINAL RELEASE

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { name } = location.state;

    const handleLogout = () => {
        // Clear the state and navigate to the login page
        navigate("/", { state: { name: null } });
    }

    return (
        // Center the message bold white font
        <div className="welcome-container mx-auto">
            <h1 className="font-bold text-white text-center mx-auto">
                Welcome, {name}!
            </h1>
            <button onClick={handleLogout} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>
        </div>
    );
};

export default Welcome;
