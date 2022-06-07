import React from "react";
import PostCard from "../components/PostCard";
import EvenCard from "../components/EvenCard";
function FeedPage() {
  return (
    <div>
      <PostCard />
      <h1>Events: </h1>
      <EvenCard />
    </div>
  );
}

export default FeedPage;
