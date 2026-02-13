'use client';
import { useState, useMemo } from 'react';
import DecryptedText from '../components/DecryptedText';
import ImageTrail from '../components/ImageTrail';
import Loader from '../components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Llista de projectes organitzada (Exactament la teva)
  const projects = {
    culactiu: [
      '/trail/Culactiu_1.png', '/trail/Culactiu_2.png', '/trail/Culactiu_3.png', 
      '/trail/Culactiu_4.jpg', '/trail/Culactiu_5.jpg', '/trail/Culactiu_6.jpg', 
      '/trail/Culactiu_7.jpg', '/trail/Culactiu_8.png', '/trail/Culactiu_9.png', 
      '/trail/Culactiu_10.jpeg', '/trail/Culactiu_11.jpeg', '/trail/Culactiu_13.jpg', 
      '/trail/Culactiu_14.png', '/trail/Culactiu_15.png', '/trail/Culactiu_16.png'
    ],
    cumulus: [
      '/trail/Cumulus_1.jpg', '/trail/Cumulus_2.jpg', 
      '/trail/Cumulus_3.jpg', '/trail/Cumulus_4.jpg'
    ],
    doom: [
      '/trail/Doom_1.jpeg', '/trail/Doom_2.jpeg', '/trail/Doom_3.jpeg', 
      '/trail/Doom_4.jpg', '/trail/Doom_5.jpeg', '/trail/Doom_6.jpeg'
    ],
    malreal: [
      '/trail/Malreal_1.png', '/trail/Malreal_2.png', 
      '/trail/Malreal_3.png', '/trail/Malreal_4.jpg', '/trail/Malreal_5.jpg'
    ],
    relationships: [
      '/trail/Relationships_1.JPG', '/trail/Relationships_2.JPG', 
      '/trail/Relationships_3.JPG', '/trail/Relationships_4.JPG'
    ],
    vasudeva: [
      '/trail/Vasudeva_3.png', '/trail/Vasudeva_4.png', 
      '/trail/Vasudeva_5.png', '/trail/Vasudeva_6.png'
    ]
  };

  // Funció per intercalar les imatges (Lògica neta)
  const interleavedList = useMemo(() => {
    const keys = Object.keys(projects);
    const maxLength = Math.max(...keys.map(k => projects[k].length));
    const result = [];

    for (let i = 0; i < maxLength; i++) {
      keys.forEach(key => {
        if (projects[key][i]) {
          result.push(projects[key][i]);
        }
      });
    }
    return result;
  }, [projects]);

  return (
    <>
      {/* Pre-càrrega real d'imatges */}
      {loading && (
        <Loader 
          items={interleavedList} 
          onFinished={() => setLoading(false)} 
        />
      )}
      
      <main style={{ 
        height: '100vh', 
        width: '100vw', 
        position: 'relative', 
        backgroundColor: '#121212', 
        overflow: 'hidden',
        opacity: loading ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out'
      }}>
        
        {/* CAPA 0: Els Punts */}
        <div style={{
          position: 'absolute', 
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          zIndex: 0
        }} />
        
        {/* CAPA 1: Trail d'imatges */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <ImageTrail items={interleavedList} />
        </div>

        {/* CAPA 2: Interfície (Nav i Text) */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 2, 
          display: 'flex', 
          flexDirection: 'column', 
          pointerEvents: 'none' 
        }}>
          
          <nav style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '30px 50px',
            fontFamily: 'var(--font-titol)', 
            fontSize: '1.2rem', 
            fontWeight: '700',
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            pointerEvents: 'auto' 
          }}>
            <span>Sergi Bosch Raga</span>
            <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>My Work</span>
            <span>Contact</span>
          </nav>

          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            textAlign: 'center' 
          }}>
            <h1 style={{ 
              fontFamily: 'var(--font-cos)', 
              fontSize: '1.6rem', 
              maxWidth: '850px', 
              lineHeight: '1.5', 
              pointerEvents: 'auto' 
            }}>
              <DecryptedText 
                text="THIS DIGITAL SPACE FEATURES SOME OF MY WORK AND INTERESTS." 
                animateOn="hover" 
                speed={50} 
              />
            </h1>
            <p style={{ 
              color: '#888', 
              marginTop: '20px', 
              fontSize: '1.1rem', 
              fontWeight: '400',
              fontFamily: 'var(--font-cos)'
            }}>
              Feel Free To Explore The Projects!
            </p>
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
          }
        `}</style>
      </main>
    </>
  );
}