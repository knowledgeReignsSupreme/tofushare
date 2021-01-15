import React, { useEffect, useState, useCallback } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import styled from 'styled-components';
import { cssVariables, transparentButton } from '../GlobalStyles';

const Save = ({ currentRecipe, handleSaved, user, isLoading }) => {
  const [userAlreadySaved, setUserAlreadySaved] = useState(false);

  const alreadySaved = useCallback(() => {
    if (user.savedRecipes.includes(currentRecipe._id)) {
      setUserAlreadySaved(true);
    }
  }, [currentRecipe._id, user.savedRecipes]);

  const saveRecipeHandler = () => {
    if (!userAlreadySaved) {
      handleSaved();
    }
  };

  useEffect(() => {
    alreadySaved();
  }, [alreadySaved]);

  return (
    <>
      <StyledSave>
        {isLoading ? (
          <StyledButton disabled={true}>
            <FaBookmark />
            שומר...
          </StyledButton>
        ) : userAlreadySaved ? (
          <StyledButton>
            <FaBookmark />
            מתכון שמור
          </StyledButton>
        ) : (
          <StyledButton onClick={saveRecipeHandler}>
            <FaRegBookmark />
            שמירת מתכון
          </StyledButton>
        )}
        {user.savedRecipes.includes(currentRecipe._id) ? (
          <p>זמין לצפייה בפרופיל</p>
        ) : (
          ''
        )}
      </StyledSave>
    </>
  );
};

const StyledSave = styled.div`
  svg {
    margin-left: 0.3rem;
    font-size: 1rem;
  }
  p {
    font-size: 0.8rem;
    margin-top: 0 !important;
    color: ${cssVariables.secColorDark};
  }
`;

const StyledButton = styled(transparentButton)``;

export default Save;
