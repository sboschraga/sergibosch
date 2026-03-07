'use client';
import Navbar from '../../components/Navbar';
import BlobCursor from '../../components/BlobCursor';
import ScrollReveal from '../../components/ScrollReveal'; // <-- AQUEST ÉS L'IMPORT QUE FALTAVA!

export default function MalRealProject() {
  return (
    <main style={{ 
      position: 'relative', 
      backgroundColor: 'var(--background)', 
      color: 'var(--foreground)', 
      fontFamily: 'var(--font-cos)', 
      minHeight: '100vh', 
      overflowX: 'hidden' 
    }}>
      
      {/* CONTENIDOR DEL CURSOR (EFECTE NEGATIU) */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        zIndex: 9999, pointerEvents: 'none', mixBlendMode: 'difference' 
      }}>
        <BlobCursor
          blobType="circle"
          fillColor="#ffffff" 
          innerColor="#ffffff" 
          trailCount={3}
          sizes={[60, 125, 75]}
          innerSizes={[20, 35, 25]}
          opacities={[1, 1, 1]} 
          shadowColor="transparent" 
          shadowBlur={0}
          shadowOffsetX={0}
          shadowOffsetY={0}
          filterStdDeviation={20}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={100}
        />
      </div>

      {/* LA BARRA DE NAVEGACIÓ */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100 }}>
        <Navbar title="Mal Real" invertOnHero={true} />
      </div>

      {/* =========================================
          SECCIÓ 1: VÍDEO FULL SCREEN
          ========================================= */}
      <section style={{ 
        position: 'relative',
        width: '100vw',
        height: '100vh', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000' 
      }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/malreal/video.mp4" type="video/mp4" />
        </video>
      </section>

      {/* =========================================
          SECCIÓ 2: TEXT EXPLICATIU I VÍDEO DRETA
          ========================================= */}
      <section style={{ 
        display: 'flex', 
        minHeight: '75vh', 
        padding: 'var(--spacing-section) clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)', 
        maxWidth: '1600px', 
        margin: '0 auto',
        gap: 'var(--gap-large)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        
        {/* ESQUERRA: Textos amb animació */}
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <ScrollReveal
            as="h1"
            baseOpacity={0}
            enableBlur={true}
            blurStrength={10} 
            startOffset="top 90%" 
            wordAnimationEnd="bottom 30%" 
            textStyle={{ 
              fontFamily: 'var(--font-titol)', 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              fontWeight: '700',
              textTransform: 'uppercase',
              marginBottom: 'clamp(20px, 3vh, 30px)', 
              lineHeight: '1.1',
              letterSpacing: '1px',
              color: 'var(--foreground)'
            }}
          >
            MAL REAL
          </ScrollReveal>
          
          <div style={{ 
            fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)', 
            color: 'var(--muted-foreground)', 
            maxWidth: 'clamp(450px, 40vw, 600px)', 
            lineHeight: '1.7', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'clamp(15px, 2vh, 20px)' 
          }}>
            
            <ScrollReveal
              as="p"
              baseOpacity={0.1}
              enableBlur={true}
              blurStrength={5}
              startOffset="top 85%" 
              wordAnimationEnd="bottom 45%" 
            >
              This project aims to express the pain and confusion experienced when ending a relationship with no hard feelings. It explores the use of paper and typography to convey the message, “is it real if it doesn’t hurt?” The audiovisual approach seeks to evoke a sense of cruelty, confusion, and rawness, capturing the emotional complexity of the message.
              As a final activity, “guerrilla”-like projections were conducted in various public locations.
            </ScrollReveal>

            <p style={{ marginTop: '10px', fontFamily: 'var(--font-titol)', fontSize: 'clamp(0.85rem, 0.9vw, 0.95rem)', color: 'var(--foreground)', fontWeight: '500' }}>
              Developed at Elisava, 2024.
            </p>
          </div>
        </div>

        {/* DRETA: Vídeo Reproductor amb Hover */}
        <div style={{ flex: '1 1 500px', position: 'relative' }}>
          
          <div 
            className="guerrilla-video-container clickable-element"
            style={{ 
              position: 'relative', 
              width: '100%', 
              borderRadius: '8px', 
              overflow: 'hidden',
              backgroundColor: '#111' 
            }}
          >
            <video 
              controls 
              playsInline 
              style={{ width: '100%', display: 'block', objectFit: 'cover' }}
            >
              <source src="/malreal/video-guerrilla.mp4" type="video/mp4" />
            </video>

            <div className="guerrilla-overlay">
              <span>GUERRILLA PROJECTIONS</span>
            </div>
          </div>

        </div>

      </section>

     {/* ESTILS PER A L'EFECTE HOVER DEL VÍDEO */}
      <style dangerouslySetInnerHTML={{__html: `
        .guerrilla-video-container .guerrilla-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6); /* Fons enfosquit constant */
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-titol);
          font-size: clamp(1rem, 2vw, 1.5rem);
          letter-spacing: 2px;
          text-transform: uppercase;
          
          /* Canvi principal: Ara és totalment visible per defecte */
          opacity: 1; 
          transition: opacity 0.4s ease;
          pointer-events: none; 
        }

        /* En fer hover, l'overlay s'amaga i deixa veure el vídeo clar */
        .guerrilla-video-container:hover .guerrilla-overlay {
          opacity: 0;
        }
      `}} />

    </main>
  );
}