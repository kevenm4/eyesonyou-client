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
            <Link to={"/createpost"}>
              <button>create post</button>
            </Link>
            <Link to={"/createevent"}>
              <button>create event</button>
            </Link>
            <Link to={"/search"}>
              <button>search</button>
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
