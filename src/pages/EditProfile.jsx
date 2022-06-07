import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
function EditProfile() {
  const [username, setUsername] = useState("");
  const [sport, setSport] = useState("");
  const [team, setTeam] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const navigate = useNavigate();
  const handleUsername = (e) => setUsername(e.target.value);
  const handleSport = (e) => setSport(e.target.value);
  const handleTeam = (e) => setTeam(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { username,sport, team };
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/feed");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />
        <label htmlFor="sport">Sport</label>
        <input type="sport" name="sport" value={sport} onChange={handleSport} />
        <label htmlFor="team">Team</label>
        <input type="team" name="team" value={team} onChange={handleTeam} />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditProfile;
