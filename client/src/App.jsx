import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
    return (
        <div className="bg-slate-800 h-screen flex items-center">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </div>
    );
}

export default App;
