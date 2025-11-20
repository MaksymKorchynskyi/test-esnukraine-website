// Home.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext'; // Додано імпорт контексту

// Більше не приймаємо language як prop, використовуємо контекст
const Home = () => {
  const { language } = useLanguage(); // Використовуємо контекст
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Змінні для свайпу (Touch)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Мінімальна відстань для зарахування свайпу

  // Refs для слайдерів
  const newsSliderRef = useRef(null);
  const eventsSliderRef = useRef(null);

  // --- ДАНІ ---
  const bannerNews = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: language === 'ua' ? 'Welcome Week 2024 успішно розпочато' : 'Welcome Week 2024 Successfully Started',
      description: language === 'ua' 
        ? 'ESN Ukraine успішно запустила Welcome Week 2024 за участю понад 300 іноземних студентів. Це був неймовірний тиждень знайомств.'
        : 'ESN Ukraine successfully launched the Welcome Week 2024 with over 300 international students. It was an incredible week of networking.',
      link: '/news/1',
      color: '#00aeef'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: language === 'ua' ? 'Нова партнерська угода з Київським університетом' : 'New Partnership with Kyiv University',
      description: language === 'ua'
        ? 'ESN Ukraine оголошує про нову партнерську угоду з Київським національним університетом.'
        : 'ESN Ukraine announces a new partnership with Taras Shevchenko National University of Kyiv.',
      link: '/news/2',
      color: '#ed008c'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1559027615-cfa462850979?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: language === 'ua' ? 'Фестиваль культурного обміну 2023' : 'Cultural Exchange Festival 2023',
      description: language === 'ua'
        ? 'Приєднуйтесь до Фестивалю культурного обміну з їжею, музикою та традиціями з усього світу.'
        : 'Join the Cultural Exchange Festival featuring food, music, and traditions from around the world.',
      link: '/news/3',
      color: '#7ac143'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: language === 'ua' ? 'Набір волонтерів відкрито!' : 'Volunteer Recruitment Open!',
      description: language === 'ua'
        ? 'Станьте частиною нашої команди та змінюйте життя іноземних студентів на краще.'
        : 'Become part of our team and change the lives of international students for the better.',
      link: '/join',
      color: '#f57b20'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: language === 'ua' ? 'Erasmus Days 2023' : 'Erasmus Days 2023',
      description: language === 'ua'
        ? 'Святкуємо дні програми Erasmus+ разом з усією Європою. Приєднуйтесь до подій!'
        : 'Celebrating Erasmus+ program days together with the whole of Europe. Join the events!',
      link: '/events',
      color: '#2e3192'
    }
  ];

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [bannerNews.length]);

  // --- ЛОГІКА СВАЙПУ ДЛЯ БАНЕРА ---
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
        // Свайп вліво - наступний слайд
        setCurrentSlide((prev) => (prev + 1) % bannerNews.length);
    }
    if (isRightSwipe) {
        // Свайп вправо - попередній слайд
        setCurrentSlide((prev) => (prev - 1 + bannerNews.length) % bannerNews.length);
    }
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

  // Функція для прокрутки слайдера
  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = isMobile ? 320 : 400; // Ширина прокрутки
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // --- СТИЛІ ---

  const getStyle = (baseStyle, mobileStyleOverride) => {
    return isMobile ? { ...baseStyle, ...mobileStyleOverride } : baseStyle;
  };

  const mobileStyles = {
    heroSectionStyle: {
        padding: '0',
        marginTop: '85px', // Фіксований відступ
        marginBottom: '0',
        width: '100%'
    },
    heroBannerStyle: {
        height: '550px',
        minHeight: '550px',
        width: '100%',
        borderRadius: '0',
        margin: '0',
        boxShadow: 'none'
    },
    slideContentStyle: {
        gridTemplateColumns: '1fr',
        gridTemplateRows: '60% 40%', 
        height: '100%' 
    },
    slideTextStyle: {
        padding: '1.5rem',
        alignItems: 'center',
        textAlign: 'center',
        height: '100%',
        justifyContent: 'flex-start',
        paddingTop: '1.5rem',
        background: 'linear-gradient(180deg, #2e3192 0%, #00aeef 100%)'
    },
    slideTitleStyle: {
        fontSize: '1.8rem', // Компактний заголовок слайда
        marginBottom: '0.5rem',
        lineHeight: '1.2'
    },
    contentGridStyle: {
        display: 'flex',
        flexDirection: 'column', // Вертикальне розташування
        gap: '2rem'
    },
    sectionStyle: {
        padding: '2rem 0' // Менші відступи на мобільному
    },
    sectionTitleStyle: {
        fontSize: '1.7rem', // Зменшено щоб помістилося в рядок "This is ESN Ukraine"
        padding: '0 1rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: '1rem'
    },
    sectionSubtitleStyle: {
        marginBottom: '2rem'
    },
    aboutImageStyle: {
        height: '250px', // Компактне фото
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
        width: '100%'
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

  // Hero Section
  const heroSectionStyle = {
    paddingTop: '4rem',    
    paddingBottom: '2rem', 
    width: '100%',
    background: '#f8f9fae2',
    marginTop: '85px', // Завжди 85px, щоб не прилипало
  };

  const heroBannerStyle = {
    position: 'relative',
    height: '60vh',
    minHeight: '450px',
    maxHeight: '550px',
    overflow: 'hidden',
    width: '94%', 
    maxWidth: '1400px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '0px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  };

  const sliderStyle = {
    display: 'flex',
    width: `${bannerNews.length * 100}%`, 
    height: '100%',
    transition: 'transform 0.8s ease',
    transform: `translateX(-${currentSlide * (100 / bannerNews.length)}%)`
  };

  const slideStyle = {
    width: `${100 / bannerNews.length}%`,
    height: '100%',
    position: 'relative'
  };

  const slideContentStyle = {
    display: 'grid',
    gridTemplateColumns: '60% 40%',
    height: '100%',
    width: '100%',
    alignItems: 'center'
  };

  const slideImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  const slideTextStyle = {
    background: 'linear-gradient(135deg, #2e3192 0%, #00aeef 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '3rem',
    color: '#ffffff',
    height: '100%',
    position: 'relative',
    zIndex: 2
  };

  const slideTitleStyle = {
    fontSize: '2.2rem',
    fontWeight: '800',
    marginBottom: '1.5rem',
    lineHeight: 1.1,
    fontFamily: 'Montserrat, sans-serif'
  };

  const slideDescriptionStyle = {
    fontSize: isMobile ? '1rem' : '1.1rem', 
    marginBottom: isMobile ? '1rem' : '2rem',
    opacity: 0.95,
    lineHeight: 1.4,
    fontFamily: 'Open Sans, sans-serif',
    maxWidth: isMobile ? '100%' : '450px',
    display: '-webkit-box',
    WebkitLineClamp: isMobile ? 3 : 'none',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  // Кнопка CTA
  const createCtaButtonStyle = (color) => ({
    background: '#ffffff',
    color: color,
    border: 'none',
    padding: '1rem 2rem', // однаковий паддінг для всіх кнопок
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '1rem', // однаковий розмір тексту
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    fontFamily: 'Montserrat, sans-serif',
    display: 'inline-block',
    width: isMobile ? '100%' : 'fit-content',
    textAlign: 'center',
    minWidth: '220px', // Фіксована мінімальна ширина
    marginTop: isMobile ? '1rem' : '0' // Відступ зверху на мобільному
  });

  // Крапочки для банера
  const dotsStyle = {
    position: 'absolute',
    top: isMobile ? '2rem' : '1.5rem', // На мобільному опускаємо нижче, щоб був відступ від хедера
    right: '1.5rem',  
    display: 'flex',
    gap: '0.8rem',
    zIndex: 10
  };

  const dotStyle = {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.4)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255,255,255,0.2)'
  };

  const activeDotStyle = {
    ...dotStyle,
    background: '#ffffff',
    transform: 'scale(1.2)',
    border: 'none'
  };

  const sectionStyle = {
    padding: '3.5rem 0',
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
  const joinTextStyle = { ...aboutTextStyle };
  
  // ШРИФТ ДЛЯ Join Us (Такий самий як This is ESN - 3rem на десктоп)
  const joinTitleStyle = {
    fontSize: isMobile ? '2rem' : '3rem', // Збільшено для десктопа
    fontWeight: '600',
    marginBottom: '1.5rem',
    fontFamily: 'Montserrat, sans-serif',
    color: '#f57b20'
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
    padding: '1rem 2rem',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif',
    transition: 'all 0.3s ease',
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

  // --- СТИЛІ ДЛЯ СЛАЙДЕРІВ ---
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

  // Красиві кнопки-стрілки для слайдера (SVG)
  const sliderNavButtonStyle = (color) => ({
    background: 'rgba(255, 255, 255, 0.9)',
    border: `2px solid ${color}`,
    color: color,
    width: '50px',
    height: '50px',
    borderRadius: '50%', // Круглі кнопки красивіші
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 10,
    backdropFilter: 'blur(5px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  });

  // SVG Стрілка для слайдера
  const ArrowIcon = ({ direction }) => (
     <svg 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
     >
        <path d="M9 18l6-6-6-6"/>
     </svg>
  );

  // --- КАРТКИ ---
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
    padding: '0.6rem 1.5rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontFamily: 'Montserrat, sans-serif',
    alignSelf: 'flex-end', 
    marginLeft: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    marginTop: 'auto',
    width: isMobile ? '100%' : 'fit-content'
  });

  const createViewAllButtonStyle = (color) => ({
    display: 'inline-block',
    background: color,
    color: '#ffffff',
    padding: '1rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    marginTop: '0', 
    fontSize: '1rem',
    fontFamily: 'Montserrat, sans-serif'
  });

  const scrollTopButtonStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '45px',
    height: '45px',
    background: '#6c757d',
    color: '#ffffff',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    display: showScrollTop ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    zIndex: 1000
  };

  return (
    <div style={{ width: '100%', margin: 0, padding: 0, overflowX: 'hidden', background: '#ffffff', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <section style={getStyle(heroSectionStyle, mobileStyles.heroSectionStyle)}>
        <div 
            style={getStyle(heroBannerStyle, mobileStyles.heroBannerStyle)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
          <div style={sliderStyle}>
            {bannerNews.map((slide, index) => {
              const SlideContent = () => (
                <div style={getStyle(slideContentStyle, mobileStyles.slideContentStyle)}>
                  <img src={slide.image} alt={slide.title} style={slideImageStyle} />
                  <div style={getStyle(slideTextStyle, mobileStyles.slideTextStyle)}>
                    <h1 style={getStyle(slideTitleStyle, mobileStyles.slideTitleStyle)} className="hero-title">{slide.title}</h1>
                    <p style={slideDescriptionStyle}>{slide.description}</p>
                    
                    {!isMobile && (
                      <Link 
                        to={slide.link} 
                        style={createCtaButtonStyle(slide.color)}
                        className="cta-button"
                        onMouseEnter={(e) => {
                          e.target.style.background = '#f8f9fa';
                          e.target.style.transform = 'translateY(-3px)';
                          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = '#ffffff';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                        }}
                      >
                        {language === 'ua' ? 'Детальніше' : 'Read More'}
                      </Link>
                    )}
                  </div>
                </div>
              );

              return (
                <div key={index} style={slideStyle}>
                  {isMobile ? (
                    <Link to={slide.link} style={{textDecoration: 'none', color: 'inherit', display: 'block', height: '100%'}}>
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
          <h2 style={getStyle(sectionTitleStyle, mobileStyles.sectionTitleStyle)} className="section-title">
            {language === 'ua' ? 'Це ESN Ukraine' : 'This is ESN Ukraine'}
          </h2>
          {/* Для мобільного: Текст -> Фото -> Кнопка */}
          <div style={{
              ...getStyle(aboutContentStyle, mobileStyles.contentGridStyle),
              display: isMobile ? 'flex' : 'grid',
              flexDirection: 'column' 
          }}>
            {/* Блок тексту */}
            <div style={aboutTextStyle}>
              <p style={aboutParagraphStyle}>
                {language === 'ua' 
                  ? 'Erasmus Student Network Ukraine — це студентська організація національного рівня, яка представляє місцеві секції Erasmus Student Network. Наразі ми маємо зростаючу мережу секцій у Києві, Чернівцях, Львові та Одесі.'
                  : 'Erasmus Student Network Ukraine is a national-level student organization that represents local Erasmus Student Network sections. At the moment, we have a growing network of sections in Kyiv, Chernivtsi, Lviv, and Odesa.'
                }
              </p>
              
              {/* На мобільному фото тут (між текстом і кнопкою) */}
              {isMobile && (
                 <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
                style={{
                  ...createCtaButtonStyle('#00aeef'),
                  background: '#00aeef',
                  color: '#ffffff',
                  alignSelf: isMobile ? 'stretch' : 'flex-start',
                  border: 'none',
                  width: isMobile ? '100%' : 'fit-content'
                }}
                className="cta-button"
                onMouseEnter={(e) => {
                  e.target.style.background = '#0099d6';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 174, 239, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#00aeef';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                }}
              >
                {language === 'ua' ? 'Дізнатися більше про нас' : 'Learn More About Us'}
              </button>
            </div>

            {/* На десктопі фото тут (збоку) */}
            {!isMobile && (
               <div>
                 <img 
                   src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
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
          {/* Для мобільного: Текст -> Фото -> Кнопка */}
          <div style={{
              ...getStyle(joinContentStyle, mobileStyles.contentGridStyle),
              display: isMobile ? 'flex' : 'grid',
              flexDirection: 'column'
          }}>
            {/* На десктопі фото зліва */}
            {!isMobile && (
               <div>
                 <img 
                   src="https://images.unsplash.com/photo-1559027615-cfa462850979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                   alt="Join ESN Ukraine" 
                   style={getStyle(joinImageStyle, mobileStyles.aboutImageStyle)}
                 />
               </div>
            )}

            <div style={joinTextStyle}>
              <h2 style={getStyle(joinTitleStyle, {fontSize: isMobile ? '2rem' : '3rem'})}>
                {language === 'ua' ? 'Приєднуйтесь до нас' : 'Join Us'}
              </h2>
              
              {/* На мобільному фото після заголовка перед текстом */}
              {isMobile && (
                  <img 
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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
                style={{
                  ...createCtaButtonStyle('#f57b20'),
                  background: '#f57b20',
                  color: '#ffffff',
                  alignSelf: isMobile ? 'stretch' : 'flex-start',
                  border: 'none',
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  width: isMobile ? '100%' : 'fit-content'
                }}
                className="cta-button"
                onMouseEnter={(e) => {
                  e.target.style.background = '#e06a10';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(245, 123, 32, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f57b20';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
                }}
              >
                {language === 'ua' ? 'Стати волонтером' : 'Become a Volunteer'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- РОЗДІЛЕНІ СЕКЦІЇ НОВИН ТА ПОДІЙ --- */}

      {/* 1. LATEST NEWS SECTION */}
      <section style={{ ...sectionStyle, background: '#ffffff' }}>
        <div style={containerStyle}>
          <div style={{
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'flex-end', 
              marginBottom: '2rem',
              flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div style={{width: '100%'}}>
              <h2 style={getStyle(sectionTitleStyle, mobileStyles.sectionTitleStyle)} className="section-title">
                {language === 'ua' ? 'Останні новини' : 'Latest News'}
              </h2>
              <p style={getStyle(
                  {...sectionSubtitleStyle, textAlign: 'left', margin: '0', paddingLeft: '1rem', marginBottom: '0'},
                  {...mobileStyles.sectionSubtitleStyle, paddingLeft: '1rem', textAlign: 'left'}
              )}>
                {language === 'ua' 
                  ? 'Дізнавайтеся першими про наші досягнення' 
                  : 'Be the first to know about our achievements'}
              </p>
            </div>
            
            {/* Кнопки навігації (Desktop) */}
            {!isMobile && (
              <div style={{display: 'flex', gap: '1rem', paddingRight: '1rem'}}>
                <button 
                  onClick={() => scrollSlider(newsSliderRef, 'left')} 
                  style={sliderNavButtonStyle('#7ac143')}
                  onMouseEnter={e => {e.target.style.background = '#7ac143'; e.target.style.color = '#fff'}}
                  onMouseLeave={e => {e.target.style.background = 'rgba(255,255,255,0.9)'; e.target.style.color = '#7ac143'}}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button 
                  onClick={() => scrollSlider(newsSliderRef, 'right')} 
                  style={sliderNavButtonStyle('#7ac143')}
                  onMouseEnter={e => {e.target.style.background = '#7ac143'; e.target.style.color = '#fff'}}
                  onMouseLeave={e => {e.target.style.background = 'rgba(255,255,255,0.9)'; e.target.style.color = '#7ac143'}}
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            )}
          </div>

          {/* Слайдер новин */}
          <div 
            ref={newsSliderRef} 
            style={{
                ...sliderTrackStyle, 
                padding: isMobile ? '0.5rem 0.5rem 1.5rem 0.5rem' : '1rem 0.5rem 2rem 0.5rem'
            }}
          >
            {latestNews.map(news => (
              <div key={news.id} style={getStyle(sliderCardWrapperStyle, mobileStyles.sliderCardWrapperStyle)}>
                <div 
                  style={createCardStyle(news.color)}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = `0 10px 25px ${news.color}50`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  <img src={news.image} alt={news.title} style={cardImageStyle} />
                  <div style={cardContentStyle}>
                    <div>
                      <span style={{...cardDateStyle, color: news.color}}>{news.date}</span>
                      <h4 style={cardTitleStyle}>{news.title}</h4>
                      <p style={cardTextStyle}>{news.excerpt}</p>
                    </div>
                    <Link 
                      to="/news" 
                      style={createReadMoreStyle(news.color)}
                      onMouseEnter={(e) => {
                        e.target.style.background = news.color;
                        e.target.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = news.color;
                      }}
                    >
                      {language === 'ua' ? 'Детальніше' : 'Read More'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Кнопки навігації (Мобільна версія - знизу по центру) */}
          {isMobile && (
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', marginBottom: '1.5rem'}}>
                <button 
                  onClick={() => scrollSlider(newsSliderRef, 'left')} 
                  style={sliderNavButtonStyle('#7ac143')}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button 
                  onClick={() => scrollSlider(newsSliderRef, 'right')} 
                  style={sliderNavButtonStyle('#7ac143')}
                >
                  <ArrowIcon direction="right" />
                </button>
            </div>
          )}

          <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <Link 
              to="/news" 
              style={createViewAllButtonStyle('#7ac143')}
              className="cta-button"
              onMouseEnter={(e) => {
                e.target.style.background = '#69a838';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(122, 193, 67, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#7ac143';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
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
              alignItems: isMobile ? 'flex-start' : 'flex-end', 
              marginBottom: '2rem',
              flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div style={{width: '100%'}}>
              <h2 style={getStyle(sectionTitleStyle, mobileStyles.sectionTitleStyle)} className="section-title">
                {language === 'ua' ? 'Майбутні події' : 'Upcoming Events'}
              </h2>
              <p style={getStyle(
                  {...sectionSubtitleStyle, textAlign: 'left', margin: '0', paddingLeft: '1rem', marginBottom: '0'},
                  {...mobileStyles.sectionSubtitleStyle, paddingLeft: '1rem', textAlign: 'left'}
              )}>
                {language === 'ua' 
                  ? 'Не пропустіть найцікавіше' 
                  : 'Do not miss the most interesting'}
              </p>
            </div>

             {/* Кнопки навігації (Desktop) */}
            {!isMobile && (
              <div style={{display: 'flex', gap: '1rem', paddingRight: '1rem'}}>
                <button 
                  onClick={() => scrollSlider(eventsSliderRef, 'left')} 
                  style={sliderNavButtonStyle('#ed008c')}
                  onMouseEnter={e => {e.target.style.background = '#ed008c'; e.target.style.color = '#fff'}}
                  onMouseLeave={e => {e.target.style.background = 'rgba(255,255,255,0.9)'; e.target.style.color = '#ed008c'}}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button 
                  onClick={() => scrollSlider(eventsSliderRef, 'right')} 
                  style={sliderNavButtonStyle('#ed008c')}
                  onMouseEnter={e => {e.target.style.background = '#ed008c'; e.target.style.color = '#fff'}}
                  onMouseLeave={e => {e.target.style.background = 'rgba(255,255,255,0.9)'; e.target.style.color = '#ed008c'}}
                >
                  <ArrowIcon direction="right" />
                </button>
              </div>
            )}
          </div>

          {/* Слайдер подій */}
          <div 
            ref={eventsSliderRef} 
            style={{
                ...sliderTrackStyle, 
                padding: isMobile ? '0.5rem 0.5rem 1.5rem 0.5rem' : '1rem 0.5rem 2rem 0.5rem'
            }}
          >
            {upcomingEvents.map(event => (
              <div key={event.id} style={getStyle(sliderCardWrapperStyle, mobileStyles.sliderCardWrapperStyle)}>
                <div 
                  style={createCardStyle(event.color)}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = `0 10px 25px ${event.color}50`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                    }
                  }}
                >
                  <img src={event.image} alt={event.title} style={cardImageStyle} />
                  <div style={cardContentStyle}>
                    <div>
                      <span style={{...cardDateStyle, color: event.color}}>{event.date}</span>
                      <h4 style={cardTitleStyle}>{event.title}</h4>
                      <p style={cardTextStyle}>{event.description}</p>
                    </div>
                    <Link 
                      to="/events" 
                      style={createReadMoreStyle(event.color)}
                      onMouseEnter={(e) => {
                        e.target.style.background = event.color;
                        e.target.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = event.color;
                      }}
                    >
                      {language === 'ua' ? 'Дізнатися більше' : 'Learn More'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Кнопки навігації (Мобільна версія - знизу по центру) */}
          {isMobile && (
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', marginBottom: '1.5rem'}}>
                <button 
                  onClick={() => scrollSlider(eventsSliderRef, 'left')} 
                  style={sliderNavButtonStyle('#ed008c')}
                >
                  <ArrowIcon direction="left" />
                </button>
                <button 
                  onClick={() => scrollSlider(eventsSliderRef, 'right')} 
                  style={sliderNavButtonStyle('#ed008c')}
                >
                  <ArrowIcon direction="right" />
                </button>
            </div>
          )}

          <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <Link 
              to="/events" 
              style={createViewAllButtonStyle('#ed008c')}
              className="cta-button"
              onMouseEnter={(e) => {
                e.target.style.background = '#d9007a';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(237, 0, 140, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ed008c';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#2e3192';
                  e.target.style.boxShadow = '0 5px 20px rgba(46, 49, 146, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                }}
              />
              <button 
                type="submit" 
                style={getStyle(subscribeButtonStyle, mobileStyles.subscribeButtonStyle)}
                onMouseEnter={(e) => {
                  e.target.style.background = '#ffffff';
                  e.target.style.color = '#1a1f6b';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                  e.target.style.color = '#2e3192';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
                }}
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

      {/* Кнопка скролу вгору */}
      <button 
        style={scrollTopButtonStyle} 
        onClick={scrollToTop}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
};

export default Home;