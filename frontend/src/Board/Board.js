import React,{useState,useEffect} from 'react';
import axios from 'axios';
import BoardItem from './BoardItem';

const Board = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [lists,setLists] = useState([])



    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/api/boardList/`);
                setLists(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);




    return (


        <div className='boardContainer'>
            <h1>게시판</h1>

            <div className='menu'>
                <span>번호</span>
                <span>제목</span>
                <span>글쓴이</span>
                <span>등록일</span>
                <span>조회수</span>
            </div>
            {lists.map((item) => (
                    <BoardItem key={item.registNum} item={item} />
                ))}
            
        </div>
    );
};

export default Board;