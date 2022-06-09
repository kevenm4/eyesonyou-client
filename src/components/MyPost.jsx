import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import styled from "styled-components";
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
function MyPost(props) {
  const posts = props.posts;
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const deletePost = async (postId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      props.setIsUpdated(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {posts.map((item) => {
        return (
          <div>
            <DeleteButton
              onClick={() => {
                deletePost(item._id);
              }}
            >
              Delete Post
            </DeleteButton>
          </div>
        );
      })}
    </div>
  );
}

export default MyPost;
