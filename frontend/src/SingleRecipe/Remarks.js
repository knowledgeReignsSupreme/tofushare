import React from 'react';
import styled from 'styled-components';
import { cssVariables } from '../GlobalStyles';
import { linkFormat } from '../Helpers/Functions';

const Remarks = ({ currentRecipe }) => {
  return (
    <StyledRemarks>
      <h3>הערות המחבר/ת:</h3>
      {currentRecipe.website.trim().length > 3 && (
        <a href={linkFormat(currentRecipe.website)}>לאתר המחבר/ת</a>
      )}
      {currentRecipe.remarks.trim().length >= 1 ? (
        <p>{currentRecipe.remarks}</p>
      ) : (
        <>
          <p>אין הערות נוספות על מתכון זה</p>
        </>
      )}
    </StyledRemarks>
  );
};

const StyledRemarks = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: flex-start;
  width: 100%;
  flex-direction: column;
  background: ${cssVariables.mainColorLight};
  color: black;
  padding: 0.5rem 0;
  border: 1px solid ${cssVariables.mainColorDark};
  a {
    margin-top: 0.2rem;
    font-weight: bold;
    color: blue;
  }
  p {
    margin-top: 0.3rem;
    margin-right: 5px;
  }
  p,
  h3,
  a {
    margin-right: 5px;
  }
`;
export default Remarks;
