import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions/userActions';
import { Helmet } from 'react-helmet';
import uuid from 'react-uuid';
import { GlobalStyledUser } from '../GlobalStyles';
import styled from 'styled-components';
import Header from '../components/Profile/Header';
import Buttons from '../components/Profile/Buttons';
import Recipes from '../components/Profile/Recipes';
import Bio from '../components/Profile/Bio';
import CommonLoader from '../components/CommonLoader';

const User = ({ match }) => {
  const [showCreated, setShowCreated] = useState(false);
  const [showSocial, setShowSocial] = useState(true);

  const currentUser = match.params.id;
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();

  const { isLoading, error, userData } = userProfile;

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(getUser(currentUser));
  }, [dispatch, currentUser]);

  return (
    <div>
      {userData && (
        <Helmet>
          <title>Plant Share | {!userData.name ? '' : userData.name}</title>
          <meta name='description' content='פרופיל משתמש' />
        </Helmet>
      )}
      {error ? <h1 style={{ textAlign: 'center' }}>{error}</h1> : ''}
      {isLoading ? <CommonLoader size='80' /> : ''}
      {userData && !isLoading && (
        <StyledUser>
          <Header currentUser={userData} loggedUser={false} />

          <Buttons
            setShowCreated={setShowCreated}
            setShowSocial={setShowSocial}
            loggedUser={false}
          />
          {showCreated && userData.createdRecipes.length >= 1
            ? userData.createdRecipes.map((recipe) => (
                <Recipes mappedRecipe={recipe} key={uuid()} />
              ))
            : showCreated && <h3>משתמש זה עדיין לא ייצר מתכונים</h3>}

          {showSocial && <Bio currentUser={userData} loggedUser={false} />}
        </StyledUser>
      )}
    </div>
  );
};

const StyledUser = styled(GlobalStyledUser)``;

export default User;
