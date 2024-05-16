import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Post.css'

const PostSender = ({users,onClose}) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const {id,name} = users
    const [message, setMessage] = useState('');
    

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
      };


      const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {  // shift키와 함께 엔터를 누르면 개행을 허용
          e.preventDefault();
          sendMessage();
        }
      };

    
      const sendMessage = async () => {
    
        axios.post('http://localhost:8081/api/post', {

            senderId : user.id,
            receiverId: users.id,
            message: message,

        })
          .then(response => {
            console.log('Message saved:', response.data);
   
          })
          .catch(error => {
            console.error('Failed to save message:', error);
            alert("Failed to send message. Please try again.");
          });
    
        setMessage('');
      };

    return (

        <div className='Post'>
            <h2>
                쪽지 보내기
            </h2>
            <p>
            <textarea
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                placeholder="메시지 입력..."
                rows="4"  // textarea의 높이 설정
                cols="10"
                resize= 'none'     
                style={{ width: '100%' }}  // 너비를 100%로 설정하여 부모 요소를 채움
            />
            </p>
            <div>
            <button onClick={sendMessage}>전송</button>
            <button onClick={onClose}>취소</button>
            </div>
            <div>
                {name}에게 쪽지를 보내주세요.
                수락하면 채팅을 할 수 있습니다.
            </div>




        </div>
     
    )
  };

export default PostSender;
