import React from 'react';
import { useLocation } from 'react-router-dom';

const Welcome = () => {
  const location = useLocation();
  const { name } = location.state;

  return (
    // Center the message bold white font
    <div className="welcome-container mx-auto">
      <h1 className="font-bold text-white text-center mx-auto">Welcome, {name}!</h1>
    </div>
  );
};

export default Welcome;

