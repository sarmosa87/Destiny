import React from 'react';
import '../CSS/Style.css'

const Item = ({ item, imagePath, onItemClick }) => {
    const { id, name, logChk, tall, weight, distance, gender, saveFileName } = item;

    const handleClick = () => {

    if(logChk==='false'){
        alert('로그아웃상태라 채팅이 불가합니다.')
    }else{
     onItemClick(item);
    }
    };

    return (
        <li onClick={handleClick}>
            <img src={`http://localhost:8081/image/${saveFileName}`} alt={name} />
            <p>이름: {name}</p>
            <p>키: {tall}</p>
            <p>몸무게: {weight}</p>
            <p>거리: {distance}</p>
            <p>성별: {gender}</p>
            <p>로그인: {logChk === 'false' ? '로그아웃' : '로그인'}</p>
        </li>
    );
};

export default Item;