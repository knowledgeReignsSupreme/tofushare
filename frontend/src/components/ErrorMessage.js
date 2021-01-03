import React from 'react';
import { cssVariables } from '../GlobalStyles';
import styled from 'styled-components';

const ErrorMessage = ({ message }) => {
  return (
    <StyledError>
      <h2>{message}</h2>
    </StyledError>
  );
};

const StyledError = styled.div`
  color: ${cssVariables.secColorDark};
  width: max-content;
  margin: 0 auto;
  h1 {
    margin: auto;
  }
`;

export default ErrorMessage;
