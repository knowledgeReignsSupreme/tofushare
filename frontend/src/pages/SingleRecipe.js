import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRecipe } from '../actions/RecipesActions';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Header from '../components/SingleRecipe/Header';
import Body from '../components/SingleRecipe/Body';
import Remarks from '../components/SingleRecipe/Remarks';
import Comments from '../components/SingleRecipe/Comments';
import Save from '../components/SingleRecipe/Save';
import NewComment from '../components/SingleRecipe/NewComment';
import UserCooked from '../components/SingleRecipe/UserCooked';
import ErrorMessage from '../components/ErrorMessage';
import NotRegistered from '../components/NotRegistered';
import CommonLoader from '../components/CommonLoader';
import { FaRegComment, FaRegBookmark, FaFireAlt } from 'react-icons/fa';

const SingleRecipe = ({ match }) => {
  const currentRecipeId = match.params.id;

  const dispatch = useDispatch();
  const { currentRecipe, isLoading, error } = useSelector(
    (state) => state.recipe
  );

  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getSingleRecipe(currentRecipeId));
  }, [currentRecipeId, dispatch]);

  return (
    <>
      <Helmet>
        <title>Tofu Share | {currentRecipe.title || ''}</title>
        <meta name='description' content='מתכון' />
      </Helmet>
      {isLoading ? (
        <CommonLoader size='80' />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        currentRecipe.title && (
          <StyledSingleRecipe>
            <Header currentRecipe={currentRecipe} />
            <Body currentRecipe={currentRecipe} />

            {loggedUser && (
              <WrappedButtons>
                <UserCooked user={loggedUser} currentRecipe={currentRecipe} />
                <Save currentRecipe={currentRecipe} />
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
            {loggedUser && <NewComment currentRecipe={currentRecipe} />}
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
