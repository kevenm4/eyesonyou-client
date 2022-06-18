import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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
function CreateEventFormPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");

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

  //const handleImageUrl = (e) => setImageUrl(e.target.file);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleTitle = (e) => setTitle(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handleState = (e) => setState(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title,
      description,
      imageUrl,
      city,
      address,
      state,
      country,
      date,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/event-create`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setImageUrl("");
        setTitle("");
        setDescription("");
        setDate("");
        setAddress("");
        setCity("");
        setCountry("");
        setState("");
        navigate(`/feed`);
      });
  };
  return (
    <LoginDiv>
      <h1>Create event</h1>
      <div>
        <FormLogin onSubmit={handleSubmit}>
          <label htmlFor="imageUrl"></label>
          <InputLogin
            type="file"
            name="imageUrl"
            onChange={handleFileUpload}
            placeholder="imageUrl"
          />
          <label htmlFor="title">Title</label>
          <InputLogin type="text" value={title} onChange={handleTitle} />
          <label htmlFor="country">Country</label>
          <InputLogin type="text" value={country} onChange={handleCountry} />
          <label htmlFor="state">State</label>
          <InputLogin type="text" value={state} onChange={handleState} />
          <label htmlFor="city">City</label>
          <InputLogin type="text" value={city} onChange={handleCity} />
          <label htmlFor="address">Address</label>
          <InputLogin type="text" value={address} onChange={handleAddress} />
          <label htmlFor="date">Date</label>
          <InputLogin type="date" value={date} onChange={handleDate} />
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={handleDescription}
            cols="30"
            rows="10"
          />
          <LoginButton type="submit">create</LoginButton>
        </FormLogin>
      </div>
      <Link to={"/feed"}>
        <p>Feed</p>
      </Link>
    </LoginDiv>
  );
}

export default CreateEventFormPage;
