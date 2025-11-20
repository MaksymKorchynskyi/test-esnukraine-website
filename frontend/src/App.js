// App.js
import React, { useState } from 'react'; // Додали useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Ми залишаємо LanguageProvider, якщо він потрібен для інших сторінок, 
// але для Home і Header будемо використовувати пряму передачу (props)
import { LanguageProvider } from './LanguageContext'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Sections from './pages/Sections';
import News from './pages/News';
import Events from './pages/Events';

// Глобальні стилі
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Open+Sans:wght@400;500;600;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }
  
  html, body {
    width: 100%;
    overflow-x: hidden;
  }
  
  #root {
    width: 100%;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6, .navbar, .logo {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
  
  .hero-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
  }
  
  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }
  
  .cta-button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
  }
`;

const appStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: 0,
  padding: 0,
  overflowX: 'hidden'
};

const mainStyle = {
  flex: 1,
  paddingTop: '85px',
  width: '100%',
  margin: 0,
  padding: 0,
  overflowX: 'hidden'
};

function App() {
  // 1. Створюємо стан мови тут, у головному файлі
  const [language, setLanguage] = useState('uk'); 

  return (
    <LanguageProvider>
      <style>{globalStyles}</style>
      <Router>
        <div style={appStyle}>
          {/* 2. Передаємо мову та функцію її зміни у Хідер */}
          <Header language={language} changeLanguage={setLanguage} />
          
          <main style={mainStyle}>
            <Routes>
              {/* 3. Передаємо мову у Home, щоб вона оновилася миттєво */}
              <Route path="/" element={<Home language={language} />} />
              
              {/* Для інших сторінок теж можна передати, якщо ти переробив їх під props */}
              <Route path="/about" element={<About />} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/news" element={<News />} />
              <Route path="/events" element={<Events />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;