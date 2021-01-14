import React, { useEffect } from 'react';
import { listUsers } from '../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import uuid from 'react-uuid';
import userImage from '../Images/no-image-user.jpg';
import Loader from '../Common/Loader';
import ErrorMessage from '../Common/ErrorMessage';
import { FaTrash } from 'react-icons/fa';

const UserList = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loggedUser } = userLogin;

  const usersList = useSelector((state) => state.usersList);
  const { users, isLoading, error } = usersList;

  const history = useHistory();

  useEffect(() => {
    if (loggedUser && loggedUser.isAdmin) {
      dispatch(listUsers(loggedUser));
    } else {
      history.push('/');
    }
  }, [dispatch, history, loggedUser]);

  return (
    <>
      {isLoading ? (
        <Loader size={80} />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <StyledUsersList>
          {users.map((user) => (
            <div key={uuid()}>
              <Link to={`/users/${user._id}`}>
                <StyledUser>
                  <UserSideWrapper>
                    <StyledImage>
                      {user.image ? (
                        <img src={user.image.location} alt='user' />
                      ) : (
                        <img src={userImage} alt='user' />
                      )}
                    </StyledImage>
                    <UserDetails>
                      <h3>{user.name}</h3>
                      <p>מתכונים שיצר: {user.createdRecipes.length}</p>
                      <p>מתכונים ששמר: {user.savedRecipes.length}</p>
                    </UserDetails>
                  </UserSideWrapper>
                  <StyledDelete>
                    {' '}
                    <button>
                      <FaTrash />
                    </button>
                  </StyledDelete>
                </StyledUser>
              </Link>
            </div>
          ))}
        </StyledUsersList>
      )}
    </>
  );
};

const StyledUsersList = styled.div`
  width: 40rem;
  max-width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const StyledUser = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-radius: 30px;
  box-shadow: 0 1.5px 5px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  cursor: pointer;
  p {
    margin-top: 0.5rem;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    padding: 0.8rem 0;
  }
  h3 {
    margin-bottom: 0.3rem;
    margin-right: -0.1rem;
  }
`;

const UserSideWrapper = styled.div`
  display: flex;
  margin-right: 2rem;
`;

const StyledImage = styled.div`
  img {
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    object-fit: cover;
    float: right;
    shape-outside: circle(50%);
    -moz-shape-outside: circle(50%);
    margin-left: 0.5rem;
    margin-right: 0.2rem;
  }
`;

const UserDetails = styled.div``;

const StyledDelete = styled.div`
  align-self: center;
  margin-left: 2rem;
  button {
    cursor: pointer;
  }
  svg {
    color: red;
    &:hover {
      color: gray;
    }
  }
`;

export default UserList;
