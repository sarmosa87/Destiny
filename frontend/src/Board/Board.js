import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoardItem from './BoardItem';
import { useNavigate, useLocation } from 'react-router-dom';


//게시판 리스트를 출력하는 화면

const Board = () => {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3); // 페이지당 아이템 수 설정

    const [form, setForm] = useState({
        search: '제목',
        value: ''
    });

    const { search, value } = form;

    const onChange = (evt) => {
        const { name, value } = evt.target;
        setForm({
          ...form,
          [name]: value
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/api/boardList`, {
                params: { searchKey: search, searchValue: value }
            });
            setLists(res.data);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('불러올 데이터가 없습니다.');
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        }
    };

    const onContent = (registNum) => {
        navigate(`/Content/${registNum}?page=${currentPage}`);
    };

    // 페이지 변경 처리
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 현재 페이지에 표시할 아이템 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = lists.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className='boardContainer'>
            <h1>게시판</h1>
            <div style={{marginLeft:'930px'}}>
            <button  className='searchButton' onClick={() => navigate('/write')}>등록</button>
            </div>
            <div className='menu'>
                <span style={{marginLeft: "10px"}}>번호</span>
                <span style={{marginLeft: "300px"}}>제목</span>
                <span style={{marginLeft: "310px"}}>이름</span>
                <span style={{marginLeft: "50px"}}>등록일</span>
                <span style={{marginLeft: "50px"}}>조회수</span>
            </div>
            {currentItems.map((item) => (
                <BoardItem key={item.registNum} item={item} onContent={() => onContent(item.registNum)} />
            ))}
            <div style={{display:'flex', justifyContent:'center', margin:'10px'}}>
                <div>
                    <select name='search' value={search} onChange={onChange}>
                        <option value='subject'>제목</option>                        
                        <option value='name'>이름</option>                        
                        <option value='content'>내용</option>                                                            
                    </select>    
                </div>
                <div>
                    <input type='text' name='value' value={value} onChange={onChange} />
                </div>
                <div>
                    <button className='searchButton' onClick={fetchData}>검색</button>
                </div>
            </div>  
            <div style={{marginTop: "10px", display: "flex", justifyContent: "center"}}>
                {[...Array(Math.ceil(lists.length / itemsPerPage)).keys()].map(number => (
                    <button key={number} onClick={() => paginate(number + 1)}>
                        {number + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Board;