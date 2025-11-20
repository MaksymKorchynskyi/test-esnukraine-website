// About.js
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const About = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- СТИЛІ ---

  const sectionStyle = {
    padding: isMobile ? '4rem 1.5rem' : '6rem 2rem',
    background: '#ffffff',
    minHeight: '100vh',
    marginTop: '85px',
    fontFamily: 'Open Sans, sans-serif'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '4rem'
  };

  const sectionTitleStyle = {
    fontSize: isMobile ? '2.5rem' : '3rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#2e3192',
    fontFamily: 'Montserrat, sans-serif'
  };

  const sectionSubtitleStyle = {
    fontSize: '1.2rem',
    color: '#6c757d',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6'
  };

  // Стиль для блоків "Текст + Фото"
  const splitContentStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    gap: '3rem',
    marginBottom: '5rem'
  };

  // Для реверсивного блоку (Фото зліва, текст справа)
  const splitContentReverseStyle = {
    ...splitContentStyle,
    flexDirection: isMobile ? 'column' : 'row-reverse'
  };

  const textBlockStyle = {
    flex: 1,
  };

  const imageBlockStyle = {
    flex: 1,
    width: '100%'
  };

  const contentImageStyle = {
    width: '100%',
    height: isMobile ? '250px' : '400px', // Зменшується на мобільному
    objectFit: 'cover',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  };

  const contentHeadingStyle = {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
    color: '#2e3192',
    fontFamily: 'Montserrat, sans-serif'
  };

  const paragraphStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#495057',
    marginBottom: '1.5rem'
  };

  // Grid стилі
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '5rem'
  };

  const cardStyle = {
    background: '#f8f9fa',
    padding: '2rem',
    borderRadius: '12px',
    borderLeft: '4px solid #00aeef', // Блакитний акцент
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease'
  };

  const cardTitleStyle = {
    fontSize: '1.3rem',
    fontWeight: '600',
    color: '#2e3192',
    marginBottom: '1rem',
    fontFamily: 'Montserrat, sans-serif'
  };

  // Join Section
  const joinSectionStyle = {
    background: 'linear-gradient(135deg, #fff8f0 0%, #ffefe0 100%)',
    padding: isMobile ? '3rem 1.5rem' : '4rem',
    borderRadius: '20px',
    textAlign: 'center',
    marginTop: '2rem'
  };

  const joinButtonStyle = {
    background: '#f57b20',
    color: '#ffffff',
    border: 'none',
    padding: '1rem 2.5rem',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontFamily: 'Montserrat, sans-serif',
    marginTop: '1.5rem',
    boxShadow: '0 5px 15px rgba(245, 123, 32, 0.3)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={sectionStyle}>
      <div style={containerStyle}>
        
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={sectionTitleStyle}>
            {language === 'uk' ? 'Про нас' : 'About Us'}
          </h1>
          <p style={sectionSubtitleStyle}>
            {language === 'uk' 
              ? 'Дізнайтесь більше про ESN Ukraine та нашу місію об\'єднання студентів.' 
              : 'Learn more about ESN Ukraine and our mission of connecting students.'
            }
          </p>
        </div>

        {/* Section 1: Text Left, Image Right */}
        <div style={splitContentStyle}>
          <div style={textBlockStyle}>
            <h2 style={contentHeadingStyle}>
              {language === 'uk' ? 'Що таке ESN Ukraine?' : 'What is ESN Ukraine?'}
            </h2>
            <p style={paragraphStyle}>
              <strong>ESN Ukraine</strong> is a non-profit national-level student organization that represents local Erasmus Student Network sections. Our mission is to represent international students, providing opportunities for cultural understanding and self-development under the principle of <strong>Students Helping Students</strong>.
            </p>
            <p style={paragraphStyle}>
              We share information about opportunities provided by the Erasmus+ program and maintain a nation-wide alumni network. ESN Kyiv became an official member of Erasmus Student Network in 2019, but we trace our roots back to 2018. Since then, we have expanded to partner with multiple leading universities.
            </p>
          </div>
          <div style={imageBlockStyle}>
            {/* ФОТО 1 */}
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="ESN Ukraine Team Group" 
              style={contentImageStyle}
            />
          </div>
        </div>

        {/* Section 2: Image Left, Text Right (Reverse on Desktop) */}
        <div style={splitContentReverseStyle}>
          <div style={textBlockStyle}>
            <h2 style={contentHeadingStyle}>
              {language === 'uk' ? 'Наша спільнота' : 'Our Community'}
            </h2>
            <p style={paragraphStyle}>
              We are a dynamic community of dedicated members — students, recent graduates, and active volunteers who share a passion for international education and cultural exchange.
            </p>
            <p style={paragraphStyle}>
              Our team members are not just volunteers; they are <strong>change-makers</strong> who participate in international projects, lead youth initiatives, and constantly seek to create meaningful impact in their communities. We operate through a well-organized structure to support international students effectively.
            </p>
          </div>
          <div style={imageBlockStyle}>
            {/* ФОТО 2 */}
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Volunteers working together" 
              style={contentImageStyle}
            />
          </div>
        </div>

        {/* Departments Grid */}
        <div style={{marginBottom: '5rem'}}>
          <h3 style={{...contentHeadingStyle, textAlign: 'center', marginBottom: '3rem'}}>
            {language === 'uk' ? 'Наша структура' : 'Our Structure'}
          </h3>
          <div style={gridStyle}>
            <div style={cardStyle}>
              <h4 style={cardTitleStyle}>📢 Communication</h4>
              <p style={{...paragraphStyle, fontSize: '1rem', marginBottom: 0}}>
                Managing our digital presence, social media, and ensuring clear communication with our community.
              </p>
            </div>
            <div style={cardStyle}>
              <h4 style={cardTitleStyle}>🎉 Events</h4>
              <p style={{...paragraphStyle, fontSize: '1rem', marginBottom: 0}}>
                Creating unforgettable experiences through cultural, social, and educational activities for students.
              </p>
            </div>
            <div style={cardStyle}>
              <h4 style={cardTitleStyle}>🤝 Partnerships</h4>
              <p style={{...paragraphStyle, fontSize: '1rem', marginBottom: 0}}>
                Building strategic relationships with universities and organizations to expand our reach.
              </p>
            </div>
            <div style={cardStyle}>
              <h4 style={cardTitleStyle}>🎓 Education</h4>
              <p style={{...paragraphStyle, fontSize: '1rem', marginBottom: 0}}>
                Promoting Erasmus+ opportunities and developing educational projects for students.
              </p>
            </div>
          </div>
        </div>

        {/* Core Areas (What we do) */}
        <div style={{marginBottom: '5rem'}}>
          <h3 style={{...contentHeadingStyle, textAlign: 'center', marginBottom: '3rem'}}>
             {language === 'uk' ? 'Що ми робимо?' : 'What do we do?'}
          </h3>
          <div style={gridStyle}>
            <div style={{...cardStyle, borderLeft: 'none', borderTop: '4px solid #7ac143', background: '#fff', boxShadow: '0 5px 20px rgba(0,0,0,0.08)'}}>
              <h4 style={cardTitleStyle}>👥 Representation & Support</h4>
              <p style={{...paragraphStyle, fontSize: '1rem'}}>
                We serve as the voice and support system for international students, helping them navigate life in Ukraine while organizing activities focused on culture and inclusion.
              </p>
            </div>
            <div style={{...cardStyle, borderLeft: 'none', borderTop: '4px solid #7ac143', background: '#fff', boxShadow: '0 5px 20px rgba(0,0,0,0.08)'}}>
              <h4 style={cardTitleStyle}>🎓 Erasmus+ Promotion</h4>
              <p style={{...paragraphStyle, fontSize: '1rem'}}>
                Through our Erasmus Days and campus events, we bring the opportunities of the Erasmus+ program directly to students, providing guidance and inspiration.
              </p>
            </div>
            <div style={{...cardStyle, borderLeft: 'none', borderTop: '4px solid #7ac143', background: '#fff', boxShadow: '0 5px 20px rgba(0,0,0,0.08)'}}>
              <h4 style={cardTitleStyle}>🤝 Alumni Community</h4>
              <p style={{...paragraphStyle, fontSize: '1rem'}}>
                We foster a thriving alumni network that maintains the Erasmus spirit beyond the exchange period, creating lasting connections for personal growth.
              </p>
            </div>
          </div>
        </div>

        {/* Join CTA */}
        <div style={joinSectionStyle}>
          <h2 style={{...contentHeadingStyle, color: '#f57b20', marginBottom: '1rem'}}>
            {language === 'uk' ? 'Готові приєднатися?' : 'Ready to Join Our Community?'}
          </h2>
          <p style={{...paragraphStyle, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 1.5rem auto'}}>
            We open our doors to new volunteers twice a year. Stay connected with us on social media to be the first to know about our next recruitment wave!
          </p>
          <button 
            style={joinButtonStyle}
            onMouseEnter={(e) => e.target.style.background = '#e06a10'}
            onMouseLeave={(e) => e.target.style.background = '#f57b20'}
          >
            {language === 'uk' ? 'Стати волонтером' : 'Become a Volunteer'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default About;