import React,{useState,useEffect} from 'react';
import '../CSS/PostRecieve.css'
import axios from 'axios';
import PostRecieveItem from './PostRecieveItem';
import ChattingItem from '../Chatting/ChattingItem';
import ChattingModal from '../Chatting/ChattingModal';
import { useNavigate } from 'react-router-dom';






const Post = ({onClose}) => {



    const [postShow,setPostShow]=useState(false)
    const [chattingShow,setChattingSHow] =useState(false)
    const [lists,setLists] = useState([])
    const [chattingLists,setChattingLists] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

  
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/postList/${user.id}`);
                setLists(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchData();
    }, [lists]);


    useEffect(() => {

        const fetchData2 = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/chattingList/${user.id}`);
                setChattingLists(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData2();
    }, [chattingLists]);


    const postOut = () => {
        navigate('/userList');
    };


    const onRemove = async (postNum) => {


        const confirmDelete = window.confirm('삭제하시겠습니까?');
        if (!confirmDelete) {
        // 사용자가 '취소'를 선택한 경우, 함수 실행을 중단
        return;
        }


        try {

      
            const res = await axios.post('http://localhost:8081/api/postRemove', {
                postNum: postNum
         
            });

            if (res.status === 200) {
                alert('삭제가 완료됐습니다.');
                setLists(current => current.filter(item => item.postNum !== postNum)); // 삭제된 게시물 제거
            }
 
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('삭제할 정보가 없습니다.');
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        }
    };


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
        <div >
            <div className='PostContainerList'>
                <span className='w1'>보낸이</span>
                <span className='w2'>내용</span>
                <span className='w3'>보낸날짜</span>
                <span className='w4'>기능</span>
            </div>
            <div className='PostList'>
            {lists.map((item) => (
                <PostRecieveItem key={item.postNum} item={item} onRemove={onRemove}/>
            ))}
            </div>
         
        </div>
    )
}

{ 
chattingShow && (

    <div className='postChatList'>
    <ul className='list'>
        {chattingLists.map((item) => (
            <ChattingItem key={item.CHATNUM} item={item} onItemClick={handleItemClick} /> // RanChatItem 사용
        ))}
    </ul>
    {selectedUser && <ChattingModal users={selectedUser} onClose={handleCloseModal} />}
</div>

)

}

{

!postShow && !chattingShow &&(

    <div style={{marginTop:'225px'}}>



    </div>

)

}

    

            <div className='PostButton'>
                <button style={{marginTop:'5px'}} onClick={postOut} >닫기</button>
            </div>
 
        </div>

    );

};

export default Post;
