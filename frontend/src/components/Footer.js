import React from 'react';
import { useLanguage } from '../LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const footerStyle = {
    background: '#333',
    color: '#ffffff',
    padding: '2rem 0 0',
    width: '100%',
    fontFamily: 'Open Sans, sans-serif'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const footerContentStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const footerSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1.3rem',
    fontFamily: 'Montserrat, sans-serif'
  };

  const logoIconStyle = {
    width: '35px',
    height: '35px',
    background: '#ffffff',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '0.8rem'
  };

  const headingStyle = {
    color: '#ffffff',
    marginBottom: '0.8rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    fontFamily: 'Montserrat, sans-serif'
  };

  const textStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.5,
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif'
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '1rem'
  };

  const socialLinkStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif'
  };

  const footerBottomStyle = {
    textAlign: 'center',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '22px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.8rem',
    fontFamily: 'Open Sans, sans-serif'
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    marginBottom: '0.3rem',
    display: 'block',
    fontSize: '0.9rem',
    fontFamily: 'Open Sans, sans-serif'
  };

  // Новий нижній блок з темнішим фоном
  const bottomBarStyle = {
    background: '#222222ff',
    color: '#ffffff',
    fontSize: '12px',
    lineHeight: '16px',
    padding: '0.8rem 0',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'Open Sans, sans-serif'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={footerContentStyle}>
          <div style={footerSectionStyle}>
            <div style={logoStyle}>
              <div style={logoIconStyle}>ESN</div>
              <span>Ukraine</span>
            </div>
            <p style={textStyle}>
              Erasmus Student Network Ukraine - connecting international students, 
              creating unforgettable experiences, and building bridges between cultures.
            </p>
            <div style={socialLinksStyle}>
              <a 
                href="#" 
                style={socialLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Facebook
              </a>
              <a 
                href="#" 
                style={socialLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Instagram
              </a>
              <a 
                href="#" 
                style={socialLinkStyle}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Telegram
              </a>
            </div>
          </div>
          
          <div style={footerSectionStyle}>
            <h3 style={headingStyle}>{t('contact')}</h3>
            <p style={textStyle}>📧 info@esn-ukraine.org</p>
            <p style={textStyle}>📞 +380 12 345 6789</p>
            <p style={textStyle}>📍 Kyiv, Ukraine</p>
          </div>
          
          <div style={footerSectionStyle}>
            <h3 style={headingStyle}>Quick Links</h3>
            <a 
              href="/about" 
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              About ESN Ukraine
            </a>
            <a 
              href="/events" 
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Upcoming Events
            </a>
            <a 
              href="/news" 
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Latest News
            </a>
            <a 
              href="/sections" 
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateX(0)';
              }}
            >
              Our Sections
            </a>
          </div>
        </div>
        <div style={footerBottomStyle}>
          <p>&copy; 2024 Erasmus Student Network Ukraine. All rights reserved.</p>
        </div>
      </div>
      
      {/* Новий нижній блок */}
      <div style={bottomBarStyle}>
        <div style={containerStyle}>
          Created by Webmaster ESN Ukraine
        </div>
      </div>
    </footer>
  );
};

export default Footer;