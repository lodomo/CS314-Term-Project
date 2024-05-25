import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const ChatroomList = ({ onChatroomSelect }) => {
    const [chatrooms, setChatrooms] = useState([]);
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

    return (
        <div className="flex flex-col gap-4 m-2">
            {chatrooms.map((chatroom) => (
                <button
                    key={chatroom._id}
                    className="bg-slate-400 p-2 rounded-lg hover:bg-slate-500"
                    onClick={() => onChatroomSelect(chatroom)}
                >
                    <h3 className="text-lg font-semibold">{chatroom.name}</h3>
                </button>
            ))}
        </div>
    );
};

export default ChatroomList;
