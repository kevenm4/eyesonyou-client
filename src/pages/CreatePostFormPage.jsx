import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function CreatePostFormPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const { userId } = useParams();
  const { getToken, user } = useContext(AuthContext);
  const token = getToken();
  const navigate = useNavigate();

  const handleImageUrl = (e) => setImageUrl(e.target.file);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { imageUrl, description };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/user/${user._id}/post`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setImageUrl("");
        setDescription("");
        navigate("/feed");
      });
  };

  return (
    <div>
      <h1>Create Post</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="imageUrl">Post Image</label>
          <input
            type="file"
            name="imageUrl"
            value={imageUrl}
            onChange={handleImageUrl}
          />
          <label htmlFor="description">Post description</label>
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

export default CreatePostFormPage;
