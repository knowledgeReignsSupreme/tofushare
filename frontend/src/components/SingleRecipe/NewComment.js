import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../actions/RecipesActions';
import { getSingleRecipe } from '../../actions/RecipesActions';
import styled from 'styled-components';
import {
  cssVariables,
  transparentButton,
  mainColorButton,
} from '../../GlobalStyles';

import { FaRegComment, FaComment } from 'react-icons/fa';

const NewComment = ({ currentRecipe }) => {
  const [commentBody, setCommentBody] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [alreadyCommented, setAlreadyCommented] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const recipeComment = useSelector((state) => state.recipeComment);
  const { error, success, isLoading } = recipeComment;

  const didComment = useCallback(() => {
    return currentRecipe.comments.find(
      (comment) => comment.userId === loggedUser._id
    );
  }, [currentRecipe.comments, loggedUser._id]);

  const newCommentHandler = (e) => {
    if (!didComment()) {
      const newComment = {
        name: loggedUser.name,
        commentBody: commentBody,
        userId: loggedUser._id,
      };
      dispatch(createComment(loggedUser.token, currentRecipe._id, newComment));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: 'RECIPE_CREATE_COMMENT_RESET' });
      dispatch(getSingleRecipe(currentRecipe._id));
    }
  }, [success, currentRecipe._id, dispatch]);

  useEffect(() => {
    if (didComment()) {
      setAlreadyCommented(true);
    }
  }, [didComment]);

  return (
    <StyledNewComment>
      {error && <p>{error}</p>}
      {alreadyCommented ? (
        <StyledButton>
          <FaComment />
          תגובה קיימת
        </StyledButton>
      ) : (
        <StyledButton onClick={() => setIsCommenting(!isCommenting)}>
          <FaRegComment />
          הוספת תגובה
        </StyledButton>
      )}
      {isCommenting && (
        <>
          <label htmlFor=''>
            <span>*</span> תגובה:
          </label>
          <input type='text' onChange={(e) => setCommentBody(e.target.value)} />
          {isLoading ? (
            <StyledButton disabled={true}>
              <FaRegComment />
              שולח...
            </StyledButton>
          ) : (
            <StyledPostButton onClick={newCommentHandler}>
              שליחה
            </StyledPostButton>
          )}
        </>
      )}
    </StyledNewComment>
  );
};

const StyledNewComment = styled.div`
  margin-top: 1rem;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  label span {
    color: red;
    font-weight: bold;
  }
  input {
    border-radius: 15px;
    border: 1px solid ${cssVariables.secColorDark};
    width: 60%;
    padding: 0.5rem 0.5rem 1rem;
    margin-bottom: 0.5rem;
    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
  svg {
    margin-left: 0.3rem;
    font-size: 0.9rem;
  }
`;

const StyledButton = styled(transparentButton)``;

const StyledPostButton = styled(mainColorButton)``;

export default NewComment;
