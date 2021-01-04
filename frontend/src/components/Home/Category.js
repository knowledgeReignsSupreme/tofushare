import React from 'react';
import styled from 'styled-components';

const Category = ({ setNewCategory }) => {
  const categoryHandler = (e) => {
    e.preventDefault();
    setNewCategory(e.target.value);
  };

  return (
    <StyledCategory>
      <>
        <p>קטגוריה:</p>
        <select onChange={categoryHandler} name='category'>
          <option disabled value='בחירת קטגוריה'>
            בחירת קטגוריה
          </option>
          <option value=''>הכל</option>
          <option value='מאכלים'>מאכלים</option>
          <option value='עוגות ומתוקים'>עוגות ומתוקים</option>
          <option value='שייקים, נוזלים ותחליפי חלב'>
            שייקים, נוזלים ותחליפי חלב
          </option>
        </select>
      </>
    </StyledCategory>
  );
};

const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem !important;
  select {
    margin-top: 0.5rem;
    white-space: wrap;
    width: 5rem;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      width: 10rem;
    }
  }
`;

export default Category;
