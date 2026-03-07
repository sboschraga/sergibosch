'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSpring, animated } from '@react-spring/web';

// Afegim la propietat "invertOnHero" que per defecte serà falsa
export default function Navbar({ title, invertOnHero = false }) {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [theme, setTheme] = useState('dark');
  
  // Estat per saber si estem a la primera pantalla (damunt del vídeo)
  const [isOverHero, setIsOverHero] = useState(invertOnHero); 

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(currentTheme);

    // Comprovació inicial en carregar la pàgina
    if (invertOnHero) {
      setIsOverHero(window.scrollY < window.innerHeight - 80);
    }

    const controlNavbar = () => {
      // Amagar/Mostrar la Navbar en fer scroll
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);

      // Si té activat l'invertOnHero, calculem si hem passat de llarg la primera pantalla
      if (invertOnHero) {
        setIsOverHero(window.scrollY < window.innerHeight - 80); 
      }
    };
    
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, invertOnHero]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDarkMode = theme === 'dark';
  const properties = {
    sun: { r: 9, transform: "rotate(40deg)", cx: 12, cy: 4, opacity: 0 },
    moon: { r: 5, transform: "rotate(90deg)", cx: 30, cy: 0, opacity: 1 },
    springConfig: { mass: 4, tension: 250, friction: 35 }
  };
  
  const { r, transform, cx, cy, opacity } = isDarkMode ? properties["moon"] : properties["sun"];
  const svgContainerProps = useSpring({ transform, config: properties.springConfig });
  const centerCircleProps = useSpring({ r, config: properties.springConfig });
  const maskedCircleProps = useSpring({ cx, cy, config: properties.springConfig });
  const linesProps = useSpring({ opacity, config: properties.springConfig });

  // DEFINICIÓ DINÀMICA DEL COLOR: 
  // Si estem sobre el vídeo -> Blanc i efecte negatiu. Si no -> Color normal del tema.
  const dynamicColor = isOverHero ? '#ffffff' : 'var(--nav-text)';
  const dynamicBlendMode = isOverHero ? 'difference' : 'normal';

  return (
    <>
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 30px', 
        fontFamily: 'var(--font-titol)', fontSize: '1.2rem', fontWeight: '700',
        textTransform: 'uppercase', letterSpacing: '1px',
        transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
        // Transició suau tant del moviment com del canvi de color
        transition: 'transform 0.4s ease-in-out, color 0.4s ease',
        color: dynamicColor, 
        mixBlendMode: dynamicBlendMode 
      }}>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
          <Link href="/" className="nav-link clickable-element" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
            Sergi Bosch Raga
          </Link>
          
          {title && (
            <span 
              className="nav-title clickable-element"
              onClick={scrollToTop} 
              style={{ 
                cursor: 'pointer', 
                fontSize: '0.75rem',  
                fontWeight: '500',    
                fontFamily: 'var(--font-cos)', 
                letterSpacing: '1px'
              }}
            >
              {title}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(30px, 5vw, 30px)' }}> 
          
          <animated.svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            // Utilitzem currentColor perquè agafi el blanc si està al vídeo, o el fosc si està abaix
            style={{ ...svgContainerProps, cursor: "pointer", color: "currentColor" }}
            onClick={toggleTheme}
            className="theme-icon clickable-element" 
          >
            <mask id="mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <animated.circle style={maskedCircleProps} cx="12" cy="4" r="9" fill="black" />
            </mask>
            <animated.circle style={centerCircleProps} fill="currentColor" cx="12" cy="12" r="9" mask="url(#mask)" />
            <animated.g style={linesProps} fill="currentColor">
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </animated.g>
          </animated.svg>

          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/about" className="nav-link clickable-element" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
              About
            </Link>
            <Link href="/contact" className="nav-link clickable-element" style={{ cursor: 'pointer', color: 'inherit', textDecoration: 'none' }}>
              Contact
            </Link>
          </div>
          
        </div>
      </nav>

      <style>{`
        .nav-link, .nav-title, .theme-icon { transition: opacity 0.3s ease; }
        .nav-link:hover, .nav-title:hover, .theme-icon:hover { opacity: 0.5; }
      `}</style>
    </>
  );
}