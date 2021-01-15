import React, { useState, useEffect } from 'react';
import { register } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { secColorButton } from '../GlobalStyles';
import Input from '../Common/Input';
import Loader from '../Common/Loader';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameLengthError, setNameLengthError] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { isLoading, error, loggedUser } = userRegister;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (loggedUser) {
      history.push('/');
    }
  }, [history, loggedUser]);

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
      dispatch(register(name, email.toLowerCase(), password, website));
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
        <Input
          tag='שם משתמש / שם מלא'
          onChange={(e) => setName(e.target.value)}
          value={name}
          required={true}
          placeholder='שם'
        />{' '}
        <Input
          tag='כתובת אימייל:'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required={true}
          placeholder='כתובת אימייל'
          type='email'
        />{' '}
        <Input
          tag='קישור לאתר / בלוג:'
          onChange={(e) => setWebsite(e.target.value)}
          value={website}
          placeholder='לא חובה'
        />
        <Input
          tag='סיסמה:'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required={true}
          placeholder='סיסמה'
          type='password'
        />
        <Input
          tag='אימות סיסמה:'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required={true}
          placeholder='אימות סיסמה'
          type='password'
        />
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
        {isLoading && <Loader size='80' />}
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
  p span {
    color: red;
    font-weight: bold;
    margin-left: 0.3rem;
  }
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

const StyledRegisterButton = styled(secColorButton)`
  font-weight: bold;
  margin-top: -0.3rem;
`;

export default Register;
