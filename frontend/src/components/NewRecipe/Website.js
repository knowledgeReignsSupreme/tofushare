import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel, InputWrapper } from '../../GlobalStyles';
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
            'במידה ויצויין, קישור לאתר יינתן בדף המתכון. יש לציין אתרים או בלוגים הקשורים למאכלים טבעוניים בלבד או לטבעונות בכללי'
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
