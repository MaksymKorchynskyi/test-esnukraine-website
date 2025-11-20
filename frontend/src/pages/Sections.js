// Sections.js
import React from 'react';
import { useLanguage } from '../LanguageContext';

const Sections = () => {
  const { t, language } = useLanguage();

  const sections = [
    {
      id: 'kyiv',
      title: 'ESN Kyiv',
      description: 'ESN Kyiv became an official member of the Erasmus Student Network on June 2, 2019. They celebrate their birthday on September 23, marking their registration as a candidate section in 2018.',
      image: '/images/ua-kyiv-logo-colour.svg',
      buttonText: language === 'uk' ? 'Дізнатися більше' : 'Learn More'
    },
    {
      id: 'chernivtsi',
      title: 'ESN Chernivtsi',
      description: 'ESN Chernivtsi was founded by representatives from the Student Parliament of Yuriy Fedkovych Chernivtsi National University and the Bukovinian State Medical University. It became an official section during the Autumn General Assembly 2021.',
      image: '/images/esn_chernivtsi_logo.png',
      buttonText: language === 'uk' ? 'Дізнатися більше' : 'Learn More'
    },
    {
      id: 'ifnul',
      title: 'ESN IFNUL',
      description: 'ESN IFNUL was established at Ivan Franko National University of Lviv and became a candidate section in 2024. In November 2024, they hosted the National Autumn Assembly in Lviv.',
      image: '',
      buttonText: language === 'uk' ? 'Дізнатися більше' : 'Learn More'
    },
    {
      id: 'lpnu',
      title: 'ESN LPNU',
      description: 'ESN LPNU was founded at Lviv Polytechnic National University and joined ESN as a candidate section in 2024.',
      image: '',
      buttonText: language === 'uk' ? 'Дізнатися більше' : 'Learn More'
    },
    {
      id: 'odesa',
      title: 'ESN Odesa',
      description: 'Join our community in Odesa and be part of the international student experience!',
      image: '',
      buttonText: language === 'uk' ? 'Приєднатися' : 'Join Us'
    }
  ];

  // --- СТИЛІ ---

  const pageStyle = {
    padding: '4rem 2rem 4rem',
    background: '#ffffff',
    minHeight: '100vh',
    marginTop: '85px'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerContainerStyle = {
    textAlign: 'center',
    marginBottom: '4rem'
  };

  const pageTitleStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#2e3192',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif'
  };

  const introTextStyle = {
    fontSize: '1.3rem',
    color: '#495057',
    lineHeight: 1.6,
    maxWidth: '850px',
    margin: '0 auto 4rem auto',
    textAlign: 'center',
    fontFamily: 'Open Sans, sans-serif'
  };

  const boldCityStyle = {
    fontWeight: '800',
    color: '#212529'
  };

  const sectionsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '3rem',
    marginTop: '2rem'
  };

  const sectionCardStyle = {
    background: '#ffffff',
    padding: '0',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
    border: '1px solid #f1f5f9',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  };

  const imageContainerStyle = {
    height: '250px',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    padding: '1.5rem'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s ease'
  };

  const logoImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
    padding: '1rem',
    transition: 'transform 0.5s ease'
  };

  const placeholderStyle = {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #2e3192 0%, #00aeef 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: '600',
    textAlign: 'center',
    padding: '1rem'
  };

  const cardContentStyle = {
    padding: '2rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  };

  const cardTitleStyle = {
    color: '#2e3192',
    marginBottom: '1rem',
    fontSize: '1.6rem',
    fontWeight: '700',
    fontFamily: 'Montserrat, sans-serif',
    textAlign: 'center' // ЗМІНЕНО: Заголовок по центру
  };

  const cardTextStyle = {
    color: '#495057',
    lineHeight: 1.6,
    marginBottom: '2rem',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    flexGrow: 1,
    textAlign: 'justify', // ЗМІНЕНО: Текст "розтягнутий" по ширині (justify)
    hyphens: 'auto' // Додає переноси слів, щоб уникнути великих пробілів
  };

  const buttonStyle = {
    background: '#2e3192',
    color: '#ffffff',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    textDecoration: 'none',
    display: 'inline-block',
    alignSelf: 'center', // Кнопка по центру
    boxShadow: '0 4px 6px rgba(46, 49, 146, 0.2)'
  };

  const isLogoImage = (imageUrl) => {
    return imageUrl && (imageUrl.includes('logo') || imageUrl.includes('.svg'));
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        
        <div style={headerContainerStyle}>
          <h1 style={pageTitleStyle}>
            {language === 'uk' ? 'Наші секції' : 'Our Sections'}
          </h1>
          
          <p style={introTextStyle}>
            At the moment, we have active sections in <span style={boldCityStyle}>Kyiv</span>, <span style={boldCityStyle}>Chernivtsi</span>, <span style={boldCityStyle}>Lviv</span>, and <span style={boldCityStyle}>Odesa</span>, all united by the spirit of ESN and dedicated to making every exchange experience unforgettable.
          </p>
        </div>

        <div style={sectionsGridStyle}>
          {sections.map((section) => (
            <div 
              key={section.id}
              style={sectionCardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
                
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
                
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <div style={imageContainerStyle}>
                {section.image ? (
                  <img 
                    src={section.image} 
                    alt={section.title}
                    style={isLogoImage(section.image) ? logoImageStyle : imageStyle}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div style={placeholderStyle}>
                    {section.title} Photo
                  </div>
                )}
              </div>
              
              <div style={cardContentStyle}>
                <h3 style={cardTitleStyle}>{section.title}</h3>
                <p style={cardTextStyle}>{section.description}</p>
                
                <button 
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#1a1f6b';
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(46, 49, 146, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#2e3192';
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px rgba(46, 49, 146, 0.2)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                  }}
                >
                  {section.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sections;