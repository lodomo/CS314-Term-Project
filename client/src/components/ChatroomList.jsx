import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const ChatroomList = ({ onChatroomSelect }) => {
    const [chatrooms, setChatrooms] = useState([]);
    const [newRoomName, setNewRoomName] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        console.log("ChatroomList component mounted"); // Verify component mount
        console.log("User in ChatroomList:", user); // Debug log to verify the user object

        const fetchChatrooms = async () => {
            console.log("Fetching chatrooms..."); // Debug log
            try {
                const res = await axios.get(
                    VITE_API_URL + `/api/user/${user._id}/chatrooms`,
                );
                console.log("Fetched chatrooms:", res.data); // Debug log to verify the response
                if (Array.isArray(res.data)) {
                    setChatrooms(res.data);
                } else {
                    console.error("Expected an array but got:", res.data);
                }

                // Set the "main" chatroom as the default if it exists
                const mainChatroom = res.data.find(
                    (chatroom) => chatroom.name === "main",
                );
                if (mainChatroom) {
                    onChatroomSelect(mainChatroom);
                }
            } catch (error) {
                console.error("Error fetching chatrooms:", error);
            }
        };

        if (user && user._id) {
            fetchChatrooms();
        } else {
            console.log("User or user._id is not defined"); // Debug log for missing user or user._id
        }
    }, [user]);

    const handleCreateChatroom = async (chatroomName) => {
        console.log("Creating chatroom..."); // Debug log
        try {
            const res = await axios.post(
                VITE_API_URL + "/api/chatrooms/create",
                {
                    chatroomName: chatroomName,
                    userId: user._id,
                },
            );
            setChatrooms([...chatrooms, res.data]); // Add the new chatroom to the list
            onChatroomSelect(res.data); // Select the new chatroom
        } catch (error) {
            console.error("Error creating chatroom:", error);
        }
    };

    return (
        <div className="bg-slate-600 flex flex-col w-full p-2"> 
            <div className="ChatroomList flex flex-col overflow-y-auto scrollbar-thin">
                {chatrooms.map((chatroom) => (
                    <button
                        key={chatroom._id}
                        className="bg-slate-400 hover:bg-slate-700 text-white p-2 m-1 rounded-lg flex items-center justify-center"
                        onClick={() => onChatroomSelect(chatroom)}
                    >
                        {chatroom.name}
                    </button>
                ))}
            </div>

            <div className="NewChatBox bg-slate-500 hover:bg-slate-700 text-white p-2 rounded-lg flex items-center justify-center mt-4">
                <input
                    type="text"
                    placeholder="Create New Chat..."
                    className="bg-slate-500 flex-grow p-2 mr-2 rounded-lg text-white text-bold"
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleCreateChatroom(newRoomName.trim())
                    }
                />
                <button
                    className="AddChatButton"
                    onClick={() => handleCreateChatroom(newRoomName.trim())}
                >
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
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatroomList;
