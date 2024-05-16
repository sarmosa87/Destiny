import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import List from './MemberShip/List';
import RanChat from './Chatting/RanChat';
import Charge from './Diamond/Charge';
import BasketList from './Basket/BasketList';
import Pay from './Payment/Pay';
import Board from './Board/Board';
import PaymentList from './Payment/PaymentList';
import SignUp from './MemberShip/SignUp';
import Login from './MemberShip/Login';
import RanChatList from './Chatting/RanChatList';
import Write from './Board/Write';
import Pay2 from './Payment/Pay.2';
import PayScreen from './Payment/PayScreen';


function App() {


  return (
<Router>
    <div>
    <Header/>
    
      <Routes>
        <Route path="/addUser" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userList" element={<List />} />
        <Route path="/ranChat" element={<RanChat />} />
        <Route path="/ranChatList" element={<RanChatList />} />
        <Route path="/write" element={<Write />} />
        <Route path="/board" element={<Board />} />
        <Route path="/charge" element={<Charge />} />
        <Route path="/basket" element={<BasketList />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/payScreen" element={<PayScreen />} />
        <Route path="/payList" element={<PaymentList />} />
      </Routes>
  
  </div>
  </Router>
  );
}
export default App;