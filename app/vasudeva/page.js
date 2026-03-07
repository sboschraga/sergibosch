'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import FlyingPosters from '../../components/FlyingPosters';

const posterItems = [
  '/vasudeva/poster1.png', 
  '/vasudeva/poster2.png'
];

// GIFS MOLT MÉS PETITS, MANTENINT L'ESGLAONAMENT
const vasudevaGifs = [
  { src: '/vasudeva/gif1.gif', width: 'clamp(80px, 15vw, 250px)' }, 
  { src: '/vasudeva/gif2.gif', width: 'clamp(50px, 10vw, 180px)' }, 
  { src: '/vasudeva/gif3.gif', width: 'clamp(30px, 6vw, 100px)' }   
];

// 6 IMATGES DEL PROJECTE
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

  // AUTO-SLIDE de la petita targeta de la pàgina
  useEffect(() => {
    if (isLightboxOpen) return; 
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isLightboxOpen]); 

  // NAVEGACIÓ
  const nextImage = (e) => {
    e.stopPropagation(); 
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openLightbox = (idx = 0) => {
    setCurrentIndex(idx);
    setIsLightboxOpen(true);
  };

  return (
    <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-cos)', overflowX: 'hidden' }}>
      
      <Navbar title="Vasudeva" />

      {/* =========================================
          SECCIÓ 1: INTRODUCCIÓ (TEXT + POSTERS)
          ========================================= */}
      <section style={{ 
        display: 'flex', 
        minHeight: '75vh', 
        padding: 'var(--spacing-section) clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)', 
        maxWidth: '1600px', 
        margin: '0 auto',
        gap: 'var(--gap-large)' 
      }}>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-titol)', 
            fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
            fontWeight: '700',
            textTransform: 'uppercase',
            marginBottom: 'clamp(20px, 3vh, 30px)', 
            lineHeight: '1.1',
            letterSpacing: '1px',
            color: 'var(--foreground)'
          }}>
            VASUDEVA
          </h1>
          
          <div style={{ 
            fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)', 
            color: 'var(--muted-foreground)', 
            maxWidth: 'clamp(450px, 40vw, 600px)', 
            lineHeight: '1.7', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 'clamp(10px, 1.5vh, 15px)' 
          }}>
            <p>Vasudeva is a 2D indie video game. Inspired by Hermann Hesse’s Siddhartha, it centers on the character Vasudeva and the idea of time as a flowing, eternal river. The game invites players on a reflective journey through themes of grief, healing, and self-discovery.</p>
            <p>With a meditative tone and watercolor-inspired visuals, Vasudeva offers an emotionally rich experience focused on presence and inner peace. It emphasizes storytelling and atmosphere to create a meaningful and contemplative journey.</p>
            <p>Falling within the narrative-driven indie adventure genre, the game draws from philosophical fiction and emotionally immersive titles. Built with Unity, it combines simple mechanics with deep themes to offer a unique and thoughtful gaming experience.</p>
            <p style={{ marginTop: '10px', fontFamily: 'var(--font-titol)', fontSize: 'clamp(0.85rem, 0.9vw, 0.95rem)', color: 'var(--foreground)', fontWeight: '500' }}>
              Developed at Elisava, 2025.
            </p>
          </div>
        </div>

        <div style={{ flex: 1, position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
          <FlyingPosters items={posterItems} planeWidth={400} planeHeight={600} distortion={2} />
        </div>

      </section>

      {/* =========================================
          SECCIÓ INTERMÈDIA: CINTA DE GIFS MULTI-VELOCITAT
          ========================================= */}
      <section style={{ 
        width: '100%', 
        padding: 'clamp(10px, 3vh, 30px) 0', 
        backgroundColor: 'var(--background)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="marquee-container" style={{ height: 'clamp(80px, 15vw, 250px)' }}> 
          
          <div className="marquee-track marquee-track-1">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} style={{ display: 'flex', width: '100vw', justifyContent: 'center', alignItems: 'flex-end', flexShrink: 0 }}>
                <div style={{ width: vasudevaGifs[0].width, flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img src={vasudevaGifs[0].src} alt="Gameplay Gran" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="marquee-track marquee-track-2">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} style={{ display: 'flex', width: '100vw', justifyContent: 'flex-start', paddingLeft: '15vw', alignItems: 'flex-end', flexShrink: 0 }}>
                <div style={{ width: vasudevaGifs[1].width, flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img src={vasudevaGifs[1].src} alt="Gameplay Mitjà" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="marquee-track marquee-track-3">
            {[...Array(4)].map((_, setIndex) => (
              <div key={setIndex} style={{ display: 'flex', width: '100vw', justifyContent: 'flex-end', paddingRight: '20vw', alignItems: 'flex-end', flexShrink: 0 }}>
                <div style={{ width: vasudevaGifs[2].width, flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <img src={vasudevaGifs[2].src} alt="Gameplay Petit" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          SECCIÓ 2: GALERIA I TRÀILER
          ========================================= */}
      <section style={{ 
        height: 'clamp(60vh, 75vh, 800px)', 
        width: '100%', 
        display: 'flex', 
        padding: 'clamp(20px, 5vh, 40px) clamp(20px, 5vw, 60px) clamp(40px, 5vh, 80px)', 
        gap: '20px', 
        backgroundColor: 'var(--background)'
      }}>
        
        {/* ESQUERRA: Galeria (Targeta clicable) */}
        <div 
          className="media-container"
          onClick={() => openLightbox()}
          style={{
            flex: 1, 
            position: 'relative', 
            cursor: 'zoom-in',
            borderRadius: '16px', 
            border: '1px solid var(--border)', 
            backgroundColor: '#000', 
            overflow: 'hidden',
          }}
        >
          <div className="media-content" style={{ width: '100%', height: '100%' }}>
            <div style={{
              display: 'flex', width: '100%', height: '100%',
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' 
            }}>
              {galleryImages.map((src, idx) => (
                <div key={idx} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                  <Image src={src} alt={`Captura ${idx + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="overlay-text">PROJECT PHOTOS</div>

          <button onClick={prevImage} className="nav-arrow left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button onClick={nextImage} className="nav-arrow right">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        {/* DRETA: Tràiler del Joc */}
        <div 
          className="media-container"
          style={{
            flex: 1, 
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            backgroundColor: '#000' 
          }}
        >
          <div className="media-content" style={{ width: '100%', height: '100%' }}>
            <video controls autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src="/vasudeva/trailer.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="overlay-text">TRAILER</div>
        </div>

      </section>

      {/* =========================================
          LIGHTBOX COPIAT EXACTAMENT DE CULACTIU
          ========================================= */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)} // Clic fora de la foto per tancar
          style={{ 
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 1000, 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            cursor: 'zoom-out' 
          }}
        >
          <span 
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }} 
            style={{ position: 'absolute', top: '30px', right: '40px', color: 'white', fontFamily: 'var(--font-titol)', fontSize: '2rem', cursor: 'pointer', zIndex: 1010 }}
          >✕</span>

          {/* Fletxes de navegació del Lightbox utilitzant la classe unificada */}
          <button onClick={prevImage} className="lightbox-arrow left">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button onClick={nextImage} className="lightbox-arrow right">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Contenidor Principal d'Imatges */}
          <div 
            style={{ 
              position: 'relative', width: '90vw', height: '65vh', marginTop: '10px', overflow: 'hidden', 
              cursor: 'zoom-out' 
            }}
          >
            <div style={{
              display: 'flex', width: '100%', height: '100%', transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
            }}>
              {galleryImages.map((src, idx) => (
                <div key={idx} style={{ minWidth: '100%', height: '100%', position: 'relative' }}>
                  <Image src={src} alt={`Fullscreen ${idx + 1}`} fill sizes="90vw" style={{ objectFit: 'contain', borderRadius: '5px' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Carrusel Inferior de Miniatures */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              display: 'flex', gap: '15px', marginTop: '20px', maxWidth: '90vw', 
              overflowX: 'auto', paddingBottom: '10px',
              scrollbarWidth: 'none', msOverflowStyle: 'none'
            }}
          >
            {galleryImages.map((src, idx) => (
              <div 
                key={idx} 
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                style={{ 
                  position: 'relative', width: '90px', height: '50px', flexShrink: 0, 
                  cursor: 'pointer', 
                  borderRadius: '5px', overflow: 'hidden',
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

      {/* ESTILS GLOBALS */}
      <style dangerouslySetInnerHTML={{__html: `
        /* ===== ESTILS DEL MARQUEE (CINTA DE GIFS) ===== */
        .marquee-container { width: 100%; overflow: hidden; position: relative; padding-bottom: 2px; }
        .marquee-container::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background-color: var(--foreground); }
        .marquee-track { display: flex; width: max-content; position: absolute; bottom: 2px; left: 0; height: 100%; }
        
        .marquee-track-1 { animation: scrollMarquee 17s linear infinite; z-index: 3; }
        .marquee-track-2 { animation: scrollMarquee 15s linear infinite; z-index: 2; }
        .marquee-track-3 { animation: scrollMarquee 23s linear infinite; z-index: 1; }

        @keyframes scrollMarquee { from { transform: translateX(-50%); } to { transform: translateX(-0); } }

        /* ===== ESTILS DE LA GALERIA I VIDEO ===== */
        .media-content { filter: brightness(0.4) grayscale(20%); transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); }
        .media-container:hover .media-content { filter: brightness(1) grayscale(0%); }

        .overlay-text {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          font-family: var(--font-text); font-size: clamp(1rem, 1.5vw, 1.5rem); font-weight: 600;
          color: #ffffff; letter-spacing: 3px; text-transform: uppercase;
          pointer-events: none; z-index: 5; transition: opacity 0.4s ease, transform 0.4s ease;
          text-shadow: 0 2px 8px rgba(0,0,0,0.8); 
        }
        .media-container:hover .overlay-text { opacity: 0; transform: translate(-50%, -45%); }

        /* FLETXES DE LA GALERIA PETITA (PÀGINA) */
        .nav-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px;
          border-radius: 50%; background-color: var(--background); color: var(--foreground);
          border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
          cursor: pointer; opacity: 0.5; transition: all 0.3s ease; z-index: 10; box-shadow: var(--shadow-sm);
        }
        .media-container:hover .nav-arrow { opacity: 1; }
        .nav-arrow:hover { background-color: var(--foreground); color: var(--background); }
        .nav-arrow.left { left: 20px; }
        .nav-arrow.right { right: 20px; }

        /* FLETXES DEL LIGHTBOX GRAN (UNIFICADES) */
        .lightbox-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); width: 56px; height: 56px;
          border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.3s ease; z-index: 1015; backdrop-filter: blur(4px);
        }
        .lightbox-arrow:hover { background-color: rgba(255, 255, 255, 0.2); border-color: rgba(255, 255, 255, 0.6); transform: translateY(-50%) scale(1.05); }
        .lightbox-arrow.left { left: 40px; }
        .lightbox-arrow.right { right: 40px; }

      `}} />
    </main>
  );
}