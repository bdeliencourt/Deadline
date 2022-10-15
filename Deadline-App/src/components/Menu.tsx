import React from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <Navbar expand="lg" className="mb-3" bg="dark">
      <Container fluid>
        <Navbar.Toggle className="navbar-dark" aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-lg"
          aria-labelledby="offcanvasNavbar-expand-lg"
          placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              <div className="brandMenu darkBrand">Deadline</div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Navbar.Brand className="brandMenu lightBrand" href="/dashboard">
          Deadline
        </Navbar.Brand>
        <Nav>
          <Nav.Link>
            <Link className="navLink" to="/edit-profile">
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
