'use client';
import { useState, useMemo, useEffect } from 'react';
import DecryptedText from '../components/DecryptedText';
import ImageTrail from '../components/ImageTrail';
import Loader from '../components/Loader';
import FlowingMenu from '../components/FlowingMenu';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Lògica per amagar/mostrar el Nav segons l'scroll
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { 
        setShowNav(false); // Baixant: amaguem
      } else { 
        setShowNav(true);  // Pujant: mostrem
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const demoItems = [
    { link: '#', text: 'Culactiu', image: '/trail/Culactiu_1.jpg' },
    { link: '#', text: 'Cumulus', image: '/trail/Cumulus_1.jpg' },
    { link: '#', text: 'Doom', image: '/trail/Doom_1.jpg' },
    { link: '#', text: 'Malreal', image: '/trail/Malreal_1.jpg' },
    { link: '#', text: 'Relationships', image: '/trail/Relationships_1.jpg' },
    { link: '#', text: 'Vasudeva', image: '/trail/Vasudeva_3.jpg' }
  ];

  const projects = useMemo(() => ({
    culactiu: ['/trail/Culactiu_1.jpg', '/trail/Culactiu_2.jpg', '/trail/Culactiu_3.jpg', '/trail/Culactiu_4.jpg', '/trail/Culactiu_5.jpg', '/trail/Culactiu_6.jpg', '/trail/Culactiu_7.jpg', '/trail/Culactiu_8.jpg', '/trail/Culactiu_9.jpg', '/trail/Culactiu_11.jpg', '/trail/Culactiu_12.jpg', '/trail/Culactiu_13.jpg', '/trail/Culactiu_14.jpg', '/trail/Culactiu_15.jpg'],
    cumulus: ['/trail/Cumulus_1.jpg', '/trail/Cumulus_2.jpg', '/trail/Cumulus_3.jpg', '/trail/Cumulus_4.jpg'],
    doom: ['/trail/Doom_1.jpg', '/trail/Doom_2.jpg', '/trail/Doom_3.jpg', '/trail/Doom_4.jpg', '/trail/Doom_5.jpg', '/trail/Doom_6.jpg'],
    malreal: ['/trail/Malreal_1.jpg', '/trail/Malreal_2.jpg', '/trail/Malreal_3.jpg', '/trail/Malreal_4.jpg', '/trail/Malreal_5.jpg'],
    relationships: ['/trail/Relationships_1.jpg', '/trail/Relationships_2.jpg', '/trail/Relationships_3.jpg', '/trail/Relationships_4.jpg'],
    vasudeva: ['/trail/Vasudeva_3.jpg', '/trail/Vasudeva_4.jpg', '/trail/Vasudeva_5.jpg', '/trail/Vasudeva_6.jpg']
  }), []);

  const interleavedList = useMemo(() => {
    const keys = Object.keys(projects);
    const maxLength = Math.max(...keys.map(k => projects[k].length));
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      keys.forEach(key => { if (projects[key][i]) result.push(projects[key][i]); });
    }
    return result;
  }, [projects]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {loading && <Loader onFinished={() => setLoading(false)} />}
      
      <main style={{ width: '100vw', backgroundColor: '#121212', opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }}>
        
        {/* NAV FIXE INTEL·LIGENT */}
        <nav style={{ 
          position: 'fixed', top: 0, width: '100%', zIndex: 100,
          display: 'flex', justifyContent: 'space-between', padding: '20px 30px', 
          fontFamily: 'var(--font-titol)', fontSize: '1.2rem', fontWeight: '700',
          textTransform: 'uppercase', letterSpacing: '1px',
          transform: showNav ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.4s ease-in-out',
          mixBlendMode: 'difference' // Perquè es vegi bé sobre fons clar/fosc
        }}>
          <span onClick={scrollToTop} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>Sergi Bosch Raga</span>
          <span style={{ cursor: 'pointer', pointerEvents: 'auto' }}>Contact</span>
        </nav>

        {/* SECCIÓ 1: HERO */}
        <section style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px', zIndex: 0 }} />
          
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <ImageTrail items={interleavedList} />
          </div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
              <h1 style={{ fontFamily: 'var(--font-cos)', fontSize: '1.5rem', maxWidth: '1100px', lineHeight: '1.4', pointerEvents: 'auto' }}>
                <DecryptedText text="THIS DIGITAL SPACE FEATURES SOME OF MY WORK AND INTERESTS." speed={40} />
              </h1>
              <div style={{ marginTop: '20px', pointerEvents: 'auto' }}>
                <DecryptedText text="Scroll down to explore my projects" speed={50} parentClassName="subtext" />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓ 2: GALERIA (Aquí el Trail s'atura automàticament perquè està fora del Hero) */}
        <section style={{ height: '100vh', width: '100vw', position: 'relative' }}>
          <FlowingMenu 
            items={demoItems}
            speed={15}
            textColor="#ffffff"
            bgColor="#121212"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#121212"
            borderColor="#222222"
          />
        </section>

        <style jsx global>{`
          :root {
            --font-titol: 'Azaret Mono', monospace;
            --font-cos: 'Chivo Mono', monospace;
          }
          body {
            margin: 0;
            background-color: #121212;
            color: white;
            overflow-x: hidden;
          }
          .subtext {
            color: #888;
            font-size: 1.1rem;
            font-weight: 400;
            font-family: var(--font-cos);
          }
        `}</style>
      </main>
    </>
  );
}