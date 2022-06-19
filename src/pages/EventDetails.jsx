import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import CommentsInput from "../components/CommentsInput";
import styled from "styled-components";
const AllComments = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  background-color: white;
  padding: 2px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;
function EventDetails() {
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const getDetail = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/event/${eventId}`,
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
    getDetail();
  }, []);
  return (
    <div>
      {event && (
        <>
          <img src={event.imageUrl} alt="eventImg" />
          <h5>{event.title}</h5>
          <p>{event.description}</p>
          <p>Country:{event.country}</p>
          <p>State:{event.state}</p>
          <p>City:{event.city}</p>
          <p>Address:{event.address}</p>
          <p>Date:{event.date}</p>
          <>
            {event.join.map((joins) => {
              return (
                <>
                  <p>{joins.username}</p>
                </>
              );
            })}
          </>
          <AllComments>
            {event.comments.map((el) => {
              return (
                <>
                  <p>{el.Author.username}</p>
                  <p>{el.text}</p>
                </>
              );
            })}
          </AllComments>
          <CommentsInput eventId={event._id} getDetail={getDetail} />
        </>
      )}
    </div>
  );
}

export default EventDetails;
