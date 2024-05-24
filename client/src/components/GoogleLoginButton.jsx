import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { decodeJwt } from 'jose';

const backendUrl = import.meta.env.VITE_BACKEND_URL + '/api/login';

const GoogleLoginButton = () => {
  const navigate = useNavigate();

  const handleSuccess = async (response) => {
    const jwt = response.credential;
    
    // Decode the JWT token without verification
    const decoded = decodeJwt(jwt);

    console.log('Login Success:', decoded);

    // Send the user data to the backend
    try {
      const res = await axios.post(backendUrl, {
        token: jwt,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });

      console.log('Backend Response:', res.data);

      // Navigate to the welcome page with the user name
      navigate('/welcome', { state: { name: decoded.name } });
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleLoginButton;
