import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaTag } from 'react-icons/fa';

const Tags = ({ setKeyword, category, keyword }) => {
  const [tagSearch, setTagSearch] = useState(false);

  const history = useHistory();

  let currentTag = '';
  const changeTagHandler = (e) => {
    e.preventDefault();
    setTagSearch(false);
    setKeyword('');
    currentTag = e.target.value;
    if (currentTag.trim()) {
      !category && !keyword
        ? history.push(`/tags/${currentTag}`)
        : category && keyword && currentTag
        ? history.push(
            `/categories/${category}/search/${keyword}/tags/${currentTag}`
          )
        : category && keyword
        ? history.push(
            `/categories/${category}/search/${keyword}/tags/${currentTag}`
          )
        : category && !keyword
        ? history.push(`/categories/${category}/tags/${currentTag}`)
        : keyword && !category
        ? history.push(`/search/${keyword}/tags/${currentTag}`)
        : history.push(`/tags/${currentTag}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <StyledTags>
      <button onClick={() => setTagSearch(!tagSearch)}>
        <FaTag /> תגיות
      </button>
      {tagSearch && (
        <>
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
      )}
    </StyledTags>
  );
};

const StyledTags = styled.div`
  display: flex;
  flex-direction: column;
  select {
    margin-top: 0.5rem;
    white-space: wrap;
    width: 10rem;
    cursor: pointer;
  }
`;

export default Tags;
