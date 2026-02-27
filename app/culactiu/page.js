'use client';
import Navbar from '../../components/Navbar';

export default function CulactiuProject() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      width: '100vw', 
      backgroundColor: 'var(--background)', 
      color: 'var(--foreground)',
      paddingTop: '120px', /* Deixem espai a dalt perquè la barra fixa no tapi el text */
      paddingBottom: '40px',
      paddingLeft: '30px',
      paddingRight: '30px',
      fontFamily: 'var(--font-cos)'
    }}>
      
      {/* AQUÍ INCLOEM LA BARRA SUPERIOR GLOBAL */}
      <Navbar title ="Culactiu" />

      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontFamily: 'var(--font-titol)', 
          fontSize: '4rem', 
          fontWeight: '700',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          Culactiu
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--subtext)', maxWidth: '600px' }}>
          Pàgina en construcció...
        </p>
      </section>

    </main>
  );
}