// Events.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Events = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  useEffect(() => {
    const longDescription = language === 'uk' 
      ? ' Це була неймовірна подія, яка об\'єднала студентів з різних куточків світу. Ми обговорювали важливі теми, ділилися досвідом та просто чудово проводили час разом.'
      : ' This was an incredible event that united students from all over the world. We discussed important topics, shared experiences, and simply had a great time together.';

    const baseEvents = [
      {
        id: 1,
        title: language === 'uk' ? 'Welcome Week Осінь 2023' : 'Welcome Week Autumn 2023',
        date: language === 'uk' ? '14-20 Вересня, 2023' : '14-20 September, 2023',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: (language === 'uk' 
          ? 'Тиждень, повний знайомств, екскурсій та вечірок для нових іноземних студентів. Ми показали їм найкращі куточки міста.'
          : 'A week full of acquaintances, excursions, and parties for new international students. We prepared a lot of interesting things! A week full of acquaintances, excursions, and parties for new international students. We prepared a lot of interesting things!') + longDescription
      },
      {
        id: 2,
        title: language === 'uk' ? 'Благодійний забіг ESN' : 'ESN Charity Run',
        date: language === 'uk' ? '20 Травня, 2023' : '20 May, 2023',
        image: 'https://images.unsplash.com/photo-1552674605-469523170273?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: (language === 'uk'
          ? 'Студенти та волонтери об’єдналися заради спільної мети. Всі зібрані кошти підуть на благодійність.'
          : 'Students and volunteers united for a common goal. All funds raised will go to charity. Students and volunteers united for a common goal. All funds raised will go to charity.') + longDescription
      },
      {
        id: 3,
        title: language === 'uk' ? 'Поїздка в Карпати' : 'Trip to the Carpathians',
        date: language === 'uk' ? '10-12 Лютого, 2023' : '10-12 February, 2023',
        image: '', 
        description: (language === 'uk'
          ? 'Незабутні вихідні в горах: катання на лижах, традиційна кухня та чудові краєвиди зимових гір.'
          : 'Unforgettable weekend in the mountains: skiing, traditional cuisine and beautiful views of winter mountains.') + longDescription
      },
      {
        id: 4,
        title: language === 'uk' ? 'Вечір української культури' : 'Ukrainian Culture Night',
        date: language === 'uk' ? '18 Листопада, 2022' : '18 November, 2022',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: (language === 'uk'
          ? 'Ми познайомили іноземних студентів з українськими традиціями, кухнею та музикою.'
          : 'We introduced international students to Ukrainian traditions, cuisine and music.') + longDescription
      },
      {
        id: 5,
        title: language === 'uk' ? 'Екскурсія Львовом' : 'Lviv City Tour',
        date: language === 'uk' ? '15 Жовтня, 2022' : '15 October, 2022',
        image: 'https://images.unsplash.com/photo-1548586196-aa5803b77379?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: language === 'uk' ? 'Прогулянка старим містом Лева...' : 'Walking through the old city of Leo...' + longDescription
      },
      {
        id: 6,
        title: language === 'uk' ? 'Вечір кіно' : 'Movie Night',
        date: language === 'uk' ? '05 Жовтня, 2022' : '05 October, 2022',
        image: 'https://images.unsplash.com/photo-1489599804159-036feb40e486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: language === 'uk' ? 'Перегляд фільмів просто неба...' : 'Open-air movie screening...' + longDescription
      },
      {
        id: 7,
        title: language === 'uk' ? 'Майстер-клас з гончарства' : 'Pottery Masterclass',
        date: language === 'uk' ? '25 Вересня, 2022' : '25 September, 2022',
        image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: language === 'uk' ? 'Творчий вечір з глиною...' : 'Creative evening with clay...' + longDescription
      },
      {
        id: 8,
        title: language === 'uk' ? 'Похід на Говерлу' : 'Hiking Hoverla',
        date: language === 'uk' ? '24 Серпня, 2022' : '24 August, 2022',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: language === 'uk' ? 'Підкорення найвищої вершини...' : 'Conquering the highest peak...' + longDescription
      },
      {
        id: 9,
        title: language === 'uk' ? 'День настільних ігор' : 'Board Games Day',
        date: language === 'uk' ? '10 Серпня, 2022' : '10 August, 2022',
        image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: language === 'uk' ? 'Веселий день з монополією...' : 'Fun day with Monopoly...' + longDescription
      },
      {
        id: 10,
        title: language === 'uk' ? 'Мовний клуб' : 'Language Club',
        date: language === 'uk' ? '01 Серпня, 2022' : '01 August, 2022',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: language === 'uk' ? 'Практика англійської мови...' : 'English language practice...' + longDescription
      },
      {
        id: 11,
        title: language === 'uk' ? 'Вечірка на даху' : 'Rooftop Party',
        date: language === 'uk' ? '20 Липня, 2022' : '20 July, 2022',
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e3383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: language === 'uk' ? 'Танці під зорями...' : 'Dancing under the stars...' + longDescription
      },
      {
        id: 12,
        title: language === 'uk' ? 'Пікнік у парку' : 'Picnic in the Park',
        date: language === 'uk' ? '10 Липня, 2022' : '10 July, 2022',
        image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: language === 'uk' ? 'Відпочинок на природі...' : 'Relaxing in nature...' + longDescription
      }
    ];
    setEvents(baseEvents);
  }, [language]);

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Стилі ---

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
    color: '#ed008c',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif'
  };

  const pageSubtitleStyle = {
    fontSize: '1.3rem',
    color: '#64748B',
    marginBottom: '4rem',
    textAlign: 'center',
    lineHeight: 1.6,
    fontFamily: 'Open Sans, sans-serif',
    maxWidth: '800px',
    margin: '0 auto 4rem auto'
  };

  const eventsListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    marginBottom: '4rem'
  };

  const eventItemStyle = {
    background: '#ffffff',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'stretch',
    height: '280px',
    border: '1px solid rgba(0,0,0,0.05)',
    position: 'relative'
  };

  const eventImageStyle = {
    width: '40%',
    minWidth: '350px',
    height: '100%',
    objectFit: 'cover',
    flexShrink: 0
  };

  const eventPlaceholderStyle = {
    width: '40%',
    minWidth: '350px',
    height: '100%',
    background: 'linear-gradient(135deg, #ed008c 0%, #ffb7d5 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    flexShrink: 0
  };

  const eventContentStyle = {
    padding: '2rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden'
  };

  const eventDateStyle = {
    color: '#ed008c',
    fontSize: '0.95rem',
    fontWeight: '700',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '0.5rem', 
    display: 'block'
  };

  const eventTitleStyle = {
    color: '#2D3748',
    marginBottom: '0.8rem',
    fontSize: '1.5rem',
    fontWeight: '700',
    lineHeight: 1.2,
    fontFamily: 'Montserrat, sans-serif',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const eventDescriptionStyle = {
    color: '#4A5568',
    marginBottom: '2rem',
    lineHeight: 1.6,
    fontSize: '1.05rem',
    fontFamily: 'Open Sans, sans-serif',
    flex: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3, 
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  // ЗМІНЕНО: Позиціонування кнопки
  const readMoreButtonStyle = {
    display: 'inline-block',
    background: 'transparent',
    color: '#ed008c',
    border: '2px solid #ed008c',
    padding: '0.6rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    fontFamily: 'Montserrat, sans-serif',
    textDecoration: 'none',
    
    // Адаптивна логіка
    // Desktop: Абсолютне в куті з більшими відступами (1.5rem)
    position: isMobile ? 'static' : 'absolute',
    bottom: isMobile ? 'auto' : '1.5rem', // Опущено нижче (було 2.5rem)
    right: isMobile ? 'auto' : '1.5rem',  // Зсунуто правіше
    
    // Mobile: Розтягнуто
    width: isMobile ? '100%' : 'fit-content',
    alignSelf: isMobile ? 'stretch' : 'auto',
    marginTop: isMobile ? '1.5rem' : '0',
    textAlign: 'center'
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
    background: isActive ? '#ed008c' : '#ffffff',
    color: isActive ? '#ffffff' : '#64748B',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'Montserrat, sans-serif'
  });

  // --- Мобільні стилі ---
  const mobileStyles = {
    pageStyle: {
      padding: '6rem 1rem 3rem',
      marginTop: '70px'
    },
    pageTitleStyle: {
      fontSize: '2.2rem'
    },
    pageSubtitleStyle: {
      fontSize: '1.1rem',
      marginBottom: '3rem'
    },
    eventItemStyle: {
      flexDirection: 'column',
      height: 'auto',
      minHeight: 'auto'
    },
    eventImageStyle: {
      width: '100%',
      minWidth: 'auto',
      height: '220px'
    },
    eventPlaceholderStyle: {
      width: '100%',
      minWidth: 'auto',
      height: '220px'
    },
    eventContentStyle: {
      padding: '2rem 1.5rem'
    },
    eventTitleStyle: {
      fontSize: '1.5rem',
      WebkitLineClamp: 'none'
    },
    eventDescriptionStyle: {
        WebkitLineClamp: 4,
        fontSize: '1rem'
    },
    // Стиль кнопки на мобільному перезаписується в readMoreButtonStyle
    // але можна залишити для специфічних налаштувань margin
    readMoreButtonStyle: {
      marginTop: '1.5rem'
    }
  };

  const getStyle = (baseStyle, mobileStyle) => {
    return isMobile ? { ...baseStyle, ...mobileStyle } : baseStyle;
  };

  return (
    <div style={getStyle(pageStyle, mobileStyles.pageStyle)}>
      <div style={containerStyle}>
        <h1 style={getStyle(pageTitleStyle, mobileStyles.pageTitleStyle)}>
          {language === 'uk' ? 'Наші заходи' : 'Our Events'}
        </h1>
        <p style={getStyle(pageSubtitleStyle, mobileStyles.pageSubtitleStyle)}>
          {language === 'uk' 
            ? 'Ми створюємо події, що об’єднують культури та людей. Ось декілька яскравих моментів нашої історії.' 
            : 'We create events that unite cultures and people. Here are some highlights of our history.'}
        </p>
        
        <div style={eventsListStyle}>
          {currentEvents.map(event => (
            <div 
              key={event.id} 
              style={getStyle(eventItemStyle, mobileStyles.eventItemStyle)}
              onMouseEnter={(e) => {
                if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(237, 0, 140, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              {event.image ? (
                <img 
                  src={event.image} 
                  alt={event.title} 
                  style={getStyle(eventImageStyle, mobileStyles.eventImageStyle)} 
                />
              ) : (
                <div style={getStyle(eventPlaceholderStyle, mobileStyles.eventPlaceholderStyle)}>
                  ESN Event
                </div>
              )}

              <div style={getStyle(eventContentStyle, mobileStyles.eventContentStyle)}>
                
                <div>
                    <span style={eventDateStyle}>{event.date}</span>
                    <h3 style={getStyle(eventTitleStyle, mobileStyles.eventTitleStyle)}>
                      {event.title}
                    </h3>
                    <p style={eventDescriptionStyle}>
                      {truncateText(event.description, 200)}
                    </p>
                </div>
                
                <Link 
                    to={`/events/${event.id}`} 
                    style={readMoreButtonStyle} // Використовуємо оновлений стиль
                    onMouseEnter={(e) => {
                      e.target.style.background = '#ed008c';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#ed008c';
                    }}
                >
                    {language === 'uk' ? 'Детальніше' : 'Read More'}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ПАГІНАЦІЯ */}
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

export default Events;