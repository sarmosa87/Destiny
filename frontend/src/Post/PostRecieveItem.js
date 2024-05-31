import React, { useState } from 'react';
import Profile from './Profile';
import Modal from '../Chatting/Modal';
import '../CSS/PostRecieve.css'

const PostRecieveItem = ({item,onRemove}) => {

    const {postNum,senderId,receiverId,name,message,postDate} = item

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

        <div className='Box'>
            <span className='p1'>{name}</span>
            <span className='p2'>{message}</span>
            <span className='p3'>{postDate}</span>
            <button className='p4' onClick={onOpen} style={{ width:"47px",fontSize:"12px",padding:"1px",height:"24px"}}>프로필</button>
            <button className='p4' onClick={chatOpen}  style={{width:"47px",fontSize:"12px",padding:"1px",height:"24px"}}>채팅</button>
            <button className='p4' onClick={() => onRemove(postNum)} style={{width:"47px",fontSize:"12px",padding:"1px",height:"24px"}}>삭제</button>
            
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
