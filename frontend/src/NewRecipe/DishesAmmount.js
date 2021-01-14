import React, { useState } from 'react';
import styled from 'styled-components';
import { GlobalStyledLabel, InputWrapper } from '../GlobalStyles';
import Explanation from './Explanation';

const DishesAmmount = ({
  dishesAmmount,
  setDishesAmmount,
  dishesAmmountError,
  check,
}) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        <p>
          <span>*</span>
          כמות המנות במתכון (1-8)
        </p>

        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'לכמה מנות המתכון מיועד? נועד כדי לאפשר למשתשים להגדיל ולהוריד את משקל המצרכים בהתאם לכמות המנות'
          }
        />
      ) : (
        ''
      )}
      <input
        placeholder='כמות מנות'
        type='number'
        name='dishes'
        min='1'
        max='8'
        onChange={(e) => setDishesAmmount(e.target.value)}
      />
      {dishesAmmountError && check && (
        <span>
          <p>מספר המנות חייב להיות בין 1 ל 8</p>
        </span>
      )}
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)``;

const StyledLabel = styled(GlobalStyledLabel)``;

export default DishesAmmount;
