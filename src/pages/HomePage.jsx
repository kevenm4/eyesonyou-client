import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  background-color: light;
  background-repeat: no-repeat;
  background-size: 375px 300px;
`;
const EyesLogo = styled.h1`
  font-size: 60px;
`;
const Slogan = styled.p`
  font-size: 20px;
`;
const DivMain = styled.div`
  height: 50vh;
`;
const DivSecond = styled.div`
  height: 70vh;
  background-color: rgb(0, 92, 255);
  color: white;
  padding-top: 100px;
`;

const MainP = styled.p`
  margin: 8px 0px 10px 0px;
`;

function HomePage() {
  return (
    <DivMain>
      <MainPage>
        <EyesLogo>Eyes On You</EyesLogo>
        <Slogan>You can get and give oportunities</Slogan>
      </MainPage>
      <DivSecond>
        <h1>About Us</h1>
        <MainP>
          We are Eyes On You our main goal is give the eyes who don´t see the
          diamond and give the diamond the opportunity to shine,we are a
          community formed for player looking for their moment to shine and
          scouters looking for player,we want to make easy e more flexible the
          Scouter work and for these player opportunity to show theirs skills.
        </MainP>
      </DivSecond>
    </DivMain>
  );
}

export default HomePage;
