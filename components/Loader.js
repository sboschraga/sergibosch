'use client';
import { useEffect, useState } from 'react';

export default function Loader({ onFinished }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500; // Durada total de l'animació (2.5 segons)
    const intervalTime = 20; 
    const totalSteps = duration / intervalTime;
    const increment = 100 / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      const displayValue = Math.min(Math.round(start), 100);
      
      setProgress(displayValue);

      if (start >= 100) {
        clearInterval(timer);
        setTimeout(onFinished, 500); // Petita pausa al 100% per impacte visual
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onFinished]);

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
      <div style={{ 
        fontSize: '7rem', 
        fontWeight: '800', 
        fontVariantNumeric: 'tabular-nums', 
        letterSpacing: '-5px',
        lineHeight: 1
      }}>
        {progress}
      </div>

      <div style={{ 
        width: '120px', 
        height: '1px', 
        backgroundColor: '#333', 
        marginTop: '20px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          height: '100%', 
          backgroundColor: 'white', 
          width: `${progress}%`, 
          transition: 'width 0.1s linear' 
        }} />
      </div>

      <p style={{ 
        marginTop: '40px', 
        fontSize: '0.65rem', 
        color: '#444', 
        letterSpacing: '5px',
        textTransform: 'uppercase'
      }}>
        Loading Experience
      </p>
    </div>
  );
}