import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
const EventCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 600px;
  text-align: center;
  font-family: arial;
  background-color: rgb(229, 138, 34);
  gap: 20px;
`;
const Card = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
`;

const ProfileImg = styled.img`
  border: 1px solid #ccc;
  border-radius: 100px;
  width: 40px;
  height: 20px;
  align-items: center;
`;
function EvenCard() {
  /* const {el} = props */
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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getEventCard();
  }, []);

  return (
    <EventCard>
      {event &&
        event.map((events) => {
          return (
            <>
              <h6>
                <b>{events.Author.username}</b>
              </h6>
              <Card>
                <img src={events.imageUrl} alt="eventphoto" />
                <h6>{events.title}</h6>
                <h6>{events.description}</h6>
              </Card>
            </>
          );
        })}
    </EventCard>
  );
}

export default EvenCard;
