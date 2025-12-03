import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';

const VoicesOfCourage = () => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  
  // Стан для ефекту мишки (GALLERY)
  const [galleryMousePos, setGalleryMousePos] = useState({ x: 0, y: 0 });
  const galleryRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGalleryMouseMove = (e) => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      setGalleryMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  // --- ТЕКСТОВИЙ КОНТЕНТ (ПОВНИЙ) ---
  const textContent = {
     ua: {
        title: "Voices of Courage: 20 студентів, 20 історій, одне бачення",
        p1: "У час, коли голоси мають бути почуті, проєкт Voices of Courage від ESN Ukraine постає як свідчення стійкості, мрій та рішучості. Voices of Courage — це проєкт ESN Ukraine, який дає простір 20 українським студентам розповісти свої історії — про втрати, стійкість, адаптацію та надію. Кожен студент розмірковує про те, як війна вплинула на його освіту та життя, а також про сміливість, необхідну для руху вперед.",
        p2: "Війна, вимушене переселення, зруйновані життя — це не просто заголовки новин. Це реальність, якою живуть тисячі молодих українців. За допомогою Voices of Courage ESN Ukraine прагнула надати платформу тим, чиї історії часто залишаються прихованими: студентам, які долають конфлікт, балансують між освітою та виживанням, бачать загрозу своєму майбутньому, але відмовляються здаватися.",
        p3: "Кожна історія — це нитка в ширшому полотні: 20 різних доль, кожну з яких зачепила війна, але кожна несе власні надії, боротьбу та мрії. Разом вони ілюструють, як стійкість живе у повсякденних діях — поданні заявки на стипендію, продовженні дистанційного навчання, допомозі родині чи просто вмінні триматися за надію.",
        p4: "Учасники походять із різних регіонів, мають різний досвід та спеціальності. Декому довелося переїжджати кілька разів. Хтось навчався за кордоном і повернувся, щоб підтримати свої громади. Хтось поєднував підробіток з онлайн-лекціями. Інші волонтерили, допомагали в гуманітарних місіях або ставали менторами для молодших колег.",
        leadIn: "Кожного студента опитали, сфотографували та дали простір для рефлексії. З’явилися історії про:",
        list: [
            { t: "Жертовність", d: "відмову від звичних умов, рідних домівок або обраного напрямку навчання заради адаптації до умов війни." },
            { t: "Адаптацію", d: "пошук нових шляхів для здобуття освіти — часто онлайн або в нових містах." },
            { t: "Солідарність", d: "створення студентських спільнот підтримки, спільне житло, обмін ресурсами та моральна підтримка." },
            { t: "Бачення", d: "попри хаос, багато хто сміливо говорить про свої плани — відновлення локальних громад, модернізацію освіти, або роботу в секторі R&D для допомоги у відновленні України." }
        ],
        highlightIntro: "В одному з дописів на Instagram-сторінці ESN Ukraine зазначено:",
        quote: "“Пам’ять про Семена назавжди залишиться прикладом боротьби його Батьківщини, слугуючи свідченням сміливості українських студентів.”",
        underscoring: "Це підкреслює прагнення проєкту увічнити як особисті, так і колективні прояви сміливості.",
        explore: "Ви можете ознайомитися з усіма 20 історіями в нашому Instagram:",
        grateful: "Ми глибоко вдячні 20 відважним студентам, які довірили нам свої історії. Ваш досвід збагачує наше колективне розуміння та дає поштовх до змін.",
        readers: "До наших читачів: читайте, діліться, розмірковуйте. Нехай ці історії спонукають до розмови, емпатії та дій. А якщо ви студент, який хоче поділитися своїм голосом — зв’яжіться з ESN Ukraine. Станьте частиною Voices of Courage.",
        final: "Разом ми вплітаємо нитки надії у полотно, міцніше за будь-які труднощі."
     },
     en: {
        title: "Voices of Courage: 20 Students, 20 Stories, One Vision",
        p1: "In a time when voices must be heard, the Voices of Courage project by ESN Ukraine steps forward as a testament to resilience, dreams, and determination. Voices of Courage is a project by ESN Ukraine that gives space to 20 Ukrainian students to share their journeys — stories of loss, resilience, adaptation, and hope. Each student reflects on how the war has affected their education and life, but also on the courage it takes to keep moving forward.",
        p2: "War, displacement, disrupted lives — these are not just headlines. They are realities lived by thousands of young Ukrainians. With Voices of Courage, ESN Ukraine wanted to give a platform to those whose stories are often hidden: students navigating conflict, balancing education with survival, seeing their futures threatened but refusing to surrender.",
        p3: "Each story is a thread in a broader tapestry: 20 diverse lives, each touched by war, yet each bearing its own hopes, struggles, and dreams. Together, they illustrate how resilience lives in everyday acts — applying for a scholarship, continuing remote studies, helping family, or simply holding onto hope.",
        p4: "The participants come from various regions, backgrounds, and disciplines. Some had to relocate multiple times. Some studied abroad and returned to support their communities. Some juggled part-time jobs with online lectures. Others volunteered, assisted in humanitarian aid, or became mentors for younger peers.",
        leadIn: "Each student was interviewed, photographed, and given space to reflect. What emerged were stories of:",
        list: [
            { t: "Sacrifice", d: "giving up comforts, family homes, or courses of study to adapt to war." },
            { t: "Adaptation", d: "learning new ways to access education, often through online platforms or in new cities." },
            { t: "Solidarity", d: "forming support networks among students, sharing housing, resources, or emotional support." },
            { t: "Vision", d: "despite the chaos, many voice bold plans — rebuilding local communities, promoting educational reform, or working in research & development sectors to help Ukraine’s recovery." }
        ],
        highlightIntro: "One highlight post from ESN Ukraine’s Instagram page states:",
        quote: "“Semen’s memory will forever be an example of the struggles of his homeland, serving as a testament to the courage of the Ukrainian students.”",
        underscoring: "This underscores how the project wants to memorialize both the personal and collective acts of courage.",
        explore: "You can explore all 20 stories on our Instagram:",
        grateful: "We are deeply grateful to the 20 brave students who trusted us with their stories. Your experiences enrich our collective understanding and fuel the momentum for change.",
        readers: "To our readers: read, share, reflect. Let these stories stir conversation, empathy, and action. And if you’re a student who wishes to share your voice — contact ESN Ukraine. Be part of Voices of Courage.",
        final: "Together, we sew threads of hope into a tapestry stronger than adversity."
     }
  };

  const tContent = language === 'ua' ? textContent.ua : textContent.en;

  // --- ДАНІ ГАЛЕРЕЇ ---
  const stories = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: language === 'ua' ? `Історія #${i + 1}` : `Story #${i + 1}`,
    university: language === 'ua' ? 'Університет...' : 'University...',
    image: `https://source.unsplash.com/random/600x600?portrait&sig=${i}`, 
    fullText: tContent.p1 
  }));

  // --- СТИЛІ ТA АНІМАЦІЇ ---
  const globalStyles = `
    /* Анімація бліку на картках */
    @keyframes cardSheen {
      0%, 79% { left: -100%; opacity: 0; }
      80% { left: -100%; opacity: 0.3; }
      100% { left: 200%; opacity: 0; }
    }

    /* Анімація модального вікна */
    @keyframes modalEnter {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    /* АНІМАЦІЇ ДЛЯ HERO */
    @keyframes zoomBackground {
      0% { transform: scale(1); }
      100% { transform: scale(1.1); }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hero-animate-text {
      animation: fadeInUp 1s ease-out forwards;
      opacity: 0;
    }

    .hero-animate-sub {
      animation: fadeInUp 1s ease-out 0.3s forwards;
      opacity: 0;
    }

    /* ТИПОГРАФІКА КОНТЕНТУ */
    .story-text {
      font-size: ${isMobile ? '1rem' : '1.15rem'}; 
      line-height: ${isMobile ? '1.6' : '1.8'};
      color: #212529;
      margin-bottom: 1.5rem;
      text-align: left;
    }

    .highlight-text {
      font-weight: 800;
      color: #000;
    }

    /* Галерея: Картки */
    .gallery-card {
      position: relative;
      overflow: hidden;
      display: block;
      transition: transform 0.3s ease;
      z-index: 2; 
    }
    
    .gallery-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
      transform: skewX(-25deg);
      animation: cardSheen 5s infinite;
      pointer-events: none;
    }
    
    .gallery-card:hover::after {
      animation: none;
    }

    @media (max-width: 900px) {
      .hero-title-main, .hero-title-sub { font-size: 2.8rem !important; }
      .modal-layout { flex-direction: column !important; }
      .modal-image-col { width: 100% !important; height: 300px !important; }
    }
  `;

  // --- Основні стилі ---
  const pageStyle = {
    paddingTop: '85px',
    background: '#ffffff',
    minHeight: '100vh',
    fontFamily: 'Open Sans, sans-serif',
    overflowX: 'hidden'
  };

  const containerStyle = {
    maxWidth: '1200px', // Повернув стандартну ширину
    margin: '0 auto',
    padding: isMobile ? '0 1.25rem' : '0 1.5rem',
    position: 'relative'
  };

  // --- HERO SECTION ---
  const heroContainerStyle = {
    position: 'relative',
    height: isMobile ? '380px' : '70vh', 
    minHeight: isMobile ? 'auto' : '500px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#fff',
    textAlign: 'center',
    padding: '2rem'
  };

  const heroBackgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/voices_bg2.jpg'})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    animation: 'zoomBackground 20s alternate infinite ease-in-out',
    zIndex: 0
  };

  const heroOverlayStyle = {
    position: 'absolute',
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
    zIndex: 1
  };

  const heroContentStyle = {
    zIndex: 2,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: isMobile ? '1rem' : '0'
  };

  const createMouseGlow = (x, y, color = 'rgba(255, 255, 255, 0.15)') => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: `radial-gradient(600px circle at ${x}px ${y}px, ${color}, transparent 40%)`,
    zIndex: 1
  });

  const titleWordStyle = (color) => ({
    fontSize: isMobile ? '3rem' : '6rem', 
    fontWeight: '900',
    fontFamily: 'Montserrat, sans-serif',
    letterSpacing: isMobile ? '-1px' : '-2px',
    color: color,
    textTransform: 'uppercase',
    lineHeight: 0.9,
    display: 'block'
  });

  // --- СТИЛІ ФОТО ---
  const sideImageStyle = (floatSide) => ({
    // DESKTOP: float ввімкнено. MOBILE: float вимкнено.
    float: isMobile ? 'none' : floatSide,
    
    // DESKTOP: 400px. MOBILE: 100% (ПОВЕРНУТО ДО ЗВИЧНОГО)
    width: isMobile ? '100%' : '400px', 
    height: 'auto', // Щоб не обрізалося
    
    // ВІДСТУПИ
    margin: isMobile 
      ? '2rem 0' // Звичайний відступ для мобільного
      : (floatSide === 'right' ? '0 0 1.5rem 2rem' : '0 2rem 1.5rem 0'),
    
    // СТИЛЬ
    borderRadius: '0', // Гострі кути
    boxShadow: 'none', 
    background: '#f0f0f0',
    display: 'block',
    objectFit: 'contain' // Гарантує повну видимість
  });

  // --- ГАЛЕРЕЯ ---
  const gallerySectionStyle = {
    background: '#050505',
    padding: '6rem 0',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden' 
  };

  const galleryGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
    gap: '4px',
    maxWidth: '1400px', 
    margin: '0 auto',
    padding: isMobile ? '0 4px' : '0 20px',
    position: 'relative',
    zIndex: 2 
  };

  const photoButtonStyle = {
    aspectRatio: '1/1',
    position: 'relative',
    cursor: 'pointer',
    background: '#000',
    border: 'none',
    padding: 0,
    outline: 'none',
    transition: 'transform 0.3s ease, z-index 0s',
    width: '100%', 
    display: 'block'
  };

  // --- МОБІЛЬНЕ ВІКНО ---
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.9)', 
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '1rem' : '3rem',
    animation: 'fadeIn 0.2s ease-out'
  };

  const modalContainerStyle = {
    background: '#fff',
    width: '100%',
    maxWidth: '1200px',
    height: isMobile ? '90vh' : '80vh',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    boxShadow: '0 0 50px rgba(0,0,0,0.8)',
    animation: 'modalEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    overflow: 'hidden',
    position: 'relative'
  };

  return (
    <div style={pageStyle}>
      <style>{globalStyles}</style>

      {/* 1. HERO SECTION */}
      <div style={heroContainerStyle}>
        <div style={heroBackgroundStyle}></div>
        <div style={heroOverlayStyle}></div>

        <div style={heroContentStyle}>
          <div style={{textShadow: '0 10px 30px rgba(0,0,0,0.6)'}}>
            <span className="hero-title-main hero-animate-text" style={titleWordStyle('#00aeef')}>
              VOICES OF
            </span>
            <span className="hero-title-sub hero-animate-text" style={{...titleWordStyle('#ffdc00'), animationDelay: '0.2s'}}>
              COURAGE
            </span>
          </div>
          
          <p className="hero-animate-sub" style={{
              marginTop: isMobile ? '1rem' : '2rem', 
              fontSize: isMobile ? '1rem' : '1.5rem', 
              fontWeight: '400', 
              color: 'rgba(255,255,255,0.95)',
              maxWidth: '700px',
              lineHeight: 1.6,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              fontFamily: 'Montserrat, sans-serif'
          }}>
            {language === 'ua' ? '20 студентів, 20 історій, одне бачення' : '20 Students, 20 Stories, One Vision'}
          </p>
        </div>
      </div>

      {/* 2. MAIN TEXT CONTENT */}
      <div style={{padding: isMobile ? '3rem 0' : '5rem 0', background: '#fff', color: '#000'}}>
        <div style={containerStyle}>
          
          {/* === БЛОК 1 === */}
          {/* ЗМЕНШЕНО ВІДСТУП ЗНИЗУ ДЛЯ ЗБЛИЖЕННЯ З НАСТУПНИМ БЛОКОМ (2rem/1.5rem замість 3rem) */}
          <div style={{overflow: 'hidden', marginBottom: isMobile ? '1.5rem' : '2rem'}}>
             
             {/* DESKTOP ВЕРСІЯ (Float Right) */}
             {!isMobile && (
                 <img 
                   src={process.env.PUBLIC_URL + '/images/voices_hero.png'} 
                   alt="Students Collage" 
                   className="side-image"
                   style={sideImageStyle('right')}
                   onError={(e) => { e.target.style.background = '#ccc'; }} 
                 />
             )}

             <div className="text-content">
                <h2 style={{
                    fontSize: isMobile ? '1.8rem' : '2.5rem', 
                    fontFamily: 'Montserrat, sans-serif', 
                    marginBottom: '1.5rem', 
                    fontWeight: '800',
                    lineHeight: 1.2
                }}>
                  {tContent.title}
                </h2>
                
                <p className="story-text">
                  {language === 'ua' ? (
                     <>
                        У час, коли голоси мають бути почуті, проєкт <span className="highlight-text">Voices of Courage від ESN Ukraine</span> постає як свідчення стійкості, мрій та рішучості. Voices of Courage — це проєкт ESN Ukraine, який дає простір 20 українським студентам розповісти свої історії — про втрати, стійкість, адаптацію та надію. Кожен студент розмірковує про те, як війна вплинула на його освіту та життя, а також про сміливість, необхідну для руху вперед.
                     </>
                  ) : (
                     <>
                        In a time when voices must be heard, the <span className="highlight-text">Voices of Courage project by ESN Ukraine</span> steps forward as a testament to resilience, dreams, and determination. Voices of Courage is a project by ESN Ukraine that gives space to 20 Ukrainian students to share their journeys — stories of loss, resilience, adaptation, and hope. Each student reflects on how the war has affected their education and life, but also on the courage it takes to keep moving forward.
                     </>
                  )}
                </p>

                <p className="story-text">
                  {tContent.p2}
                </p>
             </div>

             {/* MOBILE ВЕРСІЯ - Картинка друга (після тексту) */}
             {isMobile && (
                 <img 
                   src={process.env.PUBLIC_URL + '/images/voices_hero.png'} 
                   alt="Students Collage" 
                   style={sideImageStyle('right')}
                   onError={(e) => { e.target.style.background = '#ccc'; }} 
                 />
             )}
          </div>

          {/* === БЛОК 2 === */}
          <div style={{overflow: 'hidden'}}>
             
             {/* DESKTOP ВЕРСІЯ (Float Left) - Картинка перша в коді */}
             {!isMobile && (
                 <img 
                   src={process.env.PUBLIC_URL + '/images/voices_protest.png'} 
                   alt="Protest" 
                   className="side-image"
                   style={sideImageStyle('left')}
                   onError={(e) => { e.target.style.background = '#ccc'; }}
                 />
             )}

             <div className="text-content">
                <p className="story-text">
                   {tContent.p3}
                </p>
                <p className="story-text">
                   {tContent.p4}
                </p>

                {/* MOBILE ВЕРСІЯ - Картинка друга (після тексту, перед списком) */}
                {isMobile && (
                    <img 
                       src={process.env.PUBLIC_URL + '/images/voices_protest.png'} 
                       alt="Protest" 
                       style={sideImageStyle('left')}
                       onError={(e) => { e.target.style.background = '#ccc'; }}
                    />
                )}
                
                {/* Блок "Історії про" */}
                <h3 style={{
                    fontSize: isMobile ? '1.5rem' : '1.8rem', 
                    fontFamily: 'Montserrat, sans-serif', 
                    margin: '2rem 0 1rem 0', 
                    color: '#2e3192', 
                    fontWeight: 'bold',
                    clear: 'both' // Гарантує, що заголовок піде після float елементів
                }}>
                  {language === 'ua' ? 'Історії про:' : 'Stories of:'}
                </h3>
                
                {/* Список пунктів */}
                <ul style={{listStyle: 'none', padding: 0, marginBottom: '2rem'}}>
                  {tContent.list.map((item, idx) => (
                    <li key={idx} style={{marginBottom: '1rem', paddingLeft: '1.5rem', borderLeft: '3px solid #2e3192'}}>
                      <strong style={{fontSize: '1.1rem'}}>{item.t}:</strong> <span style={{color: '#555'}}>{item.d}</span>
                    </li>
                  ))}
                </ul>

                {/* HIGHLIGHT POST */}
                <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
                  <p className="story-text" style={{fontWeight: '600'}}>
                    {tContent.highlightIntro}
                  </p>
                  
                  <blockquote style={{background: '#f9f9f9', padding: '1.5rem', borderLeft: '5px solid #ffdc00', fontStyle: 'italic', margin: '1rem 0'}}>
                    {tContent.quote}
                    <br/>
                    <span style={{fontSize: '0.9rem', color: '#888', marginTop: '0.5rem', display: 'block'}}>(Instagram)</span>
                  </blockquote>

                  <p className="story-text">
                    {tContent.underscoring}
                  </p>
                </div>

             </div>
          </div>
        </div>
      </div>

      {/* 3. GALLERY SECTION */}
      <div 
        style={gallerySectionStyle}
        ref={galleryRef}
        onMouseMove={handleGalleryMouseMove}
      >
        <div style={createMouseGlow(galleryMousePos.x, galleryMousePos.y, 'rgba(255, 255, 255, 0.1)')}></div>

        <div style={{textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 2}}>
           <h2 style={{fontSize: isMobile ? '2.5rem' : '4rem', fontFamily: 'Montserrat, sans-serif', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.1}}>
             THE 20 VOICES
           </h2>
           <p style={{color: '#888', padding: '0 1rem'}}>
             {language === 'ua' ? 'Клікніть на портрет, щоб дізнатися історію' : 'Click on a portrait to read the story'}
           </p>
        </div>

        <div style={galleryGridStyle}>
          {stories.map((story) => (
            <button 
              key={story.id} 
              className="gallery-card"
              style={photoButtonStyle}
              onClick={() => setSelectedStory(story)}
              aria-label={story.name}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.1) grayscale(0%)';
                e.currentTarget.style.zIndex = '10';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1) grayscale(100%)';
                e.currentTarget.style.zIndex = '1';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img 
                src={story.image} 
                alt={story.name}
                style={{
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  transition: 'transform 0.5s ease, filter 0.5s ease',
                  filter: 'grayscale(100%)'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;background:#222;color:#555;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:bold">${story.id}</div>`;
                }}
              />
            </button>
          ))}
        </div>

        {/* FOOTER TEXT BLOCK */}
        <div style={{textAlign: 'center', marginTop: '6rem', padding: '0 2rem', maxWidth: '800px', margin: '6rem auto 0 auto', position: 'relative', zIndex: 2}}>
          
          <p style={{fontSize: '1.2rem', marginBottom: '1rem', lineHeight: '1.8', color: '#ccc'}}>
             {tContent.explore}
          </p>
          <a 
            href="https://www.instagram.com/esn.ukraine" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
                color: '#fff', 
                fontSize: '1.5rem', 
                fontFamily: 'Montserrat, sans-serif', 
                textDecoration: 'underline',
                fontWeight: 'bold',
                display: 'block',
                marginBottom: '3rem'
            }}
          >
             @esn.ukraine
          </a>

          <p style={{fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8', color: '#ddd'}}>
             {tContent.grateful}
          </p>
          
          <p style={{fontSize: '1.2rem', marginBottom: '3rem', lineHeight: '1.8', color: '#fff', fontStyle: 'italic', fontWeight: '500'}}>
             {tContent.readers}
          </p>

          <p style={{fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: 'bold', color: '#fff', marginBottom: '3rem', fontFamily: 'Montserrat, sans-serif'}}>
             {tContent.final}
          </p>

        </div>
      </div>

      {/* 5. MODAL WINDOW */}
      {selectedStory && (
        <div style={modalOverlayStyle} onClick={() => setSelectedStory(null)}>
          <div 
             className="modal-layout" 
             style={modalContainerStyle}
             onClick={(e) => e.stopPropagation()} 
          >
             <button style={{
                 position: 'absolute', top: '15px', right: '15px', 
                 background: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px',
                 fontSize: '1.5rem', cursor: 'pointer', zIndex: 100,
                 display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
             }} onClick={() => setSelectedStory(null)}>✕</button>

             {/* ЛІВА ЧАСТИНА: ФОТО */}
             <div className="modal-image-col" style={{
               flex: 1,
               background: '#000',
               backgroundImage: `url(${selectedStory.image})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               position: 'relative'
             }}>
               <div style={{
                 position: 'absolute', bottom: 0, left: 0, width: '100%', 
                 padding: '2rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
               }}>
                  <h2 style={{color: '#fff', fontSize: isMobile ? '1.8rem' : '2.5rem', fontFamily: 'Montserrat, sans-serif'}}>{selectedStory.name}</h2>
                  <p style={{color: '#7ac143', fontWeight: 'bold'}}>{selectedStory.university}</p>
               </div>
             </div>

             {/* ПРАВА ЧАСТИНА: ТЕКСТ */}
             <div style={{
               flex: 1, 
               padding: isMobile ? '2rem' : '3rem', 
               overflowY: 'auto', 
               background: '#fff',
               color: '#000',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center'
             }}>
               <h3 style={{color: '#2e3192', fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Montserrat, sans-serif'}}>
                 {language === 'ua' ? 'Історія Студента' : 'Student Story'}
               </h3>
               <div style={{width: '60px', height: '5px', background: '#2e3192', marginBottom: '2rem'}}></div>
               
               <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: '#444'}}>
                 {selectedStory.fullText}
               </p>
               
               <div style={{marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid #eee'}}>
                 <p style={{fontStyle: 'italic', color: '#888', fontSize: '0.9rem'}}>
                   Voices of Courage / ESN Ukraine
                 </p>
               </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default VoicesOfCourage;