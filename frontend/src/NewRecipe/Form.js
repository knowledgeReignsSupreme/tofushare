import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipe } from '../actions/RecipesActions';
import styled from 'styled-components';
import { cssVariables, mainColorButton } from '../GlobalStyles';
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
import PreviewRecipe from '../Common/PreviewRecipe';
import Loader from '../Common/Loader';

const Form = () => {
  const dispatch = useDispatch();

  const { isLoading, error, success } = useSelector(
    (state) => state.postRecipe
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  let savedNewRecipe = localStorage.getItem('newRecipe')
    ? JSON.parse(localStorage.getItem('newRecipe'))
    : '';

  const [title, setTitle] = useState(savedNewRecipe?.title || '');
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState(
    savedNewRecipe?.description || ''
  );
  const [descriptionError, setDescriptionError] = useState(false);
  const [ingredients, setIngredients] = useState(
    savedNewRecipe?.ingredients || []
  );
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmmount, setIngredientAmmount] = useState(Number || 0);
  const [ingredientError, setIngredientError] = useState(false);
  const [instructions, setInstructions] = useState(
    savedNewRecipe?.instructions || []
  );
  const [instructionError, setInstructionError] = useState(false);
  const [images, setImages] = useState(savedNewRecipe?.images || {});
  const [imagesError, setImagesError] = useState(false);
  const [prepTime, setPrepTime] = useState(savedNewRecipe?.prepTime || NaN);
  const [prepTimeError, setPrepTimeError] = useState(false);
  const [cookingTime, setCookingTime] = useState(
    savedNewRecipe?.cookingTime || NaN
  );
  const [cookingTimeError, setCookingTimeError] = useState(false);
  const [dishesAmmount, setDishesAmmount] = useState(
    savedNewRecipe?.dishesAmmount || null
  );
  const [dishesAmmountError, setDishesAmmountError] = useState(false);
  const [category, setCategory] = useState(
    savedNewRecipe?.category || 'מאכלים'
  );
  const [categoryError, setCategoryError] = useState(false);
  const [website, setWebsite] = useState(savedNewRecipe?.website || '');
  const [difficulty, setDifficulty] = useState(
    savedNewRecipe?.difficulty || 'קל'
  );
  const [tags, setTags] = useState([]);
  const [remarks, setRemarks] = useState(savedNewRecipe?.remarks || '');
  const [isValid, setIsValid] = useState(null);
  const [isPreviewOn, setIsPreviewOn] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [check, setCheck] = useState(false);

  let newRecipe = useMemo(
    () => ({
      title,
      description,
      author: loggedUser.name,
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
      createdBy: loggedUser._id,
    }),
    [
      title,
      description,
      website,
      category,
      ingredients,
      instructions,
      images,
      prepTime,
      cookingTime,
      difficulty,
      tags,
      remarks,
      dishesAmmount,
      loggedUser._id,
      loggedUser.name,
    ]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem('newRecipe', JSON.stringify(newRecipe));
  }, [newRecipe]);

  const formValidator = useCallback(() => {
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
    if (images.length !== 2) {
      setImagesError(true);
      setIsValid(false);
    } else {
      setImagesError(false);
      setIsValid(true);
    }
    if (prepTime <= 0 || !prepTime) {
      setPrepTimeError(true);
      setIsValid(false);
    } else {
      setPrepTimeError(false);
      setIsValid(true);
    }
    if (cookingTime <= 0 || !cookingTime) {
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
    if (dishesAmmount <= 0 || dishesAmmount > 10) {
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
  }, [
    title.length,
    description.length,
    images,
    prepTime,
    cookingTime,
    category,
    dishesAmmount,
    ingredients.length,
    instructions.length,
    isValid,
  ]);

  useEffect(() => {
    formValidator();
  }, [
    title.length,
    description.length,
    images,
    prepTime,
    cookingTime,
    category,
    dishesAmmount,
    ingredients.length,
    instructions.length,
    check,
    formValidator,
  ]);

  const removeItem = () => {
    localStorage.removeItem('newRecipe');
  };

  const postHandler = (e) => {
    e.preventDefault();
    setCheck(true);
    if (formValidator() && !isImageUploading && images?.image?.length > 3) {
      removeItem();
      dispatch(postRecipe(newRecipe, loggedUser.token));
    }
  };

  return (
    <>
      {success ? (
        <Success />
      ) : (
        <StyledForm>
          <Title
            setTitle={setTitle}
            title={title}
            titleError={titleError}
            check={check}
          />
          <Description
            setDescription={setDescription}
            description={description}
            descriptionError={descriptionError}
            check={check}
          />
          <Category
            setCategory={setCategory}
            category={category}
            categoryError={categoryError}
            check={check}
          />
          <DishesAmmount
            dishesAmmount={dishesAmmount}
            setDishesAmmount={setDishesAmmount}
            dishesAmmountError={dishesAmmountError}
            check={check}
          />
          <Website setWebsite={setWebsite} website={website} />
          <Ingredients
            setIngredients={setIngredients}
            ingredients={ingredients}
            setIngredientAmmount={setIngredientAmmount}
            setIngredientName={setIngredientName}
            ingredientAmmount={ingredientAmmount}
            ingredientName={ingredientName}
            ingredientError={ingredientError}
            check={check}
          />
          <Instructions
            setInstructions={setInstructions}
            instructions={instructions}
            instructionError={instructionError}
            check={check}
          />
          <Images
            setImages={setImages}
            images={images}
            imagesError={imagesError}
            isImageUploading={isImageUploading}
            setIsImageUploading={setIsImageUploading}
            check={check}
          />
          <PrepTime
            setPrepTime={setPrepTime}
            prepTime={prepTime}
            prepTimeError={prepTimeError}
            check={check}
          />
          <CookingTime
            setCookingTime={setCookingTime}
            cookingTime={cookingTime}
            cookingTimeError={cookingTimeError}
            check={check}
          />
          <Difficulty setDifficulty={setDifficulty} difficulty={difficulty} />
          <Tags tags={tags} setTags={setTags} />
          <Remarks setRemarks={setRemarks} remarks={remarks} />
          <StyledPostButton>
            {isLoading ? (
              <>
                <StyledButton disabled={true}>שולח</StyledButton>
                <Loader size='80' />
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
          {error && (
            <span>
              <p>נא לוודא שהטופס תקין או לנסות שוב</p>
            </span>
          )}
          {check && !isValid && (
            <span>
              <p>הטופס לא מולא כראוי. נא לשים לב לשדות נדרשים</p>
            </span>
          )}
          {check && images.length !== 2 && (
            <span>
              <p>יש להעלות תמונה</p>
            </span>
          )}
          {isPreviewOn && newRecipe.dishesAmmount >= 1 && (
            <StyledPreview>
              <PreviewRecipe currentRecipe={newRecipe} preview={true} />
            </StyledPreview>
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
    width: 80%;
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
    width: 80%;

    align-self: flex-start;
    border-radius: 15px;
    border: 1px solid ${cssVariables.mainColorDark};
    padding-right: 0.6rem;
    margin-bottom: 0.3rem;
    height: 2rem;
  }

  span p {
    font-size: 0.9rem;
    color: red;
    margin-right: 0.3rem;
    margin-top: 0.5rem;
    font-weight: bold;
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

const StyledPreview = styled.div`
  width: 60%;
  @media screen and (max-width: 600px) {
    width: 90% !important;
  }
`;

export default Form;
