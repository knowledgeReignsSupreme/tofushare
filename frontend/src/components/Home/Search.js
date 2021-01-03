import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Search = ({ tag, keyword, setKeyword, category }) => {
  const [searchOn, setSearchOn] = useState(false);

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      category && tag
        ? history.push(`/categories/${category}/search/${keyword}/tags/${tag}`)
        : category && !tag
        ? history.push(`/categories/${category}/search/${keyword}`)
        : tag && !category
        ? history.push(`/search/${keyword}/tags/${tag}`)
        : history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <StyledSearch onSubmit={submitHandler}>
      <FaSearch onClick={() => setSearchOn(!searchOn)} />
      {searchOn ? (
        <>
          <input
            name='keyword'
            placeholder='חיפוש מתכון'
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
          <button type='submit'>חיפוש</button>
        </>
      ) : (
        ''
      )}
    </StyledSearch>
  );
};

const StyledSearch = styled.form`
  display: flex;
  margin: 0.5rem 0;
  align-items: center;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
  svg {
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 0.5rem;
    vertical-align: top;
    @media screen and (max-width: 600px) {
      margin-bottom: 0.5rem;
    }
  }
  input {
    border-radius: 15px;
    padding-right: 1rem;
    border: 1px solid black;
    width: 70%;
  }
  button {
    margin-right: 0.5rem;
    @media screen and (max-width: 600px) {
      margin-top: 0.5rem;
      margin-right: 0rem;
    }
  }
`;

export default Search;
