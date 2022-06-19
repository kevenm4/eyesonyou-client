import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
const LoginButton = styled.button`
  width: 100px;
  background:  rgb(0, 92, 255);
  font-weight: bold;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
`;
const TextArea = styled.textarea`
  width: 90%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  margin: 5px;
`;
function CommentsInput(props) {
  const { eventId, getDetail } = props;
  const [text, setText] = useState("");
  const [Author, setAuthor] = useState("");
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const navigate = useNavigate();
  const handleText = (e) => setText(e.target.value);
  const handleAuthor = (e) => setAuthor(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { text, Author };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/event/${eventId}/comment`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setText("");
        getDetail();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text"></label>
        <TextArea
          type="text"
          name="text"
          cols="30"
          rows="10"
          value={text}
          onChange={handleText}
        />
        <LoginButton type="submit">comment</LoginButton>
      </form>
    </div>
  );
}

export default CommentsInput;
