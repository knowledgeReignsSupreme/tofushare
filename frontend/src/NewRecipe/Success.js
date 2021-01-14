import React from 'react';
import styled from 'styled-components';
import { cssVariables } from '../GlobalStyles';

const Success = () => {
  const reloadHandler = () => {
    window.location.reload(false);
  };

  return (
    <StyledSuccess>
      <h3>יאמי! תודה על המתכון</h3>
      <p>
        אנו מודים לך על שיתוף הפעולה והנדיבות. המתכון יישלח לבדיקה ויאושר בהקדם
      </p>
      <button onClick={reloadHandler}>פרסום מתכון נוסף</button>
    </StyledSuccess>
  );
};

const StyledSuccess = styled.div`
  background: ${cssVariables.mainColorLight};
  margin: 0 auto;
  padding: 3rem 0;
  border: 1px solid ${cssVariables.secColorDark};
  h3,
  p,
  button {
    max-width: 80%;
    margin-right: 1rem;
  }
  h3,
  p {
    margin-bottom: 0.5rem;
  }
  button {
    background: ${cssVariables.secColorDark};
    color: white;
    padding: 0.4rem 0.6rem;
    border: 1px solid ${cssVariables.mainColorDark};
    cursor: pointer;
    &:hover {
      padding: 0.4rem 0.9rem;
    }
  }
`;

export default Success;
