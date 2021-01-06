import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel, InputWrapper } from '../../GlobalStyles';
import Explanation from './Explanation';

const Title = ({ setTitle, title, titleError, check }) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        <p>
          <span>*</span>
          שם המתכון:
        </p>
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>{' '}
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={'שם המתכון יופיע ככותרת, דוגגמא: פאי בשר טבעוני'}
        />
      ) : (
        ''
      )}
      <input
        placeholder='שדה חובה'
        type='text'
        name='title'
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleError && check ? (
        <span>
          <p>שם המתכון אינו תקין</p>{' '}
        </span>
      ) : (
        ''
      )}
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)``;

const StyledLabel = styled(GlobalStyledLabel)``;

export default Title;
