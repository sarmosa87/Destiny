import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RanChatItem from './RanChatItem'; // 올바른 컴포넌트 이름으로 변경
import '../CSS/RanChat.css';
import RanModal from './RanModal';

const RanChatList = () => {
    const [lists, setLists] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/ranChatList/${user.id}`);
                setLists(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    const handleItemClick = (item) => {
        setSelectedUser(item);
    };


    const handleCloseModal = () => {
        setSelectedUser(null);
    };


    return (
        <div className='wrab'>
            <h1>대화 리스트</h1>
            <ul className='list'>
                {lists.map((item) => (
                    <RanChatItem key={item.CHATNUM} item={item} onItemClick={handleItemClick} /> // RanChatItem 사용
                ))}
            </ul>
            {selectedUser && <RanModal users={selectedUser} onClose={handleCloseModal} />}
        </div>
    );
};

export default RanChatList;