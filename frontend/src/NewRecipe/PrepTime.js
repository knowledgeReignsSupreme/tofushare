import React, { useState } from 'react';
import { GlobalStyledLabel, InputWrapper } from '../GlobalStyles';
import styled from 'styled-components';
import Explanation from './Explanation';

const PrepTime = ({ setPrepTime, prepTime, prepTimeError, check }) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        <p>
          <span>*</span>
          זמן הכנות (דקות):
        </p>
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'בדקות, הזמן שבו יש לעבוד על ההכנות, זמן זה אינו כולל את ההמתנה בבישול עצמו'
          }
        />
      ) : (
        ''
      )}
      <input
        placeholder='זמן מוערך'
        type='number'
        name='preptime'
        defaultValue={prepTime}
        min='1'
        onChange={(e) => setPrepTime(e.target.value)}
      />
      {prepTimeError && check && (
        <span>
          <p>חובה להזין זמן במספר בלבד</p>
        </span>
      )}
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)``;

const StyledLabel = styled(GlobalStyledLabel)``;

export default PrepTime;
