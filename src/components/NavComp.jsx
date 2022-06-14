import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
import { Navbar, Container, Nav } from "react-bootstrap";
function NavComp() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Eyes On You</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to={`/profile/${user._id}`}>
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to={"/feed"}>
                  Feed
                </Nav.Link>
                <Nav.Link as={Link} to={"/search"}>
                  Search
                </Nav.Link>
                <Nav.Link as={Link} to={"/createevent"}>
                  Create event
                </Nav.Link>
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComp;
