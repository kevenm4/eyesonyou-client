import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  background-color: rgb(229, 138, 34);
  background-repeat: no-repeat;
  background-size: 375px 300px;
`;

const DivMain = styled.div`
  height: 50vh;
`;
const DivSecond = styled.div`
  height: 50vh;
  background-color: black;
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
