import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import JoinEventButton from "./JoinEventButton";
function EvenCard() {
  const [event, setEvent] = useState([]);
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const getEventCard = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/event`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvent(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getEventCard();
  }, []);
  return (
    <div>
      <>
        {event.map((events) => {
          return (
            <>
              <img src={events.imageUrl} alt="eventphoto" />
              <h6>{events.title}</h6>
              <h6>{events.description}</h6>
              <h6>{events.author && events.author.username}</h6>
              <JoinEventButton />
            </>
          );
        })}
      </>
    </div>
  );
}

export default EvenCard;
