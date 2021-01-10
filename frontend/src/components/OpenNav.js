import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { cssVariables } from '../GlobalStyles';
import {
  FaHome,
  FaReceipt,
  FaConciergeBell,
  FaEnvelope,
  FaTimes,
  FaUser,
  FaCrown,
} from 'react-icons/fa';
import logo from '../logo.svg';

const OpenNav = ({ isNavOpen, setIsNavOpen, loggedUser }) => {
  return (
    <>
      <StyledOpenNav>
        <button onClick={() => setIsNavOpen(!isNavOpen)}>
          <FaTimes />
        </button>
        <Link to='/' onClick={() => setIsNavOpen(!isNavOpen)}>
          <OpenStyledLogo>
            <img src={logo} alt='logo' />
            <p>Tofu Share</p>
          </OpenStyledLogo>
        </Link>

        <NavLink to='/' exact onClick={() => setIsNavOpen(!isNavOpen)}>
          <FaHome />
          בית
        </NavLink>
        {loggedUser ? (
          <NavLink to='/profile' exact onClick={() => setIsNavOpen(!isNavOpen)}>
            <FaUser />
            פרופיל
          </NavLink>
        ) : (
          <NavLink to='/login' exact onClick={() => setIsNavOpen(!isNavOpen)}>
            <FaUser />
            התחברות
          </NavLink>
        )}

        <NavLink
          to='/new-recipe'
          exact
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <FaConciergeBell />
          מתכון חדש
        </NavLink>
        <NavLink to='/whatsnew' exact onClick={() => setIsNavOpen(!isNavOpen)}>
          <FaReceipt />
          מה חדש / עדכונים
        </NavLink>

        <NavLink
          to='/suggestions'
          exact
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <FaEnvelope />
          הצעות לשיפור
        </NavLink>
        {loggedUser && loggedUser.isAdmin && (
          <NavLink to='/admin' exact onClick={() => setIsNavOpen(!isNavOpen)}>
            <FaCrown />
            אדמין
          </NavLink>
        )}
      </StyledOpenNav>
    </>
  );
};

const revealNav = keyframes`
  0%{
    transform: translateX(80%)
  }

  100%{
    transform: translateX(0)

  }
`;

const StyledOpenNav = styled.nav`
  width: 40%;
  background: ${cssVariables.mainColorLight};
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  vertical-align: middle;
  animation-name: ${revealNav};
  animation-duration: 2s;
  transition: all 3s ease-out;
  @media screen and (max-width: 640px) {
    width: 70%;
  }
  @media screen and (min-width: 641px) and (max-width: 900px) {
    width: 40%;
  }
  @media screen and (min-width: 901px) and (max-width: 1200px) {
    width: 30%;
  }
  @media screen and (min-width: 1201px) and (max-width: 1600px) {
    width: 25%;
  }
  @media screen and (min-width: 1601px) {
    width: 20%;
  }

  a {
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    font-weight: bold;
    &:hover {
      color: ${cssVariables.mainColorDark};
    }
    @media screen and (max-width: 600px) {
      font-size: 1.3rem;
    }
    a active {
      color: blue;
    }
  }
  svg {
    vertical-align: top;
    margin-left: 0.4rem;
    color: ${cssVariables.secColorDark};
  }
  button {
    align-self: flex-end;
    left: 2rem;
    top: 1rem;
    position: absolute;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      left: 1rem;
    }
    svg {
      font-size: 2rem;
      @media screen and (max-width: 600px) {
        font-size: 1.5rem;
      }
      &:hover {
        color: ${cssVariables.mainColorDark};
      }
    }
  }
`;

const OpenStyledLogo = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: column;
  img {
    height: 30px;
    width: 30px;
    margin: 0.3rem 0;
  }
`;
export default OpenNav;
