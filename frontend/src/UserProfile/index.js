import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../actions/userActions';
import { Helmet } from 'react-helmet';
import uuid from 'react-uuid';
import { GlobalStyledUser } from '../GlobalStyles';
import styled from 'styled-components';
import Header from '../LoggedUserProfile/Header';
import Buttons from '../LoggedUserProfile/Buttons';
import Recipes from '../LoggedUserProfile/Recipes';
import Bio from '../LoggedUserProfile/Bio';
import Loader from '../Common/Loader';
import ErrorMessage from '../Common/ErrorMessage';
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
          <title>Tofu Share | {!userData.name ? '' : userData.name}</title>
          <meta name='description' content='פרופיל משתמש' />
        </Helmet>
      )}
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <Loader size={80} />
      ) : (
        userData &&
        !isLoading && (
          <StyledUser>
            <Header currentUser={userData} loggedUser={false} />

            <Buttons
              setShowCreated={setShowCreated}
              setShowSocial={setShowSocial}
              loggedUser={false}
            />
            {showCreated && userData.createdRecipes.length >= 1 ? (
              <>
                <h2>מתכונים שנוצרו:</h2>
                {userData.createdRecipes.map((recipe) => (
                  <Recipes
                    mappedRecipe={recipe}
                    header='מתכונים שנוצרו:'
                    key={uuid()}
                  />
                ))}
              </>
            ) : (
              showCreated && <h3>משתמש זה עדיין לא ייצר מתכונים</h3>
            )}

            {showSocial && (
              <Bio
                currentUser={userData}
                loggedUser={false}
                header='קצת עליי:'
              />
            )}
          </StyledUser>
        )
      )}
    </div>
  );
};

const StyledUser = styled(GlobalStyledUser)`
  h2 {
    margin: 1rem 0;
  }
`;

export default User;
