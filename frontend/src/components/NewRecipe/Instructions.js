import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  GlobalStyledLabel,
  secColorButton,
  InputWrapper,
} from '../../GlobalStyles';
import { cssVariables } from '../../GlobalStyles';
import ListPreview from './ListPreview';
import Explanation from './Explanation';

const Instructions = ({ instructions, setInstructions, instructionError }) => {
  const instructionInput = useRef();

  const [instNumb, setInstNumb] = useState(1);
  const [instPreview, setInstPreview] = useState(false);
  const [newInstruction, setNewInstruction] = useState('');
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);

  const showFeedback = () => {
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 3000);
  };

  const addInstructionHandler = (e) => {
    e.preventDefault();
    if (newInstruction.trim().length >= 4) {
      showFeedback();
      setInstNumb((prevNumb) => prevNumb + 1);
      setInstructions([...instructions, newInstruction]);
      if (instructions.length === 0) {
        setInstPreview(true);
      }
    }
  };

  useEffect(() => {
    setNewInstruction('');
  }, [instructions]);

  return (
    <SingleInput>
      <StyledInstructions>
        <StyledLabel htmlFor='title'>
          <p>
            <span>*</span>
            הדרכת בישול {instNumb}:
          </p>

          <h6 onClick={() => setIsExplaining(!isExplaining)}>
            {isExplaining ? 'הסתר/י הסבר' : 'לחץ/י להסבר'}
          </h6>
        </StyledLabel>
        {isExplaining ? (
          <Explanation
            message={
              'פירוט הוראות ההכנה לפי שלבים, אחרי כל שלב ללחוץ על כפתור הוספת השלב'
            }
          />
        ) : (
          ''
        )}
        <input
          type='text'
          name='title'
          value={newInstruction}
          placeholder='פירוט שלבי הבישול'
          ref={instructionInput}
          onChange={(e) => setNewInstruction(e.target.value)}
        />
        <InstructionButtons>
          <InstructionButton onClick={addInstructionHandler}>
            הוספת השלב
          </InstructionButton>
          <InstructionButton
            onClick={(e) => {
              e.preventDefault();
              setInstPreview(!instPreview);
            }}
          >
            {instPreview ? 'הסתרת השלבים' : 'צפייה בשלבים'}
          </InstructionButton>
        </InstructionButtons>
        {addedFeedback && <h5>השלב נוסף בהצלחה!</h5>}

        {instructionError && (
          <span>
            <p>חובה להזין שלבים</p>
          </span>
        )}
        {instPreview ? (
          <ol>
            <ListPreview
              list={instructions}
              setList={setInstructions}
              setNumb={setInstNumb}
            />
          </ol>
        ) : (
          ''
        )}
      </StyledInstructions>
    </SingleInput>
  );
};

const StyledInstructions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  span {
    color: ${cssVariables.secColorDark};
    font-weight: bold;
    font-size: 1.3rem;
    vertical-align: middle;
    margin-left: 0.3rem;
  }
  select {
    width: 20%;
    margin-bottom: 0.3rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
  li {
    margin-right: 1.3rem;
    margin-top: 0.2rem;
  }
  h5 {
    font-size: 1rem;
    color: ${cssVariables.mainColorDark};
    margin: 0.5rem 0;
  }
`;

const InstructionButtons = styled.div`
  display: flex;
  button:first-of-type {
    margin-left: 1rem;
  }
  button {
    &:hover {
      padding: 0.3rem 0.8rem;
    }
  }
`;

const SingleInput = styled(InputWrapper)``;

const InstructionButton = styled(secColorButton)``;

const StyledLabel = styled(GlobalStyledLabel)``;

export default Instructions;
