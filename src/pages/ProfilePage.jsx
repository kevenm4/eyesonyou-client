import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
function ProfilePage() {
  const [users, setUsers] = useState(null);
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
  const { user, logoutUser } = useContext(AuthContext);
  const token = getToken();

  const deleteUser = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate(`/`);
        logoutUser();
      });
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
      setUsers(response.data);
      console.log(response.data.friends);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {users !== null && (
        <>
          <img src={users.imageUrl} alt="userPhoto" />
          <Link to={"/edit-profile"}>
            <button>Edit</button>
          </Link>
          <h6>Name:{users.username}</h6>
          <h6>Sport:{users.sport}</h6>
          <h6>Team:{users.team}</h6>
          <h6>types:{users.types}</h6>
          <h6>Friends: {users.friends.length}</h6>
          <h6>
            Events:{" "}
            {users.Events.map((el) => {
              return <h1>{el.title}</h1>;
            })}
          </h6>
          <h6>
            Posts:
            {users.Posts.map((el) => {
              return <h1>{el.title}</h1>;
            })}
          </h6>
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
