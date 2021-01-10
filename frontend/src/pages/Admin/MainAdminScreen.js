import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { cssVariables } from '../../GlobalStyles';

const MainAdminScreen = () => {
  return (
    <StyledAdmin>
      <AdminLinks>
        <Link to='/admin/recipes'>עריכת מתכונים</Link>
        <Link to='/admin/users'>משתמשים</Link>
      </AdminLinks>
    </StyledAdmin>
  );
};

const StyledAdmin = styled.div`
  width: 40rem;
  max-width: 90%;
  margin: 0 auto;
`;

const AdminLinks = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    a {
      margin-bottom: 0.5rem;
    }
  }
  a {
    color: ${cssVariables.secColorDark};
    font-weight: bold;
  }
`;

export default MainAdminScreen;
