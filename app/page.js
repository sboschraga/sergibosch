'use client';
import { useState, useMemo, useEffect } from 'react';
import DecryptedText from '../components/DecryptedText';
import ImageTrail from '../components/ImageTrail';
import Loader from '../components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Detectem si el ratolí està sobre un element interactiu
      const target = e.target;
      const isInteractive = target.closest('.interactive') || 
                          target.tagName === 'A' || 
                          target.tagName === 'SPAN' ||
                          target.closest('nav');
      setIsHoveringInteractive(!!isInteractive);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = useMemo(() => ({
    culactiu: ['/trail/Culactiu_1.png', '/trail/Culactiu_2.png', '/trail/Culactiu_3.png', '/trail/Culactiu_4.jpg', '/trail/Culactiu_5.jpg', '/trail/Culactiu_6.jpg', '/trail/Culactiu_7.jpg', '/trail/Culactiu_8.png', '/trail/Culactiu_9.png', '/trail/Culactiu_10.jpeg', '/trail/Culactiu_11.jpeg', '/trail/Culactiu_13.png', '/trail/Culactiu_14.png', '/trail/Culactiu_15.png', '/trail/Culactiu_16.png'],
    cumulus: ['/trail/Cumulus_1.jpg', '/trail/Cumulus_2.jpg', '/trail/Cumulus_3.jpg', '/trail/Cumulus_4.jpg'],
    doom: ['/trail/Doom_1.jpeg', '/trail/Doom_2.jpeg', '/trail/Doom_3.jpeg', '/trail/Doom_4.jpg', '/trail/Doom_5.jpeg', '/trail/Doom_6.jpeg'],
    malreal: ['/trail/Malreal_1.png', '/trail/Malreal_2.png', '/trail/Malreal_3.png', '/trail/Malreal_4.jpg', '/trail/Malreal_5.jpg'],
    relationships: ['/trail/Relationships_1.JPG', '/trail/Relationships_2.JPG', '/trail/Relationships_3.JPG', '/trail/Relationships_4.JPG'],
    vasudeva: ['/trail/Vasudeva_3.png', '/trail/Vasudeva_4.png', '/trail/Vasudeva_5.png', '/trail/Vasudeva_6.png']
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
      {loading && <Loader items={interleavedList} onFinished={() => setLoading(false)} />}
      
      {!loading && (
        <div style={{
          position: 'fixed',
          left: mousePos.x,
          top: mousePos.y,
          // Si estem sobre text, es fa un quadrat de 20px, si no, un puntet de 4px
          width: isHoveringInteractive ? '20px' : '4px',
          height: isHoveringInteractive ? '20px' : '4px',
          backgroundColor: 'white',
          zIndex: 9999,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          transition: 'width 0.2s ease, height 0.2s ease', // Animació suau del cursor
          borderRadius: isHoveringInteractive ? '0px' : '50%' // Quadrat sobre text, cercle la resta
        }} />
      )}

      <main style={{ 
        height: '100vh', width: '100vw', position: 'relative', backgroundColor: '#121212', 
        overflow: 'hidden', opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out',
        cursor: 'none' 
      }}>
        
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px', zIndex: 0 }} />
        
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <ImageTrail items={interleavedList} />
        </div>

        <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
          
          <nav style={{ 
            display: 'flex', justifyContent: 'space-between', 
            padding: '20px 30px', 
            fontFamily: 'var(--font-titol)', fontSize: '1.2rem', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '1px', pointerEvents: 'auto' 
          }}>
            <span className="interactive">Sergi Bosch Raga</span>
            <span className="interactive" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>My Work</span>
            <span className="interactive">Contact</span>
          </nav>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
            <h1 className="interactive" style={{ 
              fontFamily: 'var(--font-cos)', 
              fontSize: '1.5rem', // Mida més gran
              maxWidth: '1100px', 
              lineHeight: '1.4', 
              pointerEvents: 'auto' 
            }}>
              <DecryptedText 
                text="THIS DIGITAL SPACE FEATURES SOME OF MY WORK AND INTERESTS." 
                speed={40} 
              />
            </h1>
            <div className="interactive" style={{ marginTop: '20px', pointerEvents: 'auto' }}>
              <DecryptedText 
                text="Feel Free To Explore The Projects!" 
                speed={50}
                parentClassName="subtext"
              />
            </div>
          </div>
        </div>

        <style jsx global>{`
          :root {
            --font-titol: 'Azaret Mono', monospace;
            --font-cos: 'Chivo Mono', monospace;
          }
          body {
            margin: 0;
            background-color: #121212;
            color: white;
            cursor: none;
          }
          .subtext {
            color: #888;
            font-size: 1.1rem; // Mida més gran pel peu
            font-weight: 400;
            font-family: var(--font-cos);
          }
          .interactive { cursor: none; }
        `}</style>
      </main>
    </>
  );
}