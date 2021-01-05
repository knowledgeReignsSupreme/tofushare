import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../actions/RecipesActions';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import HomeRecipe from '../components/Home/HomeRecipes';
import SearchBar from '../components/Home/SearchBar';
import Pagination from '../components/Pagination';
import ErrorMessage from '../components/ErrorMessage';
import CommonLoader from '../components/CommonLoader';

const Home = ({ match }) => {
  const keyword = match.params.keyword;
  const tag = match.params.tag;
  const pageNumber = match.params.pageNumber || 1;
  const category = match.params.category;

  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);
  const { recipes, isLoading, pages, page, error } = allRecipes;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getRecipes(category, keyword, tag, pageNumber));
  }, [dispatch, pageNumber, keyword, tag, category]);

  return (
    <>
      <Helmet>
        <title>Tofu Share | Home</title>
        <meta name='description' content='אתר שיתופי למתכונים טבועניים' />
      </Helmet>

      {isLoading ? (
        <CommonLoader size='100' />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <SearchBar tag={tag} category={category} />
          {/* {pageNumber === 1 && !category && !keyword && !tag && (
          )} */}
          <StyledSearch>
            {tag || keyword || category ? (
              <h3>אמצעי חיפוש מתכון:</h3>
            ) : (
              <StyledHeader>
                <h1>כל המתכונים:</h1>
              </StyledHeader>
            )}
            {tag && (
              <p>
                <span> תגית:</span> {tag}{' '}
              </p>
            )}
            {keyword && (
              <p>
                <span>מילת מפתח:</span> {keyword}{' '}
              </p>
            )}
            {category && (
              <p>
                <span>קטגוריה:</span> {category}{' '}
              </p>
            )}
          </StyledSearch>
          <HomeRecipe recipes={recipes} />
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            match={match}
            tag={tag}
            category={category}
          />
        </>
      )}
    </>
  );
};

const StyledHeader = styled.h1`
  margin: 1rem auto;
  width: max-content;
  max-width: 90%;
  h1 {
    white-space: nowrap;
    font-size: 2rem;
  }
`;

const StyledSearch = styled.div`
  margin: 1rem auto;
  width: max-content;
  max-width: 90%;
  p {
    margin-top: 0.5rem;
    whis span {
      font-weight: bold;
    }
  }
`;

export default Home;
