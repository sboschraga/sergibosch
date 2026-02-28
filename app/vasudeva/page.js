'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import FlyingPosters from '../../components/FlyingPosters';

const posterItems = [
  '/vasudeva/poster1.png', 
  '/vasudeva/poster2.png'
];

const galleryImages = [
  '/vasudeva/Vasudeva_1.png',
  '/vasudeva/Vasudeva_2.png',
  '/vasudeva/Vasudeva_3.png',
  '/vasudeva/Vasudeva_4.png',
  '/vasudeva/Vasudeva_5.png',
  '/vasudeva/Vasudeva_6.png'
];

export default function VasudevaProject() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // AUTO-SLIDE: Canvia de foto cada 4 segons. S'atura si obres el Lightbox.
  useEffect(() => {
    if (isLightboxOpen) return; 
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isLightboxOpen]);

  const nextImage = (e) => {
    e.stopPropagation(); 
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
        padding: 'var(--spacing-section) clamp(20px, 4vw, 40px) 40px clamp(20px, 4vw, 40px)', 
        maxWidth: '1600px', 
        margin: '0 auto',
        gap: 'var(--gap-large)' 
      }}>
        
        {/* ESQUERRA: Text */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-poiret)', 
            fontSize: 'var(--text-h1)', 
            fontWeight: '400',
            textTransform: 'uppercase',
            marginBottom: 'var(--gap-medium)', 
            lineHeight: '1',
            letterSpacing: '2px'
          }}>
            Vasudeva
          </h1>
          
          <div style={{ 
            fontSize: 'var(--text-body)', 
            color: 'var(--subtext)', 
            maxWidth: '550px', 
            lineHeight: '1.6', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'var(--gap-small)' 
          }}>
            <p>Vasudeva is a 2D indie video game. Inspired by Hermann Hesse’s Siddhartha, it centers on the character Vasudeva and the idea of time as a flowing, eternal river. The game invites players on a reflective journey through themes of grief, healing, and self-discovery.</p>
            <p>With a meditative tone and watercolor-inspired visuals, Vasudeva offers an emotionally rich experience focused on presence and inner peace. It emphasizes storytelling and atmosphere to create a meaningful and contemplative journey.</p>
            <p>Falling within the narrative-driven indie adventure genre, the game draws from philosophical fiction and emotionally immersive titles. Built with Unity, it combines simple mechanics with deep themes to offer a unique and thoughtful gaming experience.</p>
            <p style={{ marginTop: 'var(--gap-small)', fontFamily: 'var(--font-titol)', fontSize: 'var(--text-small)', color: 'var(--nav-text)' }}>
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
          SECCIÓ 2: GALERIA I TRÀILER
          ========================================= */}
      <section style={{ 
        height: 'clamp(60vh, 75vh, 800px)', 
        width: '100%', 
        display: 'flex', 
        padding: 'clamp(40px, 5vh, 80px) clamp(20px, 5vw, 60px)', 
        gap: '20px', 
        backgroundColor: 'var(--background)'
      }}>
        
        {/* ESQUERRA: Galeria Slider amb Desplaçament */}
        <div 
          onClick={() => setIsLightboxOpen(true)}
          style={{
            flex: 1, 
            position: 'relative', 
            cursor: 'zoom-in',
            borderRadius: '10px', 
            border: '1px solid var(--border-color)', 
            backgroundColor: 'var(--background)',
            overflow: 'hidden' /* <-- Amaga les fotos que queden a fora */
          }}
        >
          {/* TRACK DEL SLIDER */}
          <div style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            transform: `translateX(-${currentIndex * 100}%)`, /* <-- Mou el carril */
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' /* <-- Transició molt suau */
          }}>
            {galleryImages.map((src, idx) => (
              <div key={idx} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                <Image 
                  src={src} 
                  alt={`Vasudeva Captura ${idx + 1}`} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain', padding: 'clamp(10px, 2vw, 30px)' }}
                />
              </div>
            ))}
          </div>

          {/* Fletxes de navegació */}
          <button onClick={prevImage} style={arrowStyle('left')}>←</button>
          <button onClick={nextImage} style={arrowStyle('right')}>→</button>
        </div>

        {/* DRETA: Tràiler del Joc */}
        <div style={{
          flex: 1, 
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '10px',
          border: '1px solid var(--border-color)',
          backgroundColor: '#000' 
        }}>
          <video 
            controls 
            autoPlay 
            loop 
            muted 
            playsInline 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/vasudeva/trailer.mp4" type="video/mp4" />
          </video>
        </div>

      </section>

      {/* =========================================
          LIGHTBOX AMB SLIDER I MINIATURES
          ========================================= */}
      {isLightboxOpen && (
        <div style={{ 
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 1000, 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' 
        }}>
          
          <span 
            onClick={() => setIsLightboxOpen(false)} 
            style={{ position: 'absolute', top: '30px', right: '40px', color: 'white', fontFamily: 'var(--font-titol)', fontSize: '2rem', cursor: 'pointer', zIndex: 1010 }}
          >✕</span>

          <button onClick={prevImage} style={arrowStyle('left')}>←</button>
          <button onClick={nextImage} style={arrowStyle('right')}>→</button>

          {/* Imatge Principal (Ara amb carril animat igual que la galeria petita) */}
          <div style={{ position: 'relative', width: '90vw', height: '70vh', marginTop: '20px', overflow: 'hidden' }}>
            <div style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
            }}>
              {galleryImages.map((src, idx) => (
                <div key={idx} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                  <Image src={src} alt={`Fullscreen ${idx + 1}`} fill sizes="90vw" style={{ objectFit: 'contain', borderRadius: '5px' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Tira de Miniatures Inferior */}
          <div style={{ 
            display: 'flex', gap: '15px', marginTop: '30px', maxWidth: '90vw', 
            overflowX: 'auto', paddingBottom: '10px',
            scrollbarWidth: 'none', msOverflowStyle: 'none'
          }}>
            {galleryImages.map((src, idx) => (
              <div 
                key={idx} 
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                style={{ 
                  position: 'relative', width: '90px', height: '50px', flexShrink: 0, 
                  cursor: 'pointer', borderRadius: '5px', overflow: 'hidden',
                  opacity: idx === currentIndex ? 1 : 0.4, 
                  border: idx === currentIndex ? '2px solid white' : '2px solid transparent',
                  transition: 'all 0.3s ease' 
                }}
              >
                <Image src={src} alt={`Thumbnail ${idx + 1}`} fill sizes="90px" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>

        </div>
      )}

    </main>
  );
}

// Estils de fletxes
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