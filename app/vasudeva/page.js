'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import FlyingPosters from '../../components/FlyingPosters';

export default function VasudevaProject() {
  const [hoveredGallery, setHoveredGallery] = useState(null);
  
  // Estats per a la galeria d'imatges
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Definim les imatges dels Flying Posters
  const posterItems = [
    '/vasudeva/poster1.png', 
    '/vasudeva/poster2.png'
  ];

  // Les teves rutes reals de fotos
  const galleryImages = [
    '/vasudeva/Vasudeva_1.png',
    '/vasudeva/Vasudeva_2.png',
    '/vasudeva/Vasudeva_3.png',
    '/vasudeva/Vasudeva_4.png',
    '/vasudeva/Vasudeva_5.png',
    '/vasudeva/Vasudeva_6.png'
  ];

  // Funcions per passar fotos de la galeria
  const nextImage = (e) => {
    e.stopPropagation(); // Evita que en clicar la fletxa s'obri el lightbox
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-cos)', overflowX: 'hidden' }}>
      
      <Navbar title="Vasudeva" />

      {/* =========================================
          SECCIÓ 1: INTRODUCCIÓ (TEXT + POSTERS)
          ========================================= */}
      <section style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        padding: 'clamp(80px, 10vh, 120px) clamp(20px, 4vw, 40px) 40px clamp(20px, 4vw, 40px)', 
        maxWidth: '1600px', 
        margin: '0 auto',
        gap: 'clamp(30px, 6vw, 80px)' /* <-- Distància fluida entre text i pòsters */
      }}>
        
        {/* ESQUERRA: Text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-titol)', 
            fontSize: 'clamp(2.2rem, 4vw, 4.5rem)', /* <-- Molt més equilibrat per a portàtils */
            fontWeight: '700',
            textTransform: 'uppercase',
            marginBottom: 'clamp(15px, 2vw, 30px)', 
            lineHeight: '1'
          }}>
            Vasudeva
          </h1>
          
          <div style={{ 
            fontSize: 'clamp(0.85rem, 1.1vw, 1.1rem)', /* <-- Text base més petit en pantalles d'13" o 15" */
            color: 'var(--subtext)', 
            maxWidth: '550px', /* Restringim una mica l'amplada màxima perquè quedi més bloc */
            lineHeight: '1.6', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'clamp(12px, 1.5vw, 20px)' /* <-- L'espai entre paràgrafs també s'encongeix al portàtil */
          }}>
            <p>Vasudeva is a 2D indie video game. Inspired by Hermann Hesse’s Siddhartha, it centers on the character Vasudeva and the idea of time as a flowing, eternal river. The game invites players on a reflective journey through themes of grief, healing, and self-discovery.</p>
            <p>With a meditative tone and watercolor-inspired visuals, Vasudeva offers an emotionally rich experience focused on presence and inner peace. It emphasizes storytelling and atmosphere to create a meaningful and contemplative journey.</p>
            <p>Falling within the narrative-driven indie adventure genre, the game draws from philosophical fiction and emotionally immersive titles. Built with Unity, it combines simple mechanics with deep themes to offer a unique and thoughtful gaming experience.</p>
            <p style={{ marginTop: 'clamp(10px, 2vw, 20px)', fontFamily: 'var(--font-titol)', fontSize: 'clamp(0.75rem, 0.9vw, 0.9rem)', color: 'var(--nav-text)' }}>
              Developed at Elisava, 2025.
            </p>
          </div>
        </div>

        {/* DRETA: Flying Posters (WebGL) */}
        <div style={{ flex: 1, position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
          <FlyingPosters items={posterItems} planeWidth={400} planeHeight={600} distortion={2} />
        </div>

      </section>

      {/* =========================================
          SECCIÓ 2: GALERIA DINÀMICA (FOTOS + VÍDEO)
          ========================================= */}
      <section style={{ height: '100vh', width: '100vw', display: 'flex', borderTop: '1px solid var(--border-color)' }}>
        
        {/* ESQUERRA: Galeria d'una foto amb fletxes i efecte Acordió */}
        <div 
          onMouseEnter={() => setHoveredGallery('left')}
          onMouseLeave={() => setHoveredGallery(null)}
          onClick={() => setIsLightboxOpen(true)} // Obre el zoom en clicar
          style={{
            width: hoveredGallery === 'left' ? '80%' : hoveredGallery === 'right' ? '20%' : '60%',
            height: '100%',
            transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            borderRight: '1px solid var(--border-color)',
            padding: '20px',
            position: 'relative',
            cursor: 'zoom-in', // Canvia el cursor per indicar que es pot fer zoom
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--background)'
          }}
        >
          {/* Imatge actual de la galeria */}
          <img 
            src={galleryImages[currentIndex]} 
            alt={`Vasudeva ${currentIndex + 1}`} 
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '10px', transition: 'opacity 0.3s ease' }}
          />

          {/* FLETXES DE NAVEGACIÓ (Només es veuen si la galeria no està encongida al 20%) */}
          {hoveredGallery !== 'right' && (
            <>
              <button onClick={prevImage} style={arrowStyle('left')}>←</button>
              <button onClick={nextImage} style={arrowStyle('right')}>→</button>
            </>
          )}
        </div>

        {/* DRETA: Vídeo (Acordió) */}
        <div 
          onMouseEnter={() => setHoveredGallery('right')}
          onMouseLeave={() => setHoveredGallery(null)}
          style={{
            width: hoveredGallery === 'right' ? '80%' : hoveredGallery === 'left' ? '20%' : '40%',
            height: '100%',
            transition: 'width 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--background)'
          }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
             {/* El teu vídeo de Vasudeva */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src="/vasudeva/trailer.mp4" type="video/mp4" />
            </video>
            
            {/* Títol que apareix quan la columna de vídeo està estreta */}
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
              opacity: hoveredGallery === 'right' ? 0 : 1,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none'
            }}>
               <h2 style={{ color: 'white', fontFamily: 'var(--font-titol)', textTransform: 'uppercase' }}>
                 Gameplay Video
               </h2>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================
          LIGHTBOX (ZOOM FOTOS)
          ========================================= */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          style={{ 
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1000, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' 
          }}
        >
          <img 
            src={galleryImages[currentIndex]} 
            alt="Fullscreen" 
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '5px' }}
          />
          <span style={{ position: 'absolute', top: '30px', right: '40px', color: 'white', fontFamily: 'var(--font-titol)', fontSize: '2rem' }}>✕</span>
        </div>
      )}

    </main>
  );
}

// Funcions d'estil per les fletxes de la galeria per no embrutar el codi principal
const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: '40px',
  transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.5)',
  color: 'white',
  border: '1px solid rgba(255,255,255,0.2)',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  fontSize: '1.5rem',
  cursor: 'pointer',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
});