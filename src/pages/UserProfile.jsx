import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
    <div>
      {user !== null && (
        <>
          <img src={user.imageUrl} alt="userPhoto" /> 
          <h6>Name:{user.username}</h6>
          <h6>Sport:{user.sport}</h6>
          <h6>Team:{user.team}</h6>
          <h6>types:{user.types}</h6>
          <h6>Friends: {user.friends.length}</h6>
          <h6>
            Events:
            {user.Events.map((el) => {
              return <h1>{el.title}</h1>;
            })}
          </h6>
          <h6>
            Posts:
            {user.Posts.map((el) => {
              return <h1>{el.title}</h1>;
            })}
          </h6>
        </>
      )}
    </div>
  );
}

export default UserProfile;
