import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cookedRecipe } from '../../actions/RecipesActions';
import { getSingleRecipe } from '../../actions/RecipesActions';

import styled from 'styled-components';
import { transparentButton } from '../../GlobalStyles';
import { FaConciergeBell, FaFireAlt } from 'react-icons/fa';

const UserCooked = ({ user, currentRecipe }) => {
  const [userAlreadyCooked, setUserAlreadyCooked] = useState(false);

  const dispatch = useDispatch();

  const recipeCooked = useSelector((state) => state.recipeCooked);
  const { success } = recipeCooked;

  const cookedHandler = () => {
    if (!userAlreadyCooked) {
      dispatch(cookedRecipe(user, currentRecipe._id));
    } else {
      setUserAlreadyCooked(true);
    }
  };

  const isAlreadyCooked = useCallback(() => {
    if (currentRecipe.cookedBy.includes(user._id)) {
      setUserAlreadyCooked(true);
    }
  }, [currentRecipe.cookedBy, user._id]);

  useEffect(() => {
    isAlreadyCooked();
  }, [isAlreadyCooked, user._id]);

  useEffect(() => {
    if (success) {
      dispatch({ type: 'RECIPE_COOKED_RESET' });
      dispatch(getSingleRecipe(currentRecipe._id));
    }
  }, [success, currentRecipe._id, dispatch]);

  return (
    <StyledCooked>
      {userAlreadyCooked ? (
        <>
          <StyledButton>
            <FaConciergeBell
              style={{
                color: 'black',
                background: 'white',
                borderRadius: 'initial',
              }}
            />
            השתמשת במתכון
          </StyledButton>
        </>
      ) : (
        <>
          <StyledButton onClick={cookedHandler}>
            <FaFireAlt />
            הכנתי את המתכון!
          </StyledButton>
          <p>השתמשת במתכון? לחץ/י על הכפתור!</p>
        </>
      )}
    </StyledCooked>
  );
};

const StyledButton = styled(transparentButton)``;

const StyledCooked = styled.div`
  p {
    font-size: 0.8rem;
    margin-top: 0 !important;
  }
  svg {
    margin-left: 0.3rem;
  }
`;

export default UserCooked;
