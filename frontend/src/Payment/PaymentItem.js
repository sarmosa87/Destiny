import React from 'react';

//다이아 결제리스트 별 데이터를 출력하는 화면

const PaymentItem = ({ item, index, onToggle, onRemove }) => {


    const {diamonds,price,orderNumber} = item
    
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc'}}>
            <input style={{marginLeft:'25px'}}
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggle(index)}
            />
            <span style={{marginLeft:'40px'}}>{index + 1}</span>
            <span style={{marginLeft:'40px'}}>{diamonds} 개</span>
            <span style={{marginLeft:'30px'}}>{price} 원</span>
            <button  onClick={() => onRemove(orderNumber)} style={{ color: 'red', cursor: 'pointer' }}>삭제</button>
        </div>
    );
};

export default PaymentItem;