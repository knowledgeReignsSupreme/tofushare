import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { transparentButton, cssVariables } from '../GlobalStyles';

const NotRegistered = ({ message, icon, buttonText }) => {
  return (
    <StyledRegister>
      <StyledButton>
        {icon} {buttonText}
      </StyledButton>
      <Link to={'/register'}>
        <p> {message} </p>
        <p>לחץ/י להרשמה</p>
      </Link>
    </StyledRegister>
  );
};

const StyledButton = styled(transparentButton)``;

const StyledNoRegistered = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  svg {
    margin-left: 0.3rem;
    font-size: 1rem;
  }
  p {
    font-size: 0.8rem !important;
    margin-top: -0.2rem !important;
    color: ${cssVariables.secColorDark};
  }
`;

const StyledRegister = styled(StyledNoRegistered)`
  button {
    margin-top: 1rem;
  }
  p {
    color: red;
    padding: none !important;
  }
  p:last-of-type {
    color: inherit;
  }
`;

export default NotRegistered;
