import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
import axios from "axios";

const FormLogin = styled.form`
  background: white;
  border: 1px solid black;
  border-radius: 3px;
  padding: 20px 30px;
  box-sizing: border-box;
  width: 80%;
  margin: 0 10%;
  position: relative;
`;
const InputLogin = styled.input`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: montserrat;
  color: #2c3e50;
  font-size: 13px;
`;
const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-content: center;
`;
const LoginButton = styled.button`
  width: 100px;
  background: #27ae60;
  font-weight: bold;
  color: white;
  border: 0 none;
  border-radius: 1px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
`;
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
        const token = response.data.authToken;
        /* console.log(response.data.authToken); */
        storeToken(token);
        authenticateUser();
        navigate("/feed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LoginDiv>
      <h1>Login</h1>
      <div>
        <FormLogin onSubmit={handleSubmit}>
          <label htmlFor="username"></label>
          <InputLogin
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
            placeholder="username"
          />
          <label htmlFor="password"></label>
          <InputLogin
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="password"
          />

          <button type="submit">Login</button>
        </FormLogin>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Don´t have an account?</p>
        <Link to="/signup"> Sign up</Link>
        <Link to={"/"}>
          <p>Back</p>
        </Link>
      </div>
    </LoginDiv>
  );
}

export default LoginPage;
