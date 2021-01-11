import React, { useEffect, useState, useCallback } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { editUserSavedRecipes } from '../../actions/userActions';
import { getSingleRecipe } from '../../actions/RecipesActions';
import styled from 'styled-components';
import { cssVariables, transparentButton } from '../../GlobalStyles';

const Save = ({ currentRecipe }) => {
  const [userAlreadySaved, setUserAlreadySaved] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const userSaved = useSelector((state) => state.userSaved);
  const { success, isLoading } = userSaved;

  const alreadySaved = useCallback(() => {
    if (loggedUser.savedRecipes.includes(currentRecipe._id)) {
      setUserAlreadySaved(true);
    }
  }, [currentRecipe._id, loggedUser.savedRecipes]);

  const saveRecipeHandler = () => {
    if (userLogin.loggedUser) {
      if (!userAlreadySaved) {
        const newSaved = [...loggedUser.savedRecipes, currentRecipe._id];
        dispatch(
          editUserSavedRecipes(loggedUser, currentRecipe._id, newSaved)
        ).then((data) => {
          loggedUser.savedRecipes = [...newSaved];
        });
      }
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: 'USER_SAVE_RECIPE_RESET' });
      dispatch(getSingleRecipe(currentRecipe._id));
    }
  }, [success, currentRecipe._id, dispatch]);

  useEffect(() => {
    alreadySaved();
  }, [alreadySaved]);

  return (
    <>
      <StyledSave>
        {isLoading ? (
          <StyledButton disabled={true}>
            <FaBookmark />
            שומר מתכון...
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
        {loggedUser.savedRecipes.includes(currentRecipe._id) ||
        userSaved.success ? (
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
