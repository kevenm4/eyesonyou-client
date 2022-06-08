import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const { getToken } = useContext(AuthContext);
  const token = getToken();
  const handleSearch = (e) => setSearchInput(e.target.value);
  const navigate = useNavigate();

  console.log(searchInput)

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const body = { username: searchInput}
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/search`, body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //setSearch(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchInput"
          onChange={handleSearch}
          value={searchInput}
          placeholder="Search your users!"
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export default SearchInput;
