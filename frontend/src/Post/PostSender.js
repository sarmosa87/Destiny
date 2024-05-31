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

    
    
        try {
            const response = await axios.post('http://localhost:8081/api/post', { 

            senderId : user.id,
            receiverId: users.id,
            message: message,

            });
            alert("쪽지가 성공적으로 전송 됐습니다.");

        } catch (error) {
            if (error.response && error.response.status === 409) {
              alert('다이아 수량이 부족합니다.');
            } else {
              alert('서버 오류가 발생했습니다.');
            }
        }
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
                cols="9"      
                style={{ width: '494px', resize:'none' }}  // 너비를 100%로 설정하여 부모 요소를 채움
            />
            </p>
            <div style={{display:"flex", justifyContent:"center", margin:"20px"}}>
            <button onClick={sendMessage}style={{ marginRight: "30px", width:"100px" }} >전송</button>
            <button onClick={onClose} style={{width:"100px"}}>취소</button>
            </div>
            <div style={{textAlign:"center",color:"red"}}>
                {name}에게 쪽지를 보내주세요.
                수락하면 채팅을 할 수 있습니다.
            </div>




        </div>
     
    )
  };

export default PostSender;
