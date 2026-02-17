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

    // DEFINIM LA FUNCIÓ AQUÍ DINS
    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / totalItems) * 100);
      setProgress(currentProgress);

      if (loadedCount === totalItems) {
        setTimeout(onFinished, 600); // Marge per suavitat
      }
    };

    items.forEach((url) => {
      const img = new Image();
      img.src = url;
      
      // Intentem descodificar per a que la GPU ja tingui la imatge llista
      img.decode()
        .then(() => {
          updateProgress();
        })
        .catch((err) => {
          console.error("Error carregant imatge:", url, err);
          updateProgress(); // Comptem igualment per no bloquejar el loader
        });
    });
  }, [items, onFinished]);

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: '#121212', zIndex: 9999,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      color: 'white', fontFamily: 'var(--font-titol)'
    }}>
      <div style={{ 
        fontSize: '6rem', 
        fontWeight: '700', 
        fontVariantNumeric: 'tabular-nums' // Evita que el text es mogui quan canvien els números
      }}>
        {progress}%
      </div>
      <div style={{ width: '300px', height: '2px', backgroundColor: '#222', marginTop: '20px' }}>
        <div style={{ 
          height: '100%', 
          backgroundColor: 'white', 
          width: `${progress}%`, 
          transition: 'width 0.3s ease-out' 
        }} />
      </div>
      <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#555', letterSpacing: '2px' }}>
        LOADING WEBP ASSETS
      </p>
    </div>
  );
}