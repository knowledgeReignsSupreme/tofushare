import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleRecipe,
  cookedRecipe,
  createComment,
} from '../actions/RecipesActions';
import { editUserSavedRecipes } from '../actions/userActions';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Header from './Header';
import Body from './Body';
import Remarks from './Remarks';
import Comments from './Comments';
import Save from './Save';
import NewComment from './NewComment';
import UserCooked from './UserCooked';
import ErrorMessage from '../Common/ErrorMessage';
import NotRegistered from '../Common/NotRegistered';
import Loader from '../Common/Loader';
import { FaRegComment, FaRegBookmark, FaFireAlt } from 'react-icons/fa';

const SingleRecipe = ({ match }) => {
  const currentRecipeId = match.params.id;

  const dispatch = useDispatch();

  const { currentRecipe, isLoading, error } = useSelector(
    (state) => state.recipe
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const recipeCooked = useSelector((state) => state.recipeCooked);
  const {
    success: recipeCookedSuccess,
    isLoading: recipeCookedIsLoading,
  } = recipeCooked;

  const userSaved = useSelector((state) => state.userSaved);
  const {
    success: userSavedSuccess,
    isLoading: userSavedIsLoading,
  } = userSaved;

  const recipeComment = useSelector((state) => state.recipeComment);
  const {
    error: commentError,
    success: recipeCommentSuccess,
    isLoading: recipeCommentIsLoading,
  } = recipeComment;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getSingleRecipe(currentRecipeId));
  }, [currentRecipeId, dispatch]);

  useEffect(() => {
    if (recipeCookedSuccess) {
      dispatch({ type: 'RECIPE_COOKED_RESET' });
      dispatch(getSingleRecipe(currentRecipe._id));
    }
    if (userSavedSuccess) {
      dispatch({ type: 'USER_SAVE_RECIPE_RESET' });
      loggedUser.savedRecipes.push(currentRecipe._id);
      dispatch(getSingleRecipe(currentRecipe._id));
    }
    if (recipeCommentSuccess) {
      dispatch({ type: 'RECIPE_CREATE_COMMENT_RESET' });
      dispatch(getSingleRecipe(currentRecipe._id));
    }
  }, [
    recipeCookedSuccess,
    currentRecipe._id,
    dispatch,
    userSavedSuccess,
    loggedUser,
    recipeCommentSuccess,
  ]);

  const recipeCookedHandler = () => {
    const newCooked = [...currentRecipe.cookedBy, loggedUser._id];
    console.log(newCooked);
    dispatch(cookedRecipe(loggedUser, currentRecipe._id, newCooked));
  };

  const saveRecipeHandler = () => {
    const newSaved = [...loggedUser.savedRecipes, currentRecipe._id];
    dispatch(editUserSavedRecipes(loggedUser, newSaved));
  };

  const newCommentHandler = (comment) => {
    const newComments = [...currentRecipe.comments, comment];
    dispatch(createComment(loggedUser.token, currentRecipe._id, newComments));
  };

  return (
    <>
      <Helmet>
        <title>Tofu Share | {currentRecipe.title || ''}</title>
        <meta name='description' content='מתכון' />
      </Helmet>
      {isLoading ? (
        <Loader size='80' />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        currentRecipe.title && (
          <StyledSingleRecipe>
            <Header currentRecipe={currentRecipe} />
            <Body currentRecipe={currentRecipe} />

            {loggedUser && (
              <WrappedButtons>
                <UserCooked
                  user={loggedUser}
                  currentRecipe={currentRecipe}
                  handleCooked={recipeCookedHandler}
                  isLoading={recipeCookedIsLoading}
                />
                <Save
                  currentRecipe={currentRecipe}
                  handleSaved={saveRecipeHandler}
                  user={loggedUser}
                  isLoading={userSavedIsLoading}
                />
              </WrappedButtons>
            )}
            {!loggedUser && (
              <WrappedButtons>
                <NotRegistered
                  buttonText='הכנתי את המתכון!'
                  message='אינך רשום/ה'
                  icon={<FaFireAlt />}
                />
                <NotRegistered
                  buttonText='שמירת מתכון'
                  message='אינך רשום/ה'
                  icon={<FaRegBookmark />}
                />
              </WrappedButtons>
            )}

            <Remarks currentRecipe={currentRecipe} />
            {loggedUser && (
              <NewComment
                currentRecipe={currentRecipe}
                handleComment={newCommentHandler}
                user={loggedUser}
                error={commentError}
                isLoading={recipeCommentIsLoading}
              />
            )}
            {!loggedUser && (
              <NotRegistered
                buttonText='הוספת תגובה'
                message='אינך רשום/ה'
                icon={<FaRegComment />}
              />
            )}

            <Comments currentRecipe={currentRecipe} />
          </StyledSingleRecipe>
        )
      )}
    </>
  );
};

const StyledSingleRecipe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 40rem;
  max-width: 90vw;
  img {
    max-width: 90vw;
    width: 40rem;
    height: 20rem;
  }
  h2 {
    font-size: 1.8rem;
    margin: 0.5rem 0;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  p {
    align-self: flex-start;
    margin: 0.5rem 0;
  }
`;

const WrappedButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default SingleRecipe;
