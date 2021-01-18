import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel, InputWrapper } from '../GlobalStyles';
import Explanation from './Explanation';

const Category = ({
  category,
  setCategory,
  categoryError,
  setCategoryError,
  check,
}) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        <p>
          <span>*</span>
          קטגוריה
        </p>

        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'כדי לאפשר למשתמשים סינון קל וענייני, אנא בחר/י את הקטגוריה של המתכון'
          }
        />
      ) : (
        ''
      )}
      <StyledSelect>
        <select
          type='select'
          name='category'
          defaultValue={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value='מאכלים'>מאכלים</option>
          <option value='עוגות ומתוקים'>עוגות ומתוקים</option>
          <option value='שייקים, נוזלים ותחליפי חלב'>
            שייקים, נוזלים ותחליפי חלב
          </option>
        </select>
        {categoryError && check && (
          <span>
            <p>חובה לבחור קטגוריה</p>
          </span>
        )}
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

export default Category;
