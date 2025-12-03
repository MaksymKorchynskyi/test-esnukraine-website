import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const News = () => {
  const { t, language } = useLanguage();
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Grid layout: 6 items per page

  useEffect(() => {
    const baseNews = [
      {
        id: 1,
        title: 'Welcome Week 2024 Successfully Started',
        date: 'September 15, 2023',
        categories: ['Event', 'Kyiv'],
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'ESN Ukraine successfully launched the Welcome Week 2024 with over 300 international students participating in various orientation activities...',
      },
      {
        id: 2,
        title: 'New Partnership with Kyiv University',
        date: 'September 10, 2023',
        categories: ['Partnership', 'Education'],
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'ESN Ukraine is proud to announce a new partnership with Taras Shevchenko National University of Kyiv to enhance support for international students...',
      },
      {
        id: 3,
        title: 'Cultural Exchange Festival 2023',
        date: 'August 28, 2023',
        categories: ['Festival', 'Culture'],
        image: 'https://images.unsplash.com/photo-1559027615-cfa462850979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Join us for the annual Cultural Exchange Festival featuring food, music, and traditions from around the world...',
      },
      {
        id: 4,
        title: 'Volunteer Program Expansion',
        date: 'August 15, 2023',
        categories: ['Volunteering'],
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'ESN Ukraine is expanding its volunteer program to include more opportunities for local and international students...',
      },
      {
        id: 5,
        title: 'Erasmus Days 2023 Celebration',
        date: 'July 20, 2023',
        categories: ['Event', 'Erasmus+'],
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Celebrating the Erasmus+ program with a series of events across all our sections in Ukraine.',
      },
      {
        id: 6,
        title: 'Summer Camp in Carpathians',
        date: 'July 05, 2023',
        categories: ['Trip', 'Nature'],
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Our annual summer trip to the beautiful Carpathian mountains was a blast!',
      },
      {
        id: 7,
        title: 'Language Cafe: French Edition',
        date: 'June 15, 2023',
        categories: ['Education', 'Culture'],
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Practice your French skills with native speakers and enjoy croissants.',
      },
      {
        id: 8,
        title: 'City Quest: Hidden Kyiv',
        date: 'June 01, 2023',
        categories: ['Event', 'Kyiv'],
        image: 'https://images.unsplash.com/photo-1519055548599-6d4d129508c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Discover the secret spots of Kyiv in our interactive city quest game.',
      },
      {
        id: 9,
        title: 'International Dinner Night',
        date: 'May 20, 2023',
        categories: ['Food', 'Social'],
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Bring a dish from your country and share it with everyone!',
      },
      {
        id: 10,
        title: 'Movie Night Under the Stars',
        date: 'May 10, 2023',
        categories: ['Social', 'Relax'],
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        excerpt: 'Open-air movie screening in the botanical garden.',
      }
    ];
    setNews(baseNews);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- СТИЛІ ---

  const pageStyle = {
    padding: isMobile ? '3rem 1rem 6rem' : '5rem 2rem 8rem',
    background: '#ffffff',
    minHeight: '100vh',
    marginTop: '85px',
    fontFamily: 'Open Sans, sans-serif'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: isMobile ? '3rem' : '5rem'
  };

  // ЗАГОЛОВОК ЗЕЛЕНОГО КОЛЬОРУ (#7ac143)
  const pageTitleStyle = {
    fontSize: isMobile ? '2.5rem' : '3.5rem',
    fontWeight: '800',
    marginBottom: '1rem',
    color: '#7ac143', // ESN Green
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: '-1px'
  };

  const pageSubtitleStyle = {
    fontSize: isMobile ? '1.1rem' : '1.3rem',
    color: '#6c757d',
    lineHeight: 1.6,
    maxWidth: '700px',
    margin: '0 auto'
  };

  // --- GRID LAYOUT ---
  const newsGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: isMobile ? '2rem' : '2.5rem',
    marginBottom: '5rem'
  };

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
    border: '1px solid #f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative'
  };

  const imageContainerStyle = {
    width: '100%',
    height: '240px',
    overflow: 'hidden',
    position: 'relative'
  };

  const cardImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  };

  const categoryTagStyle = {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#2e3192',
    padding: '6px 14px',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: '700',
    fontFamily: 'Montserrat, sans-serif',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    zIndex: 2
  };

  const cardContentStyle = {
    padding: '2rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  };

  const dateStyle = {
    color: '#7ac143', // Зелений акцент
    fontSize: '0.9rem',
    fontWeight: '700',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '0.8rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const titleStyle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#212529',
    marginBottom: '1rem',
    lineHeight: 1.3,
    fontFamily: 'Montserrat, sans-serif'
  };

  const excerptStyle = {
    fontSize: '1rem',
    color: '#6c757d',
    lineHeight: 1.6,
    marginBottom: '2rem',
    flex: 1,
    fontFamily: 'Open Sans, sans-serif'
  };

  const readMoreBtnStyle = {
    alignSelf: 'flex-start',
    background: 'transparent',
    color: '#7ac143',
    border: '2px solid #7ac143',
    padding: '0.7rem 1.8rem',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '0.95rem',
    cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block'
  };

  const paginationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.8rem',
    marginTop: '2rem'
  };

  const paginationBtnStyle = (isActive) => ({
    width: '45px',
    height: '45px',
    borderRadius: '12px',
    border: isActive ? 'none' : '2px solid #f0f0f0',
    background: isActive ? '#7ac143' : '#ffffff',
    color: isActive ? '#ffffff' : '#6c757d',
    fontWeight: '700',
    fontFamily: 'Montserrat, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem'
  });

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        
        {/* Header Section */}
        <div style={headerStyle}>
          <h1 style={pageTitleStyle}>{t('newsTitle')}</h1>
          <p style={pageSubtitleStyle}>
            {language === 'ua' 
              ? 'Слідкуйте за останніми оновленнями, історіями успіху та можливостями від ESN Ukraine.' 
              : 'Stay tuned for the latest updates, success stories, and opportunities from ESN Ukraine.'}
          </p>
        </div>

        {/* News Grid */}
        <div style={newsGridStyle}>
          {currentNews.map((item) => (
            <article 
              key={item.id} 
              style={cardStyle}
              onMouseEnter={(e) => {
                if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(122, 193, 67, 0.25)';
                    const img = e.currentTarget.querySelector('.card-image');
                    if(img) img.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
                    const img = e.currentTarget.querySelector('.card-image');
                    if(img) img.style.transform = 'scale(1)';
                }
              }}
            >
              <div style={imageContainerStyle}>
                {item.categories && item.categories[0] && (
                  <span style={categoryTagStyle}>{item.categories[0]}</span>
                )}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="card-image"
                  style={cardImageStyle}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=ESN+News'; }}
                />
              </div>

              <div style={cardContentStyle}>
                <div style={dateStyle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  {item.date}
                </div>
                
                <h3 style={titleStyle}>{item.title}</h3>
                <p style={excerptStyle}>{item.excerpt}</p>
                
                <button 
                  style={readMoreBtnStyle}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#7ac143';
                    e.target.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#7ac143';
                  }}
                >
                  {t('readMore')}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div style={paginationContainerStyle}>
          <button 
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={{
                ...paginationBtnStyle(false),
                opacity: currentPage === 1 ? 0.5 : 1,
                cursor: currentPage === 1 ? 'default' : 'pointer'
            }}
          >
            ←
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              style={paginationBtnStyle(currentPage === number)}
            >
              {number}
            </button>
          ))}

          <button 
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={{
                ...paginationBtnStyle(false),
                opacity: currentPage === totalPages ? 0.5 : 1,
                cursor: currentPage === totalPages ? 'default' : 'pointer'
            }}
          >
            →
          </button>
        </div>

      </div>
    </div>
  );
};

export default News;