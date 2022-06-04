import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function SignupPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sport, setSport] = useState("");
  const [team, setTeam] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleSport = (e) => setSport(e.target.value);
  const handleTeam = (e) => setTeam(e.target.value);
  const handleImageUrl = (file) => setImageUrl(file);
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password, email, sport, team, imageUrl };

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
    <div>
      <h1>Signup</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsername}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />
          <label htmlFor="sport">Sport</label>
          <input
            type="sport"
            name="sport"
            value={sport}
            onChange={handleSport}
          />
          <label htmlFor="team">Team</label>
          <input type="team" name="team" value={team} onChange={handleTeam} />
          <label htmlFor="imageUrl">User Image</label>
          <input
            type="file"
            name="imageUrl"
            value={imageUrl}
            onChange={handleImageUrl}
          />
          <button type="submit">Sign Up</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Already have an account?</p>
        <Link to="/login"> Login</Link>
      </div>
    </div>
  );
}

export default SignupPage;
