import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const cssVariables = {
  mainColorDark: '#63a91f',
  mainColorLight: '#d3fdcf',
  secColorDark: '#8a5e4f',
  secColorLight: '#fad6c3',
};

export const GlobalStyles = createGlobalStyle`
:root{
  writing-mode: rtl;
  direction: rtl;
  font-family: 'Arimo', sans-serif;}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  color: #3a3939;
  @media screen and (max-width: 600px){
    font-size: 90%;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
}


body{
  position: relative;
}
button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;

    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;
}

&::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.active{
  color: ${cssVariables.secColorDark}
}

.selected-tag{
  color: white;
  background: ${cssVariables.mainColorDark} !important;
}
input{
  height: 2rem !important; 
  font-size: 1.3rem;
}
`;

export const InputWrapper = styled.div`
  width: 80%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
  span {
    color: red;
    font-weight: bold;
    font-size: 1rem;
    vertical-align: middle;
    margin-left: 0.3rem;
  }
  select {
    margin-bottom: 0.3rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
`;

export const GlobalStyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
  h6 {
    margin-right: 4rem;
    font-size: 0.8rem;
    color: #303074;
    font-weight: lighter;
    cursor: pointer;
    padding: 0.4rem;
    white-space: nowrap;
  }
`;

export const GlobalStyledUser = styled.div`
  max-width: 90%;
  width: 40rem;
  margin: 0 auto;
  margin-top: 1rem;
  h2 {
    margin-top: 1rem;
  }
`;

export const secColorButton = styled.button`
  margin: 0.6rem 0;
  padding: 0.3rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  width: max-content;
  white-space: nowrap;
  background: ${cssVariables.secColorDark};
  color: white;
  border: none;
  transition: all 0.3s ease-out;
  &:hover {
    padding: 0.3rem 1.3rem;
  }
  &:disabled {
    cursor: not-allowed;
    background: lightgray;
    border: none;
  }
  &[disabled] {
    cursor: not-allowed;
    background: lightgray;
    border: none;
  }
`;

export const mainColorButton = styled.button`
  margin: 0.6rem 0;
  padding: 0.3rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  width: max-content;
  white-space: nowrap;
  background: ${cssVariables.mainColorDark};
  color: white;
  border: none;
  font-weight: bold;
  transition: all 0.3s ease-out;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    padding: 0.3rem 1.3rem;
  }
  &:disabled {
    cursor: not-allowed;
    background: lightgray;
    border: none;
  }
  &[disabled] {
    cursor: not-allowed;
    background: lightgray;
    border: none;
  }
`;

export const transparentButton = styled.button`
  width: max-content;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  transition: all 0.2s ease-out;
  margin-bottom: 0.5rem;
  background: white;
  color: black;
  border: 1px solid black;
  border-radius: initial;
  font-weight: lighter;
  &:hover {
    padding: 0.3rem 0.8rem;
  }
  &:disabled {
    cursor: not-allowed;
    background: lightgray;
    border: none;
  }
  &[disabled] {
    cursor: not-allowed;
    background: lightgray;
    border: none;
  }
`;
