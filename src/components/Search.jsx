import React, { useState } from "react";
import styled from "styled-components";
const InputLogin = styled.input`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 300px;
  box-sizing: border-box;
  color: #2c3e50;
  font-size: 13px;
`;
function Search(props) {
  const [search, setSearch] = useState("");
  const { userSearch } = props;
  const handleSearch = (e) => {
    setSearch(e.target.value);
    userSearch(e.target.value);
  };
  return (
    <div>
      <InputLogin
        className="sbInput"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for user"
      />
    </div>
  );
}

export default Search;
