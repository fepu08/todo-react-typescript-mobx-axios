import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        <i className="fas fa-lg fa-check-square" />
        &nbsp; Make things done
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-block d-lg-flex flex-row justify-content-between w-100">
          <div className="d-lg-flex">
            <Nav.Link as={NavLink} to="/" exact>
              Home
            </Nav.Link>
          </div>
          <div className="d-lg-flex">
            <Nav.Link as={NavLink} to="/login" exact>
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" exact>
              Register
            </Nav.Link>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
