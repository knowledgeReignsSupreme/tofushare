import React, { useState } from 'react';
import { GlobalStyledLabel, InputWrapper } from '../GlobalStyles';
import styled from 'styled-components';
import Explanation from './Explanation';

const CookingTime = ({
  setCookingTime,
  cookingTime,
  cookingTimeError,
  check,
}) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        <p>
          {' '}
          <span>*</span>
          זמן הבישול (דקות):
        </p>
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'בדקות, הזמן שבו האוכל מתבשל. אין לציין את זמן העבודה על ההכנות והמצרכים'
          }
        />
      ) : (
        ''
      )}
      <input
        placeholder='זמן מוערך'
        type='number'
        name='cookingtime'
        min='1'
        onChange={(e) => setCookingTime(e.target.value)}
      />
      {cookingTimeError && check && (
        <span>
          <p>חובה להזין זמן סה"כ</p>
        </span>
      )}
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)``;

const StyledLabel = styled(GlobalStyledLabel)``;

export default CookingTime;
