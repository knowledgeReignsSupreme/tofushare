import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { useHistory } from 'react-router-dom';
import userImage from '../../no-image-user.jpg';
import styled from 'styled-components';
import { secColorButton, mainColorButton } from '../../GlobalStyles';
import ImageUpload from './ImageUpload';

const Header = ({ currentUser, loggedUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  const formatDate = (date) => {
    const monthOnly = date.slice(0, 10);
    return monthOnly.split('-').reverse().join().replaceAll(',', '/');
  };

  const userCookedCalc = (recipes) => {
    let sum = recipes.reduce(function (total, currentValue) {
      return total + currentValue.cookedBy.length;
    }, 0);
    return sum;
  };

  return (
    <div>
      <>
        {currentUser ? (
          <>
            <StyledHeader>
              <StyledImage>
                {currentUser.image ? (
                  <img src={currentUser.image.location} alt='user' />
                ) : (
                  <img src={userImage} alt='user' />
                )}
              </StyledImage>

              <StyledDetails>
                <h1>{currentUser.name}</h1>
                <p>מתכונים: {currentUser.createdRecipes.length}</p>
                {currentUser.createdRecipes.length >= 1 ? (
                  <p>
                    המתכונים שלי בושלו{' '}
                    {userCookedCalc(currentUser.createdRecipes)} פעמים
                  </p>
                ) : (
                  <p>המתכונים שלי בושלו 0 פעמים</p>
                )}
                <p>רשום/ה מאז: {formatDate(currentUser.createdAt)}</p>
              </StyledDetails>
            </StyledHeader>
            {loggedUser && (
              <StyledLoggedUser>
                <UploadButton onClick={() => setIsEditing(!isEditing)}>
                  העלאת תמונה
                </UploadButton>
                <LogoutButton onClick={logoutHandler}>התנתקות</LogoutButton>
              </StyledLoggedUser>
            )}
            {isEditing && loggedUser && (
              <ImageUpload
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                currentUser={currentUser}
              />
            )}
          </>
        ) : (
          ''
        )}
      </>
    </div>
  );
};

const StyledLoggedUser = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  border-bottom: 1px solid black;

  button {
    align-self: flex-end;
    margin-bottom: -0.5rem;
    &:last-of-type {
      margin-right: 1rem;
    }
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  input {
    width: 100%;
  }
  img {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    float: right;
    shape-outside: circle(50%);
    margin-left: 0.5rem;

    @media screen and (max-width: 600px) {
      height: 6rem;
      width: 6rem;
      margin-left: 0.5rem;
    }
  }
  h1 {
    font-size: 1.5rem !important;
  }
`;

const StyledImage = styled.div`
  display: flex;
  flex-direction: column;
  width: 8rem;
  height: auto;
  button {
    margin-top: 0.5rem;
  }
`;

const StyledDetails = styled.div`
  @media screen and (min-width: 600px) {
    margin-right: 0.5rem;
  }
  margin-right: 0.5rem;
  @media screen and (max-width: 600px) {
    height: auto;
    margin-right: -1rem;
  }
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    margin-top: 0.5rem;
  }
`;

const UploadButton = styled(secColorButton)``;
const LogoutButton = styled(mainColorButton)``;

export default Header;
