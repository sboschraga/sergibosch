'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

const styles = {
  wrapper: { display: 'inline-block', whiteSpace: 'pre-wrap' },
  srOnly: { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0 }
};

export default function DecryptedText({
  text,
  speed = 50,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    const availableChars = characters.split('');

    const shuffleText = (originalText) => {
      return originalText.split('').map((char) => {
        if (char === ' ') return ' ';
        return availableChars[Math.floor(Math.random() * availableChars.length)];
      }).join('');
    };

    if (isHovering) {
      interval = setInterval(() => {
        setDisplayText(shuffleText(text));
      }, speed);
    } else {
      setDisplayText(text);
      if (interval) clearInterval(interval);
    }

    return () => { if (interval) clearInterval(interval); };
  }, [isHovering, text, speed, characters]);

  const hoverProps = animateOn === 'hover' || animateOn === 'both'
    ? { onMouseEnter: () => setIsHovering(true), onMouseLeave: () => setIsHovering(false) }
    : {};

  return (
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...hoverProps} {...props}>
      <span style={styles.srOnly}>{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isEncrypted = char !== text[index] && char !== ' ';
          return (
            <span key={index} className={isEncrypted ? encryptedClassName : className}>
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}