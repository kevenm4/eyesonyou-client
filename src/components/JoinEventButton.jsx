import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function JoinEventButton() {
  const [join, setJoin] = useState([]);
  const { eventId } = useParams();
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/event/${eventId}/join`, {
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
