import React from 'react';
import styled from 'styled-components';
import { cssVariables } from '../GlobalStyles';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import { formatDate } from '../Helpers/Functions';

const Comments = ({ currentRecipe }) => {
  return (
    <StyledComments>
      <h3>תגובות:</h3>
      {currentRecipe.comments.length ? (
        currentRecipe.comments.map((comment) => (
          <StyledComment key={uuid()}>
            <Link to={`/users/${comment.userId}`}>
              <h4>{comment.name}:</h4>
              <p>{formatDate(comment.createdAt)}</p>
              <p>{comment.commentBody}</p>
            </Link>
          </StyledComment>
        ))
      ) : (
        <h4>התגובה שלך תהיה הראשונה!</h4>
      )}
    </StyledComments>
  );
};

const StyledComments = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.5rem 0;
  flex-direction: column;
  p:first-of-type {
    font-size: 0.8rem;
    color: #7a7878;
  }
  h4 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const StyledComment = styled.div`
  border-bottom: 0.2px solid ${cssVariables.secColorDark};
  width: 100%;
  margin-bottom: 0.5rem;
  h3 {
    margin-bottom: 0.2rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
`;

export default Comments;
