import React from 'react';
import '../styles/Notification.css'; // Make sure to create this CSS file

const Notification = ({ message }) => {
    if (!message) return null; // Don't render the component if there's no message

    return (
        <div className="notification">
            {message}
        </div>
    );
};

export default Notification;