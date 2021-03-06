import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
const FeedInfo = styled.div`
  padding: 10px;
  gap: 15px;
  display: flex;
  flex-direction: column;
`;
const EventCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 600px;
  text-align: center;
  font-family: arial;
  background-color: light;
  gap: 20px;
`;
const Card = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
`;
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: light;
`;
function FeedPage() {
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
    <Wrapper>
      <FeedInfo>
        <EventCard>
          {event &&
            event.map((events) => {
              return (
                <>
                  <h6>
                    <Link to={`/userprofile/${events.Author._id}`}>
                      <b>{events.Author.username}</b>
                    </Link>
                  </h6>
                  <Card>
                    <Link to={`/event/${events._id}`}>
                      <img src={events.imageUrl} alt="eventphoto" />
                    </Link>

                    <h6>{events.title}</h6>
                    <h6>{events.description}</h6>
                  </Card>
                </>
              );
            })}
        </EventCard>
      </FeedInfo>
    </Wrapper>
  );
}

export default FeedPage;
