import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel, InputWrapper } from '../GlobalStyles';
import Explanation from './Explanation';

const Website = ({ setWebsite }) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        אתר היוצר/ת:
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'קישור לאתר/בלוג/רשת חברתית. ניתן להכניס קישור עם אוריינטציה מכירתית. נועד לעזור לבלוגרים ובעלי עסקים'
          }
        />
      ) : (
        ''
      )}
      <input
        type='text'
        name='website'
        placeholder='דוגמא: www.example.com'
        onChange={(e) => {
          setWebsite(e.target.value);
        }}
      />
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)``;

const StyledLabel = styled(GlobalStyledLabel)``;

export default Website;
