'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

// TORNEM AL TEU ARRAY EXACTE: Els textos tornaran a la seva posició perfecta.
const layoutItems = [
  { id: 'txt1', type: 'text', title: 'The Pause', text: 'In a city dominated by social acceleration and a frenetic drive for productivity, where every corner is designed for consumption or transit, where are the spaces for pause?', width: 'clamp(250px, 25vw, 400px)', align: 'flex-end', ml: '0%', y: '40px', x: '2vw' },
  
  // MANTENIM L'IMG2 PERQUÈ NO ES TRENCQUI EL DISSENY, però li posem la foto 1 perquè no es vegi repetida al costat del pont.
  { id: 'img2', type: 'image', src: '/culactiu/culactiu_1.jpg', width: 'clamp(200px, 20vw, 320px)', align: 'center', ml: '4%', y: '-40px', x: '3vw' },
  
  { id: 'img3', type: 'image', src: '/culactiu/culactiu_3.jpg', width: 'clamp(140px, 14vw, 220px)', align: 'flex-start', ml: '2%', y: '80px', x: '-3vw' },
  { id: 'img4', type: 'image', src: '/culactiu/culactiu_4.jpg', width: 'clamp(250px, 22vw, 380px)', align: 'flex-end', ml: '8%', y: '-10px', x: '4vw' },
  
  // He posat el .jpg a la foto 11 perquè no falli!
  { id: 'img5', type: 'image', src: '/culactiu/culactiu_11.jpg', width: 'clamp(150px, 16vw, 240px)', align: 'center', ml: '0%', y: '-60px', x: '-2vw' },
  
  { id: 'txt2', type: 'text', title: 'Formal Analysis', text: 'How do you interpret a space with no exit? We’ve created a formal analysis protocol that turns the morphology of the cul-de-sac into a visual language. Through five key typologies, form, length, ending, access, and flow, every alleyway yields its own graphic signature. These icons aren’t just informative; they are the milestones of a city that refuses to be homogenized.', width: 'clamp(250px, 25vw, 450px)', align: 'flex-start', ml: '12%', y: '30px', x: '-1vw' },
  { id: 'img6', type: 'image', src: '/culactiu/culactiu_6.jpg', width: 'clamp(180px, 18vw, 280px)', align: 'center', ml: '5%', y: '40px', x: '2vw' },
  { id: 'img7', type: 'image', src: '/culactiu/culactiu_7.jpg', width: 'clamp(220px, 24vw, 350px)', align: 'flex-end', ml: '0%', y: '-50px', x: '-4vw' },
  { id: 'img8', type: 'image', src: '/culactiu/culactiu_8.jpg', width: 'clamp(160px, 15vw, 260px)', align: 'flex-start', ml: '8%', y: '60px', x: '3vw' },
  { id: 'txt3', type: 'text', title: 'Action Protocols', text: 'Culactiu goes beyond the screen. We present five action protocols designed to activate the cul-de-sac through physical presence. Ranging from Cleaning to the Wall every action serves as a claim to citizen sovereignty.', width: 'clamp(260px, 26vw, 420px)', align: 'center', ml: '2%', y: '-30px', x: '-2vw' },
  { id: 'img9', type: 'image', src: '/culactiu/culactiu_9.jpg', width: 'clamp(190px, 19vw, 300px)', align: 'flex-end', ml: '6%', y: '20px', x: '5vw' },
  { id: 'img10', type: 'image', src: '/culactiu/culactiu_5.jpg', width: 'clamp(150px, 14vw, 230px)', align: 'flex-start', ml: '0%', y: '-70px', x: '-3vw' },
  
  // Atenció: També he posat el .jpg a la foto 10 per curar-nos en salut
  { id: 'img11', type: 'image', src: '/culactiu/culactiu_10.jpg', width: 'clamp(240px, 21vw, 340px)', align: 'center', ml: '10%', y: '10px', x: '1vw' },
];

// Utilitzem un "Set" de Javascript que és màgic: agafa totes les fotos, elimina automàticament qualsevol duplicat, i ens torna una llista neta de les 11 fotos per al Lightbox!
const galleryImages = [...new Set([
  '/culactiu/culactiu_1.jpg', 
  '/culactiu/culactiu_2.jpg',
  ...layoutItems.filter(item => item.type === 'image').map(item => item.src)
])];

const cursorPersonalitzat = "url('/cursor_culactiu.png') 16 16, auto";

export default function CulactiuProject() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isSomethingHovered = hoveredIndex !== null;

  const nextImage = (e) => {
    e.stopPropagation(); 
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openLightbox = (src) => {
    const index = galleryImages.findIndex(img => img === src);
    // Si la imatge no és a l'array (com la foto pont si n'hi poses una de diferent), obrim la primera per defecte
    setCurrentIndex(index !== -1 ? index : 0);
    setIsLightboxOpen(true);
  };

  return (
    <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-cos)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      <Navbar title="Culactiu" />

      {/* =========================================
          SECCIÓ 1: INTRODUCCIÓ (AMB FOTO TALLADA AL LÍMIT)
          ========================================= */}
      <section style={{ 
        position: 'relative', // Vital per ancorar la foto "pont" al fons
        display: 'flex', 
        minHeight: '100vh', 
        padding: 'var(--spacing-section) clamp(20px, 4vw, 40px) 40px clamp(20px, 4vw, 40px)', 
        maxWidth: '1600px', 
        margin: '0 auto',
        gap: 'var(--gap-large)' 
      }}>
        
        {/* ESQUERRA: Textos alineats al centre verticalment (ES DIFUMINA) */}
        <div style={{ 
            flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
            transition: 'all 0.4s ease', 
            filter: isSomethingHovered ? 'blur(6px) brightness(0.7)' : 'blur(0px) brightness(1)' // Efecte blur aplicat
        }}>
          <h1 style={{ 
            fontFamily: 'var(--font-titol)', 
            fontSize: 'var(--text-h1)', 
            fontWeight: '700',
            textTransform: 'uppercase',
            marginBottom: 'var(--gap-medium)', 
            lineHeight: '1'
          }}>
            Culactiu
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
            <p>
              This project speaks about the invisible thread that connects the human body to the pavement. It questions the binary of public and private property, proposing instead a "shared belonging" rooted in care and sentiment. Through the lens of the cul-de-sac, a space where the boundaries of the home and the street blur, Cul Actiu examines how we inhabit the city with our bodies. It is an exploration of "intimacy in the public sphere," arguing that we only truly belong to a place when we decide to care for it, regardless of who holds the legal deed.
            </p>

            <p style={{ marginTop: 'var(--gap-small)', marginBottom: '30px', fontFamily: 'var(--font-titol)', fontSize: 'var(--text-small)', color: 'var(--nav-text)' }}>
              Developed at Elisava, 2026.
            </p>

            {/* Evitem que el blur s'apliqui en fer hover directament al botó */}
            <div onMouseEnter={(e) => e.stopPropagation()}>
              <a 
                href="https://culactiu-web.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 28px', border: '1px solid var(--border-color)', borderRadius: '50px', color: 'var(--foreground)', textDecoration: 'none', fontSize: 'var(--text-small)', fontFamily: 'var(--font-titol)', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.3s ease', cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--foreground)'; e.currentTarget.style.color = 'var(--background)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--foreground)'; }}
              >
                Explore the website ↗
              </a>
            </div>
          </div>
        </div>

        {/* DRETA: Imatge introductoria */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div 
            onClick={() => openLightbox('/culactiu/culactiu_1.jpg')}
            onMouseEnter={() => setHoveredIndex('imgTop')}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ 
              width: '100%', 
              maxWidth: '450px', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: isSomethingHovered && hoveredIndex === 'imgTop' ? '0 20px 40px rgba(0,0,0,0.5)' : '0 4px 10px rgba(0,0,0,0.1)',
              transform: isSomethingHovered && hoveredIndex === 'imgTop' ? 'scale(1.08)' : 'scale(1)', 
              transition: 'all 0.4s ease', 
              filter: isSomethingHovered && hoveredIndex !== 'imgTop' ? 'blur(8px) brightness(0.6)' : 'blur(0px) brightness(1)', 
              cursor: cursorPersonalitzat 
            }}
          >
            <Image 
              src="/culactiu/culactiu_1.jpg" 
              alt="Culactiu Hero fragment" 
              width={800} height={1000} 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
          </div>
        </div>

        {/* =========================================
            FOTO TALLADA (PONT CAP A L'SCROLL)
            He usat culactiu_2.jpg com a exemple.
            ========================================= */}
        <div 
          onClick={() => openLightbox('/culactiu/culactiu_2.jpg')} 
          onMouseEnter={() => setHoveredIndex('imgBridge')}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            position: 'absolute',
            bottom: '-80px', // Això fa que quedi "tallada" pel límit de la pantalla
            left: '50%', // Centrada
            transform: `translateX(-50%) ${isSomethingHovered && hoveredIndex === 'imgBridge' ? 'scale(1.08)' : 'scale(1)'}`,
            width: 'clamp(150px, 15vw, 250px)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: isSomethingHovered && hoveredIndex === 'imgBridge' ? '0 20px 40px rgba(0,0,0,0.5)' : '0 4px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.4s ease',
            filter: isSomethingHovered && hoveredIndex !== 'imgBridge' ? 'blur(8px) brightness(0.6)' : 'blur(0px) brightness(1)',
            cursor: cursorPersonalitzat,
            zIndex: 20
          }}
        >
          <Image 
            src="/culactiu/culactiu_2.jpg" 
            alt="Culactiu transition image" 
            width={400} height={600} 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>

      </section>

      {/* =========================================
          GALERIA ESCAMPADA (AMB L'ORDRE ORIGINAL)
          ========================================= */}
      <section 
        onMouseLeave={() => setHoveredIndex(null)}
        style={{ 
          width: '100vw', 
          padding: 'clamp(100px, 15vh, 150px) clamp(20px, 5vw, 80px)', // Padding afegit perquè no es solapi amb la foto pont
          display: 'flex',
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          gap: 'clamp(30px, 5vw, 100px)' 
        }}
      >
        {layoutItems.map((item) => {
          if (item.type === 'image') {
            const isHovered = hoveredIndex === item.id;
            return (
              <div 
                key={item.id}
                onMouseEnter={() => setHoveredIndex(item.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openLightbox(item.src)} 
                style={{ 
                  position: 'relative', width: item.width, alignSelf: item.align, marginLeft: item.ml, transform: `translate(${item.x}, ${item.y}) ${isHovered ? 'scale(1.08)' : 'scale(1)'}`, zIndex: isHovered ? 50 : 1, transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)', filter: isSomethingHovered && !isHovered ? 'blur(8px) brightness(0.6)' : 'blur(0px) brightness(1)', 
                  cursor: cursorPersonalitzat, 
                  borderRadius: '24px', boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.5)' : '0 4px 10px rgba(0,0,0,0.1)', overflow: 'hidden' 
                }}
              >
                <Image src={item.src} alt={`Culactiu peça ${item.id}`} width={800} height={600} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            );
          }

          if (item.type === 'text') {
            return (
              <div 
                key={item.id}
                style={{
                  width: item.width, alignSelf: item.align, marginLeft: item.ml, transform: `translate(${item.x}, ${item.y})`, transition: 'all 0.4s ease', filter: isSomethingHovered ? 'blur(6px) brightness(0.7)' : 'blur(0px) brightness(1)', pointerEvents: 'none' 
                }}
              >
                <p style={{ fontSize: 'var(--text-body)', color: 'var(--subtext)', lineHeight: '1.6' }}>
                  <strong style={{ color: 'var(--foreground)' }}>{item.title}:</strong> {item.text}
                </p>
              </div>
            );
          }
        })}
      </section>

      {/* =========================================
          LIGHTBOX AMB L'ESTIL DE VASUDEVA APLICAT
          ========================================= */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)} // Clic a fora per tancar
          style={{ 
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 1000, 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
            cursor: 'zoom-out' 
          }}
        >
          <span 
            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }} 
            style={{ position: 'absolute', top: '30px', right: '40px', color: 'white', fontFamily: 'var(--font-titol)', fontSize: '2rem', cursor: cursorPersonalitzat, zIndex: 1010 }}
          >✕</span>

          {/* Fletxes de navegació estètica Vasudeva */}
          <button onClick={prevImage} className="lightbox-arrow left">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button onClick={nextImage} className="lightbox-arrow right">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Contenidor Principal de la Imatge Centrat i Bloquejat pel tancament accidental */}
          <div 
            style={{ position: 'relative', width: '100%', maxWidth: '1200px', height: '65vh', marginTop: '20px', overflow: 'hidden', display: 'flex', justifyContent: 'center', cursor: 'zoom-out' }}
          >
            <div style={{
              display: 'flex', height: '100%', transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)', width: '100%'
            }}>
              {galleryImages.map((src, idx) => (
                <div key={idx} style={{ minWidth: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div 
                    onClick={(e) => e.stopPropagation()} 
                    style={{ position: 'relative', width: '100%', height: '100%', cursor: cursorPersonalitzat }}
                  >
                    <Image src={src} alt={`Fullscreen ${idx + 1}`} fill sizes="90vw" style={{ objectFit: 'contain', borderRadius: '0' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carrusel de Miniatures arrodonides */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              display: 'flex', gap: '15px', marginTop: '20px', maxWidth: '90vw', 
              overflowX: 'auto', paddingBottom: '10px',
              scrollbarWidth: 'none', msOverflowStyle: 'none', cursor: cursorPersonalitzat
            }}
          >
            {galleryImages.map((src, idx) => (
              <div 
                key={idx} 
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                style={{ 
                  position: 'relative', width: '90px', height: '50px', flexShrink: 0, 
                  cursor: cursorPersonalitzat, 
                  borderRadius: '8px', overflow: 'hidden',
                  opacity: idx === currentIndex ? 1 : 0.4, 
                  border: idx === currentIndex ? '2px solid white' : '2px solid transparent',
                  transition: 'all 0.3s ease' 
                }}
              >
                <Image src={src} alt={`Thumbnail ${idx + 1}`} fill sizes="90px" style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          {/* Link a la web de Culactiu */}
          <a 
            href="https://culactiu-web.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: '15px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-titol)', fontSize: '0.85rem', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px', letterSpacing: '1px', transition: 'all 0.3s ease',
              cursor: cursorPersonalitzat 
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderBottomColor = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.3)'; }}
          >
            Visit the website ↗
          </a>

        </div>
      )}

      {/* ESTILS GLOBALS (Fletxes de Vasudeva) */}
      <style dangerouslySetInnerHTML={{__html: `
        .lightbox-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); width: 56px; height: 56px;
          border-radius: 50%; background-color: rgba(255, 255, 255, 0.1); color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3); display: flex; align-items: center; justify-content: center;
          cursor: ${cursorPersonalitzat}; transition: all 0.3s ease; z-index: 1015; backdrop-filter: blur(4px);
        }
        .lightbox-arrow:hover { background-color: rgba(255, 255, 255, 0.2); border-color: rgba(255, 255, 255, 0.6); transform: translateY(-50%) scale(1.05); }
        .lightbox-arrow.left { left: 40px; }
        .lightbox-arrow.right { right: 40px; }
      `}} />
      
    </main>
  );
}