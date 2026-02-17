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

    items.forEach((url) => {
      const img = new Image();
      img.src = url;
      
      // Intentem descodificar la imatge abans de comptar-la com a llista
      img.decode()
        .then(() => {
          loadedCount++;
          setProgress(Math.round((loadedCount / totalItems) * 100));
          if (loadedCount === totalItems) {
            setTimeout(onFinished, 800); // Una mica més de marge per seguretat
          }
        })
        .catch(() => {
          loadedCount++; // Encara que falli, seguim perquè el loader no s'encalli
          if (loadedCount === totalItems) onFinished();
        });
    });
  }, [items, onFinished]);

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: '#121212', zIndex: 9999,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      color: 'white', fontFamily: 'var(--font-titol)'
    }}>
      <div style={{ fontSize: '6rem', fontWeight: '700', letterSpacing: '-2px' }}>
        {progress}%
      </div>
      <div style={{ width: '300px', height: '2px', backgroundColor: '#222', marginTop: '20px' }}>
        <div style={{ height: '100%', backgroundColor: 'white', width: `${progress}%`, transition: 'width 0.4s ease-out' }} />
      </div>
    </div>
  );
}