'use client';
import React, { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF, Html, OrbitControls, Environment, MeshReflectorMaterial, ContactShadows } from '@react-three/drei';
import * as THREE from 'three'; 
import Navbar from '../../components/Navbar';

// --- CONFIGURACIÓ DE DADES ---
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
  "DON'T STOP NOW\nDON'T STOP NOW",
  "FOMO?\nkeep scrolling",
  "why leave now?",
  "every swipe counts",
  "more scroll\nmore cash",
  "you’ll love what’s next",
  "stay scrolling\nstay winning"
];

const colors = ['#E62117', '#FFFC00', '#3B5998', '#FF6D00', '#25D366', '#25F4EE', '#DD2A7B', '#FE2C55'];

function DoomRaceModel({ setOrbitEnabled }) {
  const llantaGltf = useGLTF('/doom/llanta.glb');
  const suportGltf = useGLTF('/doom/suport.glb');
  const teleGltf = useGLTF('/doom/tele.glb');

  // --- VARIABLES DE FÍSICA SEPARADES ---
  const wheelRef = useRef(null);
  const velocity = useRef(0);       
  const scrollVelocity = useRef(0); 
  
  const isDragging = useRef(false);
  const lastY = useRef(0);

  const [gameState, setGameState] = useState(0); 
  const [blink, setBlink] = useState(true);
  const [activeWord, setActiveWord] = useState({ text: "READY", color: "#ffffff" });
  const [activePhrase, setActivePhrase] = useState("");
  const [score, setScore] = useState(0);
  
  const [uiRenderTrigger, setUiRenderTrigger] = useState(0);
  const [ranking, setRanking] = useState([]);
  const [totals, setTotals] = useState({ euros: 0, seconds: 0, words: 0, Employees: 0 });
  
  const stateTimer = useRef(0);
  const scrollOffset = useRef(0);
  const stretchRef = useRef(1); 

  const sessionStats = useRef({ wordsSeen: 0, startTime: 0, playerID: 1, lastSecs: 0 });

  // Textures PBR
  const [mColor, mRough, mNormal, mMetal] = useLoader(THREE.TextureLoader, [
    '/doom/metall_c.jpg', '/doom/metall_r.jpg', '/doom/metall_n.jpg', '/doom/metall_m.jpg'
  ]);

  const metallPBR = useMemo(() => {
    [mColor, mRough, mNormal, mMetal].forEach(t => { if (t) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(5, 5); } });
    return new THREE.MeshStandardMaterial({
      map: mColor, roughnessMap: mRough, normalMap: mNormal, metalnessMap: mMetal,
      metalness: 1.0, roughness: 1.0, color: '#9e9e9e'
    });
  }, [mColor, mRough, mNormal, mMetal]);

  useEffect(() => {
    [llantaGltf, suportGltf].forEach((model) => {
      model.scene.traverse((child) => {
        if (child.isMesh) { child.material = metallPBR; child.castShadow = true; child.receiveShadow = true; }
      });
    });
    teleGltf.scene.traverse((child) => {
      if (child.isMesh) child.material = new THREE.MeshStandardMaterial({ color: '#000000', roughness: 0.9, metalness: 0.5 });
    });
  }, [llantaGltf, suportGltf, teleGltf, metallPBR]);

  useEffect(() => {
    const saved = localStorage.getItem('doom_race_v3');
    if (saved) {
      const data = JSON.parse(saved);
      setRanking(data.ranking || []);
      setTotals(data.totals || { euros: 0, seconds: 0, words: 0, Employees: 0 });
      sessionStats.current.playerID = (data.totals?.Employees || 0) + 1; 
    }
  }, []);

  const saveToRanking = (finalEuros, finalWords, finalSecs) => {
    const newEntry = { id: sessionStats.current.playerID, Employee: `Employee ${sessionStats.current.playerID}`, euros: finalEuros, words: finalWords, seconds: finalSecs };
    const newRanking = [...ranking, newEntry].sort((a, b) => b.euros - a.euros).slice(0, 20); 
    const newTotals = { euros: totals.euros + finalEuros, seconds: totals.seconds + finalSecs, words: totals.words + finalWords, Employees: totals.Employees + 1 };
    setRanking(newRanking);
    setTotals(newTotals);
    localStorage.setItem('doom_race_v3', JSON.stringify({ ranking: newRanking, totals: newTotals }));
    
    sessionStats.current.playerID += 1; 
  };

  useFrame((state) => {
    const wheelSpeed = velocity.current;
    const uiSpeed = scrollVelocity.current;

    if (wheelRef.current) wheelRef.current.rotation.z += wheelSpeed;
    
    velocity.current *= 0.97; 
    scrollVelocity.current *= 0.993; 

    stretchRef.current = 1 + (uiSpeed * 4); 

    const time = state.clock.elapsedTime;

    switch (gameState) {
      case 0:
        setBlink(Math.floor(time * 2) % 2 === 0);
        if (wheelSpeed > 0.05) {
          setGameState(1);
          stateTimer.current = time;
          setScore(0);
          scrollOffset.current = 0;
          sessionStats.current.wordsSeen = 0;
          sessionStats.current.startTime = Date.now();
        }
        break;

      case 1:
        const elap = time - stateTimer.current;
        if (elap < 1) setActiveWord({ text: "READY", color: "#fff" });
        else if (elap < 2) setActiveWord({ text: "STEADY", color: "#fff" });
        else if (elap < 3) setActiveWord({ text: "SCROLL", color: "#FF7D00" });
        else { 
          setGameState(15); 
          stateTimer.current = time; 
        }
        break;

      case 15:
        if (time - stateTimer.current > 1.5) {
          setGameState(2);
          scrollOffset.current = 0;
          stateTimer.current = time;
        }
        break;

      case 2:
        if (uiSpeed > 0.01) {
          scrollOffset.current -= uiSpeed * 120;
          
          const currentWordIdx = Math.floor(Math.abs(scrollOffset.current / 250));
          if (currentWordIdx !== sessionStats.current.wordsSeen) {
            sessionStats.current.wordsSeen = currentWordIdx;
            setActiveWord({ text: words[currentWordIdx % words.length], color: colors[currentWordIdx % colors.length] });
            setScore(currentWordIdx * 0.01212);
          }
          stateTimer.current = time;
          setUiRenderTrigger(scrollOffset.current);
        }

       if (time - stateTimer.current > 4) {
          if (!activePhrase) setActivePhrase(phrases[Math.floor(Math.random() * phrases.length)]);
          if (time - stateTimer.current > 8) {
            const finalSecs = Math.floor((Date.now() - sessionStats.current.startTime) / 1000);
            sessionStats.current.lastSecs = finalSecs; 
            
            saveToRanking(score, sessionStats.current.wordsSeen, finalSecs);
            setGameState(3);
            stateTimer.current = time;
          }
        } else if (uiSpeed > 0.08) {
          setActivePhrase("");
        }
        break;

      case 3:
        if (time - stateTimer.current > 15 || (wheelSpeed > 0.15 && time - stateTimer.current > 3)) {
          setGameState(0);
          setActivePhrase("");
          scrollOffset.current = 0;
        }
        break;
    }
  });

  const renderScrollingWords = () => {
    const spacing = 250;
    const items = [];
    for (let i = 0; i < 15; i++) {
        const realIndex = sessionStats.current.wordsSeen + i - 3;
        if (realIndex < 0) continue;
        
        const yPos = (realIndex * spacing) + scrollOffset.current + 600; 
        const wordText = words[realIndex % words.length];
        const wordColor = colors[realIndex % colors.length];

        let dynamicFontSize = '6.5rem';
        if (wordText.length > 11) {
            dynamicFontSize = '3.2rem'; 
        } else if (wordText.length > 8) {
            dynamicFontSize = '4.2rem'; 
        } else if (wordText.length > 6) {
            dynamicFontSize = '5.2rem'; 
        }

        items.push(
            <div key={realIndex} style={{ 
                position: 'absolute', top: `${yPos}px`, left: 0, width: '100%', 
                padding: '0 50px', boxSizing: 'border-box', display: 'flex', 
                justifyContent: 'center', alignItems: 'center'
            }}>
                <h2 style={{ 
                    fontSize: dynamicFontSize,  
                    color: wordColor, 
                    textShadow: `0 0 15px ${wordColor}, 0 0 30px ${wordColor}`,
                    textTransform: 'uppercase', textAlign: 'center', margin: 0,
                    wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: '1.1'          
                }}>
                    {wordText}
                </h2>
            </div>
        );
    }
    return items;
  };

  return (
    <group>
      <primitive object={suportGltf.scene} scale={0.2} />
      <primitive object={teleGltf.scene} scale={0.2} />
      
      <primitive 
        ref={wheelRef} 
        object={llantaGltf.scene} 
        scale={0.2} 
        onPointerDown={(e) => { 
          e.stopPropagation(); 
          isDragging.current = true; 
          lastY.current = e.clientY; 
          setOrbitEnabled(false); 
        }}
        onPointerMove={(e) => { 
          if(isDragging.current) { 
            const delta = (lastY.current - e.clientY) * 0.0015; 
            const absDelta = Math.abs(delta);
            
            velocity.current += absDelta;       
            scrollVelocity.current += absDelta; 
            
            lastY.current = e.clientY; 
          } 
        }}
        onPointerUp={() => { isDragging.current = false; setOrbitEnabled(true); }}
        onPointerOut={() => { isDragging.current = false; setOrbitEnabled(true); }}
      />
      
      <pointLight position={[-15, 2.5, 0]} distance={20} intensity={2} />

      <Html 
        transform 
        occlude="blending"  
        position={[-18.3, 2.12, 0.08]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={0.4} 
        distanceFactor={10}
        wrapperClass="html-screen-wrapper" 
        style={{ pointerEvents: 'none' }} 
      >
        <div style={{ width: '512px', height: '912px', backgroundColor: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', overflow: 'hidden', color: 'white', userSelect: 'none', position: 'relative' }}>
          
         {/* 👉 SCANLINES (Línies de píxels) + VINYETA FOSCA a les vores */}
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100, 
            backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%)', 
            backgroundSize: '100% 4px',
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.9)' 
          }} />

          {gameState === 2 && !activePhrase && (
            <div style={{ position: 'absolute', top: '60px', width: '100%', textAlign: 'center', zIndex: 50 }}>
              <div style={{ fontSize: '1.8rem', color: '#FF7D00', marginBottom: '5px', letterSpacing: '2px', fontWeight: 'bold', textShadow: '0 0 10px #FF7D00, 0 0 20px #FF7D00' }}>0.01212€ EACH WORD</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white', textShadow: '0 0 10px white, 0 0 20px white' }}>{score.toFixed(2)} €</div>
            </div>
          )}

          {gameState === 0 && <h1 style={{ fontSize: '7rem', textAlign: 'center', color: blink ? '#fff' : 'transparent', zIndex: 50, textShadow: blink ? '0 0 20px white, 0 0 40px white' : 'none' }}>{Math.floor(Date.now()/800)%2===0 ? "WORK" : "SCROLL"}</h1>}
          {gameState === 1 && <h1 style={{ fontSize: '8rem', color: activeWord.color, zIndex: 50, textShadow: `0 0 20px ${activeWord.color}, 0 0 40px ${activeWord.color}` }}>{activeWord.text}</h1>}
          
          {gameState === 15 && (
            <div className="flag-slide-up" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 50% / 80px 80px', zIndex: 80 }} />
          )}

          {gameState === 2 && (
            <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
               {activePhrase ? (
                 <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                     <h2 style={{ 
                       fontSize: '3.5rem', color: 'white', whiteSpace: 'pre-line', textAlign: 'center', width: '90%', margin: 0, lineHeight: '1.1',
                       textShadow: '0 0 15px white, 0 0 30px rgba(255,255,255,0.6)'
                     }}>
                       {Array(20).fill(activePhrase).join('\n')}
                     </h2>
                 </div>
               ) : (
                 <div style={{ width: '100%', height: '100%', position: 'relative', transform: `scaleY(${stretchRef.current})`, transformOrigin: 'center center', transition: 'transform 0.05s linear' }}>
                    {renderScrollingWords()}
                 </div>
               )}
            </div>
          )}

          {gameState === 3 && (
            <div style={{ width: '100%', height: '100%', padding: '20px 30px', display: 'flex', flexDirection: 'column', zIndex: 50 }}>
              <h1 style={{ fontSize: '2rem', color: 'white', textAlign: 'center', marginBottom: '10px', textShadow: '0 0 15px white' }}>BEST EMPLOYEES </h1>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', borderBottom: '2px solid #FF7D00', paddingBottom: '5px', fontWeight: 'bold', color: '#FF7D00', textShadow: '0 0 10px #FF7D00' }}>
                <span style={{width: '10%'}}>Pos</span><span style={{width: '40%'}}>Employee</span><span style={{width: '20%'}}>Euros</span><span style={{width: '15%'}}>Secs</span><span style={{width: '15%'}}>Wrd</span>
              </div>

              <div style={{ flexGrow: 1, marginTop: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                {ranking.map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid #333', fontSize: '0.85rem', color: 'white', textShadow: '0 0 5px rgba(255,255,255,0.7)' }}>
                    <span style={{width: '10%'}}>{i+1}.</span><span style={{width: '40%'}}>{p.Employee}</span><span style={{width: '20%'}}>{p.euros.toFixed(2)}€</span><span style={{width: '15%'}}>{p.seconds}s</span><span style={{width: '15%'}}>{p.words}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#FF7D00', color: '#1a1a1a', padding: '10px', marginTop: '10px', fontWeight: 'bold', borderRadius: '5px', fontSize: '0.9rem', boxShadow: '0 0 20px rgba(255, 125, 0, 0.8)' }}>
                <span style={{width: '10%'}}></span>
                <span style={{width: '40%'}}>Employee {sessionStats.current.playerID - 1} (YOU)</span>
                <span style={{width: '20%'}}>{score.toFixed(2)}€</span>
                <span style={{width: '15%'}}>{sessionStats.current.lastSecs}s</span>
                <span style={{width: '15%'}}>{sessionStats.current.wordsSeen}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#FE2C55', color: 'white', padding: '10px', marginTop: '5px', fontWeight: 'bold', borderRadius: '5px', fontSize: '0.9rem', boxShadow: '0 0 20px rgba(254, 44, 85, 0.8)', textShadow: '0 0 5px white' }}>
                <span style={{width: '10%'}}></span>
                <span style={{width: '40%'}}>TOTALS ({totals.Employees} emps)</span>
                <span style={{width: '20%'}}>{totals.euros.toFixed(2)}€</span>
                <span style={{width: '15%'}}>{totals.seconds}s</span>
                <span style={{width: '15%'}}>{totals.words}</span>
              </div>

            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

function TerraCiment() {
  const [colorMap, normalMap] = useLoader(THREE.TextureLoader, ['/doom/ciment_color.jpg', '/doom/ciment_normal.jpg']);
  useEffect(() => {
    [colorMap, normalMap].forEach(t => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(25, 25); });
  }, [colorMap, normalMap]);
  return (
    <mesh position={[0, -6.36, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        map={colorMap} normalMap={normalMap} normalScale={[2, 2]}
        blur={[300, 300]} resolution={1024} mixBlur={2} mixStrength={5}
        roughness={0.55} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4}
        color="#3a3a3a" metalness={0.2}
      />
    </mesh>
  );
}

export default function DoomRaceProject() {
  const [orbitEnabled, setOrbitEnabled] = useState(true); 

  return (
    <main style={{ backgroundColor: '#1a1a1a', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Navbar title="The Doom Race" />
      <Canvas shadows camera={{ position: [-5, 3, 8], fov: 45, near: 0.1, far: 500 }} style={{ cursor: 'grab' }}>
        <OrbitControls makeDefault enabled={orbitEnabled} minDistance={5} maxDistance={20} />
        <Environment files="/doom/entorn.hdr" /> 
        <ambientLight intensity={1.5} /> 
        <directionalLight position={[5, 10, 5]} intensity={2.5} castShadow /> 
        <Suspense fallback={null}>
            <DoomRaceModel setOrbitEnabled={setOrbitEnabled} />
            <TerraCiment />
        </Suspense>
        <ContactShadows position={[0, -6.36, 0]} opacity={0.6} scale={15} blur={1.5} far={4} color="#000000" />
      </Canvas>
      
      {/* CSS GLOBAL PER A L'ANIMACIÓ DE LA BANDERA I EL WRAPPER */}
      <style jsx global>{`
        @keyframes slideUpFlag {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
        .flag-slide-up {
          animation: slideUpFlag 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .html-screen-wrapper {
          pointer-events: none !important;
        }
      `}</style>
    </main>
  );
}