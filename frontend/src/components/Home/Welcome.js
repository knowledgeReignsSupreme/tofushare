import React from 'react';
import styled from 'styled-components';
import { cssVariables, mainColorButton } from '../../GlobalStyles';
import { Link } from 'react-router-dom';
import tofu from '../../tofufigure.png';
import { FaPlus } from 'react-icons/fa';

const Welcome = () => {
  return (
    <StyledWelcome>
      <StyledWelcomeHeader>
        <StyledText>
          <h3>ברוכים הבאים</h3>
          <h1>אתר שיתוף המתכונים הטבעוני הראשון בארץ</h1>
          <p>תתכוננו, הולך להיות טעים!</p>
        </StyledText>
        <Buttons>
          <Link to='/new-recipe'>
            <NewRecipeButton>
              <FaPlus />
              יצירת מתכון
            </NewRecipeButton>
          </Link>
        </Buttons>
      </StyledWelcomeHeader>
      <img src={tofu} alt='logo' />
    </StyledWelcome>
  );
};

const StyledWelcome = styled.div`
  margin-top: 1rem;
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  background-color: ${cssVariables.mainColorLight};

  h1 {
    color: black;
    margin-top: 0.5rem;
    font-size: 1rem;
  }
  h3 {
    color: black;
    font-size: 1.3rem;
  }
  p {
    color: black;
  }
  img {
    width: 15rem;
  }
  @media screen and (max-width: 600px) {
    width: 90%;
    height: 20vh;
    h3 {
      font-size: 1.3rem;
    }
    h1 {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
    img {
      width: 12rem;
    }
  }
  @media screen and (min-width: 601px) and (max-width: 801px) {
    width: 70%;
    height: 20vh;
    h3 {
      font-size: 1.5rem;
    }
    h1 {
      font-size: 1rem;
    }
  }
  @media screen and (min-width: 801px) and (max-width: 1000px) {
    width: 60%;
    height: 20vh;
    h3 {
      font-size: 1.5rem;
    }
    h1 {
      font-size: 1rem;
    }
  }
  @media screen and (min-width: 1001px) and (max-width: 1500) {
    width: 50%;
    height: 20vh;
    h3 {
      font-size: 1.5rem;
    }
    h1 {
      font-size: 1rem;
    }
  }
  @media screen and (min-width: 1501px) and (max-width: 2000px) {
    width: 40%;
    height: 20vh;
    h3 {
      font-size: 1.5rem;
    }
    h1 {
      font-size: 1rem;
    }
    img {
      width: 15rem;
    }
  }
  @media screen and (min-width: 2001px) {
    width: 25%;
    height: 20vh;
    h3 {
      font-size: 1.5rem;
    }
    h1 {
      font-size: 1rem;
    }
    img {
      width: 15rem;
    }
  }
`;

const StyledWelcomeHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Buttons = styled.div`
  margin-right: 0.5rem;
  svg {
    margin-left: 0.3rem;
  }
`;

const NewRecipeButton = styled(mainColorButton)``;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 70%;
  justify-content: space-between;
  margin-right: 0.5rem;
`;
export default Welcome;
