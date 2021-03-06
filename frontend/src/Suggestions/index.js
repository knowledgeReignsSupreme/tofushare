import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
import { cssVariables, mainColorButton } from '../GlobalStyles';
import { FaPaperPlane } from 'react-icons/fa';
import Loader from '../Common/Loader';
import Welcome from '../Common/Welcome';

init(process.env.REACT_APP_EMAILJS_USER);

const Suggestions = () => {
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [suggestionError, setSuggestionError] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formFail, setFormFail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let isEmailValid = () => {
    if (email.length === 0) {
      return false;
    }
    var filter = /^\s*[\w\-_]+(\.[\w\-_]+)*@[\w\-_]+\.[\w\-_]+(\.[\w\-_]+)*\s*$/;
    return String(email).search(filter) !== -1;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userName.length < 2) {
      setUserNameError(true);
    }
    if (!isEmailValid()) {
      setEmailError(true);
    }
    if (suggestion.length < 5) {
      setSuggestionError(true);
    }
    if (userName.length >= 3 && isEmailValid() && suggestion.length >= 5) {
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE,
          process.env.REACT_APP_EMAILJS_TEMPLATE,
          e.target,
          process.env.REACT_APP_EMAILJS_USER
        )
        .then(
          (result) => {
            setFormSuccess(true);
            setIsLoading(false);
          },
          (error) => {
            setFormFail(true);
            setIsLoading(false);
          }
        );
    }
  };
  return (
    <>
      <Helmet>
        <title>Tofu Share | הצעות לשיפור</title>
        <meta name='description' content='דף דיווח על באגים או הצעות שיפור' />
      </Helmet>
      {formSuccess ? (
        ''
      ) : (
        <Welcome
          header='רוצים לשמוע מכם'
          subHeader='עזרו לנו להרחיב את קהילת הטבעונים בארץ'
          paragraph="מצאתם באג באתר? יש לכם רעיון לפיצ'ר חדש? זה המקום!"
          button={false}
        />
      )}
      {formSuccess ? (
        <StyledSuccess>
          <h3>הטופס נשלח בהצלחה. תודה רבה על הרצון הטוב ושיתוף הפעולה</h3>
        </StyledSuccess>
      ) : (
        <StyledSuggestions onSubmit={submitHandler}>
          <SingleInput>
            <label htmlFor='userName' name='userName'>
              {' '}
              <p>
                <span>*</span>שם:
              </p>
            </label>
            <input
              type='text'
              name='userName'
              placeholder='שם'
              onChange={(e) => setUserName(e.target.value)}
            />
            {userNameError && (
              <p>
                <span>שם אינו תקין</span>
              </p>
            )}
          </SingleInput>
          <SingleInput>
            <label htmlFor='email' name='email'>
              <p>
                <span>*</span>אימייל:
              </p>
            </label>
            <input
              type='email'
              name='email'
              placeholder='אימייל ליצירת קשר'
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p>
                <span>אימייל אינו תקין</span>
              </p>
            )}
          </SingleInput>
          <SingleInput>
            <label htmlFor='suggestion' name='suggestion'>
              <p>
                <span>*</span>הצעה לשיפור / דיווח על באג
              </p>
            </label>
            <textarea
              type='text'
              name='suggestion'
              placeholder='תוכן ההודעה'
              onChange={(e) => setSuggestion(e.target.value)}
            />
            {suggestionError && (
              <p>
                <span>תוכן ההודעה קצר מדי</span>
              </p>
            )}
          </SingleInput>
          {isLoading ? (
            <StyledButton disabled={true}>
              {' '}
              <FaPaperPlane />
              שולח...
            </StyledButton>
          ) : (
            <StyledButton type='submit'>
              <FaPaperPlane />
              שליחה
            </StyledButton>
          )}
          {isLoading && <Loader size='40' />}
          {formFail && (
            <p>
              <span>קרתה תקלה בשליחת הטופס. אנא נסה/י שוב</span>
            </p>
          )}
        </StyledSuggestions>
      )}
    </>
  );
};

const StyledSuccess = styled.div`
  width: 40rem;
  margin: 1rem auto;
  max-width: 80%;
`;

const StyledSuggestions = styled.form`
  margin-top: 1rem !important;
  h4 {
    margin: 1rem 0;
  }
  width: 40rem;
  margin: 0 auto;
  max-width: 90%;
  h3 {
    margin: 1rem 0;
  }
  p span {
    color: red;
    font-size: 1rem;
    margin-top: 0.3rem;
  }
  input[type='text'],
  input[type='email'],
  textarea {
    width: 60%;
    align-self: flex-start;
    border-radius: 15px;
    border: 1px solid ${cssVariables.secColorDark};
    padding-right: 0.6rem;
    height: 2rem;

    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
  textarea {
    font-size: 1rem;
  }
  button {
    svg {
      margin-left: 0.3rem;
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 600px) {
    width: 90%;
  }
  @media screen and (min-width: 601px) and (max-width: 801px) {
    width: 70%;
  }
  @media screen and (min-width: 801px) and (max-width: 1000px) {
    width: 60%;
  }
  @media screen and (min-width: 1001px) and (max-width: 1500) {
    width: 50%;
  }
  @media screen and (min-width: 1501px) and (max-width: 2000px) {
    width: 40%;
  }
  @media screen and (min-width: 2001px) {
    width: 25%;
  }
`;

const StyledButton = styled(mainColorButton)``;

const SingleInput = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  span {
    color: ${cssVariables.secColorDark};
    font-weight: bold;
    font-size: 1.5rem;
    vertical-align: middle;
    margin-left: 0.3rem;
  }
  select {
    width: 20%;
    margin-bottom: 0.3rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
`;

export default Suggestions;
