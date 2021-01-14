import React from 'react';
import { cssVariables } from '../GlobalStyles';
import Header from '../SingleRecipe/Header';
import styled from 'styled-components';
import Body from '../SingleRecipe/Body';
import Remarks from '../SingleRecipe/Remarks';

const PreviewRecipe = ({ currentRecipe, preview }) => {
  return (
    <StyledPreview style={{ width: '60%' }}>
      <Header currentRecipe={currentRecipe} preview={preview} />
      <Body currentRecipe={currentRecipe} />
      <Remarks currentRecipe={currentRecipe} />
    </StyledPreview>
  );
};

const StyledPreview = styled.div`
  width: 100% !important;
  margin-top: 2rem;
  img {
    width: 100%;
  }

  h3 {
    text-align: center;
  }

  input {
    width: 5rem !important;
    text-align: center;
    border-radius: initial !important;

    padding: none;
  }

  button {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    border: none !important;
    padding: none !important;
    color: ${cssVariables.mainColorDark};
    cursor: pointer;
    outline: none;
    transition: all 0.5s ease-in;
    background: transparent;

    &:first-of-type {
      right: 4.4rem !important;
      bottom: 0.6rem;
      font-size: 1rem;
      &:hover:none {
      }
    }
    &:last-of-type {
      right: 7.8rem !important;
      bottom: 0.6rem;
      font-size: 1rem;
    }
  }
`;

export default PreviewRecipe;
