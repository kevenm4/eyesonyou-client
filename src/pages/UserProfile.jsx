import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
const ProfileDiv = styled.div`
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  align-content: center;
  background-color: light;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
`;
const Card = styled.div`
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: arial;
  background-color: white;
  padding: 1rem;
`;

const LoginButton = styled.button`
  width: 100px;
  background: rgb(0, 92, 255);
  font-weight: bold;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
`;
const DeleteButton = styled.button`
  width: 100px;
  background: red;
  font-weight: bold;
  color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 5px;
  margin: 10px 5px;
`;
const ProfileInfo = styled.div`
  border-bottom: 2px solid black;
  padding: 1rem;
  gap: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  width: 100vw;
  align-content: center;
  background-color: light;
`;
const EventCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: auto;
  text-align: center;
  font-family: arial;
  background-color: white;
`;

const ProfileImg = styled.img`
  border: 1px solid #ccc;
  border-radius: 100px;
  width: 100px;
  height: 80px;
  align-items: center;
`;

function UserProfile() {
  const [user, setUser] = useState([]);
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const token = getToken();

  const getUserProfile = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  /* 
  comment.author === user.username && button to delete
  */

  return (
    <ProfileDiv>
      {user !== null && (
        <>
          <ProfileInfo>
            <ProfileImg src={user.imageUrl} alt="userPhoto" />
            <h6>{user.username}</h6>
            <h6>{user.sport}</h6>
            <h6>{user.team}</h6>
            <h6>{user.types}</h6>
            <p>{user.overview}</p>
          </ProfileInfo>
          <List>
            {user.types === "Scouter" &&
              user.Events.map((el) => {
                return (
                  <Card>
                    <Link to={`/event/${el._id}`}>
                      <img src={el.imageUrl} alt="postPhoto" />
                    </Link>
                    <h1>{el.author && el.author.username}</h1>
                    <p>{el.description}</p>
                  </Card>
                );
              })}
          </List>
          <List>
            {user.types === "Player" &&
              user.Posts.map((el) => {
                return (
                  <Card>
                    <img src={el.imageUrl} alt="postPhoto" />
                    <h1>{el.author && el.author.username}</h1>
                    <p>{el.description}</p>
                  </Card>
                );
              })}
          </List>
        </>
      )}
    </ProfileDiv>
  );
}

export default UserProfile;
