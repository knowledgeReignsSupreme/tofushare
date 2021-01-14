import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cssVariables, secColorButton } from '../GlobalStyles';
import Loader from '../Common/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading, error, loggedUser } = userLogin;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (loggedUser) {
      history.push('/');
    }
  }, [history, loggedUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email.toLowerCase(), password));
  };

  return (
    <>
      <Helmet>
        <title>Tofu Share | התחברות</title>
        <meta name='description' content='התחברות משתמש לאתר' />
      </Helmet>

      <StyledForm onSubmit={(e) => submitHandler(e)}>
        <h1>התחבר/י</h1>

        <SingleInput>
          <label htmlFor='email'>כתובת אימייל:</label>
          <input
            type='email'
            placeholder='כתובת אימייל'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </SingleInput>
        <SingleInput>
          <label htmlFor='email'>סיסמה:</label>
          <input
            type='password'
            placeholder='סיסמה'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </SingleInput>
        {error && (
          <StyledError>
            <p>אימייל או סיסמה לא נכונים</p>
          </StyledError>
        )}
        {isLoading && <Loader size='80' />}
        <StyledLoginButton type='submit'>התחברות</StyledLoginButton>

        <p>
          עדיין לא נרשמת? <Link to={'/register'}>הרשמה</Link>
        </p>
      </StyledForm>
    </>
  );
};
const StyledForm = styled.form`
  width: 40rem;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h1 {
    color: inherit;
    margin-bottom: 0.5rem;
    font-size: 1.4;
    font-weight: lighter;
  }

  p:not(:last-of-type) {
    margin-top: 0.5rem;
  }
  a {
    color: green;
  }
`;

const SingleInput = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    margin-bottom: 0.5rem;
    align-self: flex-start;
  }
  input {
    width: 60%;
    border-radius: 15px;
    border: 1px solid ${cssVariables.secColorDark};
    padding-right: 0.6rem;
    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
`;

const StyledError = styled.div`
  p {
    color: red;
    font-weight: bold;
    margin-bottom: 0.5rem;
    margin-top: -0.2rem;
  }
`;

const StyledLoginButton = styled(secColorButton)`
  font-weight: bold;
  margin-top: -0.3rem;
`;

export default Login;
