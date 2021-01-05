import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import {
  cssVariables,
  mainColorButton,
  secColorButton,
} from '../../GlobalStyles';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaUserEdit } from 'react-icons/fa';

const Bio = ({ currentUser, loggedUser, header }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(currentUser.bio);
  const [instagramLink, setInstagramLink] = useState(currentUser.instagramLink);
  const [facebookLink, setFacebookLink] = useState(currentUser.facebookLink);

  const userUpdate = useSelector((state) => state.userUpdateProfile);
  const dispatch = useDispatch();

  const { updatedData, isLoading, error, success } = userUpdate;

  const editSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateUser(loggedUser, {
        _id: loggedUser._id,
        bio,
        instagramLink,
        facebookLink,
      })
    );
    setIsEditing(false);
  };

  return (
    <>
      <StyledHeader>
        <h2>{header}</h2>
      </StyledHeader>
      <StyledBio>
        <h4>
          {success
            ? updatedData.bio
            : currentUser.bio.length > 3
            ? currentUser.bio
            : 'לפרופיל זה אין פירוט כרגע'}
        </h4>
        <StyledSocial>
          {currentUser.facebookLink &&
            (success ? (
              <a href={`${updatedData.facebookLink}`}>
                <FaFacebook />
              </a>
            ) : (
              <a href={`${currentUser.facebookLink}`}>
                <FaFacebook />
              </a>
            ))}
          {currentUser.instagramLink &&
            (success ? (
              <a href={`${updatedData.instagramLink}`}>
                <FaInstagram />
              </a>
            ) : (
              <a href={`${currentUser.instagramLink}`}>
                <FaInstagram />
              </a>
            ))}
        </StyledSocial>
        {loggedUser && (
          <BioButton onClick={() => setIsEditing(!isEditing)}>
            {' '}
            {isLoading ? 'שולח...' : 'עריכה'}
          </BioButton>
        )}
      </StyledBio>
      {isEditing && currentUser && (
        <StyledEdit onSubmit={editSubmitHandler}>
          <label htmlFor=''>קצת עליי:</label>
          <input
            type='text'
            defaultValue={currentUser.bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <label htmlFor=''>קישור לאינסטגרם:</label>
          <input
            type='text'
            placeholder={currentUser.instagramLink || 'קישור לאינסטגרם'}
            onChange={(e) => setInstagramLink(e.target.value)}
          />
          <label htmlFor=''>קישור לפייסבוק:</label>

          <input
            type='text'
            placeholder={currentUser.instagramLink || 'קישור לפייסבוק'}
            onChange={(e) => setFacebookLink(e.target.value)}
          />
          <EditButton type='button' onClick={editSubmitHandler}>
            {' '}
            <FaUserEdit />
            {isLoading ? 'שולח...' : 'עריכה'}
          </EditButton>
          {error && <p>{error}</p>}
        </StyledEdit>
      )}
    </>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 1rem;
`;

const BioButton = styled(mainColorButton)`
  margin-top: 0;
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
`;

const StyledSocial = styled.div``;

const EditButton = styled(secColorButton)``;

const StyledEdit = styled.form`
  display: flex;
  flex-direction: column;
  label {
    margin: 0.5rem 0;
    font-size: 1.1rem;
  }
  input {
    border: 1px solid ${cssVariables.secColorDark};
    border-radius: 15px;
    padding-right: 1rem;
    color: #2f2f2f;
    overflow: visible;
    height: auto !important;
    &:first-of-type {
      padding: 0 1rem 6rem;
      overflow: wrap;
    }
  }
  button {
    width: 20%;
    margin-top: 1rem;
    text-align: center;
    @media screen and (max-width: 600px) {
      width: 30%;
    }
    svg {
      margin-left: 0.3rem;
    }
  }
`;

export default Bio;
