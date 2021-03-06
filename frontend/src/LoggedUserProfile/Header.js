import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import userImage from '../Images/no-image-user.jpg';
import styled from 'styled-components';
import { secColorButton, mainColorButton } from '../GlobalStyles';
import ImageUpload from './ImageUpload';
import { formatDate } from '../Helpers/Functions';

const Header = ({ currentUser, isLogged }) => {
  const [isEditing, setIsEditing] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  const userCookedCalc = (recipes) => {
    let sum = recipes.reduce(function (total, currentValue) {
      if (currentValue.cookedBy) {
        return total + currentValue.cookedBy.length;
      } else {
        return 0;
      }
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
                {currentUser.isAdmin && (
                  <span>
                    <p>אדמין</p>
                  </span>
                )}
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
            {isLogged && (
              <StyledLoggedUser>
                <UploadButton onClick={() => setIsEditing(!isEditing)}>
                  העלאת תמונה
                </UploadButton>
                <LogoutButton onClick={logoutHandler}>התנתקות</LogoutButton>
              </StyledLoggedUser>
            )}
            {isEditing && isLogged && (
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
  span p {
    color: red;
    font-weight: bold;
  }
  input {
    width: 100%;
  }
  img {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    float: right;
    shape-outside: circle(50%);

    @media screen and (max-width: 600px) {
      height: 6rem;
      width: 6rem;
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
  @media screen and (max-width: 600px) {
    width: 8rem;
    margin-left: -0.3rem;
  }
  button {
    margin-top: 0.5rem;
  }
`;

const StyledDetails = styled.div`
  @media screen and (min-width: 600px) {
    margin-right: 0.2rem !important;
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
