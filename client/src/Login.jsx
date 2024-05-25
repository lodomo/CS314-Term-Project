import React from "react";
import GoogleLoginButton from "./components/GoogleLoginButton";

const Login = () => {
    return (
        <div className="bg-slate-800 h-screen flex items-center">
            <div className="login-container w-64 mx-auto">
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default Login;
