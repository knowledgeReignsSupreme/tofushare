import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Recipes = ({ mappedRecipe, header }) => {
  return (
    <>
      <StyledRecipe>
        <Link to={`/recipes/${mappedRecipe._id}`}>
          <img
            src={mappedRecipe.images[0].location || mappedRecipe.images[0]}
            alt=''
          />
          <StyledDetails>
            <h3>{mappedRecipe.title}</h3>
            <p>{mappedRecipe.description}</p>
            <p>בושל: {mappedRecipe.cookedBy.length} פעמים</p>
            <p> מאת: {mappedRecipe.author}</p>
          </StyledDetails>
        </Link>
      </StyledRecipe>
    </>
  );
};

const StyledRecipe = styled.div`
  display: flex;
  width: 80%;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-radius: 30px;
  box-shadow: 0 1.5px 5px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 0.8rem 0;
  }
  h3 {
    margin-bottom: 0.3rem;
    margin-right: -0.1rem;
  }
  img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    object-fit: cover;
    float: right;
    shape-outside: circle(50%);
    -moz-shape-outside: circle(50%);
    margin-left: 0.5rem;
    margin-right: 0.2rem;
  }
`;

const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.3rem;
  p {
    margin-bottom: 0.5rem;
  }
  p:first-of-type {
    margin-right: 0.2rem;
  }
  p:last-of-type {
    margin-right: -0.1rem;
  }
`;
export default Recipes;
