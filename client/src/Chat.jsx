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
            <div className="ActiveChats bg-slate-600 w-1/3">
                CHATS HERE 
                TODO GET CHATS
            </div>

            <div className="Conversations flex flex-col bg-slate-700 w-2/3 p-2">
                <div className="flex-grow bg-slate-400 p-2 rounded-lg" >
                    messages
                </div>
                <div className="InputArea flex gap-2 mt-2" >
                    <input
                        type="text"
                        placeholder="..."
                        className="bg-slate-500 flex-grow p-2 rounded-lg text-white text-bold"
                    />
                    <button className="bg-slate-400 p-2 rounded-lg" >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
