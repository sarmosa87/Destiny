import React, { useEffect, useState } from 'react';

function Payment() {
  const [amount, setAmount] = useState(''); // 결제 금액을 상태로 관리

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

  const initIamport = () => {
    const { IMP } = window; // IMP 객체 추출
    IMP.init('imp85206416'); // 가맹점 식별코드 초기화
  };

  const handlePayment = () => {
    const { IMP } = window;
    IMP.request_pay({
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      name: '주문명:결제테스트', // 주문명
      amount: amount, // 결제 금액
      buyer_email: 'iamport@siot.do',
      buyer_name: '구매자이름',
      buyer_tel: '010-1234-5678', // 구매자 전화번호
      buyer_addr: '서울특별시 강남구 삼성동',
      buyer_postcode: '123-456',
      m_redirect_url: 'https://www.yourdomain.com/payments/complete' // 모바일 결제시 리다이렉트 주소
    }, function (rsp) {
      if (rsp.success) {
        alert('결제가 완료되었습니다.');
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
        console.log( `${rsp.error_msg}`)
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="결제 금액 입력"
      />
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
}

export default Payment;