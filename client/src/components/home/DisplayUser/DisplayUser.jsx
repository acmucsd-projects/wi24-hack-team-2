import React from 'react';
import './DisplayUser.css'; // Import the CSS file


const DisplayUser = () => {
    const storedUsername = localStorage.getItem('username');

    return (
    <div className="switch">
        <h1>{storedUsername ? `${storedUsername}'s preferences` : "preferences"}</h1>
    </div>
    );
};

export default DisplayUser;
