import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel, InputWrapper } from '../GlobalStyles';
import Explanation from './Explanation';

const Difficulty = ({ setDifficulty, difficulty }) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        <p>
          <span>*</span>
          דרגת קושי:
        </p>
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>
      </StyledLabel>

      <StyledSelect>
        {isExplaining ? (
          <Explanation
            message={
              'אין ספק שהטבעונות מוציאה את הטבחים שבנו, אך לא כל טבעוני מתחיל יודע לבשל. במידה וההכנה אינה קלה, אנא החלפ/י את השורה'
            }
          />
        ) : (
          ''
        )}
        <select
          type='select'
          name='difficulty'
          defaultValue={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value='קל'>קל</option>
          <option value='בינוני'>בינוני</option>
          <option value='קשה'>קשה</option>
        </select>
      </StyledSelect>
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)``;

const StyledSelect = styled.div`
  @media screen and (max-width: 600px) {
    select {
      width: 70% !important;
    }
  }
`;

const StyledLabel = styled(GlobalStyledLabel)``;

export default Difficulty;
