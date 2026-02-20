'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function lerp(a, b, n) { 
  return (1 - n) * a + n * b; 
}

class TrailLogic {
  constructor(container) {
    this.container = container;
    this.images = [...container.querySelectorAll('.content__img')];
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 10;
    this.threshold = 80; 
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    window.addEventListener('mousemove', ev => {
      this.mousePos = { x: ev.clientX, y: ev.clientY };
    }, { passive: true });

    requestAnimationFrame(() => this.render());
  }

  render() {
    const dist = Math.hypot(
      this.mousePos.x - this.lastMousePos.x, 
      this.mousePos.y - this.lastMousePos.y
    );
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (dist > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    const img = this.images[this.imgPosition];
    if (!img) return;

    this.imgPosition = (this.imgPosition + 1) % this.imagesTotal;
    this.zIndexVal++;

    const w = 450;
    const h = 300;

    gsap.killTweensOf(img);
    
    gsap.timeline()
      .fromTo(img, 
        {
          opacity: 1,
          scale: 0.5,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - w / 2,
          y: this.cacheMousePos.y - h / 2
        },
        {
          duration: 0.4,
          ease: 'expo.out',
          scale: 1,
          x: this.mousePos.x - w / 2,
          y: this.mousePos.y - h / 2
        }
      )
      .to(img, {
        duration: 0.6,
        opacity: 0.01, // Tornem a l'estat de pre-renderitzat
        scale: 0.001,
        ease: 'power2.inOut',
        onComplete: () => {
          // No fem display:none ni les movem a -2000px per mantenir-les a la GPU
          gsap.set(img, { x: 0, y: 0 });
        }
      }, 0.2);
  }
}

export default function ImageTrail({ items = [] }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    new TrailLogic(containerRef.current);
  }, [items]);

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {items.map((url, i) => (
        <div 
          className="content__img" 
          key={url + i} 
          style={{ 
            position: 'absolute', 
            opacity: 0.01, // Manté la imatge "viva" pel navegador
            width: '450px', 
            height: '300px',
            overflow: 'hidden',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            backgroundColor: '#1a1a1a',
            top: 0,
            left: 0,
            transform: 'scale(0.001)', // Quasi invisible però existent
            willChange: 'transform, opacity'
          }}
        >
          <img 
            src={url} 
            alt="" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      ))}
    </div>
  );
}