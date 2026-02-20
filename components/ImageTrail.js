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

    const w = 350;
    const h = 233;

    gsap.killTweensOf(img);
    
    gsap.timeline()
      .set(img, {
        visibility: 'visible',
        opacity: 0,
        scale: 0.8,
        zIndex: this.zIndexVal,
        x: this.cacheMousePos.x - w / 2,
        y: this.cacheMousePos.y - h / 2,
        force3D: true
      })
      .to(img, {
        duration: 0.4,
        ease: 'expo.out',
        opacity: 1,
        scale: 1,
        x: this.mousePos.x - w / 2,
        y: this.mousePos.y - h / 2
      })
      // AQUEST ÉS EL BLOC QUE CONTROLA LA SORTIDA
      .to(img, {
        duration: 0.8,      // Abans 0.5 (ara desapareix més lentament)
        opacity: 0,
        scale: 0.8,        // Abans 0.5 (fa un efecte de zoom-out més suau)
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(img, { visibility: 'hidden' });
        }
      }, 0.3); // AQUEST NÚMERO ÉS LA CLAU: Abans 0.2 (ara espera més a començar a marxar)
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
            visibility: 'hidden', 
            width: '350px', 
            height: '233px', 
            overflow: 'hidden',
            borderRadius: '6px', 
            boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
            backgroundColor: '#1a1a1a',
            top: 0,
            left: 0,
            willChange: 'transform, opacity'
          }}
        >
          <img 
            src={url} 
            alt="" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              display: 'block'
            }} 
          />
        </div>
      ))}
    </div>
  );
}