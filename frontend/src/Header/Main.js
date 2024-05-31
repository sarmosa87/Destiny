import React from "react";
import '../CSS/Main.css'; // CSS 파일 임포트
import { useNavigate } from 'react-router-dom';

//메인페이지를 출력하는 화면


const Main = () => {

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/login');
    };

    return (
        <div className="mainContainer">
            <header className="heroSection">
                <div className="heroText">
                    <h1>사랑을 찾아보세요</h1>
                    <p>당신의 운명을 만나는 곳, Destiny에서 이상형과 만나보세요!</p>
                    <button className="ctaButton" onClick={handleSignUp}>지금 시작하기</button>
                </div>
            </header>
            <section className="features">
                <div className="feature">
                    <h2 style={{textAlign:'center'}}>다양한 매칭</h2>
                    <p>이성에게 쪽지보내기와 랜덤채팅 기능을 통해서 운명을 찾아보세요</p>
                </div>
                <div className="feature">
                    <h2 style={{textAlign:'center'}}>안전한 만남</h2>
                    <p>검증된 프로필로 안전한 만남을 보장합니다.</p>
                </div>
                <div className="feature">
                    <h2 style={{textAlign:'center'}}>000-000-0000</h2>
                    <p>언제든지 필요할 때 도움을 받을 수 있는 고객 지원을 제공합니다.</p>
                </div>
            </section>
        </div>
    );
};

export default Main;