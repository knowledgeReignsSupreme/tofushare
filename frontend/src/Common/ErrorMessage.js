import React from 'react';
import { cssVariables } from '../GlobalStyles';
import styled from 'styled-components';

const ErrorMessage = ({ message, explaination }) => {
  return (
    <StyledError>
      <h2>{message}</h2>
      <p>{explaination}</p>
    </StyledError>
  );
};

const StyledError = styled.div`
  background: ${cssVariables.secColorLight};
  width: 30rem;
  height: 5rem;
  max-width: 90%;
  margin: 0 auto;
  h2 {
    margin: 0.5rem auto;
  }
`;

export default ErrorMessage;
