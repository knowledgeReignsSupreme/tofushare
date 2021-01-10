import React, { useEffect, useState } from 'react';
import {
  listRecipes,
  approveRecipe,
  deleteRecipe,
} from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { secColorButton, mainColorButton } from '../../GlobalStyles';
import styled from 'styled-components';
import uuid from 'react-uuid';
import CommonLoader from '../../components/CommonLoader';
import ErrorMessage from '../../components/ErrorMessage';
import Preview from '../../components/NewRecipe/Preview';

const EditRecipes = () => {
  const [isPreviewOn, setIsPreviewOn] = useState(false);
  const [currentPreview, setCurrentPreview] = useState('');
  const [deleteApprove, setDeleteApprove] = useState(false);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const unapprovedRecipes = useSelector((state) => state.unapprovedRecipes);
  const { newRecipes, isLoading, error, success } = unapprovedRecipes;

  const editedRecipes = useSelector((state) => state.editedRecipes);
  const {
    isLoading: editIsLoading,
    error: editError,
    success: editSuccess,
  } = editedRecipes;

  const history = useHistory();

  useEffect(() => {
    if (loggedUser && loggedUser.isAdmin) {
      if (!success) dispatch(listRecipes(loggedUser));
    } else {
      history.push('/');
    }
  }, [dispatch, history, loggedUser, success]);

  const approveRecipeHandler = (recipeId) => {
    dispatch(approveRecipe(loggedUser, recipeId));
  };

  const deleteRecipeHandler = (recipeId) => {
    dispatch(deleteRecipe(loggedUser, recipeId));
  };

  useEffect(() => {
    if (editSuccess) {
      dispatch({ type: 'EDIT_RECIPE_RESET' });
      dispatch(listRecipes(loggedUser));
    }
  }, [editSuccess, dispatch, loggedUser]);

  return (
    <StyledUnapproved>
      {isLoading ? (
        <CommonLoader size={80}></CommonLoader>
      ) : error || editError ? (
        <ErrorMessage message={error}></ErrorMessage>
      ) : newRecipes.length >= 1 ? (
        newRecipes.map((recipe) => (
          <StyledRecipe key={uuid()}>
            <img src={recipe.images[0].location} alt='recipe' />
            <h3>{recipe.title}</h3>
            <Link to={`/users/${recipe.createdBy}`}>
              <p>{recipe.createdBy}</p>
            </Link>
            <StyledApprove
              onClick={() => {
                setIsPreviewOn(!isPreviewOn);
                setCurrentPreview(recipe._id);
              }}
            >
              תצוגה מקדימה
            </StyledApprove>
            {isPreviewOn && currentPreview === recipe._id && (
              <StyledPreview>
                {editIsLoading ? (
                  <CommonLoader size={80}></CommonLoader>
                ) : (
                  <Preview currentRecipe={recipe} preview={false}></Preview>
                )}
                <ActionButtons>
                  <StyledApprove
                    onClick={() => approveRecipeHandler(recipe._id)}
                  >
                    אישור
                  </StyledApprove>
                  <StyledDelete
                    onClick={() => setDeleteApprove(!deleteApprove)}
                  >
                    מחיקה
                  </StyledDelete>
                </ActionButtons>
                {deleteApprove && (
                  <StyledFinalDeletion>
                    <p>המתכון יימחק לצמיתות. אתה בטוח?</p>
                    <RegretButtons>
                      <StyledDelete
                        onClick={() => {
                          deleteRecipeHandler(recipe._id);
                          setDeleteApprove(!deleteApprove);
                        }}
                      >
                        כן
                      </StyledDelete>
                      <StyledApprove
                        onClick={() => setDeleteApprove(!deleteApprove)}
                      >
                        לא
                      </StyledApprove>
                    </RegretButtons>
                  </StyledFinalDeletion>
                )}
              </StyledPreview>
            )}
          </StyledRecipe>
        ))
      ) : (
        <p>אין מתכונים שממתינים לאישור</p>
      )}
    </StyledUnapproved>
  );
};

const StyledUnapproved = styled.div`
  margin: 0 auto;
  max-width: 90%;
  width: 40rem;
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StyledRecipe = styled.div`
  min-height: 30vh;
  box-shadow: 0 1.5px 5px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  width: 45%;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.1s;
  &:not(:last-of-type) {
    margin-left: 2rem;
  }
  @media screen and (max-width: 600px) {
    width: 80%;
    margin-bottom: 2rem;
  }
  img {
    width: 100%;
    height: 15vh;
    object-fit: cover;
    object-position: center;
  }
`;

const StyledPreview = styled.div`
  width: 100% !important;
  margin: 0 auto;
  padding: 1rem 0;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledFinalDeletion = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegretButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledApprove = styled(mainColorButton)``;
const StyledDelete = styled(secColorButton)``;

export default EditRecipes;
