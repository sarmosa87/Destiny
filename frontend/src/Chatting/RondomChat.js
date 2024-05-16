import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';

const socket = io('ws://192.168.16.15:8080/ws', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 10
});

const RandomChat = ({ ranChatClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timeoutHandle, setTimeoutHandle] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const messageEndRef = useRef(null);

  useEffect(() => {
    
    findPartner();

    return () => {
      clearTimeout(timeoutHandle);
      socket.off();
      setChatStatus(false);
    };
  }, []);

  const findPartner = async () => {
    setLoading(true);
    await setChatStatus(true);
    const handle = setTimeout(() => {
      if (!partner) {
        setLoading(false);
        alert("대화 상대를 찾는 데 실패했습니다.");
        handleClose();
      }
    }, 10000); // 10초 기다린 후 실행
    setTimeoutHandle(handle);

    try {
      const response = await axios.post('http://localhost:8081/api/findUser', { id: user.id });
      clearTimeout(handle);
      setLoading(false);
      if (response.data && response.status === 200) {
        setPartner(response.data); // 직접 받은 데이터를 partner로 설정
        setupSocketListeners();
      } else {
        throw new Error('No partner found');
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to find partner:", error);
      alert("대화 상대를 찾는 데 실패했습니다.");
      setChatStatus(false);
      handleClose();
    }
  };

  const setChatStatus = async (status) => {
    try {
      await axios.post('http://localhost:8081/api/setChatStatus', {
        id: user.id,
        logChk: status
      });
    } catch (error) {
      console.error("Failed to set chat status:", error);
    }
  };



  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {  // shift키와 함께 엔터를 누르면 개행을 허용
      e.preventDefault();
      sendMessage();
    }
  };


  const handleClose = () => {
    setChatStatus(false);
    ranChatClose();
  };


  const setupSocketListeners = () => {
    socket.on(`/topic/ranMessages/${user.id}`, (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage = {
      senderId: user.id,
      receiverId: partner.id,
      message: message,
      timestamp: new Date().toISOString()
    };
    socket.emit('chat.send', newMessage);
    axios.post('http://localhost:8081/api/ranMessages', newMessage)
      .then(response => {
        console.log('Message saved:', response.data);
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessage(''); // 메시지 전송 후 입력 필드 초기화
      })
      .catch(error => {
        console.error('Failed to save message:', error);
        alert("Failed to send message. Please try again.");
      });
  };

  return (
    <div className='chatting'>
      <div className='bg' onClick={handleClose}></div>
      <div className='popup'>
        {loading ? (
          <div className='loading'>
            <h2>대화 상대를 찾는 중...</h2>
          </div>
        ) : (
          <>
            <h3>{partner ? `${partner.name}님과 매칭되었습니다.` : "대화 상대 없음"}</h3>
            <div className='chat'>
              {messages.map((msg, index) => (
                <div key={index} className={msg.senderId === user.id ? 'message right' : 'message left'}>
                  <p>{msg.message}</p>
                  <small>{moment(msg.timestamp).format('LT')}</small>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} autoFocus onKeyDown={handleKeyDown} />
            <button onClick={sendMessage}>Send</button>
            <button onClick={handleClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
};

export default RandomChat;