import React from "react";
import EvenCard from "../components/EvenCard";
import styled from "styled-components";

const FeedInfo = styled.div`
  padding: 10px;
  gap: 15px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(229, 138, 34);
`;
function FeedPage() {
  return (
    <Wrapper>
      <FeedInfo>
        <EvenCard />
      </FeedInfo>
    </Wrapper>
  );
}

export default FeedPage;
