import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaStream } from 'react-icons/fa';

const Category = ({ setKeyword }) => {
  const [categorySearch, setCategorySearch] = useState(false);

  const history = useHistory();

  let category = '';

  const categoryHandler = (e) => {
    e.preventDefault();
    setCategorySearch(false);
    category = e.target.value;
    setKeyword('');

    if (category.trim()) {
      history.push(`/categories/${category}`);
    } else {
      history.push('/');
    }
  };

  return (
    <StyledCategory>
      <button onClick={() => setCategorySearch(!categorySearch)}>
        <FaStream /> קטגוריה
      </button>
      {categorySearch && (
        <>
          <select name='category'>
            <option disabled value='בחירת קטגוריה'>
              בחירת קטגוריה
            </option>
            <option onClick={categoryHandler} value=''>
              הכל
            </option>
            <option onClick={categoryHandler} value='מאכלים'>
              מאכלים
            </option>
            <option onClick={categoryHandler} value='עוגות ומתוקים'>
              עוגות ומתוקים
            </option>
            <option
              onClick={categoryHandler}
              value='שייקים, נוזלים ותחליפי חלב'
            >
              שייקים, נוזלים ותחליפי חלב
            </option>
          </select>
        </>
      )}
    </StyledCategory>
  );
};

const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  select {
    margin-top: 0.5rem;
    white-space: wrap;
    width: 10rem;
    cursor: pointer;
  }
`;

export default Category;
