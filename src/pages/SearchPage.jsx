import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Search from "../components/Search";
import styled from "styled-components";
const ProfileImg = styled.img`
  border: 1px solid #ccc;
  border-radius: 100px;
  width: 100px;
  height: 80px;
  align-items: center;
`;
const DivInfo = styled.div`
  padding-top: 50px;
`;


function SearchPage() {
  const [user, setUser] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const getAllUsers = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      setSearchUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const userSearch = (search) => {
    let updatedUser = user.filter((el) => {
      const filteredByUsername = el.username
        .toLowerCase()
        .includes(search.toLowerCase());
      return filteredByUsername;
    });
    setSearchUser(updatedUser);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <Search userSearch={userSearch} />
      <div>
        {user &&
          searchUser.map((el) => {
            return (
              <DivInfo>
                <ProfileImg src={el.imageUrl} alt="userPhoto" />
                <Link to={`/userprofile/${el._id}`}>
                  <h6>{el.username}</h6>
                </Link>
              </DivInfo>
            );
          })}
      </div>
    </div>
  );
}

export default SearchPage;
