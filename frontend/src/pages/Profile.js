import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedUserProfile } from '../actions/userActions';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import uuid from 'react-uuid';
import styled from 'styled-components';
import { GlobalStyledUser } from '../GlobalStyles';
import Header from '../components/Profile/Header';
import Buttons from '../components/Profile/Buttons';
import Recipes from '../components/Profile/Recipes';
import Bio from '../components/Profile/Bio';
import CommonLoader from '../components/CommonLoader';

const Profile = () => {
  const history = useHistory();

  const [showCreated, setShowCreated] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [showSocial, setShowSocial] = useState(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  const { isLoading, error, userData } = userProfile;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userInfo === null) {
      history.push('/login');
    }
    dispatch(getLoggedUserProfile(userInfo));
  }, [userInfo, history, dispatch]);

  return (
    <>
      {userInfo && (
        <Helmet>
          <title>Plant Share | {userInfo.name || ''}</title>
          <meta name='description' content='פרופיל משתמש' />
        </Helmet>
      )}

      {isLoading ? <CommonLoader size='80' /> : ''}
      {error && <h1>{error}</h1>}

      {userData && !isLoading ? (
        <StyledProfile>
          <Header currentUser={userData} loggedUser={userInfo} />

          <Buttons
            setShowCreated={setShowCreated}
            setShowSaved={setShowSaved}
            setShowSocial={setShowSocial}
            loggedUser={userInfo}
          />
          {showCreated && userData.createdRecipes.length >= 1
            ? userData.createdRecipes.map((recipe) => (
                <Recipes
                  mappedRecipe={recipe}
                  header='מתכונים שנוצרו:'
                  key={uuid()}
                />
              ))
            : showCreated && <h1>עוד לא יצרת מתכונים</h1>}
          {showSaved && userData.savedRecipes.length >= 1
            ? userData.savedRecipes.map((recipe) => (
                <Recipes
                  mappedRecipe={recipe}
                  header='מתכונים שמורים:'
                  key={uuid()}
                />
              ))
            : showSaved && <h1>עוד לא שמרת מתכונים</h1>}
          {showSocial && (
            <Bio
              currentUser={userData}
              loggedUser={userInfo}
              header='קצת עליי:'
            />
          )}
        </StyledProfile>
      ) : (
        ''
      )}
    </>
  );
};

const StyledProfile = styled(GlobalStyledUser)``;

export default Profile;
