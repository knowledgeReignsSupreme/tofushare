import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { transparentButton } from '../GlobalStyles';
import { FaConciergeBell, FaFireAlt } from 'react-icons/fa';

const UserCooked = ({ user, currentRecipe, handleCooked, isLoading }) => {
  const [userAlreadyCooked, setUserAlreadyCooked] = useState(false);

  const isAlreadyCooked = useCallback(() => {
    if (currentRecipe.cookedBy.includes(user._id)) {
      setUserAlreadyCooked(true);
    }
  }, [currentRecipe.cookedBy, user._id]);

  const cookedHandler = () => {
    if (!userAlreadyCooked) {
      handleCooked();
    } else {
      setUserAlreadyCooked(true);
    }
  };

  useEffect(() => {
    isAlreadyCooked();
  }, [isAlreadyCooked, user._id]);

  return (
    <StyledCooked>
      {isLoading ? (
        <StyledButton disabled={true}>
          <FaConciergeBell />
          מעדכן...
        </StyledButton>
      ) : userAlreadyCooked ? (
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
