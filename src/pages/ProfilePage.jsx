import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import MyEvents from "../components/MyEvents";
import MyPost from "../components/MyPost";
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
  background-color: rgb(229, 138, 34);
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
  background: black;
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
  background: black;
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
  background-color: rgb(229, 138, 34);
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
  width: 140px;
  height: 120px;
  align-items: center;
`;

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(true);
  const { userId } = useParams();
  const { getToken } = useContext(AuthContext);
  const { logoutUser } = useContext(AuthContext);
  const token = getToken();
  const deleteUser = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      logoutUser();
    } catch (err) {
      console.log(err);
    }
  };

  const getProfile = async () => {
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
      setIsUpdated(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, [isUpdated]);

  return (
    <ProfileDiv>
      {user !== null && (
        <>
          <ProfileInfo>
            <ProfileImg src={user.imageUrl} alt="userPhoto" />
            <Link to={"/edit-profile"}>
              <LoginButton>Edit</LoginButton>
            </Link>
            <h6>Name:{user.username}</h6>
            <h6>Sport:{user.sport}</h6>
            <h6>Team:{user.team}</h6>
            <h6>{user.types}</h6>
            <p>{user.overview}</p>
            <DeleteButton onClick={deleteUser}>Delete</DeleteButton>
          </ProfileInfo>
          <List>
            {user.types === "Scouter" &&
              user.Events.map((el) => {
                return (
                  <Card>
                    <img src={el.imageUrl} alt="postPhoto" />
                    <h1>{el.author && el.author.username}</h1>
                    <p>{el.description}</p>
                    <MyEvents
                      events={user.Events}
                      setIsUpdated={setIsUpdated}
                    />
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
                    <MyPost posts={user.Posts} setIsUpdated={setIsUpdated} />
                  </Card>
                );
              })}
          </List>
        </>
      )}
    </ProfileDiv>
    // <h6>friends:{user.friends.length}</h6>
    //<>
    // {user.Posts.map((posts) => {
    // return (
    //  <>
    //  <img src={posts.imageUrl} alt="postphoto" />
    //<h5>{posts.description}</h5>
    //</><h5>{posts.author}</h5>
    //</>
    //);
    //</div> })}//
    //</>
  );
}

export default ProfilePage;
