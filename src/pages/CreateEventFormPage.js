import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function CreateEventFormPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const { getToken, user } = useContext(AuthContext);
  const token = getToken();
  const navigate = useNavigate();

  //const handleImageUrl = (e) => setImageUrl(e.target.file);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleTitle = (e) => setTitle(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { title, description };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/event-create`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        // setImageUrl("");
        setDescription("");
        navigate(`/feed`);
      });
  };
  return (
    <div>
      <h1>Create event</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {/*  <label htmlFor="imageUrl">event Image</label>
          <input
            type="file"
            name="imageUrl"
            value={imageUrl}
            onChange={handleImageUrl}
          /> */}
          <label htmlFor="">Title</label>
          <input type="text" value={title} onChange={handleTitle} />
          <label htmlFor="description">event description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleDescription}
          />
          <button type="submit">create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventFormPage;
