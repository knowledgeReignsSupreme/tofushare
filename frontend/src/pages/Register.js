import React, { useState, useEffect } from 'react';
import { register } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cssVariables, secColorButton } from '../GlobalStyles';
import CommonLoader from '../components/CommonLoader';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameLengthError, setNameLengthError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { isLoading, error, userInfo } = userRegister;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const isValidEmail = (e) => {
    // eslint-disable-next-line
    var filter = /^\s*[\w\-_]+(\.[\w\-_]+)*\@[\w\-_]+\.[\w\-_]+(\.[\w\-_]+)*\s*$/;
    return String(e).search(filter) !== -1;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError(true);
    }
    if (isValidEmail(email)) {
      setEmailError(false);
    }
    if (password !== confirmPassword) {
      setPasswordError('סיסמאות לא תואמות');
    }
    if (password === confirmPassword && password.length <= 5) {
      setPasswordError('סיסמה חייבת להכיל לפחות 6 תווים');
    }
    if (name.trim().length <= 2 || name.length > 13) {
      setNameLengthError('שם משתמש חייב להיות בין 3 ל-13 תווים');
    }
    if (
      name.trim().length > 2 &&
      name.length <= 13 &&
      isValidEmail(email) &&
      password === confirmPassword &&
      password.length >= 6
    ) {
      dispatch(register(name, email.toLowerCase(), password));
    }
  };

  return (
    <>
      <Helmet>
        <title>Tofu Share | הרשמה</title>
        <meta name='description' content='רישום משתמש חדש' />
      </Helmet>

      <StyledForm onSubmit={(e) => submitHandler(e)}>
        <h1>הרשמה</h1>
        <SingleInput>
          <label htmlFor='name'>שם משתמש/שם מלא:</label>
          <input
            type='text'
            placeholder='שם'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </SingleInput>
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
        <SingleInput>
          <label htmlFor='email'>אימות סיסמה:</label>
          <input
            type='password'
            placeholder='אימות סיסמה'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </SingleInput>
        {emailError && (
          <StyledError>
            <p>אימייל לא חוקי</p>
          </StyledError>
        )}
        {passwordError && (
          <StyledError>
            <p>{passwordError}</p>
          </StyledError>
        )}
        {error && (
          <StyledError>
            <p>{error}</p>
          </StyledError>
        )}
        {nameLengthError && (
          <StyledError>
            <p>{nameLengthError}</p>
          </StyledError>
        )}
        {isLoading && <CommonLoader size='80' />}
        <StyledRegisterButton type='submit'>הרשמה</StyledRegisterButton>
        <p>
          כבר נרשמת? <Link to={'/login'}>התחברות</Link>
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

const StyledRegisterButton = styled(secColorButton)`
  font-weight: bold;
  margin-top: -0.3rem;
`;

export default Register;
