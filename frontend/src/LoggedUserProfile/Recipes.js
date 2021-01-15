import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editRecipe } from '../actions/RecipesActions';
import {
  getLoggedUserProfile,
  editUserSavedRecipes,
} from '../actions/userActions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cssVariables, mainColorButton } from '../GlobalStyles';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../Common/Loader';

const Recipes = ({ mappedRecipe, isLogged, isAuthor, loggedUser, saved }) => {
  const [isEditing, setIsEditing] = useState('');
  const [newLink, setNewLink] = useState('');

  const recipeAuthorUpdate = useSelector((state) => state.recipeAuthorUpdate);
  const { isLoading, success: recipeUpdateSuccess } = recipeAuthorUpdate;

  const userSaved = useSelector((state) => state.userSaved);
  const {
    success: userDeletedSuccess,
    isLoading: userDeletedLoading,
  } = userSaved;

  const dispatch = useDispatch();

  const editRecipeHandler = (e, recipeId) => {
    e.preventDefault();
    const editedInfo = {
      website: newLink,
      recipeId: recipeId,
    };
    dispatch(editRecipe(loggedUser, editedInfo));
  };

  const deleteHandler = (recipeId) => {
    const currentRecipes = loggedUser.savedRecipes;
    const newSavedRecipes = currentRecipes.filter((recipe) => {
      return recipe._id !== recipeId;
    });
    if (newSavedRecipes) {
      dispatch(editUserSavedRecipes(loggedUser, newSavedRecipes));
    }
  };

  useEffect(() => {
    if (recipeUpdateSuccess) {
      dispatch(getLoggedUserProfile(loggedUser));
      dispatch({ type: 'RECIPE_AUTHOR_EDIT_RESET' });
    } else if (userDeletedSuccess) {
      dispatch(getLoggedUserProfile(loggedUser));
      dispatch({ type: 'USER_SAVE_RECIPE_RESET' });
    }
  }, [recipeUpdateSuccess, dispatch, loggedUser, userDeletedSuccess]);

  return (
    <>
      {mappedRecipe && (
        <>
          <StyledRecipe>
            <Link to={`/recipes/${mappedRecipe._id}`}>
              <img
                src={mappedRecipe.images[0].location}
                alt={mappedRecipe.title}
              />
              <StyledDetails>
                <h3>{mappedRecipe.title}</h3>
                <p>{mappedRecipe.description}</p>
                <p>בושל: {mappedRecipe.cookedBy.length} פעמים</p>
                <p> מאת: {mappedRecipe.author}</p>
              </StyledDetails>
            </Link>
            {isLogged &&
              isAuthor &&
              (isLoading ? (
                <Loader size={40} />
              ) : (
                <StyledEdit>
                  <FaEdit onClick={() => setIsEditing(mappedRecipe._id)} />
                </StyledEdit>
              ))}
            {saved && (
              <StyledEdit>
                {userDeletedLoading ? (
                  <Loader size={30} />
                ) : (
                  <FaTrash onClick={() => deleteHandler(mappedRecipe._id)} />
                )}
              </StyledEdit>
            )}
          </StyledRecipe>
          {isEditing === mappedRecipe._id && loggedUser && (
            <StyledForm
              onSubmit={(e) => editRecipeHandler(e, mappedRecipe._id)}
            >
              <h4>עריכת {mappedRecipe.title}:</h4>

              <p>כרגע ניתן לערוך רק את הקישור לאתר בדף המתכון</p>
              <p>נועד כדי לעזור לבלוגרים ובעלי עסקים להשאיר את הקישור עדכני</p>
              <StyledInput>
                <label>קישור חדש:</label>
                <input
                  type='text'
                  placeholder='דוגמא: www.example.com'
                  onChange={(e) => setNewLink(e.target.value)}
                ></input>
                {isLoading ? (
                  <Loader size={20} />
                ) : (
                  <SubmitButton type='submit'>עדכון</SubmitButton>
                )}
              </StyledInput>
            </StyledForm>
          )}
        </>
      )}
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
  justify-content: space-between;

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

const StyledEdit = styled.div`
  align-self: center;
  svg {
    font-size: 1.5rem;
    margin-left: 2rem;
    cursor: pointer;
    color: ${cssVariables.mainColorDark};
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
    color: #080d52;
  }
  input {
    border-radius: 15px;
    border: 1px solid ${cssVariables.mainColorDark};
    padding-right: 0.6rem;
    height: 2rem;
  }
  label {
    margin-left: 0.5rem;
  }
  h4 {
    margin-bottom: 0.3rem;
  }
`;

const StyledInput = styled.div`
  display: flex;
  align-content: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    input {
      width: 70%;
    }
    label {
      margin-bottom: 0.5rem;
    }
    button {
      margin: 0.5rem 0 0 0;
    }
  }
`;
const SubmitButton = styled(mainColorButton)`
  margin: 0 0.5rem 0 0;
`;

export default Recipes;
