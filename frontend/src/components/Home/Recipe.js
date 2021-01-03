import React from 'react';
import { cssVariables } from '../../GlobalStyles';
import styled from 'styled-components';
import { FaUtensils, FaClock, FaHeart } from 'react-icons/fa';

//Renders a single recipe inside a mapped array
const Recipe = ({ mappedRecipe }) => {
  return (
    <>
      <StyledRecipe>
        <img src={mappedRecipe.images[0]} alt={mappedRecipe.title} />
        <RecipeText>
          <h2>{mappedRecipe.title}</h2>
          <h4>{mappedRecipe.description}</h4>
          <AdditionalInfo>
            <p>
              <FaHeart />
              מאת: {mappedRecipe.author}
            </p>
            <p>
              <FaUtensils />
              דרגת קושי: {mappedRecipe.difficulty}
            </p>
            <p>
              <FaClock />
              זמן הכנה: {mappedRecipe.cookingTime + mappedRecipe.prepTime}דק'
            </p>
          </AdditionalInfo>
          <button>לחץ/י להתחיל</button>
        </RecipeText>
      </StyledRecipe>
    </>
  );
};

const StyledRecipe = styled.div`
  min-height: 30vh;
  box-shadow: 0 1.5px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  width: 60%;
  margin: 0 auto;
  transition: all 0.1s;

  @media screen and (max-width: 700px), (max-height: 700px) {
    min-height: 30vh;
  }

  @media screen and (min-width: 700px) {
    width: 80%;
  }

  img {
    width: 100%;
    height: 15vh;
    object-fit: cover;
    object-position: center;

    @media screen and (max-width: 450px) {
      min-height: 15vh;
    }

    @media screen and (max-width: 700px) {
      min-height: 15vh;
    }
  }

  h2 {
    margin-top: 0.8rem;
    white-space: pre-wrap;
    text-align: right;
    background-image: linear-gradient(
      to right,
      ${cssVariables.mainColorDark},
      ${cssVariables.secColorDark}
    );
    background-image: -o-linear-gradient(
      to left,
      ${cssVariables.mainColorDark},
      ${cssVariables.secColorDark}
    );
    display: inline-block;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.3rem;
    @media screen and (max-width: 600px) {
      font-size: 1.1rem;
    }
  }
  h4 {
    font-size: 0.9rem;
  }
`;

const RecipeText = styled.div`
  margin-top: -0.5rem;
  text-align: right;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  justify-content: space-between;
  min-height: 35vh;
  @media screen and (max-width: 700px) {
    min-height: 30vh;
  }
  @media screen and (max-height: 700px) {
    min-height: 40vh;
  }

  button {
    margin: 0 auto;
    margin-bottom: 1rem;
    border: 1px solid ${cssVariables.secColorDark};
    padding: 0.3rem 0.8rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    position: relative;
    transition: all 0.8s ease-out;
    border-radius: 10px;
    @media screen and (max-width: 600px) {
      padding: 0.2rem 1.3rem;
    }

    &:before {
      border-radius: inherit;
      background-image: linear-gradient(
        to bottom right,
        ${cssVariables.mainColorDark},
        ${cssVariables.secColorDark}
      );
      background-image: -o-linear-gradient(
        to bottom right,
        ${cssVariables.mainColorDark},
        ${cssVariables.secColorDark}
      );
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
      z-index: -100;
      transition: opacity 0.5s;
    }
    &:hover {
      color: white;
      &:before {
        opacity: 1;
      }
    }
  }
`;

const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  white-space: nowrap;
  padding: 1rem 0;

  svg {
    color: ${cssVariables.mainColorDark};
    margin-left: 0.3rem;
    vertical-align: middle;
    font-size: 1rem;
    &:first-of-type {
      color: ${cssVariables.mainColorDark};
      margin-left: 0.3rem;
      vertical-align: middle;
      font-size: 1rem;
    }
  }

  p {
    &:not(:first-of-type) {
      margin-top: 1.5rem;
    }
  }
`;
export default Recipe;
