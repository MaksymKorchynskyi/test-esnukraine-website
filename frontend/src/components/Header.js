// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Header = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSectionsDropdownOpen, setIsSectionsDropdownOpen] = useState(false);

  // --- СТИЛІ ---

  // Кольорова смуга ESN (Залишається без змін)
  const colorfulStripStyle = {
    background: 'repeating-linear-gradient(90deg, #00aeef, #00aeef 100px, #fff 0, #fff 100px, #ed008c 0, #ed008c 199px, #fff 0, #fff 200px, #7ac143 0, #7ac143 299px, #fff 0, #fff 300px, #f47b20 0, #f47b20 399px, #fff 0, #fff 400px, #2e3192 0, #2e3192 499px, #fff 0, #fff 500px)',
    height: '10px',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1002
  };

  const navbarStyle = {
    background: '#f8f9fa',
    padding: '0.75rem 0',
    position: 'fixed',
    top: '10px',
    width: '100%',
    zIndex: 1001,
    boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #e9ecef'
  };

  const containerStyle = {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  // Логотип
  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    flexShrink: 0,
    marginLeft: '2rem', 
    marginRight: 'auto' 
  };

  const navStyle = {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    marginRight: '2rem'
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#495057',
    fontWeight: '600',
    padding: '0.5rem 0',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    position: 'relative'
  };

  const headerActionsStyle = {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  };

  // --- ДИЗАЙН ПЕРЕМИКАЧА МОВИ (DESKTOP) ---
  const languageSwitcherStyle = {
    display: 'flex',
    background: '#e9ecef',
    borderRadius: '50px',
    padding: '4px',
    border: 'none',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)'
  };

  const languageButtonStyle = {
    padding: '6px 18px',
    border: 'none',
    borderRadius: '50px',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '0.85rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: '#6c757d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const activeLanguageStyle = {
    background: '#ffffff',
    color: '#0d6efd', // ESN Blue
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transform: 'scale(1.05)'
  };

  // --- ВИПАДАЮЧЕ МЕНЮ (DESKTOP) ---
  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const dropdownContentStyle = {
    display: isSectionsDropdownOpen ? 'block' : 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    background: '#ffffff',
    minWidth: '220px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
    borderRadius: '8px',
    padding: '0.5rem 0',
    zIndex: 1000,
    border: '1px solid #f1f1f1',
    marginTop: '10px'
  };

  const dropdownLinkStyle = {
    display: 'block',
    padding: '0.8rem 1.5rem',
    textDecoration: 'none',
    color: '#495057',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    borderBottom: '1px solid #f8f9fa'
  };

  const dropdownToggleStyle = {
    ...navLinkStyle,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  };

  const dropdownIconStyle = {
    fontSize: '0.7rem',
    marginLeft: '0.25rem',
    transition: 'transform 0.3s ease',
    transform: isSectionsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
  };

  // --- МОБІЛЬНЕ МЕНЮ ---

  const mobileMenuButtonStyle = {
    display: 'none',
    background: 'transparent',
    border: 'none',
    fontSize: '2.5rem', // Великий розмір для зручності
    cursor: 'pointer',
    color: '#212529',
    padding: '0.25rem',
    zIndex: 1100,
    lineHeight: 1,
    WebkitTapHighlightColor: 'transparent',
    outline: 'none'
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    background: '#f8f9fa', // ЗМІНЕНО: Фон тепер такий самий як у хедера (#f8f9fa)
    zIndex: 2000,
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    overflowY: 'auto'
  };

  // Внутрішній хедер мобільного меню
  const mobileHeaderBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    borderBottom: '1px solid #e9ecef',
    background: '#f8f9fa', // ЗМІНЕНО: Фон хедера меню
    marginTop: '10px',
    minHeight: '85px'
  };

  const closeButtonStyle = {
    background: 'transparent',
    border: 'none',
    fontSize: '2.5rem',
    fontWeight: '300',
    color: '#212529',
    cursor: 'pointer',
    lineHeight: 0.7,
    WebkitTapHighlightColor: 'transparent'
  };

  const mobileContentContainerStyle = {
    padding: '0',
    display: 'flex',
    flexDirection: 'column'
  };

  const mobileNavLinkStyle = {
    textDecoration: 'none',
    color: '#212529',
    fontWeight: '600',
    fontSize: '1.1rem',
    padding: '1.2rem 1.5rem',
    borderBottom: '1px solid #e9ecef',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f8f9fa', // ЗМІНЕНО: Фон посилань
    transition: 'background 0.2s'
  };

  const mobileAccordionStyle = {
    background: '#f1f3f5', // Трохи темніший для контрасту вкладеного меню
    overflow: 'hidden',
    borderBottom: '1px solid #e9ecef'
  };

  const mobileDropdownItemStyle = {
    display: 'block',
    padding: '1rem 1.5rem 1rem 2.5rem',
    textDecoration: 'none',
    color: '#495057',
    fontSize: '1rem',
    borderBottom: '1px solid #e9ecef',
    transition: 'color 0.2s'
  };

  // --- СТИЛІ ДЛЯ МОВНОГО ПЕРЕМИКАЧА (МОБІЛЬНИЙ) ---
  const mobileLanguageContainerStyle = {
    padding: '2rem 1.5rem',
    marginTop: 'auto',
    background: '#f8f9fa', // Фон контейнера
    borderTop: '1px solid #e9ecef'
  };

  const mobileLangButtonsWrapper = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between'
  };

  const mobileLangBtnStyle = {
    flex: 1,
    padding: '12px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
  };

  // --- МЕДІА ЗАПИТИ ---
  const mobileStyles = `
    @media (max-width: 900px) {
      .desktop-nav { display: none !important; }
      .header-actions { display: none !important; }
      .mobile-menu-button { display: block !important; }
      .logo-container { 
        margin-left: 0.5rem !important;
      }
      .container-mobile {
        padding: 0 0.5rem !important;
      }
    }
    
    @media (min-width: 901px) {
      .mobile-menu-button { display: none !important; }
      .mobile-menu { display: none !important; }
    }
  `;

  const handleSectionsClick = () => {
    setIsSectionsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style>{mobileStyles}</style>
      
      {/* Кольорова смуга */}
      <div style={colorfulStripStyle} className="colorful-strip" />
      
      <header style={navbarStyle}>
        <div style={containerStyle} className="container-mobile">
          <Link to="/" style={logoStyle} className="logo-container">
            <img 
              src={process.env.PUBLIC_URL + '/images/logo_esn_ukraine_main.png'} alt="Logo"
              style={{ 
                height: '71px', 
                width: 'auto',
                maxWidth: '230px',
                objectFit: 'contain'
              }} 
              onError={(e) => {
                console.error('Помилка завантаження логотипу:', e.target.src);
                e.target.src = 'https://via.placeholder.com/220x70?text=ESN+Ukraine';
              }}
            />
          </Link>
          
          {/* === DESKTOP NAVIGATION === */}
          <nav style={navStyle} className="desktop-nav">
            <Link 
              to="/" 
              style={navLinkStyle}
              onMouseEnter={(e) => { e.target.style.color = '#0d6efd'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.color = '#495057'; e.target.style.transform = 'translateY(0)'; }}
            >
              {t('home')}
            </Link>
            <Link 
              to="/about" 
              style={navLinkStyle}
              onMouseEnter={(e) => { e.target.style.color = '#0d6efd'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.color = '#495057'; e.target.style.transform = 'translateY(0)'; }}
            >
              {t('about')}
            </Link>
            
            {/* Секції з випадаючим меню */}
            <div 
              style={dropdownStyle}
              onMouseEnter={() => setIsSectionsDropdownOpen(true)}
              onMouseLeave={() => setIsSectionsDropdownOpen(false)}
            >
              <Link
                to="/sections"
                style={dropdownToggleStyle}
                onMouseEnter={(e) => { e.target.style.color = '#0d6efd'; e.target.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.target.style.color = '#495057'; e.target.style.transform = 'translateY(0)'; }}
              >
                {t('sections')}
                <span style={dropdownIconStyle}>▼</span>
              </Link>
              <div style={dropdownContentStyle}>
                <Link 
                  to="/sections/kyiv" 
                  style={dropdownLinkStyle}
                  onMouseEnter={(e) => { e.target.style.background = '#f8f9fa'; e.target.style.color = '#0d6efd'; }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#495057'; }}
                  onClick={handleSectionsClick}
                >
                  {language === 'uk' ? 'ESN Kyiv' : 'ESN Kyiv'}
                </Link>
                <Link 
                  to="/sections/lviv" 
                  style={dropdownLinkStyle}
                  onMouseEnter={(e) => { e.target.style.background = '#f8f9fa'; e.target.style.color = '#0d6efd'; }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#495057'; }}
                  onClick={handleSectionsClick}
                >
                  {language === 'uk' ? 'ESN Lviv' : 'ESN Lviv'}
                </Link>
                <Link 
                  to="/sections/chernivtsi" 
                  style={dropdownLinkStyle}
                  onMouseEnter={(e) => { e.target.style.background = '#f8f9fa'; e.target.style.color = '#0d6efd'; }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#495057'; }}
                  onClick={handleSectionsClick}
                >
                  {language === 'uk' ? 'ESN Chernivtsi' : 'ESN Chernivtsi'}
                </Link>
                <Link 
                  to="/sections/odesa" 
                  style={dropdownLinkStyle}
                  onMouseEnter={(e) => { e.target.style.background = '#f8f9fa'; e.target.style.color = '#0d6efd'; }}
                  onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#495057'; }}
                  onClick={handleSectionsClick}
                >
                  {language === 'uk' ? 'ESN Odesa' : 'ESN Odesa'}
                </Link>
              </div>
            </div>

            <Link 
              to="/news" 
              style={navLinkStyle}
              onMouseEnter={(e) => { e.target.style.color = '#0d6efd'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.color = '#495057'; e.target.style.transform = 'translateY(0)'; }}
            >
              {t('news')}
            </Link>
            <Link 
              to="/events" 
              style={navLinkStyle}
              onMouseEnter={(e) => { e.target.style.color = '#0d6efd'; e.target.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.target.style.color = '#495057'; e.target.style.transform = 'translateY(0)'; }}
            >
              {t('events')}
            </Link>
          </nav>

          {/* === DESKTOP ACTIONS === */}
          <div style={headerActionsStyle} className="header-actions">
            <div style={languageSwitcherStyle}>
              <button 
                style={{
                  ...languageButtonStyle,
                  ...(language === 'ua' ? activeLanguageStyle : {})
                }}
                onClick={() => changeLanguage('ua')}
              >
                UA
              </button>
              <button 
                style={{
                  ...languageButtonStyle,
                  ...(language === 'en' ? activeLanguageStyle : {})
                }}
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
            </div>
          </div>

          {/* Кнопка мобільного меню (SVG Гамбургер) */}
          <button 
            style={mobileMenuButtonStyle}
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* === MOBILE MENU === */}
        <div style={mobileMenuStyle} className="mobile-menu">
          
          {/* Внутрішній Хедер мобільного меню */}
          <div style={mobileHeaderBarStyle}>
             {/* Логотип ТЕПЕР КЛІКАБЕЛЬНИЙ: Переводить на головну і закриває меню */}
             <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ display: 'flex', alignItems: 'center' }}
             >
               <img 
                 src="/images/logo_esn_ukraine_main.png" 
                 style={{ height: '71px', width: 'auto' }} 
                 alt="ESN Ukraine" 
               />
             </Link>
             <button style={closeButtonStyle} onClick={() => setIsMobileMenuOpen(false)}>
               ✕
             </button>
          </div>

          {/* Список посилань */}
          <div style={mobileContentContainerStyle}>
            <Link 
              to="/" 
              style={mobileNavLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            
            <Link 
              to="/about" 
              style={mobileNavLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>
            
            {/* Випадаюче меню (Акордеон) */}
            <div>
              <div
                style={{
                    ...mobileNavLinkStyle, 
                    cursor: 'pointer',
                    color: isSectionsDropdownOpen ? '#0d6efd' : '#212529'
                }}
                onClick={() => setIsSectionsDropdownOpen(!isSectionsDropdownOpen)}
              >
                {t('sections')}
                <span style={{
                    fontSize: '0.8rem', 
                    transform: isSectionsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s'
                }}>▼</span>
              </div>
              
              {isSectionsDropdownOpen && (
                <div style={mobileAccordionStyle}>
                  {/* Всі секції */}
                  <Link 
                    to="/sections" 
                    style={{...mobileDropdownItemStyle, fontWeight: '700', color: '#2e3192'}}
                    onClick={() => { setIsMobileMenuOpen(false); setIsSectionsDropdownOpen(false); }}
                  >
                    {language === 'ua' ? 'Всі секції' : 'All Sections'}
                  </Link>
                  
                  <Link 
                    to="/sections/kyiv" 
                    style={mobileDropdownItemStyle}
                    onClick={() => { setIsMobileMenuOpen(false); setIsSectionsDropdownOpen(false); }}
                  >
                    {language === 'ua' ? 'ESN Kyiv' : 'ESN Kyiv'}
                  </Link>
                  <Link 
                    to="/sections/lviv" 
                    style={mobileDropdownItemStyle}
                    onClick={() => { setIsMobileMenuOpen(false); setIsSectionsDropdownOpen(false); }}
                  >
                    {language === 'ua' ? 'ESN Lviv' : 'ESN Lviv'}
                  </Link>
                  <Link 
                    to="/sections/chernivtsi" 
                    style={mobileDropdownItemStyle}
                    onClick={() => { setIsMobileMenuOpen(false); setIsSectionsDropdownOpen(false); }}
                  >
                    {language === 'ua' ? 'ESN Chernivtsi' : 'ESN Chernivtsi'}
                  </Link>
                  <Link 
                    to="/sections/odesa" 
                    style={mobileDropdownItemStyle}
                    onClick={() => { setIsMobileMenuOpen(false); setIsSectionsDropdownOpen(false); }}
                  >
                    {language === 'ua' ? 'ESN Odesa' : 'ESN Odesa'}
                  </Link>
                </div>
              )}
            </div>

            <Link 
              to="/news" 
              style={mobileNavLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('news')}
            </Link>
            
            <Link 
              to="/events" 
              style={mobileNavLinkStyle}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('events')}
            </Link>
          </div>

          {/* Гарний перемикач мови (Мобільний - Без прапорців) */}
          <div style={mobileLanguageContainerStyle}>
            <p style={{marginBottom: '1rem', color: '#6c757d', fontSize: '0.9rem', fontWeight: '600'}}>
                Language / Мова
            </p>
            <div style={mobileLangButtonsWrapper}>
              <button 
                style={{
                  ...mobileLangBtnStyle,
                  // Активна: Темно-синій фон (#2e3192)
                  background: language === 'ua' ? '#2e3192' : '#ffffff',
                  color: language === 'ua' ? '#ffffff' : '#495057',
                  border: language === 'ua' ? 'none' : '1px solid #dee2e6',
                  transform: language === 'ua' ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: language === 'ua' ? '0 4px 10px rgba(46, 49, 146, 0.4)' : '0 2px 5px rgba(0,0,0,0.05)'
                }}
                onClick={() => changeLanguage('ua')}
              >
                Українська
              </button>
              <button 
                style={{
                  ...mobileLangBtnStyle,
                  // Активна: Темно-синій фон (#2e3192)
                  background: language === 'en' ? '#2e3192' : '#ffffff',
                  color: language === 'en' ? '#ffffff' : '#495057',
                  border: language === 'en' ? 'none' : '1px solid #dee2e6',
                  transform: language === 'en' ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: language === 'en' ? '0 4px 10px rgba(46, 49, 146, 0.4)' : '0 2px 5px rgba(0,0,0,0.05)'
                }}
                onClick={() => changeLanguage('en')}
              >
                English
              </button>
            </div>
          </div>

        </div>
      </header>
    </>
  );
};

export default Header;