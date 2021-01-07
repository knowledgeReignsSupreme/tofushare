import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Form from '../components/NewRecipe/Form';
import ErrorMessage from '../components/ErrorMessage';

const NewRecipe = () => {
  const userLogin = useSelector((state) => state.userLogin);

  const { loggedUser } = userLogin;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Tofu Share | מתכון חדש</title>
        <meta name='description' content='הוספת מתכון חדש' />
      </Helmet>

      {loggedUser ? (
        <StyledNewRecipe>
          <Form />
        </StyledNewRecipe>
      ) : (
        <StyledError>
          <Link to='register'>
            <ErrorMessage
              message='רק משתמשים רשומים יכולים לפרסם מתכון.
             לחץ/י להרשמה'
            />
          </Link>
        </StyledError>
      )}
    </>
  );
};

const StyledNewRecipe = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 90%;
  justify-content: flex-start;
  width: 40rem;
`;
const StyledError = styled.div`
  min-height: 50vh;
  margin-top: 2rem;
`;
export default NewRecipe;
