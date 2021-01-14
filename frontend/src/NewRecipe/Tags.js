import React, { useState } from 'react';
import styled from 'styled-components';
import { cssVariables, GlobalStyledLabel } from '../GlobalStyles';
import Explanation from './Explanation';

const Tags = ({ tags, setTags }) => {
  const [tagsError, setTagsError] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);

  const tagButtonHandler = (e) => {
    e.preventDefault();

    if (tags.includes(e.target.name)) {
      const tagIndex = tags.indexOf(e.target.name);

      tags.splice(tagIndex, 1);
      setTags([...tags]);
      e.target.classList.toggle('selected-tag');
      setTagsError(false);
    } else {
      if (tags.length < 3) {
        setTags([...tags, e.target.name]);
        e.target.classList.toggle('selected-tag');
        setTagsError(false);
      }
    }
    if (tags.length === 3) {
      setTagsError(true);
    }
  };

  return (
    <TagsButtons>
      <StyledLabel htmlFor='title'>
        <p>תגיות (עד שלוש)</p>
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'ניתן לבחור עד 3 תגיות רלוונטיות למען מיקוד החיפוש עבור המשתמשים'
          }
        />
      ) : (
        ''
      )}

      <button name='מעולה לעצלנים' onClick={(e) => tagButtonHandler(e)}>
        מעולה לעצלנים
      </button>
      <button name='טעים ומשביע' onClick={(e) => tagButtonHandler(e)}>
        טעים ומשביע
      </button>
      <button name='פצצת חלבון' onClick={(e) => tagButtonHandler(e)}>
        פצצת חלבון
      </button>
      <button name='קל להכנה' onClick={(e) => tagButtonHandler(e)}>
        קל להכנה
      </button>
      <button name='לא משמין' onClick={(e) => tagButtonHandler(e)}>
        לא משמין
      </button>
      <button name='קליל' onClick={(e) => tagButtonHandler(e)}>
        קליל
      </button>
      <button name='ללא גלוטן' onClick={(e) => tagButtonHandler(e)}>
        ללא גלוטן
      </button>
      <button name='תחליף בשר' onClick={(e) => tagButtonHandler(e)}>
        תחליף בשר
      </button>
      <button name='מתכון מתקדם' onClick={(e) => tagButtonHandler(e)}>
        מתכון מתקדם
      </button>
      <button name='מרענן' onClick={(e) => tagButtonHandler(e)}>
        מרענן
      </button>
      <button name='ליום גשום' onClick={(e) => tagButtonHandler(e)}>
        ליום גשום
      </button>
      <button name='לאחרי האימון' onClick={(e) => tagButtonHandler(e)}>
        לאחרי האימון
      </button>
      <button name='מתוק ומפנק' onClick={(e) => tagButtonHandler(e)}>
        מתוק ומפנק
      </button>
      {tagsError && (
        <span>
          <p>לא ניתן לבחור יותר מ-3 תגיות</p>
        </span>
      )}
    </TagsButtons>
  );
};

const TagsButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  span p {
    width: 100%;
  }
  @media screen and (max-width: 600px) {
    width: 90%;
  }
  button {
    margin: 0.3rem 0.4rem !important;
    border: 1px solid ${cssVariables.secColorDark};
    padding: 0.3rem 0.6rem;
    border-radius: 12px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-out;
    &:hover {
      border: 1px solid ${cssVariables.mainColorDark};
      padding: 0.3rem 0.8rem;
    }
  }
`;

const StyledLabel = styled(GlobalStyledLabel)`
  width: 99%;
`;

export default Tags;
