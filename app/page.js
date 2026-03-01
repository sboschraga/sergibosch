'use client';
import { useMemo, useState } from 'react';
import DecryptedText from '../components/DecryptedText';
import ImageTrail from '../components/ImageTrail';
import FlowingMenu from '../components/FlowingMenu';
import Navbar from '../components/Navbar';

export default function Home() {
  const [isHoveringMenu, setIsHoveringMenu] = useState(false);

  const demoItems = [
    { link: '/doom', text: 'The Doom Race', image: '/trail/Doom_1.jpg' },
    { link: '/vasudeva', text: 'Vasudeva', image: '/trail/Vasudeva_3.jpg' },
    { link: '/culactiu', text: 'Culactiu', image: '/trail/Culactiu_11.jpg' },
    { link: '/phubbing', text: 'Phubbing', image: '/trail/Relationships_3.jpg' },
    { link: '/malreal', text: 'Malreal', image: '/trail/Malreal_4.jpg' },
    { link: '/cumulus', text: 'Cumulus Workshop', image: '/trail/Cumulus_3.jpg' },
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

  return (
    <>
      <main style={{ width: '100vw', backgroundColor: 'var(--background)', transition: 'background-color 0.3s ease' }}>
        
        {/* BARRA DE NAVEGACIÓ GLOBAL */}
        <Navbar />

        {/* SECCIÓ 1: HERO */}
        <section style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
          {/* Fons de punts */}
          <div style={{ 
            position: 'absolute', inset: 0, 
            backgroundImage: `radial-gradient(circle, var(--dot-color) 1px, transparent 1px)`, 
            backgroundSize: '30px 30px', zIndex: 0, transition: 'background-image 0.3s ease'
          }} />
          
          {/* El Trail només es mostra si NO estem sobre el menú */}
          {!isHoveringMenu && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <ImageTrail items={interleavedList} />
            </div>
          )}

          {/* Text central amb les mides exactes d'abans (1.5rem) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
              <h1 style={{ color: 'var(--foreground)', fontFamily: 'var(--font-cos)', fontSize: '1.5rem', maxWidth: '1100px', lineHeight: '1.4', pointerEvents: 'auto' }}>
                <DecryptedText text="THIS DIGITAL SPACE FEATURES SOME OF MY WORK AND INTERESTS." speed={40} />
              </h1>
              <div style={{ marginTop: '20px', pointerEvents: 'auto' }}>
                <DecryptedText text="Scroll down to explore my projects" speed={50} parentClassName="subtext" />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓ 2: GALERIA DE PROJECTES */}
        <section 
          onMouseEnter={() => setIsHoveringMenu(true)}
          onMouseLeave={() => setIsHoveringMenu(false)}
          style={{ height: '100vh', width: '100vw', position: 'relative', backgroundColor: 'var(--background)', zIndex: 10, transition: 'background-color 0.3s ease' }}
        >
          <FlowingMenu 
            items={demoItems} speed={15}
            bgColor="var(--background)" textColor="var(--nav-text)"
            marqueeBgColor="var(--nav-text)" marqueeTextColor="var(--background)" borderColor="var(--border-color)"
          />
        </section>

        {/* ESTILS GLOBALS DE LA PÀGINA AMB EL SUBTEXT RESTAURAT */}
        <style jsx global>{`
          :root { --font-titol: 'Azaret Mono', monospace; --font-cos: 'Chivo Mono', monospace; }
          body { margin: 0; background-color: var(--background); color: var(--foreground); overflow-x: hidden; scroll-behavior: smooth; }
          .subtext { color: var(--subtext); font-size: 1.1rem; font-weight: 400; font-family: var(--font-cos); transition: color 0.3s ease; }
        `}</style>
      </main>
    </>
  );
}