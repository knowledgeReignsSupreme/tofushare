import React from 'react';
import styled from 'styled-components';

const Explanation = ({ message }) => {
  return (
    <StyledExplanation>
      <p>{message}</p>
    </StyledExplanation>
  );
};

const StyledExplanation = styled.div`
  @media screen and (max-width: 600px) {
    width: 80%;
  }
  p {
    font-size: 0.9rem;
    color: #080d52;
    margin-top: -0.3rem;
    margin-bottom: 0.4rem;
    line-height: 1.2rem;
  }
`;

export default Explanation;
