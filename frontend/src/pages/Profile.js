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
  const { loggedUser, isLoading, error, success } = userLogin;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (loggedUser === null) {
      history.push('/login');
    }
  }, [history, loggedUser]);

  useEffect(() => {
    if (!success) {
      dispatch(getLoggedUserProfile(loggedUser.token));
    }
  }, [loggedUser.token, dispatch, success]);

  return (
    <>
      {loggedUser && (
        <Helmet>
          <title>Tofu Share | {loggedUser.name || ''}</title>
          <meta name='description' content='פרופיל משתמש' />
        </Helmet>
      )}

      {isLoading ? <CommonLoader size='80' /> : ''}
      {error && <h1>{error}</h1>}

      {loggedUser && !isLoading ? (
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
                />
              ))}
            </>
          ) : (
            showSaved && <h1>עוד לא שמרת מתכונים</h1>
          )}
          {showSocial && (
            <Bio currentUser={loggedUser} isLogged={true} header='קצת עליי:' />
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
