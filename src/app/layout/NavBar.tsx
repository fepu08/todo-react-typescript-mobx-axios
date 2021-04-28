import { observer } from "mobx-react-lite";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useStore } from "../stores/store";

const NavBar = () => {
  const { userStore, commonStore } = useStore();
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
            <Nav.Link as={NavLink} to="/todos" exact>
              Todos
            </Nav.Link>
          </div>
          <div className="d-lg-flex">
            {commonStore.token ? (
              <Nav.Link onClick={userStore.logout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" exact>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" exact>
                  Register
                </Nav.Link>
              </>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default observer(NavBar);
