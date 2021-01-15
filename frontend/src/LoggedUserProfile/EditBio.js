import React from 'react';
import styled from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import { cssVariables, secColorButton } from '../GlobalStyles';
import Input from '../Common/Input';

const EditBio = ({
  handleUserUpdate,
  currentUser,
  isLoading,
  setInstagramLink,
  setFacebookLink,
  setWebsiteLink,
  setBio,
  setIsEditing,
}) => {
  const editSubmitHandler = (e) => {
    e.preventDefault();
    handleUserUpdate();
    setIsEditing(false);
  };

  return (
    <StyledEdit onSubmit={editSubmitHandler}>
      <Input
        tag='קצת עליי:'
        defaultValue={currentUser.bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder='קצת עליי'
        wide={true}
      />{' '}
      <Input
        tag='קישור לאתר/בלוג:'
        onChange={(e) => setWebsiteLink(e.target.value)}
        placeholder={currentUser.websiteLink || 'קישור לאתר'}
      />{' '}
      <Input
        tag='קישור לאינסטגרם:'
        onChange={(e) => setInstagramLink(e.target.value)}
        placeholder={currentUser.instagramLink || 'קישור לאינסטגרם'}
      />{' '}
      <Input
        tag='קישור לפייסבוק:'
        onChange={(e) => setFacebookLink(e.target.value)}
        placeholder={currentUser.instagramLink || 'קישור לפייסבוק'}
      />{' '}
      <EditButton type='button' onClick={editSubmitHandler}>
        {' '}
        <FaUserEdit />
        {isLoading ? 'שולח...' : 'עריכה'}
      </EditButton>
    </StyledEdit>
  );
};

const EditButton = styled(secColorButton)``;

const StyledEdit = styled.form`
  display: flex;
  flex-direction: column;
  &:first-child {
    padding: 0 1rem 6rem;
    overflow: wrap;
  }
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

export default EditBio;
