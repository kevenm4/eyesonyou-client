import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState("");
  const { userId } = useParams();
  let getProfile = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/${userId}`
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
          <img src={user.image_url} alt="userPhoto" />
          <h6>Name:{user.username}</h6>
          <h6>Sport:{user.sport}</h6>
          <h6>Team:{user.team}</h6>
          <h6>Posts:{user.Posts}</h6>
          <h6>Events:{user.Events}</h6>
          <h6>Friends:{user.friends.length}</h6>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
