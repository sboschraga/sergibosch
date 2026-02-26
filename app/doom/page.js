'use client';
import Link from 'next/link';

export default function DoomProject() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: 'var(--background)', 
      color: 'var(--foreground)',
      padding: '40px 30px',
      fontFamily: 'var(--font-cos)'
    }}>
      
      {/* Botó per tornar a l'inici */}
      <nav style={{ marginBottom: '60px' }}>
        <Link 
          href="/" 
          style={{ 
            fontFamily: 'var(--font-titol)', 
            textTransform: 'uppercase', 
            fontSize: '1rem',
            color: 'var(--nav-text)',
            cursor: 'pointer'
          }}
        >
          ← Back to Home
        </Link>
      </nav>

      {/* Contingut del projecte */}
      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-titol)', 
          fontSize: '4rem', 
          fontWeight: '700',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          The Doom Race
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--subtext)', maxWidth: '600px' }}>
          Aquest és l'espai buit pel teu projecte. Què hi vols posar?
        </p>
      </section>

    </main>
  );
}