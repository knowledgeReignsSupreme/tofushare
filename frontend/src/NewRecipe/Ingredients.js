import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel, secColorButton } from '../GlobalStyles';
import { cssVariables } from '../GlobalStyles';
import ListPreview from './ListPreview';
import Explanation from './Explanation';

const Ingredients = ({
  setIngredients,
  ingredients,
  setIngredientAmmount,
  setIngredientName,
  ingredientAmmount,
  ingredientName,
  ingredientError,
  check,
}) => {
  const ammount = useRef();

  const [ingNumb, setIngNumb] = useState(1);
  const [ingPreview, setIngPreview] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);

  const showFeedback = () => {
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 3000);
  };

  const newIngredientHandler = (e) => {
    e.preventDefault();

    if (ingredientName.trim().length >= 2) {
      setIngNumb((prevNumb) => prevNumb + 1);
      showFeedback();
      setIngredients([
        ...ingredients,
        { name: ingredientName, ammount: ingredientAmmount || ' ' },
      ]);
      if (ingredients.length === 0) {
        setIngPreview(true);
      }
      ammount.current.focus();
    }
  };

  const clearInputs = useCallback(() => {
    setIngredientName('');
    setIngredientAmmount('');
  }, [setIngredientAmmount, setIngredientName]);

  useEffect(() => {
    clearInputs();
  }, [ingredients, clearInputs]);

  return (
    <>
      <SingleInput>
        <StyledLabel htmlFor='title'>
          <p>
            <span>*</span>
            מצרך {ingNumb}:
          </p>

          <h6 onClick={() => setIsExplaining(!isExplaining)}>
            {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
          </h6>
        </StyledLabel>
        {isExplaining ? (
          <Explanation
            message={
              'דוגמא: 1 כף שמן זית. הספרה 1 תכנס לשורת הכמות. המשקל או יחידת המידה (במידה ויש) עם שם המצרך ייכנסו לשורה השנייה. במידה ואין יחידת מידה ניתן לרשום ללא (לדוגמא: מלח לפי הטעם). לאחר כל מצרך ללחוץ על כפתור הוספת המצרך'
            }
          />
        ) : (
          ''
        )}
        <input
          type='number'
          placeholder='כמות'
          value={ingredientAmmount}
          onChange={(e) => setIngredientAmmount(e.target.value)}
          ref={ammount}
          min='0'
          step='0.1'
        />
        <input
          type='text'
          name='title'
          placeholder='מצרך'
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
        />
        <IngredientButtons>
          <IngredientButton onClick={newIngredientHandler}>
            הוספת המצרך
          </IngredientButton>
          <IngredientButton
            onClick={(e) => {
              e.preventDefault();
              setIngPreview(!ingPreview);
            }}
          >
            {ingPreview ? 'הסתרת מצרכים' : 'צפייה במצרכים'}
          </IngredientButton>
        </IngredientButtons>
        {addedFeedback && <h5>המצרך נוסף בהצלחה!</h5>}
        {ingredientError && check && (
          <span>
            {' '}
            <p>חובה להזין מצרכים</p>
          </span>
        )}
        {ingPreview ? (
          <StyledPreview>
            <ListPreview
              list={ingredients}
              setList={setIngredients}
              setNumb={setIngNumb}
            />
          </StyledPreview>
        ) : (
          ''
        )}
      </SingleInput>
    </>
  );
};

const SingleInput = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  span {
    color: ${cssVariables.secColorDark};
    font-weight: bold;
    font-size: 1.3rem;
    vertical-align: middle;
    margin-left: 0.3rem;
  }
  select {
    width: 20%;
    margin-bottom: 0.3rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
  h5 {
    font-size: 1rem;
    color: ${cssVariables.mainColorDark};
    margin: 0.5rem 0;
  }
`;

const IngredientButtons = styled.div`
  display: flex;
  button:first-of-type {
    margin-left: 1rem;
  }
`;

const IngredientButton = styled(secColorButton)``;

const StyledLabel = styled(GlobalStyledLabel)``;

const StyledPreview = styled.div``;
export default Ingredients;
