'use client';
import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, MeshReflectorMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three'; 
import Navbar from '../../components/Navbar';

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
  "DON'T STOP NOW\nDON'T STOP NOW\nDON'T STOP NOW",
  "FOMO?\nKeep scrolling\nFOMO?\nKeep scrolling",
  "Why leave now?\nWhy leave now?\nWhy leave now?",
  "Every swipe counts\nEvery swipe counts\nEvery swipe counts",
  "More scroll\nmore cash\nMore scroll\nmore cash",
  "You’ll love what’s next\nYou’ll love what’s next",
  "Stay scrolling\nstay winning\nStay scrolling"
];

const colors = ['#E62117', '#FFFC00', '#3B5998', '#FF6D00', '#25D366', '#25F4EE', '#DD2A7B', '#FE2C55'];

function DoomRaceModel({ setScore, setOrbitEnabled }) {
  const llantaGltf = useGLTF('/doom/llanta.glb');
  const suportGltf = useGLTF('/doom/suport.glb');
  const teleGltf = useGLTF('/doom/tele.glb');

  const wheelRef = useRef(null);
  const velocity = useRef(0);
  const isDragging = useRef(false);
  const lastY = useRef(0);

  const [gameState, setGameState] = useState(0);
  const [blink, setBlink] = useState(true);
  const stateTimer = useRef(0);

  const [activeWord, setActiveWord] = useState({ text: "READY", color: "#ffffff" });
  const lastWordIndex = useRef(0);
  const [activePhrase, setActivePhrase] = useState("");

  const screenLightRef = useRef(null);

  const [mColor, mRough, mNormal, mMetal] = useLoader(THREE.TextureLoader, [
    '/doom/metall_c.jpg',
    '/doom/metall_r.jpg',
    '/doom/metall_n.jpg',
    '/doom/metall_m.jpg'
  ]);

  useEffect(() => {
    [mColor, mRough, mNormal, mMetal].forEach(t => {
      if (t) {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.repeat.set(5, 5);
      }
    });
  }, [mColor, mRough, mNormal, mMetal]);

  const metallPBR = useMemo(() => new THREE.MeshStandardMaterial({
    map: mColor,
    roughnessMap: mRough,
    normalMap: mNormal,
    metalnessMap: mMetal,
    metalness: 1.0,
    roughness: 2,
    color: '#888888'
  }), [mColor, mRough, mNormal, mMetal]);

  useEffect(() => {
    [llantaGltf, suportGltf].forEach((model) => {
      model.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = metallPBR;
          if (child.geometry) child.geometry.computeVertexNormals();
        }
      });
    });
  }, [llantaGltf, suportGltf, metallPBR]);

  useEffect(() => {
    teleGltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#111111',
          roughness: 0.6,
          metalness: 0.1
        });
      }
    });
  }, [teleGltf]);

  useEffect(() => {
    if (gameState === 0) {
      const interval = setInterval(() => setBlink(b => !b), 800);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    lastY.current = e.clientY;
    document.body.style.cursor = 'grabbing';
    setOrbitEnabled(false);
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      const delta = e.clientY - lastY.current;
      velocity.current += Math.abs(delta) * 0.002;
      if (velocity.current > 0.4) velocity.current = 0.4;
      lastY.current = e.clientY;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    document.body.style.cursor = 'grab';
    setOrbitEnabled(true);
  };

  useFrame((state) => {
    if (wheelRef.current) wheelRef.current.rotation.z += velocity.current;
    velocity.current *= 0.995;
    if (velocity.current < 0.0005) velocity.current = 0;

    const currentSpeed = velocity.current;
    if (gameState === 0 && currentSpeed > 0.02) {
      setGameState(1);
      stateTimer.current = state.clock.elapsedTime;
    }

    if (gameState === 1) {
      const elapsed = state.clock.elapsedTime - stateTimer.current;
      if (elapsed > 1 && activeWord.text === "READY") setActiveWord({ text: "STEADY", color: "#ffffff" });
      if (elapsed > 2 && activeWord.text === "STEADY") setActiveWord({ text: "SCROLL", color: "#FE2C55" });
      if (elapsed > 3) {
        setGameState(2);
        stateTimer.current = state.clock.elapsedTime;
      }
    }

    if (gameState === 2) {
      if (currentSpeed > 0.01) {
        setScore((prev) => prev + (0.01212 * (currentSpeed * 10)));
        const newWordIndex = Math.floor(Math.abs(wheelRef.current.rotation.z) / 0.4) % words.length;
        if (newWordIndex !== lastWordIndex.current) {
          lastWordIndex.current = newWordIndex;
          setActiveWord({ text: words[newWordIndex], color: colors[newWordIndex % colors.length] });
        }
      }
      if (state.clock.elapsedTime - stateTimer.current > 5 && currentSpeed < 0.05) {
        setActivePhrase(phrases[Math.floor(Math.random() * phrases.length)]);
        setGameState(3);
        stateTimer.current = state.clock.elapsedTime;
      }
    }

    if (gameState === 3 && state.clock.elapsedTime - stateTimer.current > 6) {
      setActivePhrase("");
      setGameState(0);
    }

    if (screenLightRef.current) {
      if (gameState === 1 || gameState === 2) {
        screenLightRef.current.color.set(activeWord.color);
        screenLightRef.current.intensity = 2 + (currentSpeed * 15);
      } else if (gameState === 3) {
        screenLightRef.current.color.set('#FE2C55');
        screenLightRef.current.intensity = 4;
      } else {
        screenLightRef.current.intensity = 0;
      }
    }
  });

  return (
    <group>
      <primitive object={suportGltf.scene} scale={0.2} />
      <primitive object={teleGltf.scene} scale={0.2} />
      <primitive 
        ref={wheelRef} 
        object={llantaGltf.scene} 
        scale={0.2} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
      />
      
      <pointLight ref={screenLightRef} position={[-15, 2.5, 0]} distance={30} intensity={0} />

     <Html 
  transform 
  occlude="blending" 
  position={[-18.3, 2.12, 0.075]} // Ajustat per no quedar "dins" del plàstic
  rotation={[0, Math.PI / 2, 0]} 
  scale={0.4}               // He pujat l'escala perquè ara el div és més petit en píxels
  distanceFactor={10} 
>
  <div style={{ 
    width: '512px',          // 25.60 unitats
    height: '912px',         // 45.60 unitats
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000',
    backfaceVisibility: 'hidden',
    userSelect: 'none',
  }}>
    
    {/* Capa de scanlines */}
    <div style={{
      position: 'absolute',
      top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
      // Hem ajustat el backgroundSize perquè les línies no siguin gegants
      background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
      backgroundSize: '100% 3px', 
    }} />

    {/* CONTINGUT (He baixat els rems perquè el div és més petit ara) */}
    {gameState === 0 && (
      <h1 style={{ fontSize: '6rem', color: blink ? '#fff' : 'transparent', textAlign: 'center', fontFamily: 'monospace' }}>
        WORK<br/>SCROLL
      </h1>
    )}
    
    {(gameState === 1 || gameState === 2) && !activePhrase && (
      <h1 style={{ 
        fontSize: activeWord.text.length > 10 ? '4rem' : '7rem', 
        color: activeWord.color, 
        textTransform: 'uppercase',
        textAlign: 'center',
        textShadow: `0 0 20px ${activeWord.color}` 
      }}>
        {activeWord.text}
      </h1>
    )}

    {gameState === 3 && (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '4rem', color: '#FE2C55', whiteSpace: 'pre-line' }}>
          {activePhrase || "BEST EMPLOYERS RANKING"}
        </h1>
      </div>
    )}
  </div>
</Html>
    </group>
  );
}

function TerraCiment() {
  const [colorMap, normalMap] = useLoader(THREE.TextureLoader, [
    '/doom/ciment_color.jpg',
    '/doom/ciment_normal.jpg'
  ]);

  useEffect(() => {
    [colorMap, normalMap].forEach(texture => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      const escala = 25; 
      texture.repeat.set(escala, escala);
    });
  }, [colorMap, normalMap]);

  return (
    <mesh position={[0, -6.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        map={colorMap}
        normalMap={normalMap}
        normalScale={[2, 2]}
        blur={[300, 300]} 
        resolution={1024}
        mixBlur={2}
        mixStrength={5}
        roughness={0.55}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#3a3a3a"
        metalness={0.2}
      />
    </mesh>
  );
}

export default function DoomRaceProject() {
  const [score, setScore] = useState(0);
  const [orbitEnabled, setOrbitEnabled] = useState(true); 

  return (
    <main style={{ backgroundColor: '#1a1a1a', color: 'white', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Navbar title="The Doom Race" />

      <div style={{ position: 'absolute', top: '100px', left: '40px', zIndex: 10, fontFamily: 'monospace', fontSize: '1.5rem', pointerEvents: 'none' }}>
        <p style={{ color: '#FF7D00' }}>€ 12,12 per 1000 words:</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>€ {score.toFixed(2)}</p>
      </div>

      <Canvas shadows camera={{ position: [-5, 3, 8], fov: 45, near: 0.1, far: 500 }} style={{ cursor: 'grab' }}>
        <OrbitControls makeDefault enabled={orbitEnabled} />
        <Environment files="/doom/entorn.hdr" /> 
        <ambientLight intensity={1.5} /> 
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow /> 

        <Suspense fallback={null}>
            <DoomRaceModel setScore={setScore} setOrbitEnabled={setOrbitEnabled} />
            <TerraCiment />
        </Suspense>

        <ContactShadows position={[0, -6.36, 0]} opacity={0.6} scale={15} blur={1.5} far={4} color="#000000" />
      </Canvas>
    </main>
  );
}