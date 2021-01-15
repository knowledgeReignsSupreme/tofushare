import React from 'react';
import ErrorMessage from '../Common/ErrorMessage';
import Input from '../Common/Input';
import styled from 'styled-components';
const TestUI = () => {
  return (
    <StyledUI>
      <ErrorMessage message='תקלה' explaination='נא לרענן' />
      <Input
        tag='תרשום'
        required={true}
        onChange={() => console.log('HEY')}
        error='HI'
      />
    </StyledUI>
  );
};

const StyledUI = styled.div`
  width: 40rem;
  max-width: 90%;
  margin: 0 auto;
`;

export default TestUI;
