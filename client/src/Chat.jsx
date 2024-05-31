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
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [refreshChatrooms, setRefreshChatrooms] = useState(false); // State to trigger refresh

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
            console.log("Fetched messages:", res.data);
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

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/users`);
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        if (!selectedChatroom || !selectedUser) return;

        try {
            const res = await axios.put(
                `${API_URL}/api/chatrooms/${selectedChatroom._id}/addUser`,
                { userId: selectedUser },
            );

            if (res.status === 200) {
                // Update the selected chatroom's user list
                setSelectedChatroom(res.data);
                console.log("User added successfully");
            }
        } catch (error) {
            console.error("Error adding user to chatroom:", error);
        }
    };

    const handleDeleteChatroom = async (chatroomId) => {
        try {
            const res = await axios.delete(
                `${API_URL}/api/chatrooms/${chatroomId}`,
            );

            if (res.status === 200) {
                setSelectedChatroom(null);
                setRefreshChatrooms((prev) => !prev); // Trigger refresh
                console.log(
                    "Chatroom and all associated messages deleted successfully",
                );
            }
        } catch (error) {
            console.error("Error deleting chatroom:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="Sidebar flex flex-col bg-slate-600 w-1/3">
                <div className="Logo w-3/4 justify-center mx-auto mt-4">
                    <img src="/full.svg" alt="logo" />
                </div>
                <div className="ActiveChats flex flex-grow w-full bg-slate-600 overflow-y-auto mx-auto">
                    <ChatroomList 
                        onChatroomSelect={setSelectedChatroom}
                        refresh={refreshChatrooms} // Pass refresh state
                    />
                </div>
                <div className="Logout flex justify-center m-1">
                    <button
                        className="bg-slate-500 hover:bg-slate-700 text-white p-2 rounded-lg flex items-center justify-center m-1"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="Conversations flex flex-col bg-slate-700 w-2/3 p-2">
                <div className="MessagesContainer flex flex-col flex-grow h-64 bg-slate-400 p-1 rounded-lg">
                    {selectedChatroom ? (
                        <>
                            <div className="ChatroomHeader flex flex-row">
                                <div className="ChatroomName text-2xl font-bold p-2">
                                    {selectedChatroom.name}
                                </div>

                                <div className="Spacer flex-grow"></div>

                                {selectedChatroom.admin &&
                                    ((typeof selectedChatroom.admin ===
                                        "string" &&
                                        selectedChatroom.admin === user._id) ||
                                        (typeof selectedChatroom.admin ===
                                            "object" &&
                                            selectedChatroom.admin._id ===
                                                user._id)) && (
                                        <>
                                            <select
                                                value={selectedUser}
                                                onChange={(e) =>
                                                    setSelectedUser(
                                                        e.target.value,
                                                    )
                                                }
                                                className="m-2 p-2 bg-white rounded-lg"
                                            >
                                                <option value="">
                                                    Select user to add
                                                </option>
                                                {users.map((u) => (
                                                    <option
                                                        key={u._id}
                                                        value={u._id}
                                                    >
                                                        {u.name} ({u.email})
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={handleAddUser}
                                                className="AddUserButton m-2 p-2 bg-teal-400 rounded-lg"
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
                                                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteChatroom(
                                                        selectedChatroom._id,
                                                    )
                                                }
                                                className="DeleteChatButton m-2 p-2 bg-red-400 rounded-lg"
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
                                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                    />
                                                </svg>
                                            </button>
                                        </>
                                    )}
                            </div>
                            <div className="overflow-y-auto scrollbar-thin">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-2 m-1 rounded-lg"
                                    >
                                        <strong>{message.sender.name}:</strong>{" "}
                                        {message.content}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </>
                    ) : (
                        <p>Select a chatroom to view messages</p>
                    )}
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
