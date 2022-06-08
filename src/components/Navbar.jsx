import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";

const Nav = styled.nav``;
const NavDiv = styled.div`
  height: 50px;
`;
function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  return (
    <NavDiv>
      <nav>
        {isLoggedIn && (
          <>
            <Link to={"/"}>
              <button>Home</button>
            </Link>
            <Link to={"/createpost"}>
              <button>create post</button>
            </Link>
            <Link to={"/createevent"}>
              <button>create event</button>
            </Link>
            <button onClick={logoutUser}>Logout</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </nav>
    </NavDiv>
  );
}

export default Navbar;
