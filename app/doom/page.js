'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Html, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three'; 
import Navbar from '../../components/Navbar';

// --- ARRAYS EXACTES DEL TEU PROCESSING ---
const words = [
  "Turbo", "Infinite", "For You", "Grip", "Likes", "Retention Rate", "Boost",
  "Adrenaline", "Feed", "Algorithm", "Status", "Scroll", "Post", "FOMO",
  "Trending", "Connection", "Video", "Ranking", "Explore", "Stimulation",
  "Reels", "Share", "Swipe", "Speed", "Trophies", "Retention", "Comments Section",
  "Clickbait", "Seen", "Instant", "Highlight", "Virality", "Racing", "DM's",
  "Followers", "Metrics", "Repost", "Crazy", "Acceleration", "Nitro", "Addiction",
  "Content", "Live", "Hashtag", "Profile Pic", "Victory", "Filter", "Loop",
  "Snap", "Visibility", "Clicks", "Hype", "Notifications", "Profile", "Tag",
  "Comments", "Fuel", "Expectation", "Stories", "###", "@@@", "$$$", "&&&",
  "<<<", " >>>", "€€€", " ***", "xxx", " +++", " ---", " √√√", "money", "earnings", "doom", "race"
];

const phrases = [
  "DON'T STOP NOW\nDON'T STOP NOW\nDON'T STOP NOW\nDON'T STOP NOW",
  "FOMO?\nKeep scrolling\nFOMO?\nKeep scrolling\nFOMO?\nKeep scrolling",
  "Why leave now?\nWhy leave now?\nWhy leave now?\nWhy leave now?\nWhy leave now?",
  "Every swipe counts\nEvery swipe counts\nEvery swipe counts\nEvery swipe counts",
  "More scroll\nmore cash\nMore scroll\nmore cash",
  "You’ll love what’s next\nYou’ll love what’s next\nYou’ll love what’s next",
  "One more swipe\nOne more swipe\nOne more swipe\nOne more swipe",
  "Stay scrolling\nstay winning\nStay scrolling\nstay winning"
];

const colors = [
  '#E62117', '#FFFC00', '#3B5998', '#FF6D00', 
  '#25D366', '#25F4EE', '#DD2A7B', '#FE2C55'
];

function DoomRaceModel({ setScore, setOrbitEnabled }) {
  const llantaGltf = useGLTF('/doom/llanta.glb'); 
  const suportGltf = useGLTF('/doom/suport.glb'); 
  
  const wheelRef = useRef(null);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastY = useRef(0);
  
  const feedRef = useRef(null); 
  const scrollOffset = useRef(0);
  const [activePhrase, setActivePhrase] = useState("");
  const lastPhraseTime = useRef(0);

  const feedWords = useMemo(() => {
    return Array.from({ length: 400 }).map((_, i) => ({
      id: i,
      text: words[Math.floor(Math.random() * words.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, []);

  // --- MATERIAL GRIS PLATEJAT BRILLANT PER A TOT ---
  const silverMaterial = new THREE.MeshStandardMaterial({
    color: '#D0D0D0', // Gris clar
    side: THREE.DoubleSide,
    roughness: 0.2,   // Molt llis perquè brilli
    metalness: 0.9    // Molt metàl·lic
  });

  useEffect(() => {
    llantaGltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.computeVertexNormals();
        child.castShadow = true;    
        child.receiveShadow = true; 
        child.material = silverMaterial;
      }
    });
  }, [llantaGltf]);

  useEffect(() => {
    suportGltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.computeVertexNormals();
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = silverMaterial;
      }
    });
  }, [suportGltf]);

  // --- LÒGICA DE GIR ARREGLADA ---
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId); // Captura el ratolí perquè no es perdi en moure'l ràpid
    isDragging.current = true;
    lastY.current = e.clientY;
    document.body.style.cursor = 'grabbing';
    setOrbitEnabled(false); // BLOQUEGEM LA CÀMERA PER PODER GIRAR
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      const delta = e.clientY - lastY.current;
      
      // Només permetem girar cap avall (cap a la pantalla)
      if (delta > 0) {
        velocity.current += delta * 0.005; // Sensibilitat ajustada
      }
      lastY.current = e.clientY;
    }
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.target.releasePointerCapture(e.pointerId);
    isDragging.current = false;
    document.body.style.cursor = 'grab';
    setOrbitEnabled(true); // DESBLOQUEGEM LA CÀMERA
  };

  useFrame((state) => {
    if (wheelRef.current) {
      // 🚨 ATENCIÓ EIX DE GIR 🚨
      // Si la roda gira de costat com una porta, canvia aquesta 'x' per 'z' o 'y'
      wheelRef.current.rotation.x += velocity.current; 
    }
    
    velocity.current *= 0.98; // Frenada suau

    if (velocity.current < 0.001) velocity.current = 0;

    const currentSpeed = velocity.current;
    
    if (currentSpeed > 0.05) {
      setScore((prev) => prev + (0.01212 * currentSpeed));
      
      scrollOffset.current -= currentSpeed * 200; 
      if (Math.abs(scrollOffset.current) > 20000) scrollOffset.current = 0;

      if (feedRef.current && !activePhrase) {
        feedRef.current.style.transform = `translateY(${scrollOffset.current}px)`;
      }

      if (state.clock.elapsedTime - lastPhraseTime.current > 4) {
        if (currentSpeed > 0.1 && !activePhrase) {
          const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
          setActivePhrase(randomPhrase);
          lastPhraseTime.current = state.clock.elapsedTime;
          
          setTimeout(() => {
            setActivePhrase("");
          }, 2500);
        }
      }
    }
  });

  return (
    <group position={[0, -1, 0]}>
      <primitive object={suportGltf.scene} scale={0.2} />
      
      {/* LA RODA (Ara captura perfectament el clic) */}
      <primitive 
        ref={wheelRef} 
        object={llantaGltf.scene} 
        scale={0.2} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
      />

      <Html 
        transform 
        position={[-18.3, 2.5, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={0.4} 
      >
        <div style={{
          width: '1080px', 
          height: '1920px', 
          backgroundColor: '#282828', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: `0 0 50px rgba(0,0,0,0.8)`,
        }}>
          {activePhrase ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1 style={{ 
                fontFamily: 'var(--font-titol), sans-serif', 
                fontSize: '8rem', 
                color: '#FFFFFF',
                whiteSpace: 'pre-line',
                lineHeight: '1.2'
              }}>
                {activePhrase}
              </h1>
            </div>
          ) : (
            <div ref={feedRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'none' }}>
              <h1 style={{ fontFamily: 'monospace', fontSize: '8rem', color: '#fff', margin: '300px 0' }}>
                {velocity.current === 0 ? "DON'T STOP NOW" : ""}
              </h1>
              
              {feedWords.map((word) => (
                <h1 key={word.id} style={{ 
                  fontFamily: 'var(--font-titol), sans-serif', 
                  fontSize: word.text.length > 8 ? '7rem' : '10rem', 
                  color: word.color,
                  textTransform: 'uppercase',
                  margin: '40px 0',
                }}>
                  {word.text}
                </h1>
              ))}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

export default function DoomRaceProject() {
  const [score, setScore] = useState(0);
  const [orbitEnabled, setOrbitEnabled] = useState(true); // Controlem la càmera des d'aquí

  return (
    <main style={{ backgroundColor: '#1a1a1a', color: 'white', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Navbar title="The Doom Race" />

      <div style={{ position: 'absolute', top: '100px', left: '40px', zIndex: 10, fontFamily: 'monospace', fontSize: '1.5rem', pointerEvents: 'none' }}>
        <p style={{ color: '#FF7D00' }}>€ 12,12 per 1000 words:</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>€ {score.toFixed(2)}</p>
      </div>

      <Canvas shadows camera={{ position: [-5, 3, 8], fov: 45, near: 0.1, far: 500 }} style={{ cursor: 'grab' }}>
        
        {/* L'ORBIT CONTROLS ES BLOQUEJA NOMÉS QUAN GIRES LA RODA */}
        <OrbitControls makeDefault enabled={orbitEnabled} />

        <ambientLight intensity={1.5} /> 
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2.5} 
          color="#ffffff" 
          castShadow 
          shadow-bias={-0.001} 
        /> 
        <pointLight position={[-2, 4, 2]} intensity={1.5} color="#ffffff" /> 

        <DoomRaceModel setScore={setScore} setOrbitEnabled={setOrbitEnabled} />

        <ContactShadows position={[0, -1, 0]} opacity={0.6} scale={15} blur={1.5} far={4} color="#000000" />
      </Canvas>
    </main>
  );
}