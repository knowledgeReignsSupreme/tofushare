import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import uuid from 'react-uuid';
import { cssVariables } from '../../GlobalStyles';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

const Body = ({ currentRecipe }) => {
  const [dishes, setDishes] = useState(+currentRecipe.dishesAmmount);
  const dishesNumber = useRef();
  const [dishMath, setDishMath] = useState(0);

  const dishesFormat = (operator) => {
    switch (operator) {
      case '+':
        setDishes((prevNumb) => (prevNumb < 10 ? prevNumb + 1 : prevNumb));
        setDishMath((prevNumb) => (dishes < 10 ? prevNumb + 1 : prevNumb));
        break;
      case '-':
        setDishes((prevNumb) => (prevNumb > 0 ? prevNumb - 1 : prevNumb));
        setDishMath((prevNumb) => (dishes > 0 ? prevNumb - 1 : prevNumb));
        break;
      default:
        return operator;
    }
  };

  const ingredientFormatter = (currentIng, math) => {
    return +currentIng + (currentIng / currentRecipe.dishesAmmount) * math;
  };

  useEffect(() => {
    setDishes(currentRecipe.dishesAmmount);
    setDishMath(0);
  }, [currentRecipe.dishesAmmount]);

  return (
    <>
      {/* //Change the dishes number along with the measurment */}
      <NumberOfDishes>
        <p>כמות ל: </p>
        <input
          type='number'
          value={dishes}
          ref={dishesNumber}
          onChange={(e) =>
            e.target.value >= 1 && e.target.value < 11
              ? setDishes(e.target.value)
              : ''
          }
          min='1'
          max='10'
        />

        <button onClick={() => dishesFormat('-')} type='button'>
          <FaArrowDown />
        </button>
        <button onClick={() => dishesFormat('+')} type='button'>
          <FaArrowUp />
        </button>
        <p>{dishes === 1 ? 'מנה' : 'מנות'}</p>
      </NumberOfDishes>

      <StyledSingleRecipeBody>
        <Ingredients>
          <h3>מצרכים:</h3>
          {currentRecipe.ingredients.map((ingredient) => (
            <IngredientAmmount key={uuid()}>
              <p>
                {ingredient.ammount > 0.1 &&
                  ingredientFormatter(ingredient.ammount, dishMath).toFixed(1)}
              </p>
              <p>{ingredient.name}</p>
            </IngredientAmmount>
          ))}
        </Ingredients>
        <Instructions>
          <h3>הוראת הכנה:</h3>
          <ol>
            {currentRecipe.instructions.map((instruction) => (
              <li key={uuid()}>{instruction}</li>
            ))}
          </ol>
        </Instructions>
      </StyledSingleRecipeBody>
    </>
  );
};

const StyledSingleRecipeBody = styled.div`
  margin-top: 1rem;
  align-self: flex-start;
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Ingredients = styled.div`
  align-self: flex-start;
  margin-left: 3rem;
  p {
    margin-top: 0.1rem !important;
  }
  @media screen and (max-width: 700px) {
    margin-bottom: 2rem;
  }
`;
const Instructions = styled.div`
  li {
    margin-right: 1rem;

    margin-top: 0.5rem;
  }
`;

const IngredientAmmount = styled.div`
  display: flex;
  align-items: center;
  p:not(:last-of-type) {
    margin-left: 0.5rem;
    align-self: flex-start;
  }
`;

const NumberOfDishes = styled.div`
  input[type='number'] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 1rem;

  p {
    margin: 0 0.5rem;
  }
  input {
    width: 4.5rem;
    height: 2rem;
    border-radius: 10px;
    display: flex;
    text-align: center;
    border: 1px solid ${cssVariables.secColorDark};
    font-size: 1.2rem;
    outline: none;
  }
  button {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    border: none;
    border-radius: 50%;
    color: ${cssVariables.mainColorDark};
    cursor: pointer;
    outline: none;
    transition: all 0.5s ease-in;
    background: transparent;

    &:hover {
      color: ${cssVariables.secColorDark};
    }
  }
  button:first-of-type {
    right: 37% !important;
  }
  button:last-of-type {
    right: 63% !important;
  }
`;
export default Body;
