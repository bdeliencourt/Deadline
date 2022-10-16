import React, { useContext } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import "../css/menu.css";
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

const Menu: React.FC = () => {

  const {userToken, setUserToken} = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {

    axios(`${process.env.REACT_APP_SERVER_IP}/logout`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      withCredentials: true,
    })
      .then((response) => {
        // Reset token
        setUserToken && setUserToken(""); 
        navigate("/");
      })
      .catch((error) => {
       
      });
  };

  const deleteAccount = () => {
    
    axios(`${process.env.REACT_APP_SERVER_IP}/delete-account`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Authorization": `Bearer ${userToken}`
      },
      withCredentials: true,
    })
      .then((response) => {
        // Reset and got back to login screen
        setUserToken && setUserToken(""); 
        navigate("/");
      })
      .catch((error) => {
        navigate("/dashboard");
      });


  }

  return (
    <Navbar expand="lg" className="mb-3" bg="dark">
      <Container fluid>
        <Navbar.Toggle className="navbar-dark" aria-controls="offcanvasNavbar-expand-xxl" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-xxl"
          aria-labelledby="offcanvasNavbar-expand-xxl"
          placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-xxl">
              <div className="brandMenu darkBrand">Deadline</div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="subMenuOffCanvas">
              <small>
                <strong>Navigation</strong>
              </small>
              <Nav className="subMenuOffCanvasLinks">
                <Link className="navLink" to="/dashboard">
                  Dashboard
                </Link>
              </Nav>
            </div>
            <div className="subMenuOffCanvas">
              <small>
                <strong>Account</strong>
              </small>
              <Nav className="subMenuOffCanvasLinks">
                <div>
                  <Link className="navLink" to="" onClick={() => logOut()}>
                  Log-out
                  </Link>
                </div>
                <Link className="navLink" to="" onClick={() => deleteAccount()}>
                  Delete your account
                </Link>
              </Nav>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Navbar.Brand className="brandMenu lightBrand" href="/dashboard">
          Deadline
        </Navbar.Brand>
        <Nav>
          <Nav.Link>
            <Link className="navLink" to="/edit-profile"></Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
