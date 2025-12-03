// Home.js
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Home = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Змінні для свайпу
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 40; 

  const newsSliderRef = useRef(null);
  const eventsSliderRef = useRef(null);

  // --- ДАНІ (Оновлені СВІТЛІШІ градієнти) ---
  const bannerNews = [
    {
      id: 1,
      image: process.env.PUBLIC_URL + '/images/new_voice_of_courage.png',
      title: language === 'ua' ? 'Voices of Courage: 20 студентів, 20 історій, одне бачення' : 'Voices of Courage: 20 Students, 20 Stories, One Vision',
      description: language === 'ua' 
        ? 'Зворушлива збірка історій українських студентів, чия сила, стійкість і надія переосмислюють те, що означає здобувати освіту у часи війни.'
        : 'A moving collection of stories from Ukrainian students whose strength, resilience, and hope redefine what it means to pursue education in times of war.',
      link: '/news/voices-of-courage',
      color: '#00aeef',
      // Світліший Cyan -> Blue
      gradient: 'linear-gradient(135deg, #4dc4f4 0%, #00aeef 100%)' 
    },
    {
      id: 2,
      image: process.env.PUBLIC_URL + '/images/snapedit_1764526121207.jpeg',
      title: language === 'ua' ? 'Нова партнерська угода з Київським університетом' : 'New Partnership with Kyiv University',
      description: language === 'ua'
        ? 'ESN Ukraine оголошує про нову партнерську угоду з Київським національним університетом.'
        : 'ESN Ukraine announces a new partnership with Taras Shevchenko National University of Kyiv.',
      link: '/news/2',
      color: '#ed008c',
      // Світліший Pink -> Deep Pink
      gradient: 'linear-gradient(135deg, #ff69b4 0%, #ed008c 100%)'
    },
    {
      id: 3,
      image: process.env.PUBLIC_URL + '/images/IMG_4456.JPG',
      title: language === 'ua' ? 'Фестиваль культурного обміну 2023' : 'Cultural Exchange Festival 2023',
      description: language === 'ua'
        ? 'Приєднуйтесь до Фестивалю культурного обміну з їжею, музикою та традиціями з усього світу.'
        : 'Join the Cultural Exchange Festival featuring food, music, and traditions from around the world.',
      link: '/news/3',
      color: '#7ac143',
      // Світліший Green -> ESN Green
      gradient: 'linear-gradient(135deg, #9bd668 0%, #7ac143 100%)'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: language === 'ua' ? 'Набір волонтерів відкрито!' : 'Volunteer Recruitment Open!',
      description: language === 'ua'
        ? 'Станьте частиною нашої команди та змінюйте життя іноземних студентів на краще.'
        : 'Become part of our team and change the lives of international students for the better.',
      link: '/join',
      color: '#f57b20',
      gradient: 'linear-gradient(135deg, #ff9e57 0%, #f57b20 100%)'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: language === 'ua' ? 'Erasmus Days 2023' : 'Erasmus Days 2023',
      description: language === 'ua'
        ? 'Святкуємо дні програми Erasmus+ разом з усією Європою. Приєднуйтесь до подій!'
        : 'Celebrating Erasmus+ program days together with the whole of Europe. Join the events!',
      link: '/events',
      color: '#2e3192',
      gradient: 'linear-gradient(135deg, #5c5fff 0%, #2e3192 100%)'
    }
  ];

  // --- CSS АНІМАЦІЯ ---
  const globalAnimations = `
    @keyframes shine-effect {
      0% { left: -100%; opacity: 0; }
      20% { opacity: 0.5; }
      100% { left: 100%; opacity: 0; }
    }
    
    .animated-btn {
      position: relative;
      overflow: hidden;
      z-index: 1;
      transform: translateZ(0);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; 
    }

    /* Ховер ефект для десктопу */
    @media (min-width: 901px) {
      .animated-btn:hover {
        transform: translateY(-4px) scale(1.02) !important;
        box-shadow: 0 10px 20px rgba(0,0,0,0.15) !important;
      }
    }

    .animated-btn:active {
      transform: scale(0.95) !important;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
    }

    /* Стилі для кнопок слайдера (стрілочки) */
    .slider-nav-btn {
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .slider-nav-btn:hover {
      background: #f8f9fa !important;
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(0,0,0,0.1) !important;
    }
    .slider-nav-btn:active {
      transform: scale(0.85) !important; /* Ефект натискання */
      box-shadow: inset 0 2px 5px rgba(0,0,0,0.1) !important;
    }

    /* Анімація для кнопки "Вгору" */
    @keyframes pulse-transparent {
      0% { box-shadow: 0 0 0 0 rgba(46, 49, 146, 0.4); transform: scale(1); }
      50% { box-shadow: 0 0 0 10px rgba(46, 49, 146, 0); transform: scale(1.05); }
      100% { box-shadow: 0 0 0 0 rgba(46, 49, 146, 0); transform: scale(1); }
    }

    .scroll-top-btn {
      animation: pulse-transparent 2s infinite;
    }
    
    .scroll-top-btn:active {
      transform: scale(0.9);
      animation: none;
    }

    /* --- ГЕНЕРАЦІЯ УНІКАЛЬНИХ КЛАСІВ ДЛЯ КНОПОК БАНЕРА --- */
    ${bannerNews.map((news) => `
      .banner-btn-${news.id} {
        color: ${news.color} !important;
        background: #ffffff !important;
        border: none !important;
      }
      
      .banner-btn-${news.id}:hover, .banner-btn-${news.id}:active {
        background: ${news.gradient} !important;
        color: #ffffff !important;
        box-shadow: 0 8px 25px ${news.color}66 !important;
      }
    `).join('\n')}
  `;

  const latestNews = [
    {
      id: 1,
      title: language === 'ua' ? 'Welcome Week 2024 успішно розпочато' : 'Welcome Week 2024 Successfully Started',
      date: language === 'ua' ? '15 Вересня, 2023' : '15 September, 2023',
      excerpt: language === 'ua'
        ? 'ESN Ukraine успішно запустила Welcome Week 2024 за участю понад 300 іноземних студентів...'
        : 'ESN Ukraine successfully launched the Welcome Week 2024 with over 300 international students...',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: '#7ac143'
    },
    {
      id: 2,
      title: language === 'ua' ? 'Нова партнерська угода' : 'New Partnership Agreement',
      date: language === 'ua' ? '10 Вересня, 2023' : '10 September, 2023',
      excerpt: language === 'ua'
        ? 'ESN Ukraine з гордістю оголошує про нову партнерську угоду з КНУ імені Тараса Шевченка...'
        : 'ESN Ukraine is proud to announce a new partnership with Taras Shevchenko National University...',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: '#7ac143'
    },
    {
        id: 3,
        title: language === 'ua' ? 'Фестиваль культур 2023' : 'Culture Festival 2023',
        date: language === 'ua' ? '28 Серпня, 2023' : '28 August, 2023',
        excerpt: language === 'ua'
          ? 'Приєднуйтесь до нас на щорічному Фестивалі культурного обміну, де представлені традиції...'
          : 'Join us for the annual Cultural Exchange Festival featuring traditions from around the world...',
        image: 'https://images.unsplash.com/photo-1559027615-cfa462850979?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        color: '#7ac143'
      }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: language === 'ua' ? 'Історична екскурсія Києвом' : 'Kyiv Historical City Tour',
      date: language === 'ua' ? '20 Жовтня, 2023' : '20 October, 2023',
      description: language === 'ua' 
        ? 'Відкрийте для себе старе місто та його таємниці разом з нашими гідами.' 
        : 'Discover the old city and its secrets together with our guides.',
      image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: '#ed008c'
    },
    {
      id: 2,
      title: language === 'ua' ? 'Майстер-клас з кухні' : 'Cooking Masterclass',
      date: language === 'ua' ? '25 Жовтня, 2023' : '25 October, 2023',
      description: language === 'ua'
        ? 'Навчіться готувати традиційні вареники та борщ у теплій компанії.'
        : 'Learn to cook traditional vareniki and borsch in a warm company.',
      image: 'https://images.unsplash.com/photo-1560415751-15e0a0d60d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: '#ed008c'
    },
    {
      id: 3,
      title: language === 'ua' ? 'Міжнародний кіновечір' : 'International Movie Night',
      date: language === 'ua' ? '2 Листопада, 2023' : '2 November, 2023',
      description: language === 'ua'
        ? 'Перегляд найкращих європейських фільмів з попкорном та обговоренням.'
        : 'Watching the best European movies with popcorn and discussion.',
      image: 'https://images.unsplash.com/photo-1489599804159-036feb40e486?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      color: '#ed008c'
    }
  ];

  // --- ЛОГІКА ---

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerNews.length]);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % bannerNews.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + bannerNews.length) % bannerNews.length);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onTouchCancel = () => {
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = isMobile ? 320 : 400;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // --- СТИЛІ ---

  // Відступ під хедер
  const pageContainerStyle = {
    width: '100%',
    margin: 0,
    padding: 0,
    overflowX: 'hidden',
    background: '#ffffff',
    minHeight: '100vh',
    paddingTop: isMobile ? '85px' : '90px' 
  };

  const getStyle = (baseStyle, mobileStyleOverride) => {
    return isMobile ? { ...baseStyle, ...mobileStyleOverride } : baseStyle;
  };

  // МОБІЛЬНІ СТИЛІ
  const mobileStyles = {
    heroSectionStyle: {
        paddingTop: '0',  
        paddingBottom: '0', 
        width: '100%',
        marginTop: '0',
        marginBottom: '0'
    },
    heroBannerStyle: {
        height: 'auto', 
        minHeight: 'auto',
        width: '100%', 
        borderRadius: '0', 
        margin: '0',
        boxShadow: 'none', 
        display: 'flex', 
        flexDirection: 'column'
    },
    sliderStyleOverride: {
        height: 'auto',
        minHeight: 'auto'
    },
    slideStyleOverride: {
        height: 'auto',
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    slideContentStyle: {
        display: 'flex',
        flexDirection: 'column', 
        height: 'auto',
        width: '100%'
    },
    slideImageWrapperStyle: {
        width: '100%',
        height: '300px', 
        position: 'relative',
        flexShrink: 0 
    },
    slideTextStyle: {
        // Висота фіксована 170px
        padding: '1.2rem 1rem 3rem 1rem', 
        alignItems: 'center',
        textAlign: 'center',
        height: '170px', 
        minHeight: '170px',
        flex: '0 0 auto', 
        justifyContent: 'space-between', 
        background: 'linear-gradient(180deg, #2e3192 0%, #00aeef 100%)',
        color: '#ffffff',
        overflow: 'hidden', 
        position: 'relative'
    },
    slideTitleStyle: {
        fontSize: '1.2rem', 
        marginBottom: '0.4rem',
        lineHeight: '1.2',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
    },
    slideDescriptionStyle: {
        fontSize: '0.85rem',
        marginBottom: '0',
        lineHeight: '1.3',
        opacity: 0.95,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    
    // --- Інші секції мобільні ---
    contentGridStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        textAlign: 'center' 
    },
    sectionStyle: {
        padding: '3rem 0'
    },
    sectionTitleStyle: {
        fontSize: '1.8rem',
        padding: '0 1rem',
        marginBottom: '1rem',
        textAlign: 'center' 
    },
    sectionSubtitleStyle: {
        marginBottom: '2rem',
        textAlign: 'center', 
        paddingLeft: '1rem',
        paddingRight: '1rem'
    },
    aboutImageStyle: {
        height: '250px',
        width: '100%',
        marginBottom: '1rem',
        borderRadius: '12px'
    },
    newsletterCardStyle: {
        padding: '2rem 1.5rem',
        margin: '0 auto', 
        width: '92%', 
        maxWidth: '100%'
    },
    newsletterFormStyle: {
        flexDirection: 'column',
        gap: '1rem',
        width: '100%'
    },
    inputStyle: {
        width: '100%'
    },
    subscribeButtonStyle: {
        width: 'fit-content',
        margin: '0 auto',
        padding: '0.8rem 2rem'
    },
    sliderContainerStyle: {
        padding: '0 1rem',
        gap: '1rem'
    },
    sliderCardWrapperStyle: {
        minWidth: '90%',
        maxWidth: '90%'
    }
  };

  // --- DEKSTOP STYLES ---
  
  const heroSectionStyle = {
    paddingTop: '4rem',    
    paddingBottom: '4rem', 
    width: '100%',
    background: '#f8f9fae2'
  };

  const heroBannerStyle = {
    position: 'relative',
    height: '600px', 
    overflow: 'hidden',
    width: '94%', 
    maxWidth: '1400px', 
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '0px', 
    boxShadow: '0 15px 40px rgba(0,0,0,0.1)', 
    touchAction: 'pan-y'
  };

  const sliderStyle = {
    display: 'flex',
    width: `${bannerNews.length * 100}%`, 
    height: '100%', 
    transition: 'transform 0.8s ease-in-out', 
    transform: `translateX(-${currentSlide * (100 / bannerNews.length)}%)`
  };

  const slideStyle = {
    width: `${100 / bannerNews.length}%`,
    height: '100%', 
    position: 'relative',
    flexShrink: 0 
  };

  const slideContentStyle = {
    display: 'grid',
    gridTemplateColumns: '60% 40%', 
    height: '100%',
    width: '100%',
    alignItems: 'center'
  };

  const slideImageWrapperStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#eee' 
  };

  const slideImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    userSelect: 'none',
    pointerEvents: 'none' 
  };

  const slideTextStyle = {
    background: 'linear-gradient(135deg, #2e3192 0%, #00aeef 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '4rem', 
    color: '#ffffff',
    height: '100%',
    position: 'relative',
    zIndex: 2,
    overflow: 'hidden'
  };

  const slideTitleStyle = {
    fontSize: '2.5rem', 
    fontWeight: '800',
    marginBottom: '1.5rem',
    lineHeight: 1.1,
    fontFamily: 'Montserrat, sans-serif'
  };

  const slideDescriptionStyle = {
    fontSize: isMobile ? '1rem' : '1.2rem', 
    marginBottom: isMobile ? '1.5rem' : '2.5rem',
    opacity: 0.95,
    lineHeight: 1.6,
    fontFamily: 'Open Sans, sans-serif',
    maxWidth: isMobile ? '100%' : '550px'
  };

  // Кнопка CTA (Банер)
  const createCtaButtonStyle = (color) => ({
    padding: isMobile ? '0.5rem 1rem' : '1rem 2.5rem', 
    borderRadius: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: isMobile ? '0.8rem' : '1.1rem', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    fontFamily: 'Montserrat, sans-serif',
    display: 'inline-block',
    width: 'fit-content',
    textAlign: 'center',
    minWidth: isMobile ? '100px' : '200px', 
    margin: isMobile ? '0 auto' : '0' 
  });

  const dotsStyle = {
    position: 'absolute',
    bottom: isMobile ? '15px' : '2rem', 
    right: isMobile ? '50%' : '3rem', 
    transform: isMobile ? 'translateX(50%)' : 'none',
    display: 'flex',
    gap: '0.8rem',
    zIndex: 10
  };

  const dotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255,255,255,0.2)'
  };

  const activeDotStyle = {
    ...dotStyle,
    background: '#ffffff',
    transform: 'scale(1.3)',
    border: 'none',
    boxShadow: '0 0 10px rgba(255,255,255,0.5)'
  };

  // --- ЗАГАЛЬНІ СТИЛІ СЕКЦІЙ ---
  const sectionStyle = {
    padding: '5rem 0', 
    width: '100%',
    background: '#ffffff'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const sectionTitleStyle = {
    fontSize: '3rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#212529',
    textAlign: 'center',
    fontFamily: 'Montserrat, sans-serif'
  };

  const sectionSubtitleStyle = {
    fontSize: '1.3rem',
    color: '#6c757d',
    marginBottom: '4rem',
    textAlign: 'center',
    lineHeight: 1.6,
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Open Sans, sans-serif'
  };

  const aboutSectionStyle = { ...sectionStyle };
  
  const aboutContentStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '5rem',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const aboutTextStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  };

  const aboutParagraphStyle = {
    fontSize: isMobile ? '1rem' : '1.2rem', 
    lineHeight: 1.7,
    color: '#495057',
    fontFamily: 'Open Sans, sans-serif'
  };

  const aboutImageStyle = {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  };

  const joinSectionStyle = { ...sectionStyle };
  const joinContentStyle = { ...aboutContentStyle };
  const joinTextStyle = { 
    ...aboutTextStyle,
    alignItems: isMobile ? 'center' : 'flex-start', 
    textAlign: isMobile ? 'center' : 'left'
  };
  
  const joinTitleStyle = {
    fontSize: isMobile ? '2rem' : '3rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    fontFamily: 'Montserrat, sans-serif',
    color: '#f57b20',
    textAlign: isMobile ? 'center' : 'left' 
  };

  const joinParagraphStyle = { ...aboutParagraphStyle };
  const joinImageStyle = { ...aboutImageStyle };

  const newsletterSectionStyle = {
    ...sectionStyle,
    padding: '0rem 0 4rem 0'
  };

  const newsletterCardStyle = {
    background: 'linear-gradient(135deg, #1a1f6b 0%, #2e3192 50%, #00aeef 100%)',
    borderRadius: '20px',
    padding: '3rem 2.5rem',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    backdropFilter: 'blur(8px)',
    position: 'relative',
    overflow: 'hidden'
  };

  const newsletterTitleStyle = {
    fontSize: '2.2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    color: '#ffffff'
  };

  const newsletterSubtitleStyle = {
    fontSize: '1.1rem',
    marginBottom: '2rem',
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Open Sans, sans-serif',
    lineHeight: 1.6,
    maxWidth: '600px',
    paddingBottom: '25px',
    margin: '0 auto'
  };

  const newsletterFormStyle = {
    display: 'flex',
    gap: '0.8rem',
    maxWidth: '450px',
    margin: '0 auto',
    alignItems: 'center'
  };

  const inputStyle = {
    flex: 1,
    padding: '1rem 1.2rem',
    border: '2px solid rgba(255, 255, 255, 0.25)',
    borderRadius: '10px',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    background: 'rgba(255, 255, 255, 0.95)',
    transition: 'all 0.3s ease',
    color: '#495057'
  };

  const subscribeButtonStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#2e3192',
    border: 'none',
    padding: isMobile ? '0.8rem 2rem' : '1rem 2rem', // Компактніше на моб
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: isMobile ? '0.9rem' : '1rem', // Менший шрифт
    fontFamily: 'Montserrat, sans-serif',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
    letterSpacing: '0.3px',
    whiteSpace: 'nowrap'
  };

  const successMessageStyle = {
    background: '#7ac143',
    color: '#ffffff',
    padding: '1rem',
    borderRadius: '10px',
    marginTop: '1.5rem',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 4px 12px rgba(122, 193, 67, 0.25)'
  };

  // --- СТИЛІ ДЛЯ СЛАЙДЕРІВ (Новини) ---
  const sliderTrackStyle = {
    display: 'flex',
    overflowX: 'auto', 
    scrollSnapType: 'x mandatory',
    gap: '2rem',
    padding: '1rem 0.5rem 2rem 0.5rem', 
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    scrollBehavior: 'smooth',
    WebkitOverflowScrolling: 'touch'
  };

  const sliderCardWrapperStyle = {
    minWidth: '350px', 
    maxWidth: '350px',
    scrollSnapAlign: 'center',
    flexShrink: 0
  };

  // ОНОВЛЕНІ СТИЛІ КНОПОК СЛАЙДЕРА (Квадратні з заокругленням + тіні)
  const sliderNavButtonStyle = (color) => ({
    background: 'rgba(255, 255, 255, 0.95)',
    border: `2px solid ${color}`,
    color: color,
    width: '50px',
    height: '50px',
    borderRadius: '12px', // Квадратні з заокругленням
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    backdropFilter: 'blur(5px)',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)' // Тінь
  });

  const ArrowIcon = ({ direction }) => (
     <svg 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
     >
        <path d="M9 18l6-6-6-6"/>
     </svg>
  );

  const createCardStyle = (color) => ({
    background: '#ffffff',
    borderRadius: '15px',
    overflow: 'hidden',
    borderTop: `5px solid ${color}`,
    boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative'
  });

  const cardImageStyle = {
    width: '100%',
    height: '220px',
    objectFit: 'cover'
  };

  const cardContentStyle = {
    padding: '1.5rem',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const cardDateStyle = {
    fontSize: '0.95rem',
    fontWeight: '700',
    fontFamily: 'Montserrat, sans-serif',
    marginBottom: '0.5rem',
    display: 'block'
  };

  const cardTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#212529',
    lineHeight: 1.3,
    fontFamily: 'Montserrat, sans-serif'
  };

  const cardTextStyle = {
    color: '#6c757d',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
    fontSize: '1rem',
    fontFamily: 'Open Sans, sans-serif'
  };

  const createReadMoreStyle = (color) => ({
    color: color,
    background: 'transparent',
    border: `2px solid ${color}`,
    padding: isMobile ? '0.6rem 1.2rem' : '0.6rem 1.5rem', // Компактніше на моб
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: isMobile ? '0.85rem' : '0.9rem', // Менший шрифт
    fontFamily: 'Montserrat, sans-serif',
    alignSelf: 'flex-end', 
    marginLeft: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    marginTop: 'auto',
    width: 'fit-content', // Завжди компактна ширина
    margin: isMobile ? '0 auto' : 'auto 0 0 auto' // Центрування на моб
  });

  const createViewAllButtonStyle = (color) => ({
    display: 'inline-block',
    background: color,
    color: '#ffffff',
    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem', // Компактніше
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    marginTop: '0', 
    fontSize: isMobile ? '0.9rem' : '1rem', // Менший шрифт
    fontFamily: 'Montserrat, sans-serif',
    width: 'fit-content', // Компактна
    margin: '0 auto' // Центрування
  });

  // НОВИЙ ДИЗАЙН КНОПКИ SCROLL TO TOP
  const scrollTopButtonStyle = {
    position: 'fixed',
    bottom: isMobile ? '1.5rem' : '2rem', // Більш компактний відступ на моб
    right: isMobile ? '1.5rem' : '2rem',
    width: isMobile ? '40px' : '50px', // Менший розмір на моб (40px)
    height: isMobile ? '40px' : '50px',
    
    // Прозорий фон градієнт (синій ESN), без матового скла
    background: 'linear-gradient(180deg, rgba(46, 49, 146, 0.8) 0%, rgba(0, 174, 239, 0.8) 100%)',
    border: 'none',
    color: '#ffffff',
    
    borderRadius: '12px', // Квадратна з заокругленими кутами
    cursor: 'pointer',
    display: showScrollTop ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: isMobile ? '1rem' : '1.2rem',
    transition: 'all 0.3s ease',
    zIndex: 1000
  };

  return (
    <div style={pageContainerStyle}>
      <style>{globalAnimations}</style>
      
      {/* Hero Section */}
      <section style={getStyle(heroSectionStyle, mobileStyles.heroSectionStyle)}>
        <div 
            style={getStyle(heroBannerStyle, mobileStyles.heroBannerStyle)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchCancel} 
        >
          {/* Slider Container */}
          <div style={isMobile ? { ...sliderStyle, ...mobileStyles.sliderStyleOverride } : sliderStyle}>
            {bannerNews.map((slide, index) => {
              const SlideContent = () => (
                <div style={getStyle(slideContentStyle, mobileStyles.slideContentStyle)}>
                  {/* Обгортка для зображення */}
                  <div style={getStyle(slideImageWrapperStyle, mobileStyles.slideImageWrapperStyle)}>
                    <img 
                        src={slide.image} 
                        alt={slide.title} 
                        style={slideImageStyle} 
                        draggable={false} 
                    />
                  </div>
                  
                  <div style={getStyle(slideTextStyle, mobileStyles.slideTextStyle)}>
                    <div>
                      <h1 style={getStyle(slideTitleStyle, mobileStyles.slideTitleStyle)}>{slide.title}</h1>
                      <p style={getStyle(slideDescriptionStyle, mobileStyles.slideDescriptionStyle)}>{slide.description}</p>
                    </div>
                    
                    {/* Кнопка відображається ТІЛЬКИ на десктопі */}
                    {!isMobile && (
                      <Link 
                        to={slide.link} 
                        className={`animated-btn banner-btn-${slide.id}`}
                        style={createCtaButtonStyle(slide.color)}
                      >
                        {language === 'ua' ? 'Детальніше' : 'Read More'}
                      </Link>
                    )}
                  </div>
                </div>
              );

              return (
                <div key={index} style={isMobile ? { ...slideStyle, ...mobileStyles.slideStyleOverride } : slideStyle}>
                   {/* На мобільному робимо ВЕСЬ слайд посиланням */}
                   {isMobile ? (
                      <Link to={slide.link} style={{ display: 'block', height: '100%', width: '100%', textDecoration: 'none', color: 'inherit' }}>
                        <SlideContent />
                      </Link>
                   ) : (
                      <SlideContent />
                   )}
                </div>
              );
            })}
          </div>

          <div style={dotsStyle}>
            {bannerNews.map((_, index) => (
              <div
                key={index}
                style={index === currentSlide ? activeDotStyle : dotStyle}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About ESN Ukraine Section */}
      <section style={getStyle(aboutSectionStyle, mobileStyles.sectionStyle)}>
        <div style={containerStyle}>
          <h2 style={getStyle(sectionTitleStyle, mobileStyles.sectionTitleStyle)}>
            {language === 'ua' ? 'Це ESN Ukraine' : 'This is ESN Ukraine'}
          </h2>
          <div style={{
              ...getStyle(aboutContentStyle, mobileStyles.contentGridStyle),
              display: isMobile ? 'flex' : 'grid',
              flexDirection: 'column' 
          }}>
            <div style={aboutTextStyle}>
              <p style={aboutParagraphStyle}>
                {language === 'ua' 
                  ? 'Erasmus Student Network Ukraine — це студентська організація національного рівня, яка представляє місцеві секції Erasmus Student Network. Наразі ми маємо зростаючу мережу секцій у Києві, Чернівцях, Львові та Одесі.'
                  : 'Erasmus Student Network Ukraine is a national-level student organization that represents local Erasmus Student Network sections. At the moment, we have a growing network of sections in Kyiv, Chernivtsi, Lviv, and Odesa.'
                }
              </p>
              
              {isMobile && (
                 <img 
                    src= {process.env.PUBLIC_URL + '/images/esn_t_photo.jpg'}
                    alt="ESN Ukraine Team" 
                    style={getStyle(aboutImageStyle, mobileStyles.aboutImageStyle)}
                 />
              )}

              <p style={aboutParagraphStyle}>
                {language === 'ua'
                  ? 'Наша місія — представляти інтереси іноземних студентів, забезпечуючи можливості для культурного розуміння та саморозвитку за принципом «Студенти допомагають студентам». Ми є однією з наймолодших секцій ESN, але маємо всю енергію та сміливість, щоб зробити ваш обмін в Україні найкращим часом у вашому житті! #ESNukraine'
                  : 'Our mission is to represent international students, thus providing opportunities for cultural understanding and self-development under the principle of Students Helping Students. We are one of the youngest existing sections of ESN, but we possess all the energy and courage to make your exchange in Ukraine the most amazing time of your life! #ESNukraine'
                }
              </p>
              
              <button 
                className="animated-btn"
                style={{
                  ...createCtaButtonStyle('#00aeef'),
                  background: '#00aeef',
                  color: '#ffffff',
                  alignSelf: isMobile ? 'center' : 'flex-start',
                  border: 'none',
                  // ОНОВЛЕНО: менші розміри на десктопі, фіксована ширина на мобільному
                  padding: isMobile ? '0.8rem 2rem' : '0.8rem 2rem', 
                  fontSize: isMobile ? '1rem' : '0.95rem',
                  width: isMobile ? '250px' : 'fit-content', // Однакова ширина на мобільному
                  margin: isMobile ? '0 auto' : '0'
                }}
              >
                {language === 'ua' ? 'Дізнатися більше про нас' : 'Learn More About Us'}
              </button>
            </div>

            {!isMobile && (
               <div>
                 <img 
                  src= {process.env.PUBLIC_URL + '/images/esn_t_photo.jpg'}
                   alt="ESN Ukraine Team" 
                   style={getStyle(aboutImageStyle, mobileStyles.aboutImageStyle)}
                 />
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section style={getStyle(joinSectionStyle, mobileStyles.sectionStyle)}>
        <div style={containerStyle}>
          <div style={{
              ...getStyle(joinContentStyle, mobileStyles.contentGridStyle),
              display: isMobile ? 'flex' : 'grid',
              flexDirection: 'column'
          }}>
            {!isMobile && (
               <div>
                 <img 
                   src= {process.env.PUBLIC_URL + '/images/IMG_7180.jpg'}
                   alt="Join ESN Ukraine" 
                   style={getStyle(joinImageStyle, mobileStyles.aboutImageStyle)}
                 />
               </div>
            )}

            <div style={getStyle(joinTextStyle, mobileStyles.joinTextStyle)}>
              <h2 style={getStyle(joinTitleStyle, mobileStyles.joinTitleStyle)}>
                {language === 'ua' ? 'Приєднуйтесь до нас' : 'Join Us'}
              </h2>
              
              {isMobile && (
                  <img 
                    src= {process.env.PUBLIC_URL + '/images/img_7180.jpg'}
                    alt="Join ESN Ukraine" 
                    style={getStyle(joinImageStyle, mobileStyles.aboutImageStyle)}
                  />
              )}

              <p style={joinParagraphStyle}>
                {language === 'ua'
                  ? 'Хочете поринути в міжнародну спільноту активних волонтерів? Повернулися з Erasmus і продовжуєте плакати, переглядаючи фото старих добрих часів? Незалежно від того, що спонукає вас стати ESNer, ми готові вас вітати. Приєднуйтесь до ESN Ukraine або однієї з наших місцевих секцій!'
                  : 'Want to dive deep into the international community of active volunteers? Came back from Erasmus and keep crying over the photos of the good old days? Regardless of what drives you to become an ESNer, we are ready to welcome you. Join ESN Ukraine or one of our local sections!'
                }
              </p>
              <button 
                className="animated-btn"
                style={{
                  ...createCtaButtonStyle('#f57b20'),
                  background: '#f57b20',
                  color: '#ffffff',
                  alignSelf: isMobile ? 'center' : 'flex-start',
                  border: 'none',
                  // ОНОВЛЕНО: менші розміри на десктопі, фіксована ширина на мобільному
                  padding: isMobile ? '0.8rem 2rem' : '0.8rem 2rem',
                  fontSize: isMobile ? '1rem' : '0.95rem',
                  width: isMobile ? '250px' : 'fit-content', // Однакова ширина на мобільному
                  margin: isMobile ? '0 auto' : '0'
                }}
              >
                {language === 'ua' ? 'Стати волонтером' : 'Become a Volunteer'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 1. LATEST NEWS SECTION */}
      <section style={{ ...sectionStyle, background: '#ffffff' }}>
        <div style={containerStyle}>
          <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem',
              flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div style={{width: '100%', textAlign: 'center'}}>
              <h2 style={getStyle(sectionTitleStyle, mobileStyles.sectionTitleStyle)}>
                {language === 'ua' ? 'Останні новини' : 'Latest News'}
              </h2>
              <p style={getStyle(
                  {...sectionSubtitleStyle, margin: '0', marginBottom: '0'},
                  {...mobileStyles.sectionSubtitleStyle}
              )}>
                {language === 'ua' 
                  ? 'Дізнавайтеся першими про наші досягнення' 
                  : 'Be the first to know about our achievements'}
              </p>
            </div>
            
            {!isMobile && (
              <div style={{display: 'flex', gap: '1rem', paddingRight: '1rem', position: 'absolute', right: '10%'}}>
                <button 
                  onClick={() => scrollSlider(newsSliderRef, 'left')} 
                  className="slider-nav-btn"
                  style={sliderNavButtonStyle('#7ac143')}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button 
                  onClick={() => scrollSlider(newsSliderRef, 'right')} 
                  className="slider-nav-btn"
                  style={sliderNavButtonStyle('#7ac143')}
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            )}
          </div>

          <div 
            ref={newsSliderRef} 
            style={{
                ...sliderTrackStyle, 
                padding: isMobile ? '0.5rem 0.5rem 1.5rem 0.5rem' : '1rem 0.5rem 2rem 0.5rem'
            }}
          >
            {latestNews.map(news => (
              <div key={news.id} style={getStyle(sliderCardWrapperStyle, mobileStyles.sliderCardWrapperStyle)}>
                <div style={createCardStyle(news.color)}>
                  <img src={news.image} alt={news.title} style={cardImageStyle} draggable={false} />
                  <div style={cardContentStyle}>
                    <div>
                      <span style={{...cardDateStyle, color: news.color}}>{news.date}</span>
                      <h4 style={cardTitleStyle}>{news.title}</h4>
                      <p style={cardTextStyle}>{news.excerpt}</p>
                    </div>
                    <Link to="/news" className="animated-btn" style={createReadMoreStyle(news.color)}>
                      {language === 'ua' ? 'Детальніше' : 'Read More'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {isMobile && (
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', marginBottom: '1.5rem'}}>
                <button onClick={() => scrollSlider(newsSliderRef, 'left')} className="slider-nav-btn" style={sliderNavButtonStyle('#7ac143')}>
                  <ArrowIcon direction="left" />
                </button>
                <button onClick={() => scrollSlider(newsSliderRef, 'right')} className="slider-nav-btn" style={sliderNavButtonStyle('#7ac143')}>
                  <ArrowIcon direction="right" />
                </button>
            </div>
          )}

          <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <Link 
              to="/news" 
              className="animated-btn"
              style={createViewAllButtonStyle('#7ac143')}
            >
              {language === 'ua' ? 'Переглянути всі новини' : 'View All News'}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. UPCOMING EVENTS SECTION */}
      <section style={{ ...sectionStyle, background: '#ffffff' }}>
        <div style={containerStyle}>
          <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem',
              flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div style={{width: '100%', textAlign: 'center'}}>
              <h2 style={getStyle(sectionTitleStyle, mobileStyles.sectionTitleStyle)}>
                {language === 'ua' ? 'Майбутні події' : 'Upcoming Events'}
              </h2>
              <p style={getStyle(
                  {...sectionSubtitleStyle, margin: '0', marginBottom: '0'},
                  {...mobileStyles.sectionSubtitleStyle}
              )}>
                {language === 'ua' 
                  ? 'Не пропустіть найцікавіше' 
                  : 'Do not miss the most interesting'}
              </p>
            </div>

            {!isMobile && (
              <div style={{display: 'flex', gap: '1rem', paddingRight: '1rem', position: 'absolute', right: '10%'}}>
                <button 
                  onClick={() => scrollSlider(eventsSliderRef, 'left')} 
                  className="slider-nav-btn"
                  style={sliderNavButtonStyle('#ed008c')}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button 
                  onClick={() => scrollSlider(eventsSliderRef, 'right')} 
                  className="slider-nav-btn"
                  style={sliderNavButtonStyle('#ed008c')}
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            )}
          </div>

          <div 
            ref={eventsSliderRef} 
            style={{
                ...sliderTrackStyle, 
                padding: isMobile ? '0.5rem 0.5rem 1.5rem 0.5rem' : '1rem 0.5rem 2rem 0.5rem'
            }}
          >
            {upcomingEvents.map(event => (
              <div key={event.id} style={getStyle(sliderCardWrapperStyle, mobileStyles.sliderCardWrapperStyle)}>
                <div style={createCardStyle(event.color)}>
                  <img src={event.image} alt={event.title} style={cardImageStyle} draggable={false} />
                  <div style={cardContentStyle}>
                    <div>
                      <span style={{...cardDateStyle, color: event.color}}>{event.date}</span>
                      <h4 style={cardTitleStyle}>{event.title}</h4>
                      <p style={cardTextStyle}>{event.description}</p>
                    </div>
                    <Link to="/events" className="animated-btn" style={createReadMoreStyle(event.color)}>
                      {language === 'ua' ? 'Дізнатися більше' : 'Learn More'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {isMobile && (
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', marginBottom: '1.5rem'}}>
                <button onClick={() => scrollSlider(eventsSliderRef, 'left')} className="slider-nav-btn" style={sliderNavButtonStyle('#ed008c')}>
                  <ArrowIcon direction="left" />
                </button>
                <button onClick={() => scrollSlider(eventsSliderRef, 'right')} className="slider-nav-btn" style={sliderNavButtonStyle('#ed008c')}>
                  <ArrowIcon direction="right" />
                </button>
            </div>
          )}

          <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <Link 
              to="/events" 
              className="animated-btn"
              style={createViewAllButtonStyle('#ed008c')}
            >
              {language === 'ua' ? 'Переглянути всі події' : 'View All Events'}
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={getStyle(newsletterSectionStyle, mobileStyles.sectionStyle)}>
        <div style={containerStyle}>
          <div style={getStyle(newsletterCardStyle, mobileStyles.newsletterCardStyle)}>
            <h2 style={newsletterTitleStyle}>
              {language === 'ua' ? 'Будьте в курсі' : 'Stay Updated'}
            </h2>
            <p style={newsletterSubtitleStyle}>
              {language === 'ua'
                ? 'Підпишіться на нашу розсилку та будьте першими, хто дізнається про майбутні події, новини та можливості від ESN Ukraine'
                : 'Subscribe to our newsletter and be the first to know about upcoming events, news, and opportunities from ESN Ukraine'
              }
            </p>
            <form onSubmit={handleSubscribe} style={getStyle(newsletterFormStyle, mobileStyles.newsletterFormStyle)}>
              <input
                type="email"
                placeholder={language === 'ua' ? 'Введіть вашу електронну адресу' : 'Enter your email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={getStyle(inputStyle, mobileStyles.inputStyle)}
              />
              <button 
                type="submit" 
                className="animated-btn"
                style={getStyle(subscribeButtonStyle, mobileStyles.subscribeButtonStyle)}
              >
                {language === 'ua' ? 'Підписатися' : 'Subscribe'}
              </button>
            </form>
            {isSubscribed && (
              <div style={successMessageStyle}>
                {language === 'ua' ? 'Дякуємо за підписку на нашу розсилку!' : 'Thank you for subscribing to our newsletter!'}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Кнопка скролу вгору (ОНОВЛЕНА) */}
      <button 
        style={scrollTopButtonStyle} 
        className="scroll-top-btn"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
};

export default Home;