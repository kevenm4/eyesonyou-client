import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import CommentsInput from "./CommentsInput";

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
              <p>
                {posts.Usercomments.map((el) => {
                  return (
                    <p>
                      {el.author && el.author.username}
                      {el.text}
                    </p>
                  );
                })}
              </p>
              <p>{posts.Usercomments && posts.Usercomments.text}</p>
              <CommentsInput id={posts._id} />
            </>
          );
        })}
      </>
    </div>
  );
}

export default PostCard;
