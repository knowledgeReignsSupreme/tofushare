import React from 'react';
import styled from 'styled-components';

const Search = ({ tag, keyword, setKeyword, category }) => {
  return (
    <StyledSearch>
      <input
        name='keyword'
        placeholder='מילת מפתח'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
      />
    </StyledSearch>
  );
};

const StyledSearch = styled.form`
  input {
    border-radius: 15px;
    padding-right: 1rem;
    border: 1px solid black;
    margin: 0 0.5rem;
  }
`;

export default Search;
