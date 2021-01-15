import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedUserProfile, updateUser } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import uuid from 'react-uuid';
import styled from 'styled-components';
import { GlobalStyledUser } from '../GlobalStyles';
import Header from './Header';
import Buttons from './Buttons';
import Recipes from './Recipes';
import EditBio from './EditBio';
import Bio from './Bio';
import Loader from '../Common/Loader';
import ErrorMessage from '../Common/ErrorMessage';

const Profile = () => {
  const [showCreated, setShowCreated] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showSocial, setShowSocial] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const userUpdate = useSelector((state) => state.userUpdateProfile);
  const { loggedUser, isLoading, error, success } = userLogin;
  const {
    isLoading: updateIsLoading,
    error: updateError,
    success: updateSuccess,
  } = userUpdate;

  const handleUserUpdate = (e) => {
    dispatch(
      updateUser(loggedUser, {
        _id: loggedUser._id,
        bio,
        instagramLink,
        facebookLink,
        websiteLink,
      })
    );
  };

  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (loggedUser === null) {
      history.push('/login');
    }
  });

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: 'USER_DETAILS_UPDATE_RESET' });
      dispatch(getLoggedUserProfile(loggedUser));
    }
  }, [success, updateSuccess, loggedUser, dispatch]);

  useEffect(() => {
    if (!success && !isLoading) {
      dispatch(getLoggedUserProfile(loggedUser));
    }
  }, [loggedUser, dispatch, success, isLoading]);

  return (
    <>
      {loggedUser && (
        <Helmet>
          <title>Tofu Share | {loggedUser.name || ''}</title>
          <meta name='description' content='פרופיל משתמש' />
        </Helmet>
      )}

      {isLoading ? (
        <Loader size='80' />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : loggedUser && !isLoading ? (
        <StyledProfile>
          <Header currentUser={loggedUser} isLogged={true} />

          <Buttons
            setShowCreated={setShowCreated}
            setShowSaved={setShowSaved}
            setShowSocial={setShowSocial}
            loggedUser={loggedUser}
          />
          {showCreated && loggedUser.createdRecipes.length >= 1 ? (
            <>
              <h2>מתכונים שנוצרו:</h2>
              {loggedUser.createdRecipes.map((recipe) => (
                <Recipes
                  mappedRecipe={recipe}
                  header='מתכונים שנוצרו:'
                  key={uuid()}
                  isLogged={true}
                  isAuthor={true}
                  loggedUser={loggedUser}
                />
              ))}
            </>
          ) : (
            showCreated && <h1>עוד לא יצרת מתכונים</h1>
          )}
          {showSaved && loggedUser.savedRecipes.length >= 1 ? (
            <>
              <h2>מתכונים שמורים:</h2>
              {loggedUser.savedRecipes.map((recipe) => (
                <Recipes
                  mappedRecipe={recipe}
                  header='מתכונים שמורים:'
                  key={uuid()}
                  saved={true}
                  loggedUser={loggedUser}
                />
              ))}
            </>
          ) : (
            showSaved && <h1>עוד לא שמרת מתכונים</h1>
          )}
          {showSocial && (
            <Bio
              currentUser={loggedUser}
              isLogged={true}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              header='קצת עליי:'
              isLoading={updateIsLoading}
              error={updateError}
            />
          )}
          {isEditing && (
            <EditBio
              currentUser={loggedUser}
              isLoading={isLoading}
              setInstagramLink={setInstagramLink}
              setFacebookLink={setFacebookLink}
              setWebsiteLink={setWebsiteLink}
              setBio={setBio}
              handleUserUpdate={handleUserUpdate}
              setIsEditing={setIsEditing}
            />
          )}
        </StyledProfile>
      ) : (
        ''
      )}
    </>
  );
};

const StyledProfile = styled(GlobalStyledUser)`
  h2 {
    margin: 1rem 0;
  }
`;

export default Profile;
