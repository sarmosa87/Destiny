import React from 'react';
import '../CSS/RanChat.css';

const ChattingItem = ({ item, onItemClick }) => {
    const { senderId, receiverId, message, timestamp } = item;

    const handleClick = () => {
        onItemClick(item);
    };

    // 시간 포맷 변경 (예: '18:30')
    const formattedTime = new Date(timestamp).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <li className="ran-chat-item" onClick={handleClick}>
            <div className="chat-header">
                <h3>{receiverId}</h3>
            </div>
            <div className="chat-content">
                <p className="message-preview">{message.substring(0, 40) + '...'}</p>
                <div className="chat-time">{formattedTime}</div>
            </div>
        </li>
    );
};

export default ChattingItem;