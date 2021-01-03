import React from 'react';
import styled from 'styled-components';
import { secColorButton } from '../../GlobalStyles';
import { FaBookmark, FaFileAlt, FaIdBadge } from 'react-icons/fa';

const Buttons = ({
  setShowCreated,
  setShowSaved,
  setShowSocial,
  loggedUser,
}) => {
  const toggleButtonHandler = (button) => {
    switch (button) {
      case 'bio':
        setShowSocial(true);
        if (setShowSaved) {
          setShowSaved(false);
        }

        setShowCreated(false);
        break;
      case 'created':
        setShowCreated(true);
        setShowSocial(false);
        if (setShowSaved) {
          setShowSaved(false);
        }
        break;
      case 'saved':
        setShowCreated(false);
        if (setShowSaved) {
          setShowSaved(true);
        }
        setShowSocial(false);
        break;

      default:
        return button;
    }
  };

  // TODO: Make sure only one button is true at a time
  return (
    <StyledButtons>
      <StyledButton onClick={() => toggleButtonHandler('bio')}>
        <FaIdBadge /> מידע כללי
      </StyledButton>
      <StyledButton onClick={() => toggleButtonHandler('created')}>
        <FaFileAlt /> מתכונים שנוצרו
      </StyledButton>
      {loggedUser && (
        <StyledButton onClick={() => toggleButtonHandler('saved')}>
          <FaBookmark /> מתכונים שמורים
        </StyledButton>
      )}
    </StyledButtons>
  );
};

const StyledButtons = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    width: 60%;
  }
  svg {
    font-size: 0.9rem;
    margin-right: -0.2rem;
    @media screen and (max-width: 600px) {
      margin-right: 0.3rem;
    }
  }
  button {
    @media screen and (max-width: 400px) {
      width: 100%;
    }
    @media screen and (min-width: 400px) and (max-width: 600px) {
      width: 70%;
    }

    @media screen and (max-width: 600px) {
      flex-direction: column;
      margin-bottom: 0.2rem;
      padding: 0.5rem 0.5rem !important;
      text-align: right;
      &:hover {
        padding: 0.5rem 0.6rem;
      }
    }
    &:not(:first-of-type) {
      @media screen and (min-width: 600px) {
        margin-right: 1rem;
      }
    }
  }
`;

const StyledButton = styled(secColorButton)`
  margin: 0.2rem 0;
`;

export default Buttons;
