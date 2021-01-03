import React, { useEffect, useState, useCallback } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { saveRecipe } from '../../actions/userActions';
import { getSingleRecipe } from '../../actions/RecipesActions';
import styled from 'styled-components';
import { cssVariables, transparentButton } from '../../GlobalStyles';

const Save = ({ currentRecipe }) => {
  const [userAlreadySaved, setUserAlreadySaved] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userSaved = useSelector((state) => state.userSaved);
  const { success, isLoading } = userSaved;

  const alreadySaved = useCallback(() => {
    if (userInfo.savedRecipes.includes(currentRecipe._id)) {
      setUserAlreadySaved(true);
    }
  }, [currentRecipe._id, userInfo.savedRecipes]);

  const saveRecipeHandler = () => {
    if (userLogin.userInfo) {
      if (!userAlreadySaved) {
        const newSaved = [...userInfo.savedRecipes, currentRecipe._id];
        dispatch(saveRecipe(userInfo, currentRecipe._id, newSaved)).then(
          (data) => {
            userInfo.savedRecipes = [...newSaved];
          }
        );
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
        {userInfo.savedRecipes.includes(currentRecipe._id) ||
        userSaved.success ? (
          <p>ניתן לצפות במתכונים השמורים בפרופיל</p>
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
    margin-top: 0.2rem;
    color: ${cssVariables.secColorDark};
  }
`;

const StyledButton = styled(transparentButton)``;

export default Save;
