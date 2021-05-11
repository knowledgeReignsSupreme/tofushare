import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { cssVariables, mainColorButton } from '../GlobalStyles';
import logo from '../Images/logo.svg';
import OpenNav from './OpenNav';
import { FaUser, FaBars } from 'react-icons/fa';

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);

  const { loggedUser } = userLogin;

  return (
    <>
      {isNavOpen ? (
        <OpenNav
          setIsNavOpen={setIsNavOpen}
          isNavOpen={isNavOpen}
          loggedUser={loggedUser}
        />
      ) : (
        <StyledNav>
          <InerNav>
            <NavButton>
              <button onClick={() => setIsNavOpen(!isNavOpen)}>
                <FaBars />
              </button>
            </NavButton>
            <StyledLogo>
              <Link to='/'>
                <img src={logo} alt='logo' />
                <p>Tofu Share</p>
              </Link>
            </StyledLogo>
            <ProfileButton>
              {loggedUser ? (
                <Link to='/profile'>
                  <StyledButton>
                    <FaUser />
                    פרופיל
                  </StyledButton>
                </Link>
              ) : (
                <Link to='/login'>
                  <StyledButton>
                    <FaUser />
                    התחברות
                  </StyledButton>
                </Link>
              )}
            </ProfileButton>
          </InerNav>
        </StyledNav>
      )}
    </>
  );
};

const revealNav = keyframes`
  0%{
    transform: translateY(-100%)
  }

  100%{
    transform: translateX(0)

  }
`;

const StyledNav = styled.nav`
  width: 100%;
  background: ${cssVariables.mainColorLight};
`;

const InerNav = styled.div`
  max-width: 1500px;
  background: ${cssVariables.mainColorLight};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 0.5rem;
  position: sticky;
  top: 0;
  align-items: center;
  z-index: 5;
  padding-bottom: 0.3rem;
  animation-name: ${revealNav};
  animation-duration: 2s;
  @media screen and (min-width: 820px) and (max-width: 1050px) {
    max-width: 780px;
  }
  @media screen and (min-width: 701px) and (max-width: 820px) {
    max-width: 94%;
  }
  @media screen and (max-width: 700px) {
    max-width: 90%;
  }
  input {
    width: 8rem;
  }
  svg:not(:first-of-type) {
    margin-left: 0.2rem;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  flex: 1;
  p {
    font-size: 1rem;
    font-weight: bold;
  }
  input {
    width: 6rem;
  }
  img {
    margin-top: 0.3rem;
    height: 35px;
    width: 35px;
  }
`;
const ProfileButton = styled.div`
  flex: 1;
  button {
    svg {
      font-size: 0.7rem;
      margin-left: 0.2rem;
    }
  }
  @media screen and (max-width: 600px) {
    button {
      font-size: 1rem;
      svg {
        font-size: 0.8rem;
      }
    }
  }
`;

const StyledButton = styled(mainColorButton)``;

const NavButton = styled.div`
  flex: 1;
  button {
    background: ${cssVariables.mainColorDark};
    padding: 0.4rem 0.5rem;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease-out;
    &:hover {
      background: ${cssVariables.secColorDark};
      border: 1.5px solid ${cssVariables.mainColorDark};
    }
    svg:first-of-type {
      font-size: 1.2rem;
      vertical-align: middle;
      margin-bottom: 0.2rem;
    }
  }
  @media screen and (max-width: 600px) {
    button {
      svg:first-of-type {
        font-size: 1.5rem;
        vertical-align: middle;
        margin-bottom: 0.2rem;
      }
    }
  }
`;

export default Nav;
