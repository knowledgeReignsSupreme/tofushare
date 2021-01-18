import React, { useState } from 'react';
import { GlobalStyledLabel, InputWrapper } from '../GlobalStyles';
import styled from 'styled-components';
import Explanation from './Explanation';

const Remarks = ({ setRemarks, remarks }) => {
  const [isExplaining, setIsExplaining] = useState(false);

  return (
    <SingleInput>
      <StyledLabel htmlFor='title'>
        <p> הערות נוספות:</p>
        <h6 onClick={() => setIsExplaining(!isExplaining)}>
          {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
        </h6>
      </StyledLabel>
      {isExplaining ? (
        <Explanation
          message={
            'הערות יופיעו בדף המתכון, דוגמה: במקום שן שום ניתן להשתמש בכפית שום כתוש'
          }
        />
      ) : (
        ''
      )}
      <input
        type='text'
        name='title'
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)``;

const StyledLabel = styled(GlobalStyledLabel)``;

export default Remarks;
