import React from 'react';
import styled from 'styled-components';

const WhatsNew = () => {
  return (
    <StyledWhatsNew>
      <h4>גרסא 1 אלפא:</h4>
      <p>
        גרסא ראשונית נסיונית לאתר, הועלתה כדי לאתר באגים, תקלות ופתחים לשיפור
        האתר וחווית המשתמש. ניתן לצפות בכל המתכונים הקיימים באתר, לסנן אותם לפי
        פילטרים בסיסיים (כרגע), לנווט לדף של מתכון יחיד, פרופיל אישי ופרופילים
        של משתמשים אחרים. ניתן להגיב על מתכונים, לשמור אותם ואפילו להודיע
        שהמתכון בושל על ידכם
      </p>
      <h4>פיצ'רים עתידיים אופציונליים:</h4>
      <ol>
        <li>הוספת ניוזלטר לאתר</li>
        <li>בדף המתכון להראות למשתמש מתכונים נוספים ע"י אותו היוצר</li>
        <li>איפוס ושינוי סיסמה</li>
        <li>הוספת מספר תמונות לכל מתכון</li>
      </ol>
      <h4>אשמח לשמוע הצעות חדשות ומעניינות!</h4>
    </StyledWhatsNew>
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
