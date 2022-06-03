import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/login">
          <button>login</button>
        </Link>
        <Link to="/signup">
          <button>signup</button>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
