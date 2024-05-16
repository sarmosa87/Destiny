import React,{useState} from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../CSS/Header.css'; 
import PostRecieve from '../Post/PostRecieve';
import Post from '../Post/Post';


const Header=()=>{


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
      <Navbar.Brand href="/"id='header'>Itda</Navbar.Brand>
               <div className='topmenu'>
                    <LinkContainer to="/post">
                          <div className='detailMenu' onClick={onOpen} >
                            <img src="/image/Post.PNG" alt="post" width={28} />                     
                            쪽지함
                            {
                              postShow&&<Post onClose={onClose}/>
                            }                 
                        </div>
                    </LinkContainer>
                    <LinkContainer to="/login">
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
            <Nav.Link>유저리스트</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/ranChat">
            <Nav.Link>랜덤채팅</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/ranChatList">
            <Nav.Link>지난대화</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/write">
            <Nav.Link>글쓰기</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/board">
            <Nav.Link>자유게시판</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/charge">
            <Nav.Link>다이아충전</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/basket">
            <Nav.Link>장바구니</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/pay">
            <Nav.Link>결제</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/payScreen">
            <Nav.Link>결제화면</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/payList">
            <Nav.Link>결제내역</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
};

export default Header;

