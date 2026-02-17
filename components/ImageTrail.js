'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function lerp(a, b, n) { return (1 - n) * a + n * b; }

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

    window.addEventListener('mousemove', ev => {
      this.mousePos = { x: ev.clientX, y: ev.clientY };
    }, { passive: true });

    requestAnimationFrame(() => this.render());
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

    gsap.killTweensOf(img);
    gsap.timeline()
      .fromTo(img, 
        {
          opacity: 1,
          scale: 0.8,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - 225, // Centrat (450/2)
          y: this.cacheMousePos.y - 150  // Centrat (300/2)
        },
        {
          duration: 0.4,
          ease: 'expo.out',
          x: this.mousePos.x - 225,
          y: this.mousePos.y - 150
        }
      )
      .to(img, {
        duration: 0.6,
        opacity: 0.001, // Tornem a opacitat gairebé zero però no zero real
        scale: 0.4,
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
            opacity: 0.001, // IMPORTANT: No és 0, és una mica més per forçar el render
            width: '450px', 
            height: '300px',
            willChange: 'transform, opacity',
            overflow: 'hidden',
            borderRadius: '10px',
            boxShadow: '0 15px 50px rgba(0,0,0,0.6)',
            backgroundColor: '#1a1a1a',
            top: 0,
            left: 0,
            transform: 'translate(-1000px, -1000px)' // Les amaguem lluny però el navegador les "pinta"
          }}
        >
          <img 
            src={url} 
            alt="" 
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
      ))}
    </div>
  );
}