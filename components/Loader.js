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
        setTimeout(onFinished, 600);
      }
    };

    items.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.decode()
        .then(() => updateProgress())
        .catch(() => updateProgress());
    });
  }, [items, onFinished]);

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: '#121212', zIndex: 9999,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      color: 'white', fontFamily: 'var(--font-titol)'
    }}>
      <div style={{ fontSize: '5rem', fontWeight: '700', fontVariantNumeric: 'tabular-nums', letterSpacing: '-2px' }}>
        {progress}%
      </div>
      <div style={{ width: '240px', height: '2px', backgroundColor: '#222', marginTop: '20px', overflow: 'hidden' }}>
        <div style={{ height: '100%', backgroundColor: 'white', width: `${progress}%`, transition: 'width 0.3s ease-out' }} />
      </div>
      <p style={{ marginTop: '20px', fontSize: '0.7rem', color: '#555', letterSpacing: '3px', textTransform: 'uppercase' }}>
        Optimizing Experience
      </p>
    </div>
  );
}