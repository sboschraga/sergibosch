'use client';
import { useEffect, useState } from 'react';

export default function Loader({ items, onFinished }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (items.length === 0) {
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
        setTimeout(onFinished, 500); // Una mica de marge per suavitat
      }
    };

    items.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = updateProgress;
      img.onerror = updateProgress; // Si una falla, continuem per no bloquejar la web
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
      <div style={{ fontSize: '4rem', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}>
        {progress}%
      </div>
      <div style={{ width: '200px', height: '2px', backgroundColor: '#333', marginTop: '20px' }}>
        <div style={{ 
          height: '100%', 
          backgroundColor: 'white', 
          width: `${progress}%`, 
          transition: 'width 0.2s ease-out' 
        }} />
      </div>
      <p style={{ marginTop: '15px', fontSize: '0.8rem', color: '#666', letterSpacing: '2px' }}>
        LOADING ASSETS
      </p>
    </div>
  );
}