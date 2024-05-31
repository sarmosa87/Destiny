import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import List from './MemberShip/List';
import RanChat from './Chatting/RanChat';
import Charge from './Diamond/Charge';
import BasketList from './Basket/BasketList';
import Pay from './Payment/Pay';
import Board from './Board/Board';
import SignUp from './MemberShip/SignUp';
import Login from './MemberShip/Login';
import RanChatList from './Chatting/RanChatList';
import Write from './Board/Write';
import Content from './Board/Content';
import Main from './Header/Main';
import Post from './Post/Post';


function App() {


  const [users, setUsers] = useState({
    
    name:'',
    diamonds:'',


  })

  const updateUser = (users) => {
    setUsers(users)
  };

  const logout2 = () => {
      localStorage.removeItem('user');
      setUsers(null);
};


  useEffect(() => {
    
  }, [users]);


  return (
<Router>
    <div>
    <Header users={users} logout2={logout2} />
    
      <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/post" element={<Post />} />
        <Route path="/addUser" element={<SignUp />} />
        <Route path="/login" element={<Login updateUser={updateUser} logout2={logout2} />} />
        <Route path="/userList" element={<List />} />
        <Route path="/ranChat" element={<RanChat />} />
        <Route path="/ranChatList" element={<RanChatList />} />
        <Route path="/write" element={<Write />} />
        <Route path="/board" element={<Board />} />
        <Route path="/charge" element={<Charge />} />
        <Route path="/basket" element={<BasketList />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/content/:registNum" element={<Content />} />
      </Routes>
  
  </div>
  </Router>
  );
}
export default App;