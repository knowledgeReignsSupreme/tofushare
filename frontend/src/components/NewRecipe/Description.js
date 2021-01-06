import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel, InputWrapper } from '../../GlobalStyles';
import Explanation from './Explanation';

const Description = ({
  setDescription,
  description,
  descriptionError,
  check,
}) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        <p>
          <span>*</span>
          תיאור המתכון:
        </p>
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>{' '}
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'תיאור קצר למנה. ניתן להשתמש בשם ציני. דוגמא: פאי שיגרום לכם ללקק את האצבעות'
          }
        />
      ) : (
        ''
      )}
      <input
        placeholder='שדה חובה'
        type='text'
        name='description'
        onChange={(e) => setDescription(e.target.value)}
      />
      {descriptionError && check ? (
        <span>
          <p>תיאור המתכון אינו תקין</p>{' '}
        </span>
      ) : (
        ''
      )}
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)``;

const StyledLabel = styled(GlobalStyledLabel)``;

export default Description;
