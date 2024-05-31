import React, { useState } from 'react';
import { IoDiamondOutline } from "react-icons/io5";
import axios from 'axios';
import '../CSS/Basket.css';

//다이아를 충전하는 화면

const Charge = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const options = [
        { diamonds: 100, price: 100},
        { diamonds: 300, price: 300},
        { diamonds: 500, price: 500 },
        { diamonds: 700, price: 700 },
        { diamonds: 1000, price: 1000 }
    ];

    const addToCart = async () => {
        if (!selectedOption) {
            alert("다이아를 선택해 주세요.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/api/addToCart', {
                id: user.id,
                name: user.name,
                diamonds: selectedOption.diamonds,
                price: selectedOption.price
            });
            alert("장바구니에 추가되었습니다.");
        } catch (error) {
            console.error('장바구니 추가 실패:', error);
            alert("장바구니 추가에 실패했습니다.");
        }
    };

    const paymentReady = async() => {
        if (!selectedOption) {
            alert("다이아를 선택해 주세요.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/api/paymentReady', {
                id: user.id,
                diamonds: selectedOption.diamonds,
                price: selectedOption.price
            });
            alert("결제페이지에 추가되었습니다.");
        } catch (error) {
            console.error('장바구니 추가 실패:', error);
            alert("결제페이지 추가에 실패했습니다.");
        }
    };


    return (
        <div style={{ textAlign: 'center' }}>
            <h1>다이아 충전</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '600px', margin: 'auto' }}>
                {options.map((option, index) => (
                    <div key={index} style={{ width: '120px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px' }}>
                        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
                            <IoDiamondOutline size="50px" color="#4A90E2" />
                            <div style={{ fontSize: '20px', marginTop: '10px' }}>{option.diamonds} 개</div>
                            <input
                                type="radio"
                                name="diamonds"
                                value={option.diamonds}
                                checked={selectedOption?.diamonds === option.diamonds}
                                onChange={() => setSelectedOption(option)}
                                style={{ marginTop: '10px' }}
                            />
                        </label>
                        <div style={{ fontSize: '18px', color: '#4A90E2', fontWeight: 'bold', marginTop: '10px' }}>{option.price} 원</div>
                    </div>
                ))}
            </div>
            <div className='basketContainer'>
            <button onClick={addToCart} style={{marginRight:"40px"}} >장바구니에 추가</button>
            <button onClick={paymentReady} style={{width:"150px"}}>구매하기</button>
            </div>
        </div>
    );
};

export default Charge;