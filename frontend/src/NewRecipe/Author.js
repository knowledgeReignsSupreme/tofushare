import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel } from '../GlobalStyles';
import Explanation from './Explanation';

const Author = ({ setAuthor, author, isValid, setIsValid }) => {
  const [authorError, setAuthorError] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);

  const inputValidator = useCallback(() => {
    if (author.trim().length <= 2 && author.trim().length > 0) {
      if (!authorError) {
        setAuthorError(true);
      }
      if (isValid) {
        setIsValid(false);
      }
    } else {
      if (authorError) {
        setAuthorError(false);
      }
      if (!isValid) {
        setIsValid(true);
      }
    }
  }, [isValid, setIsValid, author, authorError]);

  useEffect(() => {
    inputValidator();
  }, [author, inputValidator]);

  return (
    <>
      <StyledLabel htmlFor='title'>
        <p>
          <span>*</span>
          שם היוצר/ת:
        </p>
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>{' '}
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'שם יוצר/ת המתכון. אם המתכון לא שלכם, אנא אל תפרסמו אותו ללא אישור היוצר/ת המקורי/ת'
          }
        />
      ) : (
        ''
      )}
      <input
        placeholder='שדה חובה'
        type='text'
        name='author'
        onChange={(e) => setAuthor(e.target.value)}
      />
      {authorError && (
        <span>
          <p>שם היוצר/ת אינו תקין</p>
        </span>
      )}
    </>
  );
};

const StyledLabel = styled(GlobalStyledLabel)``;

export default Author;
