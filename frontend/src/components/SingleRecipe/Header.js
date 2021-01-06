import React from 'react';
import styled from 'styled-components';
import { FaClock, FaMortarPestle, FaUtensils } from 'react-icons/fa';
import { cssVariables } from '../../GlobalStyles';
import { Link } from 'react-router-dom';

const Header = ({ currentRecipe, preview }) => {
  const formatDate = (date) => {
    const monthOnly = date.slice(0, 10);
    return monthOnly.split('-').reverse().join().replaceAll(',', '/');
  };

  const timeIconsStyle = {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    marginLeft: '-8px',
    fontSize: '1rem',
    color: cssVariables.secColorDark,
  };
  return (
    <>
      {preview ? (
        <img
          src={currentRecipe.images.location || currentRecipe.images[0]}
          alt='מתכון'
        />
      ) : (
        <img
          src={currentRecipe.images[0].location || currentRecipe.images[0]}
          alt='מתכון'
        />
      )}
      <RecipeHeadingWrapper>
        <StyledSubHeading>
          <h2>{currentRecipe.title}</h2>
          <h4>{currentRecipe.description}</h4>
          {currentRecipe.cookedBy && (
            <StyledCounter>
              בושל על ידי: {currentRecipe.cookedBy.length} משתמשים
            </StyledCounter>
          )}
          {currentRecipe.createdBy ? (
            <Link to={`/users/${currentRecipe.createdBy}`}>
              <p>באהבה מאת: {currentRecipe.author}</p>
            </Link>
          ) : (
            <p>באהבה מאת: {currentRecipe.author}</p>
          )}
        </StyledSubHeading>
        <StyledTags>
          <ol>
            <strong>תגיות:</strong>
            {currentRecipe.tags.map((tag, i) => (
              <li key={(tag, i)}>
                {i + 1}. {tag}
              </li>
            ))}
          </ol>
          {currentRecipe.createdAt && (
            <p>{formatDate(currentRecipe.createdAt)}</p>
          )}
        </StyledTags>
      </RecipeHeadingWrapper>
      <RecipeCookingTime>
        <p>
          <FaClock style={timeIconsStyle} />
          הכנות: {currentRecipe.prepTime} דק'
        </p>
        <p>
          <FaMortarPestle style={timeIconsStyle} />
          בישול: {currentRecipe.cookingTime} דק'
        </p>
        <p>
          <FaUtensils style={timeIconsStyle} />
          סה"כ: {currentRecipe.prepTime + currentRecipe.cookingTime} דק'
        </p>
      </RecipeCookingTime>
    </>
  );
};

const RecipeHeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid black;
`;

const StyledCounter = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${cssVariables.secColorDark};
`;

const StyledSubHeading = styled.div`
  align-self: flex-start;
  width: 70%;
  margin-left: 0.5rem;
`;

const StyledTags = styled.div`
  ol {
    margin-top: 1rem;
    margin-bottom: 0.3rem;
    list-style: none;
    white-space: nowrap;
    li:not(:last-of-type) {
      margin-bottom: 0.3rem;
      white-space: nowrap;
    }
  }
  p {
    font-size: 0.9rem;
    color: #7a7878;
  }
`;

const RecipeCookingTime = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid black;
  margin-top: 1rem;
  padding: 1rem 0;
  p {
    position: relative;
    font-size: 0.8rem;
    white-space: nowrap;
  }
`;

export default Header;
