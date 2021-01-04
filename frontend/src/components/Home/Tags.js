import React from 'react';
import styled from 'styled-components';

const Tags = ({ setNewTag }) => {
  const changeTagHandler = (e) => {
    e.preventDefault();
    setNewTag(e.target.value);
  };

  return (
    <StyledTags>
      <>
        <p>תגית:</p>
        <select name='tag'>
          <option disabled value='בחירת תגית'>
            בחירת תגית
          </option>
          <option onClick={changeTagHandler} value=''>
            הכל
          </option>
          <option onClick={changeTagHandler} value='מעולה לעצלנים'>
            מעולה לעצלנים
          </option>
          <option onClick={changeTagHandler} value='טעים ומשביע'>
            טעים ומשביע
          </option>
          <option onClick={changeTagHandler} value='פצצת חלבון'>
            {' '}
            פצצת חלבון
          </option>
          <option onClick={changeTagHandler} value='קל להכנה'>
            קל להכנה
          </option>
          <option onClick={changeTagHandler} value='לא משמין'>
            לא משמין
          </option>
          <option onClick={changeTagHandler} value='קליל'>
            קליל
          </option>
          <option onClick={changeTagHandler} value='מתכון מתקדם'>
            מתכון מתקדם
          </option>
          <option onClick={changeTagHandler} value='ללא גלוטן'>
            ללא גלוטן
          </option>
          <option onClick={changeTagHandler} value='תחליף בשר'>
            תחליף בשר
          </option>
          <option onClick={changeTagHandler} value='מרענן'>
            מרענן
          </option>
          <option onClick={changeTagHandler} value='ליום גשום'>
            ליום גשום
          </option>
          <option onClick={changeTagHandler} value='לאחרי האימון'>
            לאחרי האימון
          </option>
          <option onClick={changeTagHandler} value='מתוק ומפנק'>
            מתוק ומפנק
          </option>
        </select>
      </>
    </StyledTags>
  );
};

const StyledTags = styled.div`
  display: flex;
  flex-direction: column;
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

export default Tags;
