import React from "react";
import GoogleLoginButton from "./components/GoogleLoginButton";

const Login = () => {
    return (
        <div className="bg-slate-800 h-screen flex items-center">
            <div className="login-container mx-auto items-center">
            <img src="/full.svg" alt="logo" className="mx-auto" />
                <div className="text-center text-white text-sm font-bold mb-4">
                    Created by Lorenzo Moon and Josue Lopez
                </div>
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default Login;
