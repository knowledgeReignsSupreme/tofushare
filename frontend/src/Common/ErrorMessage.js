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
  padding: 5rem 0;
  max-width: 90%;
  margin: 0 auto;
  h2 {
    margin: 0.5rem;
    line-height: 2;
    font-size: 1.8rem;
  }
  p {
    margin: 0.5rem;
    font-size: 1.3rem;
  }
`;

export default ErrorMessage;
