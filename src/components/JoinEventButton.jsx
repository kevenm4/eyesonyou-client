import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
const JoinButton = styled.button`
  border: 1px solid black;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
`;
function JoinEventButton(props) {
  const { id } = props;
  const { getToken } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const goEvent = () => {
    const body = {};
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/event/${id}/join`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate(`/list-join`);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <JoinButton type="submit" onClick={() => goEvent()}>
          Join
        </JoinButton>
        {/* <JoinButton type="submit">Join</JoinButton> */}
      </form>
    </div>
  );
}

export default JoinEventButton;
