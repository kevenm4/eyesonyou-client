import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import MyEvents from "../components/MyEvents";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isUpdated, setIsUpdated] = useState(true);
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
  const { logoutUser } = useContext(AuthContext);
  const token = getToken();

  console.log(user);
  const deleteUser = async () => {
    try {
      let response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
    <div>
      {user !== null && (
        <>
          <img src={user.imageUrl} alt="userPhoto" />
          <Link to={"/edit-profile"}>
            <button>Edit</button>
          </Link>
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
              return (
                <>
                  <h1>{el.author && el.author.username}</h1>
                  <p>{el.description}</p>
                </>
              );
            })}
          </h6>
          <MyEvents events={user.Events} setIsUpdated={setIsUpdated} />
        </>
      )}
      <button onClick={deleteUser}>Delete Account</button>
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
