import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';
import '../CSS/ChatStyle.css';

// Socket 초기화 및 연결 설정
const socket = io('ws://localhost:8081/ws', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 10
});

const RanModal = ({ users, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!user) {
      console.warn("Please log in to continue.");
      return;
    }

    // 데이터를 불러오는 과정에서 오류가 발생하더라도 사용자에게 알리지 않고 진행
    axios.get(`http://localhost:8081/api/ranMessages/${user.id}/${users.receiverId}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch messages:", error);
      });

    // 메시지 수신 구독 설정
    const messageChannel = `/topic/ranMessages/${user.id}`;
    socket.on(messageChannel, (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.off(messageChannel);
    };
  }, [user, users.receiverId]);



  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {  // shift키와 함께 엔터를 누르면 개행을 허용
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!user) {
      alert("Please log in to send messages.");
      return;
    }

    const newMessage = {
      senderId: user.id,
      receiverId: users.receiverId,
      message: message,
      timestamp: new Date().toISOString()
    };

    socket.emit('chat.send', newMessage);
    axios.post('http://localhost:8081/api/ranMessages', newMessage)
      .then(response => {
        console.log('Message saved:', response.data);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      })
      .catch(error => {
        console.error('Failed to save message:', error);
        alert("Failed to send message. Please try again.");
      });

    setMessage('');
  };

  if (!user || !users) {
    return (
      <div className="chatting">
        <div className="bg" onClick={onClose}></div>
        <div className="popup">
          <h3>Login Required</h3>
          <p>Please log in to view and send messages.</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className='chatting'>
      <div className='bg' onClick={onClose}></div>
      <div className='popup'>
        <h3>{users.receiverId}님과 채팅</h3>
        <div className='chat'>
          {messages.map((msg, index) => (
            <div key={index} className={msg.senderId === user.id ? 'message right' : 'message left'}>
              <p>{msg.message}</p>
              <small>{moment(msg.timestamp).format('LT')}</small>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <input type='text' value={message} onChange={handleMessageChange} autoFocus onKeyDown={handleKeyDown} />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RanModal;