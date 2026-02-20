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
        // Donem un marge extra per assegurar que la GPU ha acabat de processar
        setTimeout(onFinished, 800);
      }
    };

    items.forEach((url) => {
      const img = new Image();
      img.src = url;
      
      img.decode()
        .then(() => {
          // TÈCNICA AVANÇADA: Forçar el renderitzat en un canvas invisible
          try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1;
            canvas.height = 1;
            // En dibuixar-la, la GPU ha de processar els píxels sí o sí
            ctx.drawImage(img, 0, 0, 1, 1);
          } catch (e) {
            console.error("Canvas render error", e);
          }
          updateProgress();
        })
        .catch((err) => {
          console.error("Error descodificant:", url, err);
          updateProgress();
        });
    });
  }, [items, onFinished]);

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: '#121212', zIndex: 9999,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      color: 'white', fontFamily: 'var(--font-titol)'
    }}>
      <div style={{ fontSize: '6rem', fontWeight: '700', fontVariantNumeric: 'tabular-nums' }}>
        {progress}%
      </div>
      <div style={{ width: '300px', height: '2px', backgroundColor: '#222', marginTop: '20px' }}>
        <div style={{ 
          height: '100%', 
          backgroundColor: 'white', 
          width: `${progress}%`, 
          transition: 'width 0.4s ease-out' 
        }} />
      </div>
      <p style={{ marginTop: '20px', fontSize: '0.8rem', color: '#555', letterSpacing: '2px' }}>
        WARMING UP GPU ASSETS
      </p>
    </div>
  );
}