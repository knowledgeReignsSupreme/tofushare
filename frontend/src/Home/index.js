import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../actions/RecipesActions';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import HomeRecipe from './HomeRecipes';
import SearchBar from './SearchBar';
import Pagination from '../Common/Pagination';
import ErrorMessage from '../Common/ErrorMessage';
import Loader from '../Common/Loader';
import Welcome from '../Common/Welcome';
import { FaPlus } from 'react-icons/fa';

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
        <Loader size='100' />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <Welcome
            header='ברוכים הבאים'
            subHeader='אתר שיתוף המתכונים הטבעוני הראשון בארץ'
            paragraph='תתכוננו, הולך להיות טעים!'
            button='יצירת מתכון'
            icon={<FaPlus />}
            link='/new-recipe'
          />
          <SearchBar tag={tag} category={category} />
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

const StyledHeader = styled.div`
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
