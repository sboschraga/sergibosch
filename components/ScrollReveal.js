'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// NOMÉS registrem el plugin si estem al navegador
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  blurStrength = 10,
  containerClassName = '',
  textClassName = '',
  textStyle = {}, 
  as: Tag = 'p',  
  startOffset = 'top 85%', // Quan la part de dalt del text creua el 85% de la pantalla
  duration = 1.5, // El temps (en segons) que triga cada paraula en revelar-se
  stagger = 0.04 // El temps d'espera entre una paraula i la següent
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index} style={{ display: 'inline-block', willChange: 'opacity, filter, transform' }}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
      const wordElements = el.querySelectorAll('.word');

      // Animació única d'entrada (Sense 'scrub')
      gsap.fromTo(
        wordElements,
        { 
          opacity: baseOpacity, 
          filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
          y: 10 // Comença lleugerament desplaçat cap avall
        },
        {
          opacity: 1,
          filter: enableBlur ? 'blur(0px)' : 'none',
          y: 0, // Va cap a la seva posició original
          duration: duration, // Animació lenta i fluida
          stagger: stagger, // Efecte domino (paraula per paraula)
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            scroller,
            start: startOffset,
            once: true // EL MÉS IMPORTANT: Només passa un cop i es queda fixat!
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseOpacity, startOffset, blurStrength, duration, stagger]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <Tag className={`scroll-reveal-text ${textClassName}`} style={textStyle}>
        {splitText}
      </Tag>
    </div>
  );
}