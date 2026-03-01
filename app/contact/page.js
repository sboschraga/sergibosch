'use client';
import Navbar from '../../components/Navbar';

export default function ContactPage() {
  return (
    <main style={{ 
      backgroundColor: 'var(--background)', 
      color: 'var(--foreground)', 
      fontFamily: 'var(--font-cos)', 
      minHeight: '100vh', 
      overflowX: 'hidden'
    }}>
      
      <Navbar title="Contact" />

      <section style={{ 
        padding: 'calc(var(--spacing-section) + 50px) clamp(20px, 5vw, 60px) 100px', 
        maxWidth: '1000px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--gap-large)'
      }}>
        <h1 style={{ 
          fontFamily: 'var(--font-titol)', 
          fontSize: 'var(--text-h1)', 
          textTransform: 'uppercase', 
          fontWeight: '700',
          lineHeight: '1'
        }}>
          Contact
        </h1>
        
        <p style={{ 
          fontSize: 'var(--text-body)', 
          lineHeight: '1.6', 
          color: 'var(--subtext)',
          maxWidth: '650px'
        }}>
          Deixa'm un missatge o connectem a través de les xarxes. Aquí afegirem els teus enllaços (Correu, LinkedIn, etc.).
        </p>
      </section>

    </main>
  );
}