import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";

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
  color: #2c3e50;
  font-size: 13px;
`;
const SelectLogin = styled.select`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  color: #2c3e50;
  font-size: 13px;
`;
const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: rgb(229, 138, 34);
`;
const LoginButton = styled.button`
  width: 100px;
  background: black;
  font-weight: bold;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
`;
function SignupPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sport, setSport] = useState("");
  const [team, setTeam] = useState("");
  const [types, setTypes] = useState("Player");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleSport = (e) => setSport(e.target.value);
  const handleTeam = (e) => setTeam(e.target.value);
  const handleTypes = (e) => setTypes(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password, email, sport, team, types };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/signup`, body)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <LoginDiv>
      <h1>Signup</h1>
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
          <label htmlFor="email"></label>
          <InputLogin
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="email"
          />

          <label htmlFor="password"></label>
          <InputLogin
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            placeholder="password"
          />
          <label htmlFor="sport"></label>
          <InputLogin
            type="sport"
            name="sport"
            value={sport}
            onChange={handleSport}
            placeholder="sport"
          />
          <label htmlFor="team"></label>
          <InputLogin
            type="team"
            name="team"
            value={team}
            onChange={handleTeam}
            placeholder="team"
          />

          <SelectLogin name="types" onChange={handleTypes}>
            <option value="Player">Player</option>
            <option value="Scouter">Scouter</option>
          </SelectLogin>
          <LoginButton type="submit">Sign Up</LoginButton>
        </FormLogin>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Already have an account? <Link to="/login"> Login</Link>
        </p>

        <Link to={"/"}>
          <p>Back</p>
        </Link>
      </div>
    </LoginDiv>
  );
}

export default SignupPage;
