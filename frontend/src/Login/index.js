import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { secColorButton } from '../GlobalStyles';
import Input from '../Common/Input';
import Loader from '../Common/Loader';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading: LoginLoading, error: LoginError, loggedUser } = userLogin;

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
        <Input
          tag='כתובת אימייל:'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required={true}
          placeholder='כתובת אימייל'
          type='email'
        />{' '}
        <Input
          tag='סיסמה:'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required={true}
          placeholder='סיסמה'
          type='password'
        />{' '}
        {LoginError && (
          <StyledError>
            <p>אימייל או סיסמה לא נכונים</p>
          </StyledError>
        )}
        {LoginLoading && <Loader size='80' />}
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
