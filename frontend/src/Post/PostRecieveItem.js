import React, { useState } from 'react';
import Profile from './Profile';
import Modal from '../Chatting/Modal';

const PostRecieveItem = ({item}) => {

    const {senderId,receiverId,name,message,postDate} = item

    const [profileShow,setProfileShow] = useState('')
    const [chatShow,setChatShow] = useState('')

    const onOpen = () => {

        setProfileShow(true)


    }


    const onClose = () => {

        setProfileShow(false)

    }

    const chatOpen = () => {

        setChatShow(true)


    }
    
    const chatClose = () =>{

        setChatShow(false)
    }


    return (
        <div className='PostRecieveContainer'>
            <span className='p1'>{name}</span>
            <span className='p2'>{message}</span>
            <span className='p3'>{postDate}</span>
            <button className='p4' onClick={onOpen}>프로필보기</button>
            <button className='p5' onClick={chatOpen}>채팅하기</button>
            <button className='p6'>삭제</button>

            {
                profileShow&&<Profile onClose={onClose} id={senderId}/>
            }
            {
                chatShow&&<Modal onClose={chatClose} users={item}/>
            }


        </div>
    );
};

export default PostRecieveItem;
