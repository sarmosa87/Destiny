import React,{useState,useEffect} from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IoDiamondOutline } from "react-icons/io5";
import '../CSS/Header.css'; 
import Post from '../Post/Post';

//네비바를 관리하는 화면


const Header=({users,logout2})=>{

  const { name, diamonds } = users || {};


useEffect(() => {
    
}, [users]);



const [postShow,setPostShow] = useState('')

const onOpen=(event) => {
  event.stopPropagation();
  setPostShow(true)

}

const onClose =(event) => {

  event.stopPropagation();
  setPostShow(false)
  console.log(postShow)

}


return (

    <Navbar bg="green" expand="lg">
    <Container >

      {
        users &&(
          <div style={{color:'blue'}}>
            <span style={{marginLeft:'1330px', fontSize:'13px'}}>{name}님 반갑습니다.</span>
            <span style={{marginLeft:'10px',fontSize:'13px'}}><IoDiamondOutline /></span>
            <span style={{fontSize:'15px'}}>{diamonds}개</span>
            <button onClick={logout2} style={{
              marginLeft:'13px',
              backgroundColor:'#ffffff',
              border:'1px solid black',
              borderRadius:'20px',
              cursor:'pointer',
              boxShadow:'0 4px 8px rgba(0, 0, 0, 0.2)',
              fontSize:'13px',
              }}>
              LogOut
              </button>
          </div>
        )
      }

    {
        !users &&(
          <div style={{height:'24px'}}>
          </div>
          

        )
      }

    <LinkContainer to="/">
        <Navbar.Brand id='header'>Destiny</Navbar.Brand>
   </LinkContainer>
               <div className='topmenu'>
                    <LinkContainer to="/post">
                          <div className='detailMenu' >
                            <img src="/image/Post.PNG" alt="post" width={28} />                     
                            쪽지함                
                        </div>
                    </LinkContainer>
                    <LinkContainer to="/login" >
                        <div>
                            <img src="/image/Login.PNG" alt="login" />
                            로그인/회원가입
                        </div>
                    </LinkContainer>
                </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      </div>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="menu">
          <LinkContainer to="/userList">
            <Nav.Link>이상형찾기</Nav.Link>
          </LinkContainer>
          <div className="dropdown">
          <Nav.Link className="dropbtn">채팅</Nav.Link>
          <div className="dropdown-content">
            <LinkContainer to="/ranChat">
              <Nav.Link>랜덤채팅</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/ranChatList">
              <Nav.Link>지난대화</Nav.Link>
            </LinkContainer>
          </div>
          </div>
          <div className="dropdown">
          <Nav.Link className="dropbtn">게시판</Nav.Link>
          <div className="dropdown-content">
          <LinkContainer to="/write">
            <Nav.Link>글쓰기</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/board">
            <Nav.Link>자유게시판</Nav.Link>
          </LinkContainer>
          </div>
          </div>
          <LinkContainer to="/charge">
            <Nav.Link>다이아충전</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/basket">
            <Nav.Link>장바구니</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/pay">
            <Nav.Link>결제</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
};

export default Header;

