import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
function Navbar() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <nav>
        {isLoggedIn && (
          <>
            <Link to="/feed">
              <button>Feed</button>
            </Link>
            <Link to={`profile/${user._id}`}>
              <button>Profile</button>
            </Link>
            <button onClick={logoutUser}>Logout</button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
