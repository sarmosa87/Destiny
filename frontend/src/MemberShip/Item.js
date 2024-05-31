import React from 'react';
import '../CSS/UserList.css';

//이상형찾기 리스트 별 데이터를 출력하는 화면

const Item = ({ item,  onItemClick }) => {
    const { id, name, mbti, tall, weight, distance, gender, saveFileName } = item;

    const handleClick = () => {

     onItemClick(item);
  
    };

    return (
        <div onClick={handleClick} className='listBox'>
            <div className='photo'>
            <img src={`http://localhost:8081/image/${saveFileName}`} alt={name} style={{width:"300px",height:"300px"}} />
            </div>
            <div className='profile' style={{width:"150px"}}>
            <p>이름: {name}</p>
            <p>키: {tall}cm</p>
            <p>몸무게: {weight}kg</p>
            <p>MBTI: {mbti}</p>
            <p>성별: {gender}</p>
            </div>
        </div>
    );
};

export default Item;