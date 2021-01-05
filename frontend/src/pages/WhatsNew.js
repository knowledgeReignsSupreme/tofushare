import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const WhatsNew = () => {
  return (
    <>
      <Helmet>
        <title>Tofu Share | מה חדש</title>
        <meta name='description' content='פרופיל משתמש' />
      </Helmet>

      <StyledWhatsNew>
        <h4>גרסא 1 בטא:</h4>
        <p>האתר רץ כרגע בגרסת בטא ראשונית שנועדה להכיר את הממשק למשתמשים</p>
        <h4>פיצ'רים עתידיים אופציונליים:</h4>
        <ol>
          <li>הוספת ניוזלטר לאתר</li>
          <li>בדף המתכון להראות למשתמש מתכונים נוספים ע"י אותו היוצר</li>
          <li>דירוג משתמשים לפי פעילות</li>
          <li>בלוג אישי לכל משתמש שירצה</li>
          <li>ועוד המון</li>
        </ol>
        <h4>אשמח לשמוע הצעות חדשות ומעניינות!</h4>
      </StyledWhatsNew>
    </>
  );
};

const StyledWhatsNew = styled.div`
  width: 40rem;
  max-width: 90%;
  margin: 0 auto;
  li {
    text-decoration: none;
    margin-top: 0.5rem;
    margin-right: 1rem;
  }
  h4 {
    margin-top: 1rem;
  }
  p {
    line-height: 1.5;
    max-width: 60ch;
  }
`;

export default WhatsNew;
