import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
function EditProfile() {
  const [username, setUsername] = useState("");
  const [sport, setSport] = useState("");
  const [team, setTeam] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const navigate = useNavigate();
  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };
  const handleUsername = (e) => setUsername(e.target.value);
  const handleSport = (e) => setSport(e.target.value);
  const handleTeam = (e) => setTeam(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { username, sport, team, imageUrl };
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSport("");
        setImageUrl("");
        setTeam("");
        setUsername("");
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
        <label htmlFor="imageUrl">Image</label>
        <input type="file" name="imageUrl" onChange={handleFileUpload} />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default EditProfile;
