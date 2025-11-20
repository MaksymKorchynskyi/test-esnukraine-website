import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ua');

  const translations = {
    ua: {
      home: 'Головна',
      about: 'Про нас',
      sections: 'Секції',
      news: 'Новини',
      events: 'Події',
      welcome: 'Ласкаво просимо до ESN Ukraine',
      welcomeSubtitle: 'Міжнародна студентська мережа в Україні',
      aboutTitle: 'Про ESN Ukraine',
      aboutText: 'ESN Ukraine - це частина мережі Erasmus Student Network, міжнародної студентської організації. Наша місія - представляти інтернаціональних студентів, надавати можливості для культурного розуміння та саморозвитку за принципом "Студенти допомагають студентам".',
      sectionsTitle: 'Наші секції',
      sectionsText: 'Ми маємо різні секції, які займаються організацією заходів, підтримкою студентів та розвитком проєктів.',
      newsTitle: 'Останні новини',
      newsText: 'Будьте в курсі останніх подій та новин від ESN Ukraine.',
      eventsTitle: 'Майбутні події',
      eventsText: 'Приєднуйтесь до наших захоплюючих подій та заходів.',
      readMore: 'Детальніше',
      viewAll: 'Переглянути всі',
      contact: 'Контакти',
      joinUs: 'Приєднатися',
      learnMore: 'Дізнатися більше',
      register: 'Зареєструватися',
      discover: 'Відкрити події'
    },
    en: {
      home: 'Home',
      about: 'About Us',
      sections: 'Sections',
      news: 'News',
      events: 'Events',
      welcome: 'Welcome to ESN Ukraine',
      welcomeSubtitle: 'International Student Network in Ukraine',
      aboutTitle: 'About ESN Ukraine',
      aboutText: 'ESN Ukraine is part of the Erasmus Student Network, an international student organization. Our mission is to represent international students, provide opportunities for cultural understanding and self-development under the principle of "Students Helping Students".',
      sectionsTitle: 'Our Sections',
      sectionsText: 'We have various sections that deal with event organization, student support and project development.',
      newsTitle: 'Latest News',
      newsText: 'Stay updated with the latest events and news from ESN Ukraine.',
      eventsTitle: 'Upcoming Events',
      eventsText: 'Join our exciting events and activities.',
      readMore: 'Read More',
      viewAll: 'View All',
      contact: 'Contact',
      joinUs: 'Join Us',
      learnMore: 'Learn More',
      register: 'Register',
      discover: 'Discover Events'
    }
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};