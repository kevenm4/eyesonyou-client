import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
function LoginPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, body)
      .then((response) => {
        console.log(response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/feed");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button type="submit">Login</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Don´t have an account?</p>
        <Link to="/signup"> Sign up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
