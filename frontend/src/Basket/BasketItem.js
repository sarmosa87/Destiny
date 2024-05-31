import React from 'react';
import { IoDiamondOutline } from "react-icons/io5";

//장바구니 리스트 별 데이터를 출력하는 화면


const Item = ({ item, index }) => {

    const {diamonds,price,basketDate} = item

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <span style={{marginLeft:'20px'}}>{index + 1}</span>
            <span style={{marginLeft:'70px'}}><IoDiamondOutline /> {diamonds}</span>
            <span style={{marginLeft:'30px'}}>{basketDate}</span>
            <span>{price}원</span>
        </div>
    );
};

export default Item;