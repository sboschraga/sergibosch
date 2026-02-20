'use client';
import { useState, useMemo } from 'react';
import DecryptedText from '../components/DecryptedText';
import ImageTrail from '../components/ImageTrail';
import Loader from '../components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const projects = useMemo(() => ({
    culactiu: ['/trail/Culactiu_1.webp', '/trail/Culactiu_2.webp', '/trail/Culactiu_3.webp', '/trail/Culactiu_4.webp', '/trail/Culactiu_5.webp', '/trail/Culactiu_6.webp', '/trail/Culactiu_7.webp', '/trail/Culactiu_8.webp', '/trail/Culactiu_9.webp', '/trail/Culactiu_11.webp', '/trail/Culactiu_12.webp', '/trail/Culactiu_13.webp', '/trail/Culactiu_14.webp', '/trail/Culactiu_15.webp'],
    cumulus: ['/trail/Cumulus_1.webp', '/trail/Cumulus_2.webp', '/trail/Cumulus_3.webp', '/trail/Cumulus_4.webp'],
    doom: ['/trail/Doom_1.webp', '/trail/Doom_2.webp', '/trail/Doom_3.webp', '/trail/Doom_4.webp', '/trail/Doom_5.webp', '/trail/Doom_6.webp'],
    malreal: ['/trail/Malreal_1.webp', '/trail/Malreal_2.webp', '/trail/Malreal_3.webp', '/trail/Malreal_4.webp', '/trail/Malreal_5.webp'],
    relationships: ['/trail/Relationships_1.webp', '/trail/Relationships_2.webp', '/trail/Relationships_3.webp', '/trail/Relationships_4.webp'],
    vasudeva: ['/trail/Vasudeva_3.webp', '/trail/Vasudeva_4.webp', '/trail/Vasudeva_5.webp', '/trail/Vasudeva_6.webp']
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
      
      <main style={{ 
        height: '100vh', width: '100vw', position: 'relative', backgroundColor: '#121212', 
        overflow: 'hidden', opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease-in-out'
        // Cursor per defecte restaurat automàticament
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
            <span>Sergi Bosch Raga</span>
            <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>My Work</span>
            <span>Contact</span>
          </nav>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
            <h1 style={{ fontFamily: 'var(--font-cos)', fontSize: '1.5rem', maxWidth: '1100px', lineHeight: '1.4', pointerEvents: 'auto' }}>
              <DecryptedText text="THIS DIGITAL SPACE FEATURES SOME OF MY WORK AND INTERESTS." speed={40} />
            </h1>
            <div style={{ marginTop: '20px', pointerEvents: 'auto' }}>
              <DecryptedText text="Feel Free To Explore The Projects!" speed={50} parentClassName="subtext" />
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
            cursor: auto; /* Cursor normal */
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