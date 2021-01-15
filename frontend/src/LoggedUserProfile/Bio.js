import React from 'react';
import { cssVariables, mainColorButton } from '../GlobalStyles';
import styled from 'styled-components';
import Loader from '../Common/Loader';
import ErrorMessage from '../Common/ErrorMessage';
import { linkFormat } from '../Helpers/Functions';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

const Bio = ({
  currentUser,
  isLogged,
  header,
  isEditing,
  setIsEditing,
  isLoading,
  error,
}) => {
  return (
    <>
      <StyledHeader>
        <h2>{header}</h2>
      </StyledHeader>
      {isLoading ? (
        <Loader size={40} />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <StyledBio>
          <h4>
            {currentUser.websiteLink &&
              currentUser.websiteLink.trim().length > 3 && (
                <a href={linkFormat(currentUser.websiteLink)}>לאתר שלי</a>
              )}
            {currentUser.bio.length > 3
              ? currentUser.bio
              : 'לפרופיל זה אין פירוט כרגע'}
          </h4>
          <StyledSocial>
            {currentUser.facebookLink.trim().length > 3 && (
              <a href={linkFormat(currentUser.facebookLink)}>
                <FaFacebook />
              </a>
            )}
            {currentUser.instagramLink.trim().length > 3 && (
              <a href={linkFormat(currentUser.instagramLink)}>
                <FaInstagram />
              </a>
            )}
          </StyledSocial>
          {isLogged && (
            <BioButton onClick={() => setIsEditing(!isEditing)}>
              {' '}
              {isLoading ? 'שולח...' : 'עריכה'}
            </BioButton>
          )}
        </StyledBio>
      )}
    </>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 1rem;
`;

const BioButton = styled(mainColorButton)`
  margin-top: 1rem;
  margin-bottom: 0;
`;

const StyledBio = styled.div`
  background: ${cssVariables.mainColorLight};
  padding: 0.3rem 0 1rem;
  display: flex;
  flex-direction: column;
  svg {
    margin-top: 0.5rem;
    font-size: 1.5rem;
    &:first-of-type {
      margin-left: 0.4rem;
    }
  }
  button {
    margin-left: 1rem;
    width: 20%;
    align-self: flex-end;
    @media screen and (max-width: 600px) {
      width: 30%;
    }
  }
  a {
    font-weight: bold;
    color: blue;
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
`;

const StyledSocial = styled.div`
  display: flex;
`;

export default Bio;
