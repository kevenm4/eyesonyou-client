import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ProfilePage() {
  const [user, setUser] = useState([]);
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(AuthContext);

  const token = getToken();
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
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {user && (
        <div>
          <img src={user.imageUrl} alt="userPhoto" />
          <h6>Name:{user.username}</h6>
          <h6>Sport:{user.sport}</h6>
          <h6>Team:{user.team}</h6>
          <h6>Events:{user.Events}</h6>
          <h6>types:{user.types}</h6>
        </div>
      )}
    </div>
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
