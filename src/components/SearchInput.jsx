import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function SearchInput() {
  const [search, setSearch] = useState("");
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const handleSearch = (e) => setSearch(e.target.value);
  const navigate = useNavigate();
  const getUsersName = async () => {
    const body = {search}
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/search}`, body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearch(response.data);
      console.log(search)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.prevendDefault();
    getUsersName();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleSearch}
          value={search}
          placeholder="Search your users!"
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export default SearchInput;
