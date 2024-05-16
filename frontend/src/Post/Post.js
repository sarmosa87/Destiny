import React,{useState,useEffect} from 'react';
import '../CSS/PostRecieve.css'
import axios from 'axios';
import PostRecieveItem from './PostRecieveItem';
import ChattingItem from '../Chatting/ChattingItem';
import Modal from '../Chatting/Modal';



const Post = ({onClose}) => {



    const [postShow,setPostShow]=useState(false)
    const [chattingShow,setChattingSHow] =useState(false)
    const [lists,setLists] = useState([])
    const [chattingLists,setChattingLists] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
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

        const fetchData2 = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/chattingList/${user.id}`);
                setChattingLists(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        
        fetchData();
        fetchData2();
    }, []);

    const postOpen = () => {

        setPostShow(true)
        setChattingSHow(false)

    }

    const chattingOpen = () => {

        setChattingSHow(true)
        setPostShow(false)

    }


    const handleItemClick = (item) => {
        setSelectedUser(item);
    };


    const handleCloseModal = () => {
        setSelectedUser(null);
    };





    return (


        <div className='PostContainer'>
        <h1>쪽지함</h1>
        <div className='PostOption'>
        <button onClick={postOpen}>쪽지리스트</button>
        <button onClick={chattingOpen}>채팅리스트</button>
        </div> 

        {
    postShow && (
        <div>
            <div className='PostContainerList row'>
                <span className='w1'>보낸이</span>
                <span className='w2'>내용</span>
                <span className='w3'>보낸날짜</span>
                <span className='w4'>기능</span>
            </div>
            {lists.map((item) => (
                <PostRecieveItem key={item.postNum} item={item} />
            ))}
         
        </div>
    )
}

{ 
chattingShow && (

    <div className='wrab'>
    <ul className='list'>
        {chattingLists.map((item) => (
            <ChattingItem key={item.CHATNUM} item={item} onItemClick={handleItemClick} /> // RanChatItem 사용
        ))}
    </ul>
    {selectedUser && <Modal users={selectedUser} onClose={handleCloseModal} />}
</div>

)

}


    <div>
                <button onClick={onClose}>닫기</button>
            </div>

        </div>

    );

};

export default Post;
