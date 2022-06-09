import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import CommentsInput from "./CommentsInput";
import styled from "styled-components";
const PostsList = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;
  font-family: arial;
  background-color: rgb(229, 138, 34);
  gap: 20px;
  display: flex;
  flex-direction: column;
`;
const Card = styled.div`
background-color: white;
border-radius: 5px;
padding: 1rem;
`
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
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostCard();
  }, []);

  return (
    <PostsList>
        {post &&
          post.map((posts) => {
            return (
              <Card key={posts._id}>
                <h6>
                  <b>{posts.author.username}</b>
                </h6>
                <img src={posts.imageUrl} alt="postphoto" />
                <h6>{posts.description}</h6>
                <hr />
                <p>
                  {posts.Usercomments.map((el) => {
                    return (
                      <>
                        {/*  <p>
                        {el.author.username}
                      </p> */}
                        <p>{el.text}</p>
                      </>
                    );
                  })}
                </p>
                <p>{posts.Usercomments && posts.Usercomments.text}</p>
                <CommentsInput id={posts._id} />
              </Card>
            );
          })}
    </PostsList>
  );
}

export default PostCard;
