'use client';
import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, Environment, ContactShadows } from '@react-three/drei';
import Navbar from '../../components/Navbar';

// --- LLISTA DE PARAULES (Traiem les de Processing) ---
const words = [
  "Turbo", "Infinite", "For You", "Grip", "Likes", "Retention Rate", "Boost", 
  "Adrenaline", "Feed", "Algorithm", "Status", "Scroll", "Post", "FOMO", 
  "Trending", "Reels", "Share", "Swipe", "Speed", "Addiction", "$$$", "€€€"
];

const colors = ['#FF0000', '#FFD700', '#000FFF', '#FF7D00', '#96FF00', '#00FFF0', '#FF14D7'];

// --- COMPONENT DEL MODEL 3D I LA FÍSICA ---
function DoomRaceModel({ setScore, setCurrentWord, setWordColor }) {
  // Canvia aquesta ruta si el teu arxiu es diu diferent!
  const { scene } = useGLTF('/doom/doom_race.glb'); 
  
  const wheelRef = useRef(null);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastY = useRef(0);
  const lastWordTime = useRef(0);

  // Quan carrega el model, busquem la capa/peça que es digui "Llanta"
  useEffect(() => {
    scene.traverse((child) => {
      // Busca qualsevol malla que porti la paraula "llanta" o "Llanta" al nom
      if (child.isMesh && child.name.toLowerCase().includes('llanta')) {
        wheelRef.current = child;
      }
    });
  }, [scene]);

  // --- LÒGICA DEL GIR (Roda d'hàmster) ---
  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    lastY.current = e.clientY;
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      const delta = e.clientY - lastY.current;
      velocity.current += delta * 0.002; // Sensibilitat del gir
      lastY.current = e.clientY;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = 'grab';
  };

  // El "cor" del joc: s'executa 60 cops per segon
  useFrame((state) => {
    // 1. Fem girar la llanta si l'hem trobat
    if (wheelRef.current) {
      wheelRef.current.rotation.x += velocity.current;
    }
    
    // 2. Apliquem fricció perquè vagi frenant a poc a poc
    velocity.current *= 0.98;

    // 3. Lògica dels diners i les paraules si gira prou ràpid
    const currentSpeed = Math.abs(velocity.current);
    if (currentSpeed > 0.05) {
      // Sumem diners
      setScore((prev) => prev + (0.01212 * currentSpeed));
      
      // Canviem de paraula aleatòriament cada X milisegons basat en la velocitat
      if (state.clock.elapsedTime - lastWordTime.current > (0.5 / currentSpeed)) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setCurrentWord(randomWord);
        setWordColor(randomColor);
        lastWordTime.current = state.clock.elapsedTime;
      }
    } else {
      // Si s'atura, missatge passiu-agressiu
      if (currentSpeed < 0.001 && currentSpeed > 0) {
        setCurrentWord("DON'T STOP NOW");
        setWordColor('#FFFFFF');
        velocity.current = 0; // Frenada total
      }
    }
  });

  return (
    <primitive 
      object={scene} 
      position={[0, -1, 0]} // Ajusta l'alçada del model sencer
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
    />
  );
}

// --- PÀGINA PRINCIPAL ---
export default function DoomRaceProject() {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState("READY");
  const [wordColor, setWordColor] = useState('#FFFFFF');

  return (
    <main style={{ backgroundColor: '#1a1a1a', color: 'white', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Navbar title="The Doom Race" />

      {/* MARCADOR FIXAT A LA PANTALLA (com a la teva instal·lació) */}
      <div style={{ position: 'absolute', top: '100px', left: '40px', zIndex: 10, fontFamily: 'monospace', fontSize: '1.5rem', pointerEvents: 'none' }}>
        <p style={{ color: '#FF7D00' }}>€ 12,12 per 1000 words:</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>€ {score.toFixed(2)}</p>
      </div>

      {/* L'ESCENARI 3D */}
      <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }} style={{ cursor: 'grab' }}>
        
        {/* Llums boniques perquè llueixi el Rhino */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        <DoomRaceModel 
          setScore={setScore} 
          setCurrentWord={setCurrentWord} 
          setWordColor={setWordColor} 
        />

        {/* --- LA PANTALLA VIRTUAL --- 
            Això és un div HTML flotant dins del 3D. 
            Hauràs de jugar amb el "position" [X, Y, Z] perquè quadri amb el forat de la pantalla de fusta del teu Rhino! */}
        <Html 
          transform 
          position={[0, 1.8, -0.5]} // <-- Muta aquests números per moure la pantalla (Dreta/Esq, Dalt/Baix, Endavant/Endarrere)
          rotation={[0, 0, 0]}
          scale={0.5} // <-- Mida de la pantalla
        >
          <div style={{
            width: '800px',
            height: '450px',
            backgroundColor: '#000',
            border: '8px solid #333',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 40px ${wordColor}40`, // Resplendor
            overflow: 'hidden'
          }}>
            <h1 style={{ 
              fontFamily: 'var(--font-titol), sans-serif', 
              fontSize: currentWord.length > 10 ? '5rem' : '8rem', 
              color: wordColor,
              textTransform: 'uppercase',
              textAlign: 'center',
              textShadow: `0 0 20px ${wordColor}`
            }}>
              {currentWord}
            </h1>
          </div>
        </Html>

        {/* Ombra sota l'estructura perquè quedi realista */}
        <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
      
    </main>
  );
}