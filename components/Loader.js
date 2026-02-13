'use client';
import { useEffect, useState } from 'react';

export default function Loader({ items, onFinished }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) {
      onFinished();
      return;
    }

    let loadedCount = 0;
    const totalItems = items.length;

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalItems) * 100);
      setProgress(currentProgress);

      if (loadedCount === totalItems) {
        // Donem un petit marge perquè l'animació de la barra arribi al final
        setTimeout(onFinished, 600);
      }
    };

    items.forEach((url) => {
      const img = new Image();
      img.src = url;

      // EL CANVI CLAU: .decode() prepara els píxels en memòria RAM/GPU
      img.decode()
        .then(() => {
          updateProgress();
        })
        .catch((err) => {
          console.error("Error descodificant la imatge:", url, err);
          // Si falla (per format o pes), sumem igualment per no bloquejar la web
          updateProgress();
        });
    });
  }, [items, onFinished]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#121212',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'var(--font-titol)'
    }}>
      {/* Comptador percentual */}
      <div style={{ 
        fontSize: '5rem', 
        fontWeight: '700', 
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-2px'
      }}>
        {progress}%
      </div>

      {/* Barra de progrés */}
      <div style={{ 
        width: '240px', 
        height: '2px', 
        backgroundColor: '#222', 
        marginTop: '20px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          height: '100%', 
          backgroundColor: 'white', 
          width: `${progress}%`, 
          transition: 'width 0.3s ease-out' 
        }} />
      </div>

      <p style={{ 
        marginTop: '20px', 
        fontSize: '0.7rem', 
        color: '#555', 
        letterSpacing: '3px',
        textTransform: 'uppercase'
      }}>
        Optimizing Experience
      </p>
    </div>
  );
}