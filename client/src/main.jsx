import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
            <Router>
                <App />
            </Router>
        </AuthProvider>
    </GoogleOAuthProvider>,
);
