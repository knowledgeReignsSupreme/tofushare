import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { cssVariables } from '../GlobalStyles';

const Pagination = ({ pages, page, keyword, match, tag, category }) => {
  const routeHandler = (pageNumber, route) => {
    switch (route) {
      case 'all':
        return `/categories/${category}/search/${keyword}/tags/${tag}/page/${pageNumber}`;

      case 'categoryKeyword':
        return `/categories/${category}/search/${keyword}/page/${pageNumber}`;

      case 'categoryTag':
        return `/categories/${category}/tags/${tag}/page/${pageNumber}`;

      case 'keywordTag':
        return `/search/${keyword}/tag/${tag}/page/${pageNumber}`;

      case 'category':
        return `/categories/${category}/page/${pageNumber}`;

      case 'keyword':
        return `/search/${keyword}/page/${pageNumber}`;

      case 'tag':
        return `/tags/${tag}/page/${pageNumber}`;

      case 'page':
        return `/page/${pageNumber}`;

      default:
        return `/`;
    }
  };

  return (
    pages > 1 && (
      <StyledPagination>
        {[...Array(pages).keys()].map((pageNumber) => (
          <NavLink
            key={pageNumber + 1}
            to={
              category && tag && keyword
                ? routeHandler(pageNumber + 1, 'all')
                : category && keyword && !tag
                ? routeHandler(pageNumber + 1, 'categoryKeyword')
                : category && tag && !keyword
                ? routeHandler(pageNumber + 1, 'categoryTag')
                : keyword && tag && !category
                ? routeHandler(pageNumber + 1, 'keywordTag')
                : category && !tag && !keyword
                ? routeHandler(pageNumber + 1, 'category')
                : keyword && !tag && !category
                ? routeHandler(pageNumber + 1, 'keyword')
                : tag && !category && !keyword
                ? routeHandler(pageNumber + 1, 'tag')
                : routeHandler(pageNumber + 1, 'page')
            }
          >
            <button> {pageNumber + 1}</button>
          </NavLink>
        ))}
      </StyledPagination>
    )
  );
};

const StyledPagination = styled.div`
  margin: 0 auto;
  width: max-content;
  margin-top: 2rem;
  color: black;
  button {
    cursor: pointer;
  }
  a {
    background: #e9e9e9;
    width: 3rem;
    height: 2rem;
    padding: 0.5rem 0.8rem;
    margin-right: 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.5rem;
    &:hover {
      background: #cecece;
    }
  }

  a.active {
    background: ${cssVariables.secColorDark};
    color: white;
  }
`;

export default Pagination;
