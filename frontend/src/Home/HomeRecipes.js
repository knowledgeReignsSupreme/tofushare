import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Recipe from './Recipe';

const HomeRecipes = ({ recipes }) => {
  return (
    <HomeRecipeWrapper>
      <StyledHomeRecipes>
        {recipes.length >= 1 &&
          recipes.map((recipe) => (
            <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
              <Recipe mappedRecipe={recipe} key={recipe._id} />
            </Link>
          ))}
        {recipes.length === 0 && (
          <StyledNoResults>
            <p>לצערנו לא נמצאו מתכונים תחת החיפוש הנוכחי</p>
            <Link to='/'>לחץ/י לאפס את החיפוש</Link>
          </StyledNoResults>
        )}
      </StyledHomeRecipes>
    </HomeRecipeWrapper>
  );
};

const HomeRecipeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHomeRecipes = styled.div`
  margin: 0 auto;
  margin-top: 1rem;
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(3, minmax(250px, 350px));
  grid-column-gap: 1rem;
  grid-row-gap: 3rem;

  @media screen and (max-width: 700px) {
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 800px));
  }

  @media screen and (min-width: 701px) and (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(300px, 400px));
  }
`;

const StyledNoResults = styled.div`
  margin: 0 auto;
  font-size: 1.2rem;
  white-space: wrap;
  max-width: 90%;
  a {
    font-size: 1rem;
    margin-top: 0.5rem;
    color: #6666b1;
  }
`;

export default HomeRecipes;
