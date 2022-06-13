import React, { useState } from "react";

function Search(props) {
  const [search, setSearch] = useState("");
  const { userSearch } = props;
  const handleSearch = (e) => {
    setSearch(e.target.value);
    userSearch(e.target.value);
  };
  return (
    <div>
      <input
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
