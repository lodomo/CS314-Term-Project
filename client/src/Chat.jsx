import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChatroomList from "./components/ChatroomList";
import { useAuth } from "./context/AuthContext";
import axios from "axios";

const API_IP = import.meta.env.VITE_API_IP;
const API_URL = import.meta.env.VITE_API_URL;

const Chat = () => {
    const navigate = useNavigate();
    const [ws, setWs] = useState(null);
    const location = useLocation();
    const [selectedChatroom, setSelectedChatroom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useAuth();
    const messagesEndRef = useRef(null);

    const handleLogout = () => {
        // Clear the state and navigate to the login page
        navigate("/", { state: { name: null } });
    };

    useEffect(() => {
        const ws = new WebSocket(`ws://${API_IP}`);
        ws.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.chatroomId === selectedChatroom?._id) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        };

        return () => {
            ws.close();
        };
    }, [API_IP, selectedChatroom]);

    useEffect(() => {
        if (selectedChatroom) {
            // Fetch messages for the selected chatroom
            fetchMessages(selectedChatroom._id);
        }
    }, [selectedChatroom]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const fetchMessages = async (chatroomId) => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/chatroom/${chatroomId}/messages`,
            );
            setMessages(res.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            const res = await axios.post(
                `${API_URL}/api/chatroom/${selectedChatroom._id}/messages`,
                {
                    content: newMessage,
                    senderId: user._id,
                },
            );

            // The message will be broadcasted by the backend and handled in ws.onmessage
            setNewMessage(""); // Clear the input after sending
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    function handleMessage(e) {
        console.log("new message", e);
    }

    return (
        <div className="flex h-screen">
            <div className="Sidebar flex flex-col bg-slate-600 w-1/3">
                <div className="ActiveChats flex-grow bg-slate-600">
                    <ChatroomList onChatroomSelect={setSelectedChatroom} />
                </div>
                <div className="Logout flex justify-center m-2">
                    <button
                        className="bg-slate-500 hover:bg-slate-700 text-white p-2 rounded-lg flex items-center justify-center mt-4"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="Conversations flex flex-col bg-slate-700 w-2/3 p-2">
                <div className="MessagesContainer flex-grow overflow-y-auto h-64 bg-slate-400 p-2 rounded-lg scrollbar-thin">
                    {selectedChatroom ? (
                        <>
                            <h2 className="text-2xl font-bold mb-4">
                                {selectedChatroom.name}
                            </h2>
                            <div>
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-2 mb-2 rounded-lg"
                                    >
                                        <strong>{message.sender.name}:</strong>{" "}
                                        {message.content}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>Select a chatroom to view messages</p>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="InputArea flex gap-2 mt-2">
                    <input
                        type="text"
                        placeholder="..."
                        className="bg-slate-500 flex-grow p-2 rounded-lg text-white text-bold"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleSendMessage()
                        }
                    />
                    <button
                        className="bg-slate-400 p-2 rounded-lg"
                        onClick={handleSendMessage}
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
                                d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </button>{" "}
                </div>
            </div>
        </div>
    );
};

export default Chat;
