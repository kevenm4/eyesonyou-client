import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
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
const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
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
function EditProfile() {
  const [username, setUsername] = useState("");
  const [sport, setSport] = useState("");
  const [team, setTeam] = useState("");
  const [overview, setOverview] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { getToken, user } = useContext(AuthContext);
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
  const handleOverview = (e) => setOverview(e.target.value);

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
        setOverview("");
        navigate("/feed");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <LoginDiv>
      <h1>Edit Profile</h1>
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

          <label htmlFor="overview"></label>
          <InputLogin
            type="text"
            name="overview"
            value={overview}
            onChange={handleOverview}
            placeholder="Overview"
          />
          <label htmlFor="imageUrl"></label>
          <InputLogin
            type="file"
            name="imageUrl"
            onChange={handleFileUpload}
            placeholder="image"
          />
          <LoginButton type="submit">Submit</LoginButton>
        </FormLogin>
        <Link to={`/profile/${user._id}`}>
          <p>Back</p>
        </Link>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </LoginDiv>
  );
}

export default EditProfile;
