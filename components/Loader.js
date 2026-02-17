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

    // Dins de la lògica del Loader.js, manté això:
items.forEach((url) => {
  const img = new Image();
  img.src = url;
  img.decode()
    .then(() => updateProgress())
    .catch(() => updateProgress());
    });
  }, [items, onFinished]);

  // ... (la resta del codi del Loader igual)
  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: '#121212', zIndex: 9999,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      color: 'white', fontFamily: 'var(--font-titol)'
    }}>
      <div style={{ fontSize: '6rem', fontWeight: '700' }}>{progress}%</div>
      <div style={{ width: '300px', height: '2px', backgroundColor: '#222', marginTop: '20px' }}>
        <div style={{ height: '100%', backgroundColor: 'white', width: `${progress}%`, transition: 'width 0.3s ease-out' }} />
      </div>
    </div>
  );
}