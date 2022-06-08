import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40vh;
  background-image: url("https://cdn.dribbble.com/users/1241808/screenshots/5516684/media/a9f515fbf8565b6782fafbafa7616142.gif");
  background-repeat: no-repeat;
  background-size: 375px 300px;
`;

const DivMain = styled.div`
  height: 50vh;
`;
const DivSecond = styled.div`
  height: 80vh;
  background-color: black;
  color: white;
  padding-top: 60px;
`;

const MainP = styled.p``;

function HomePage() {
  return (
    <DivMain>
      <MainPage>
        <h1>Eyes On You</h1>
        <p>You can get and give oportunities</p>
      </MainPage>
      <DivSecond>
        <h1>About Us</h1>
        <MainP>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          harum optio praesentium quod quia eligendi necessitatibus placeat
          error iusto eius nesciunt, vero ex debitis doloremque dignissimos! Non
          esse iste corporis.
        </MainP>
      </DivSecond>
    </DivMain>
  );
}

export default HomePage;
