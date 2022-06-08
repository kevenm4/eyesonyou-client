import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function FooterNav() {
  const { isLoggedIn, user, logoutUser } = useContext(AuthContext);
  return (
    <div>
      <footer>
        {isLoggedIn && (
          <>
            <Link to="/feed">
              <button>Feed</button>
            </Link>
            <Link to={`profile/${user._id}`}>
              <button>Profile</button>
            </Link>
            <Link to={"/search"}>
              <button>search</button>
            </Link>
          </>
        )}
      </footer>
    </div>
  );
}

export default FooterNav;
