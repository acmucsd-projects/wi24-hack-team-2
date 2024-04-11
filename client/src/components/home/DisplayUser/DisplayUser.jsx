import React, { useContext } from 'react';
import './DisplayUser.css'; // Import the CSS file
import { UsernameContext } from '../../../App';


const DisplayUser = () => {
    const { username } = useContext(UsernameContext);
    const storedUsername = localStorage.getItem('username');

    return (
    <div className="switch">
        <h1>{storedUsername || username}'s preferences</h1>
    </div>
    );
};

export default DisplayUser;
