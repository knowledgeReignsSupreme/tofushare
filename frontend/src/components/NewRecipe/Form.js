import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe } from '../../actions/RecipesActions';
import styled from 'styled-components';
import { cssVariables, mainColorButton } from '../../GlobalStyles';
import Tags from './Tags';
import PrepTime from './PrepTime';
import CookingTime from './CookingTime';
import Difficulty from './Difficulty';
import Remarks from './Remarks';
import Images from './Images';
import Title from './Title';
import Description from './Description';
import Website from './Website';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import Success from './Success';
import DishesAmmount from './DishesAmmount';
import Category from './Category';
import Preview from './Preview';
import CommonLoader from '../CommonLoader';

const Form = () => {
  const dispatch = useDispatch();

  const { isLoading, error, success } = useSelector(
    (state) => state.postRecipe
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmmount, setIngredientAmmount] = useState(Number || 0);
  const [ingredientError, setIngredientError] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [instructionError, setInstructionError] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState(false);
  const [prepTime, setPrepTime] = useState();
  const [prepTimeError, setPrepTimeError] = useState(false);
  const [cookingTime, setCookingTime] = useState();
  const [cookingTimeError, setCookingTimeError] = useState(false);
  const [dishesAmmount, setDishesAmmount] = useState(null);
  const [dishesAmmountError, setDishesAmmountError] = useState(false);
  const [showRemakrs, setShowRemarks] = useState(false);
  const [category, setCategory] = useState('מאכלים');
  const [categoryError, setCategoryError] = useState(false);
  const [website, setWebsite] = useState('');
  const [difficulty, setDifficulty] = useState('קל');
  const [tags, setTags] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isPreviewOn, setIsPreviewOn] = useState(false);

  const newRecipe = {
    title,
    description,
    author: userInfo.name,
    website,
    category,
    ingredients,
    instructions,
    images,
    prepTime: +prepTime,
    cookingTime: +cookingTime,
    difficulty,
    tags,
    remarks,
    dishesAmmount: +dishesAmmount,
    createdBy: userInfo._id,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const remarksValidator = () => {
    if (title.length <= 3) {
      setTitleError(true);
      setIsValid(false);
    } else {
      setTitleError(false);
      setIsValid(true);
    }
    if (description.length <= 3) {
      setDescriptionError(true);
      setIsValid(false);
    } else {
      setDescriptionError(false);
      setIsValid(true);
    }
    if (images.length <= 3) {
      setImagesError(true);
      setIsValid(false);
    } else {
      setImagesError(false);
      setIsValid(true);
    }
    if (prepTime <= 0) {
      setPrepTimeError(true);
      setIsValid(false);
    } else {
      setPrepTimeError(false);
      setIsValid(true);
    }
    if (cookingTime <= 0) {
      setCookingTimeError(true);
      setIsValid(false);
    } else {
      setCookingTimeError(false);
      setIsValid(true);
    }
    if (category === '') {
      setCategoryError(true);
      setIsValid(false);
    } else {
      setCategoryError(false);
      setIsValid(true);
    }
    if (dishesAmmount <= 0) {
      setDishesAmmountError(true);
      setIsValid(false);
    } else {
      setDishesAmmountError(false);
      setIsValid(true);
    }
    if (ingredients.length === 0) {
      setIngredientError(true);
      setIsValid(false);
    } else {
      setIngredientError(false);
      setIsValid(true);
    }
    if (instructions.length === 0) {
      setInstructionError(true);
      setIsValid(false);
    } else {
      setInstructionError(false);
      setIsValid(true);
    }
    return isValid;
  };

  const postHandler = (e) => {
    e.preventDefault();
    remarksValidator();
    if (!remarksValidator) {
      setShowRemarks(true);
    } else if (remarksValidator) {
      dispatch(postRecipe(newRecipe, userInfo.token));
    }
  };

  return (
    <>
      {success ? (
        <Success />
      ) : (
        <StyledForm>
          <Title setTitle={setTitle} title={title} titleError={titleError} />
          <Description
            setDescription={setDescription}
            description={description}
            descriptionError={descriptionError}
          />
          <Category
            setCategory={setCategory}
            category={category}
            categoryError={categoryError}
          />
          <DishesAmmount
            dishesAmmount={dishesAmmount}
            setDishesAmmount={setDishesAmmount}
            dishesAmmountError={dishesAmmountError}
          />
          <Website setWebsite={setWebsite} />
          <Ingredients
            setIngredients={setIngredients}
            ingredients={ingredients}
            setIngredientAmmount={setIngredientAmmount}
            setIngredientName={setIngredientName}
            ingredientAmmount={ingredientAmmount}
            ingredientName={ingredientName}
            ingredientError={ingredientError}
          />
          <Instructions
            setInstructions={setInstructions}
            instructions={instructions}
            instructionError={instructionError}
          />
          <Images
            setImages={setImages}
            images={images}
            imagesError={imagesError}
          />
          <PrepTime
            setPrepTime={setPrepTime}
            prepTime={prepTime}
            prepTimeError={prepTimeError}
          />
          <CookingTime
            setCookingTime={setCookingTime}
            cookingTime={cookingTime}
            cookingTimeError={cookingTimeError}
          />
          <Difficulty setDifficulty={setDifficulty} />
          <Tags tags={tags} setTags={setTags} />
          <Remarks setRemarks={setRemarks} />
          <StyledPostButton>
            {isLoading ? (
              <>
                <StyledButton disabled={true}>שולח</StyledButton>
                <CommonLoader size='80' />
              </>
            ) : (
              <StyledButton onClick={postHandler}>שליחה</StyledButton>
            )}
            <StyledButton
              onClick={() => setIsPreviewOn(!isPreviewOn)}
              type='button'
            >
              {isPreviewOn && newRecipe.dishesAmmount >= 1
                ? 'הסתרת תצוגה מקדימה'
                : 'תצוגה מקדימה'}
            </StyledButton>
          </StyledPostButton>
          {isPreviewOn && !newRecipe.dishesAmmount >= 1 && (
            <p>* ניתן להשתמש בתצוגה מקדימה רק לאחר ציון מספר מנות</p>
          )}
          {showRemakrs && (
            <span>
              {' '}
              <p>הטופס אינו תקין. נא לשים לב לשדות נדרשים לפני השליחה</p>
            </span>
          )}
          {error && (
            <span>
              <p>נא לוודא שהטופס תקין או לנסות שוב</p>
            </span>
          )}
          {isPreviewOn && newRecipe.dishesAmmount >= 1 && (
            <Preview currentRecipe={newRecipe} />
          )}
        </StyledForm>
      )}
    </>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  margin: auto;

  input[type='text'] {
    width: 60%;
    align-self: flex-start;
    border-radius: 15px;
    border: 1px solid ${cssVariables.mainColorDark};
    padding-right: 0.6rem;
    height: 2rem;
    @media screen and (max-width: 600px) {
      width: 90%;
    }
  }

  input[type='number'] {
    width: 25%;
    align-self: flex-start;
    border-radius: 15px;
    border: 1px solid ${cssVariables.mainColorDark};
    padding-right: 0.6rem;
    margin-bottom: 0.3rem;
    height: 2rem;
    @media screen and (max-width: 600px) {
      width: 40%;
    }
  }

  span p {
    font-size: 0.9rem;
    color: red;
    margin-right: 0.3rem;
    margin-top: 0.5rem;
    font-weight: bold;
    width: 90%;
  }
  h6 {
    font-size: 0.7rem;
  }
  button:disabled {
    cursor: not-allowed;
    background: lightgray;
    border: none;
  }
  button[disabled] {
    cursor: not-allowed;
    background: lightgray;
    border: none;
  }
`;

const StyledButton = styled(mainColorButton)`
  &:first-of-type {
    margin-left: 0.5rem;
    width: 8rem;
    &:hover {
      width: 8.5rem;
    }
  }
`;

const StyledPostButton = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

export default Form;
