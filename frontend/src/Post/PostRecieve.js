import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../CSS/PostRecieve.css'
import PostRecieveItem from './PostRecieveItem';

const PostRecieve = ({onClose}) => {


    const [lists,setLists] = useState([])
    const user = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/postList/${user.id}`);
                setLists(res.data);
                console.log('API Response:', res.data); // API 응답 확인
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);



    return (
    
        <div className='PostContainer'>
            <h1>쪽지함</h1>
        <div className='PostOption'>
        <button>쪽지리스트</button>
        <button>채팅리스트</button>
        </div> 

        <div className='PostContainerList row'>
            <span className='w1'>보낸이</span>
            <span className='w2'>내용</span>
            <span className='w3'>보낸날짜</span>
            <span className='w4'>기능</span>
        </div>
                {lists.map((item) => (
                    <PostRecieveItem  key={item.postNum} item={item} />
                ))}

        <div>
            <button onClick={onClose}>닫기</button>
        </div>
        </div>

    );
};

export default PostRecieve;
