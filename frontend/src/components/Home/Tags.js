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
        <select onChange={changeTagHandler} name='tag'>
          <option disabled value='בחירת תגית'>
            בחירת תגית
          </option>
          <option value=''>הכל</option>
          <option value='מעולה לעצלנים'>מעולה לעצלנים</option>
          <option value='טעים ומשביע'>טעים ומשביע</option>
          <option value='פצצת חלבון'> פצצת חלבון</option>
          <option value='קל להכנה'>קל להכנה</option>
          <option value='לא משמין'>לא משמין</option>
          <option value='קליל'>קליל</option>
          <option value='מתכון מתקדם'>מתכון מתקדם</option>
          <option value='ללא גלוטן'>ללא גלוטן</option>
          <option value='תחליף בשר'>תחליף בשר</option>
          <option value='מרענן'>מרענן</option>
          <option value='ליום גשום'>ליום גשום</option>
          <option value='לאחרי האימון'>לאחרי האימון</option>
          <option value='מתוק ומפנק'>מתוק ומפנק</option>
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
