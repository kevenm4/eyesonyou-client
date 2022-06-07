import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function JoinEventButton(props) {
  const { id } = props;
  const [join, setJoin] = useState([]);
  const { getToken } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {};
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/event/${id}/join`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setJoin("");
        navigate("/feed");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Join</button>
      </form>
    </div>
  );
}

export default JoinEventButton;
