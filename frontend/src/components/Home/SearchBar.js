import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Search from './Search';
import Category from './Category';
import Tags from './Tags';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ tag, category }) => {
  const [keyword, setKeyword] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const [isSearching, setIsSearching] = useState(false);
  const history = useHistory();

  const searchHandler = () => {
    newCategory && keyword && newTag
      ? history.push(
          `/categories/${newCategory}/search/${keyword}/tags/${newTag}`
        )
      : newCategory && keyword && !newTag
      ? history.push(`/categories/${newCategory}/search/${keyword}`)
      : newCategory && !keyword && newTag
      ? history.push(`/categories/${newCategory}/tags/${newTag}`)
      : !newCategory && keyword && newTag
      ? history.push(`/search/${keyword}/tags/${newTag}`)
      : newCategory && !keyword && !newTag
      ? history.push(`/categories/${newCategory}`)
      : !newCategory && keyword && !newTag
      ? history.push(`/search/${keyword}`)
      : !newCategory && !keyword && newTag
      ? history.push(`tags/${newTag}`)
      : history.push('/');
  };

  return (
    <>
      <SearchWrapper>
        <TriggerSearch>
          <button onClick={() => setIsSearching(!isSearching)}>
            חיפוש וסינון
          </button>
        </TriggerSearch>
        {isSearching && (
          <StyledSearchBar>
            <QueryButtons>
              <Category
                setKeyword={setKeyword}
                setNewCategory={setNewCategory}
              />
              <Tags
                setNewTag={setNewTag}
                setKeyword={setKeyword}
                category={category}
                keyword={keyword}
              />
            </QueryButtons>
            <Search
              setNewKeyword={setNewKeyword}
              tag={tag}
              keyword={keyword}
              setKeyword={setKeyword}
              category={category}
            />
            <button onClick={searchHandler}>
              <FaSearch />
              חיפוש
            </button>
          </StyledSearchBar>
        )}
      </SearchWrapper>
    </>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const TriggerSearch = styled.div`
  margin: 0 auto;
  margin-top: 1rem;
  width: 7rem;
  button {
    height: 2.2rem;
    width: max-content;
    padding: 0.5rem 1rem;
    background-color: lightgray;
    border-radius: 15px;
    cursor: pointer;
  }
`;

const StyledSearchBar = styled.div`
  max-width: 1000px;
  display: flex;
  margin: 0.5rem auto;
  width: 100%;
  align-items: center;
  p {
    font-weight: bold;
  }
  @media screen and (min-width: 820px) and (max-width: 1050px) {
    max-width: 780px;
  }
  @media screen and (min-width: 701px) and (max-width: 820px) {
    max-width: 94%;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    button {
      margin: 1rem 0;
    }
  }
  button {
    height: 2.2rem;
    width: max-content;
    padding: 0.5rem 1rem;
    background-color: lightgray;
    border-radius: 15px;
    white-space: nowrap;
    &:first-of-type {
      margin-left: 0.5rem;
    }
    cursor: pointer;
    svg {
      font-size: 1rem;
      margin-left: 0.3rem;
    }
  }
`;

const QueryButtons = styled.div`
  display: flex;

  @media screen and (max-width: 600px) {
    margin: 0.3rem 0.5rem 0.5rem;
    flex-direction: column;
  }
  div {
    margin: 0 1rem;
    @media screen and (max-width: 700px) {
      margin: 0.3rem 0;
    }
  }
`;

export default SearchBar;
