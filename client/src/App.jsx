import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Chat from "./Chat";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/chat"
                element={
                    <PrivateRoute>
                        <Chat />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
