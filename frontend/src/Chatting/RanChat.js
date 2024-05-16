import React, { useState } from 'react';
import RondomChat from './RondomChat';

const RanChat = () => {
    const [isShow, setIsShow] = useState(false);

    const ranChat = () => {
        setIsShow(true);
    };

    const ranChatClose = () => {
        setIsShow(false);
    };

    return (
        <div style={{
            textAlign: 'center',
            marginTop: '50px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f0f0f0' // 전체 배경 색상 조정
        }}>
            <div style={{
                borderBottom: '2px solid #ddd', // 경계선 추가
                paddingBottom: '20px',
                marginBottom: '20px'
            }}>
                <button onClick={ranChat} style={{
                    padding: '15px 30px',
                    fontSize: '20px',
                    backgroundColor: '#FFFFFF',
                    color: '#5C67F2',
                    border: '3px solid #5C67F2',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(92, 103, 242, 0.2)',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                }}
                onMouseOver={({ target }) => target.style.transform = 'scale(1.05)'}
                onMouseOut={({ target }) => target.style.transform = 'scale(1)'}
                >랜덤채팅 시작하기</button>
                
            </div>
            {isShow && <RondomChat ranChatClose={ranChatClose} />}
        </div>
    );
};

export default RanChat;