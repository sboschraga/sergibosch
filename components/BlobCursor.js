'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#ffffff', 
  trailCount = 3,
  sizes = [150, 110, 80], 
  innerSizes = [0, 0, 0], 
  innerColor = '#ffffff',
  opacities = [1, 1, 1], 
  shadowColor = 'transparent',
  shadowBlur = 0,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  filterId = 'gooey-broken-blob',
  filterStdDeviation = 15, 
  filterColorMatrixValues = '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1, 
  slowDuration = 0.7, 
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 9999
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);
  const isShrunk = useRef(false); 
  const interactablesRef = useRef([]); 

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // ESCÀNER BULLETPROOF: Busca botons, links i elements marcats expressament.
  useEffect(() => {
    const scanInteractables = () => {
      const clickables = document.querySelectorAll('a, button, [role="button"], input, .clickable-element');
      interactablesRef.current = Array.from(clickables);
    };

    scanInteractables();
    const interval = setInterval(scanInteractables, 1000); 
    return () => clearInterval(interval);
  }, []);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    e => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration + (i * 0.1), 
          ease: isLead ? fastEase : slowEase
        });
      });

      let touching = false;
      const radius = sizes[0] / 2; 
      const interactables = interactablesRef.current; 
      
      for (let i = 0; i < interactables.length; i++) {
        const rect = interactables[i].getBoundingClientRect();
        
        if (rect.width === 0 || rect.height === 0) continue;
        
        const closestX = Math.max(rect.left, Math.min(x, rect.right));
        const closestY = Math.max(rect.top, Math.min(y, rect.bottom));
        
        const dx = x - closestX;
        const dy = y - closestY;
        
        if ((dx * dx + dy * dy) < (radius * radius)) {
          touching = true;
          break; 
        }
      }

      if (touching !== isShrunk.current) {
        isShrunk.current = touching;
        blobsRef.current.forEach((el) => {
          if (!el) return;
          gsap.to(el, {
            scale: touching ? 0.33 : 1, 
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      }
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase, sizes]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [handleMove]);

  return (
    <>
      <div ref={containerRef} className="blob-container" style={{ zIndex }}>
        {useFilter && (
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
                <feColorMatrix in="blur" result="gooey" values={filterColorMatrixValues} />
                <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise">
                  <animate attributeName="baseFrequency" values="0.02; 0.03; 0.02" dur="15s" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="gooey" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>
        )}

        <div className="blob-main" style={{ filter: useFilter ? `url(#${filterId})` : undefined }}>
          {Array.from({ length: trailCount }).map((_, i) => (
            <div
              key={i}
              ref={el => (blobsRef.current[i] = el)}
              className="blob"
              style={{
                width: sizes[i],
                height: sizes[i],
                borderRadius: blobType === 'circle' ? '50%' : '0%',
                backgroundColor: fillColor,
                opacity: opacities[i],
                boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
              }}
            >
              <div
                className="inner-dot"
                style={{
                  width: innerSizes[i],
                  height: innerSizes[i],
                  top: (sizes[i] - innerSizes[i]) / 2,
                  left: (sizes[i] - innerSizes[i]) / 2,
                  backgroundColor: innerColor,
                  borderRadius: blobType === 'circle' ? '50%' : '0%'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style id="hide-cursor-style" dangerouslySetInnerHTML={{__html: `
        body.custom-cursor-active, 
        body.custom-cursor-active * { 
          cursor: none !important; 
        }
        .blob-container {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none; overflow: hidden;
        }
        .blob-main {
          position: absolute; width: 100%; height: 100%; overflow: hidden;
          background: transparent; user-select: none; mix-blend-mode: difference;
        }
        .blob { position: absolute; will-change: transform; transform: translate(-50%, -50%); }
        .inner-dot { position: absolute; }
      `}} />
    </>
  );
}