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
    this.threshold = 75; 
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    // FASE D'ESCALFAMENT: Força el processament de píxels
    this.preWarmImages();

    window.addEventListener('mousemove', ev => {
      this.mousePos = { x: ev.clientX, y: ev.clientY };
    }, { passive: true });

    requestAnimationFrame(() => this.render());
  }

  preWarmImages() {
    // Posem totes les imatges al centre amb opacitat mínima un instant
    this.images.forEach((img) => {
      gsap.set(img, {
        opacity: 0.01,
        x: window.innerWidth / 2 - 225, // Centre aproximat
        y: window.innerHeight / 2 - 150,
        top: 0,
        left: 0,
        display: 'block'
      });
    });
    
    // Les tornem a moure fora passats 150ms
    setTimeout(() => {
      this.images.forEach(img => gsap.set(img, { opacity: 0, top: -2000 }));
    }, 150);
  }

  render() {
    const dist = Math.hypot(this.mousePos.x - this.lastMousePos.x, this.mousePos.y - this.lastMousePos.y);
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
          top: 0, // Anul·lem el -2000px
          left: 0,
          opacity: 1,
          scale: 0.8,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - w / 2,
          y: this.cacheMousePos.y - h / 2
        },
        {
          duration: 0.4,
          ease: 'expo.out',
          x: this.mousePos.x - w / 2,
          y: this.mousePos.y - h / 2
        }
      )
      .to(img, {
        duration: 0.6,
        opacity: 0,
        scale: 0.4,
        onComplete: () => {
          gsap.set(img, { top: -2000 }); // Netegem per no interferir
        }
      }, 0.3);
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
            opacity: 0, 
            width: '450px', 
            height: '300px',
            willChange: 'transform, opacity',
            overflow: 'hidden',
            borderRadius: '10px',
            boxShadow: '0 15px 50px rgba(0,0,0,0.6)',
            backgroundColor: '#1a1a1a',
            top: '-2000px',
            visibility: 'visible'
          }}
        >
          <img 
            src={url} 
            alt="" 
            loading="eager"
            decoding="sync"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
          />
        </div>
      ))}
    </div>
  );
}