import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function PostCard() {
  const [post, setPost] = useState([]);
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const getPostCard = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/post`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPost(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostCard();
  }, []);

  return (
    <div>
      <>
        {post.map((posts) => {
          return (
            <>
              <img src={posts.imageUrl} alt="postphoto" />
              <h6>{posts.title}</h6>
              <h6>{posts.description}</h6>
              <h6>{posts.author && posts.author.username}</h6>
              <h6>{posts.Usercomments}</h6>
            </>
          );
        })}
      </>
    </div>
  );
}

export default PostCard;
