import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import SearchInput from "../components/SearchInput";
function SearchPage() {
  return (
    <div>
      <SearchInput />
    </div>
  );
}

export default SearchPage;
