import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cssVariables } from '../GlobalStyles';
import { FaGithub } from 'react-icons/fa';
import logo from '../icon.svg';

const Footer = () => {
  return (
    <StyledFooter>
      <StyledLogo>
        <Link to='/'>
          <img src={logo} alt='logo' />
          <p>Plant Share</p>
        </Link>
        <h4>לבשל עם חמלה.</h4>
        <h4>
          <a href='https://www.github.com/knowledgereignssupreme'>
            Github
            <FaGithub />
          </a>
        </h4>
      </StyledLogo>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  max-width: 1050px;
  padding-bottom: 0.3rem;
  background: ${cssVariables.mainColorLight};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  text-align: center;
  margin-top: 3rem;
  h4 {
    margin-top: 0.5rem;
  }
  svg {
    margin-right: 0.5rem;
    font-size: 1.1rem;
    vertical-align: middle;
  }
  @media screen and (min-width: 820px) and (max-width: 1050px) {
    max-width: 780px;
  }
  @media screen and (min-width: 701px) and (max-width: 820px) {
    max-width: 94%;
  }
  @media screen and (max-width: 700px) {
    max-width: 90%;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  cursor: pointer;
  p {
    font-size: 1.1rem;
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
export default Footer;
