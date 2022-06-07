import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function CommentsInput(props) {
  const { id } = props;
  const [text, setText] = useState("");
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const navigate = useNavigate();
  const handleText = (e) => setText(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { text };
    axios.post(
      `${process.env.REACT_APP_API_URL}/api/post/${id}/comment`,
      body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response.data);
          setText("");
          navigate("/feed");
        })
        .catch((err) => {
          console.log(err);
        })
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text"></label>
        <input
          type="text"
          name="description"
          value={text}
          onChange={handleText}
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default CommentsInput;
