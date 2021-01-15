import React from 'react';
import { cssVariables } from '../GlobalStyles';
import styled from 'styled-components';

const Input = ({
  tag,
  onChange,
  value,
  required,
  placeholder,
  error,
  type,
  wide,
}) => {
  return (
    <CommonInput>
      <label htmlFor=''>
        {required ? (
          <p>
            <span>*</span>
            {tag}
          </p>
        ) : (
          <p>{tag}</p>
        )}
      </label>
      {wide ? (
        <input
          style={{ padding: '0 1rem 6rem', overlow: 'wrap' }}
          type={type || 'text'}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <input
          type={type || 'text'}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}

      {error && (
        <p>
          <span>{error}</span>
        </p>
      )}
    </CommonInput>
  );
};

const CommonInput = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    margin-bottom: 0.5rem;
    align-self: flex-start;
  }
  input {
    width: 60%;
    border-radius: 15px;
    border: 1px solid ${cssVariables.secColorDark};
    padding-right: 0.6rem;
    @media screen and (max-width: 600px) {
      width: 80%;
    }
  }
  p span {
    color: red;
    font-weight: bold;
    margin-left: 0.2rem;
  }
`;

export default Input;
