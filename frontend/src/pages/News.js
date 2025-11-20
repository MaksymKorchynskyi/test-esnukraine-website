// News.js
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const News = () => {
  const { t } = useLanguage();
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const baseNews = [
      {
        id: 1,
        title: 'Welcome Week 2024 Successfully Started',
        date: 'September 15, 2023',
        categories: ['Event', 'Kyiv'],
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'ESN Ukraine successfully launched the Welcome Week 2024 with over 300 international students participating in various orientation activities...',
      },
      {
        id: 2,
        title: 'New Partnership with Kyiv University',
        date: 'September 10, 2023',
        categories: ['Partnership', 'Education'],
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'ESN Ukraine is proud to announce a new partnership with Taras Shevchenko National University of Kyiv to enhance support for international students...',
      },
      {
        id: 3,
        title: 'Cultural Exchange Festival 2023',
        date: 'August 28, 2023',
        categories: ['Festival', 'Culture'],
        image: 'https://images.unsplash.com/photo-1559027615-cfa462850979?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Join us for the annual Cultural Exchange Festival featuring food, music, and traditions from around the world...',
      },
      {
        id: 4,
        title: 'Volunteer Program Expansion',
        date: 'August 15, 2023',
        categories: ['Volunteering'],
        image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'ESN Ukraine is expanding its volunteer program to include more opportunities for local and international students...',
      },
      {
        id: 5,
        title: 'Erasmus Days 2023 Celebration',
        date: 'July 20, 2023',
        categories: ['Event', 'Erasmus+'],
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Celebrating the Erasmus+ program with a series of events across all our sections in Ukraine.',
      },
      {
        id: 6,
        title: 'Summer Camp in Carpathians',
        date: 'July 05, 2023',
        categories: ['Trip', 'Nature'],
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Our annual summer trip to the beautiful Carpathian mountains was a blast!',
      },
      {
        id: 7,
        title: 'Language Cafe: French Edition',
        date: 'June 15, 2023',
        categories: ['Education', 'Culture'],
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Practice your French skills with native speakers and enjoy croissants.',
      },
      {
        id: 8,
        title: 'City Quest: Hidden Kyiv',
        date: 'June 01, 2023',
        categories: ['Event', 'Kyiv'],
        image: 'https://images.unsplash.com/photo-1519055548599-6d4d129508c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Discover the secret spots of Kyiv in our interactive city quest game.',
      },
      {
        id: 9,
        title: 'International Dinner Night',
        date: 'May 20, 2023',
        categories: ['Food', 'Social'],
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Bring a dish from your country and share it with everyone!',
      },
      {
        id: 10,
        title: 'Movie Night Under the Stars',
        date: 'May 10, 2023',
        categories: ['Social', 'Relax'],
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Open-air movie screening in the botanical garden.',
      },
      {
        id: 11,
        title: 'Charity Run for Peace',
        date: 'April 25, 2023',
        categories: ['Sport', 'Charity'],
        image: 'https://images.unsplash.com/photo-1452626038306-3a2a4a5b0259?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Run for a good cause and support local charities.',
      },
      {
        id: 12,
        title: 'Career Workshop with Alumni',
        date: 'April 10, 2023',
        categories: ['Career', 'Education'],
        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        excerpt: 'Learn how to boost your CV with your Erasmus experience.',
      }
    ];
    setNews(baseNews);
  }, []);

  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageStyle = {
    padding: '4rem 2rem 6rem',
    background: '#F8FAFC',
    minHeight: '100vh',
    marginTop: '85px'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const pageTitleStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#7ac143',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif'
  };

  const pageSubtitleStyle = {
    fontSize: '1.3rem',
    color: '#64748B',
    marginBottom: '4rem',
    textAlign: 'center',
    lineHeight: 1.6,
    fontFamily: 'Open Sans, sans-serif'
  };

  const newsListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    marginBottom: '4rem'
  };

  const newsItemStyle = {
    background: '#ffffff',
    borderRadius: '15px', // Трохи заокругленіше (як в Events)
    overflow: 'hidden',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)', // Базова тінь як в Events
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '250px',
    cursor: 'pointer',
    border: '1px solid rgba(0,0,0,0.05)' // Базова рамка як в Events
  };

  const newsImageStyle = {
    width: '400px',
    height: 'auto',
    objectFit: 'cover',
    flexShrink: 0
  };

  const newsContentStyle = {
    padding: '2.5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  };

  const newsMetaStyle = {
    display: 'flex',
    gap: '0.8rem',
    alignItems: 'center',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  };

  const newsDateStyle = {
    color: '#7ac143',
    fontSize: '0.9rem',
    fontWeight: '700', // Більш жирний, як в Events
    fontFamily: 'Montserrat, sans-serif',
    marginRight: '1rem'
  };

  // Фіксований стиль категорій
  const newsCategoryStyle = {
    background: '#7ac143',
    color: '#ffffff',
    padding: '0.3rem 1rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    fontFamily: 'Montserrat, sans-serif',
    display: 'inline-block', // Щоб поводились як блоки
    minWidth: '80px', // Мінімальна ширина для однаковості (опціонально)
    textAlign: 'center'
  };

  const newsTitleStyle = {
    color: '#2D3748',
    marginBottom: '1rem',
    fontSize: '1.8rem', // Збільшено як в Events
    fontWeight: '700',
    lineHeight: 1.2,
    fontFamily: 'Montserrat, sans-serif'
  };

  const newsExcerptStyle = {
    color: '#64748B',
    marginBottom: '3rem',
    lineHeight: 1.6,
    fontSize: '1.05rem',
    flex: 1,
    fontFamily: 'Open Sans, sans-serif'
  };

  const readMoreStyle = {
    color: '#ffffff',
    background: '#7ac143',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontFamily: 'Montserrat, sans-serif',
    textDecoration: 'none',
    display: 'inline-block',
    position: 'absolute',
    bottom: '2.5rem',
    right: '2.5rem'
  };

  const paginationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '2rem'
  };

  const paginationButtonStyle = (isActive) => ({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: isActive ? 'none' : '1px solid #e2e8f0',
    background: isActive ? '#7ac143' : '#ffffff',
    color: isActive ? '#ffffff' : '#64748B',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'Montserrat, sans-serif'
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileStyles = {
    pageStyle: {
      padding: '6rem 1rem 2rem',
      marginTop: '70px'
    },
    pageTitleStyle: {
      fontSize: '2.2rem'
    },
    pageSubtitleStyle: {
      fontSize: '1.1rem',
      marginBottom: '3rem'
    },
    newsItemStyle: {
      flexDirection: 'column',
      minHeight: 'auto'
    },
    newsImageStyle: {
      width: '100%',
      height: '220px'
    },
    newsContentStyle: {
      padding: '2rem'
    },
    newsTitleStyle: {
      fontSize: '1.5rem'
    },
    newsExcerptStyle: {
      fontSize: '1rem',
      marginBottom: '2rem'
    },
    readMoreStyle: {
      position: 'static',
      alignSelf: 'flex-end',
      marginTop: '1rem'
    }
  };

  const getStyle = (baseStyle, mobileStyle) => {
    return isMobile ? { ...baseStyle, ...mobileStyle } : baseStyle;
  };

  return (
    <div style={getStyle(pageStyle, mobileStyles.pageStyle)}>
      <div style={containerStyle}>
        <h1 style={getStyle(pageTitleStyle, mobileStyles.pageTitleStyle)}>
          {t('newsTitle')}
        </h1>
        <p style={getStyle(pageSubtitleStyle, mobileStyles.pageSubtitleStyle)}>
          {t('newsText')}
        </p>
        
        <div style={newsListStyle}>
          {currentNews.map(item => (
            <div 
              key={item.id} 
              style={getStyle(newsItemStyle, mobileStyles.newsItemStyle)}
              onMouseEnter={(e) => {
                if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    // Ефект світіння (тіні) без рамки, як в Events
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(122, 193, 67, 0.25)'; 
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                style={getStyle(newsImageStyle, mobileStyles.newsImageStyle)} 
              />
              <div style={getStyle(newsContentStyle, mobileStyles.newsContentStyle)}>
                <div style={newsMetaStyle}>
                  <span style={newsDateStyle}>{item.date}</span>
                  {item.categories && item.categories.map((cat, index) => (
                    <span key={index} style={newsCategoryStyle}>{cat}</span>
                  ))}
                </div>
                <h3 style={getStyle(newsTitleStyle, mobileStyles.newsTitleStyle)}>
                  {item.title}
                </h3>
                <p style={getStyle(newsExcerptStyle, mobileStyles.newsExcerptStyle)}>
                  {item.excerpt}
                </p>
                <button 
                  style={getStyle(readMoreStyle, mobileStyles.readMoreStyle)}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#68a73a';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(122, 193, 67, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#7ac143';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {t('readMore')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Пагінація (тільки цифри та стрілки) */}
        <div style={paginationContainerStyle}>
            <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{...paginationButtonStyle(false), opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'default' : 'pointer'}}
            >
                &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    style={paginationButtonStyle(currentPage === number)}
                >
                    {number}
                </button>
            ))}

            <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{...paginationButtonStyle(false), opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer'}}
            >
                &gt;
            </button>
        </div>

      </div>
    </div>
  );
};

export default News;