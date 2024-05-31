import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentItem from './PaymentItem';
import '../CSS/Payment.css';


//다이아 결제리스트를 출력하는 화면

const Pay = () => {
    const [lists, setLists] = useState([]);
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'))|| {};
    

    // 아임포트 스크립트 로딩
    useEffect(() => {
        // jQuery와 아임포트 스크립트 동적 로드
        const jqueryScript = document.createElement('script');
        jqueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
        document.body.appendChild(jqueryScript);
      
        const iamportScript = document.createElement('script');
        iamportScript.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js";
        jqueryScript.onload = () => {
          document.body.appendChild(iamportScript);
        };
      
        iamportScript.onload = () => {
          initIamport();
        };
      
        return () => {
          if (document.body.contains(jqueryScript)) {
            document.body.removeChild(jqueryScript);
          }
          if (document.body.contains(iamportScript)) {
            document.body.removeChild(iamportScript);
          }
        };
      }, []);

    // 주문 목록 불러오기
    useEffect(() => {
        if (user.id) {
            axios.get(`http://localhost:8081/api/payList/${user.id}`)
                .then(response => {
                    if (response.status === 200) {
                        setLists(response.data);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        switch(error.response.status) {
                            case 400:
                                setError("사용자 ID가 제공되지 않았습니다.");
                                break;
                            case 404:
                                setError("주문 리스트를 찾을 수 없습니다.");
                                break;
                            case 500:
                                setError("서버 내부 오류가 발생했습니다.");
                                break;
                            default:
                                setError("알 수 없는 오류가 발생했습니다.");
                        }
                    } else {
                        setError("서버에 연결할 수 없습니다.");
                    }
                });
        }
    }, [user.id]);

    const initIamport = () => {
        if (typeof window.IMP !== "undefined") {
            window.IMP.init('imp85206416');
        } else {
            console.error('IMP 라이브러리가 정의되지 않았습니다.');
        }
    };
    const handlePayment = () => {
        const { IMP } = window;
        if (IMP) {
            IMP.request_pay({
                pg: 'html5_inicis',
                pay_method: 'card',
                merchant_uid: `mid_${new Date().getTime()}`,
                name: '다이아 주문',
                amount: totalPrice,
                buyer_email: 'iamport@siot.do',
                buyer_name: user.name,
                buyer_tel: '010-1234-5678',
                buyer_addr: '서울특별시 강남구 삼성동',
                buyer_postcode: '123-456',
                m_redirect_url: 'https://www.yourdomain.com/payments/complete'
            }, function (rsp) {
                if (rsp.success) {
                    alert('결제가 완료되었습니다.');

                    const payment = async () => {

                        const selectedOrderNumbers = lists
                        .filter(item => item.checked)
                        .map(item => item.orderNumber);
   
                        try {
                            const response = await axios.post('http://localhost:8081/api/payConfrim', { 
                                orderNumbers: selectedOrderNumbers
                            });
                            alert("데이터전송 완료")
                        } catch (error) {
                            if (error.response && error.response.status === 409) {
                                alert("데이터전송 실패")
                            } else {
                                alert("서버 오류")
                            }
                        }
                    };

                    payment()
                } else {
                    alert(`결제 실패: ${rsp.error_msg}`);
                    console.log(rsp.error_msg);
                }
            });
        }
    };


    const onRemove = async (orderNumber) => {


        const confirmDelete = window.confirm('삭제하시겠습니까?');
        if (!confirmDelete) {
        // 사용자가 '취소'를 선택한 경우, 함수 실행을 중단
        return;
        }


        try {

      
            const res = await axios.post('http://localhost:8081/api/paymentRemove', {
                orderNumber: orderNumber
         
            });

            if (res.status === 200) {
                alert('삭제가 완료됐습니다.');
                setLists(current => current.filter(item => item.orderNumber !== orderNumber)); // 삭제된 게시물 제거
            }
 
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('삭제할 정보가 없습니다.');
            } else {
                alert('서버 오류가 발생했습니다.');
            }
        }
    };

    



    const handleToggle = index => {
        const newLists = lists.map((item, i) => {
            if (i === index) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setLists(newLists);
        calculateTotal(newLists);
    };

    const handleDelete = index => {
        const newLists = lists.filter((_, i) => i !== index);
        setLists(newLists);
        calculateTotal(newLists);
    };

    const calculateTotal = (items) => {
        const total = items.filter(item => item.checked).reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>주문 결제</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '2px solid black', padding: '10px' }}>
                <span >체크박스</span>
                <span>순번</span>
                <span>다이아몬드</span>
                <span>금액</span>
                <span>기능</span>
            </div>
            {lists.map((item, index) => (
                <PaymentItem key={index} item={item} index={index} onToggle={handleToggle} onRemove={onRemove} />
            ))}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <p>합계 금액: {totalPrice} 원</p>
                <div className='paymentContainer'>
                <button onClick={handlePayment} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>결제하기</button>
                </div>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
    );
};

export default Pay;