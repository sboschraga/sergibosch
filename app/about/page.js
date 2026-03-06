'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import TiltedCard from '../../components/TiltedCard';

// ==========================================
// 1. ESTILS REUTILITZABLES
// ==========================================
const boxStyle = {
  backgroundColor: 'var(--background)', border: '1px solid var(--border)', 
  borderRadius: 'clamp(12px, 1.5vw, 16px)', 
  padding: 'clamp(15px, 2vh, 25px) clamp(20px, 3vw, 40px) clamp(20px, 3vh, 40px)', 
  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', 
  boxShadow: 'var(--shadow-sm)', height: 'clamp(480px, 72vh, 800px)', width: '100%', overflow: 'hidden' 
};

const mainTitleStyle = { 
  fontFamily: 'var(--font-display)', 
  fontSize: 'clamp(1.5rem, 2vw, 1.8rem)', 
  fontWeight: '700', 
  marginBottom: 'clamp(15px, 2vh, 20px)', 
  color: 'var(--foreground)', 
  letterSpacing: '-0.5px',
  lineHeight: '1.2',
  width: '100%'
};

const textStyle = { fontFamily: 'var(--font-text)', fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', lineHeight: '1.7', color: 'var(--muted-foreground)', margin: 0 };
const listStyle = { listStyleType: 'none', padding: 0, margin: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.5vh, 16px)', overflowY: 'auto', paddingRight: '5px', scrollbarWidth: 'none', flex: 1 };
const listItemStyle = { fontFamily: 'var(--font-text)', fontSize: 'clamp(0.85rem, 1vw, 0.9rem)', color: 'var(--muted-foreground)', display: 'flex', gap: 'clamp(10px, 1.5vw, 20px)', alignItems: 'flex-start' };
const listDateStyle = { fontFamily: 'var(--font-titol)', fontWeight: '600', color: 'var(--foreground)', minWidth: 'clamp(65px, 5vw, 85px)', flexShrink: 0 };

const buttonStyle = { width: 'clamp(100px, 10vw, 120px)', height: 'clamp(38px, 5vh, 42px)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontFamily: 'var(--font-text)', fontSize: 'clamp(0.8rem, 1vw, 0.9rem)', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', border: 'none', flexShrink: 0 };

// ==========================================
// 2. DADES DELS SLIDES
// ==========================================

const softwareGroups = [
  { level: 'Advanced', items: [ { name: 'Rhino 3D', icon: '/icons/rhino.png' }, { name: 'InDesign', icon: '/icons/indesign.png' }, { name: 'Arduino', icon: '/icons/arduino.png' }, { name: 'Processing', icon: '/icons/processing.png' } ] },
  { level: 'Intermediate', items: [ { name: 'Unity', icon: '/icons/unity.png' }, { name: 'Illustrator', icon: '/icons/illustrator.png' }, { name: 'DaVinci Resolve', icon: '/icons/davinci.png' }, { name: 'KeyShot', icon: '/icons/keyshot.png' } ] },
  { level: 'Beginner', items: [ { name: 'After Effects', icon: '/icons/aftereffects.png' }, { name: 'Photoshop', icon: '/icons/photoshop.png' }, { name: 'Blender', icon: '/icons/blender.png' }, { name: 'p5.js', icon: '/icons/p5.png' } ] }
];

const slideData = [
  {
    center: { title: 'The Spark', text: "It all started with an insatiable curiosity to understand how things are made and how they work. Long before my interest in 3D, coding, and data visualization began, my creativity was fueled by hands-on experimentation, building, breaking apart, and a lot of imagination. This innate drive towards logical thinking, playing, and constructing was the seed of my design thinking.", image: '/about/primaria.png' },
    right: { 
      title: 'Programs Knowledge', 
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(15px, 2vh, 20px)', width: '100%', overflowY: 'auto', paddingRight: '10px', scrollbarWidth: 'none', flex: 1, paddingBottom: '20px' }}>
          {softwareGroups.map(group => (
            <div key={group.level}>
              <h4 style={{ fontFamily: 'var(--font-titol)', fontSize: 'clamp(0.8rem, 1vw, 0.95rem)', color: 'var(--muted-foreground)', marginBottom: 'clamp(10px, 1.5vh, 15px)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600' }}>{group.level}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px, 1.5vw, 15px)' }}>
                {group.items.map(item => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 'clamp(24px, 2vw, 28px)', height: 'clamp(24px, 2vw, 28px)', borderRadius: '0', backgroundColor: 'var(--muted)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                      <div style={{ width: '55%', height: '55%', backgroundColor: 'var(--foreground)', WebkitMaskImage: `url(${item.icon})`, WebkitMaskSize: 'contain', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskImage: `url(${item.icon})`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-text)', fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)', color: 'var(--foreground)', fontWeight: '500' }}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )
    }
  },
  {
    center: { title: 'First Steps', text: "During my teenage years, computers and video games shifted from entertainment to fascinating tools of exploration and creation. I realized that a screen wasn't just a place to consume content, but an interactive canvas where I could start shaping my own worlds and digital spaces.", image: '/about/eso.png' },
    right: { 
      title: 'Experience', 
      content: (
        <ul style={listStyle}>
          <li style={listItemStyle}><span style={listDateStyle}>2026</span> <span><strong style={{color: 'var(--foreground)', fontWeight: '500'}}>Intern</strong><br/><span style={{fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)'}}>Artec Light Studio</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2021-2026</span> <span><strong style={{color: 'var(--foreground)', fontWeight: '500'}}>Catering Assistant</strong><br/><span style={{fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)'}}>ALaCartaGranollers</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2025</span> <span><strong style={{color: 'var(--foreground)', fontWeight: '500'}}>Bartender</strong><br/><span style={{fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)'}}>Mas Sorrer</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2025</span> <span><strong style={{color: 'var(--foreground)', fontWeight: '500'}}>Expositor</strong><br/><span style={{fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)'}}>Sónar Festival</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2024</span> <span><strong style={{color: 'var(--foreground)', fontWeight: '500'}}>Volunteer</strong><br/><span style={{fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)'}}>Mira Festival</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2024</span> <span><strong style={{color: 'var(--foreground)', fontWeight: '500'}}>Kitchen Assistant</strong><br/><span style={{fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)'}}>El Camí de Ronda</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2023</span> <span><strong style={{color: 'var(--foreground)', fontWeight: '500'}}>Waiter</strong><br/><span style={{fontSize: 'clamp(0.75rem, 0.8vw, 0.85rem)'}}>La Pineda</span></span></li>
        </ul>
      )
    }
  },
  {
    center: { title: 'Present', text: "Studying at Elisava allowed me to merge visual creativity with logical thinking. This is where I defined my hybrid profile: blending interactive design, 3D environments, and creative coding. Today, I'm channeling this technical and visual foundation into new challenges within the interactive industry.", image: '/about/uni.png' },
    right: { 
      title: 'Languages', 
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.5vh, 15px)' }}>
          <p style={textStyle}><strong style={{ color: 'var(--foreground)', fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}>Catalan</strong> <br/> Native</p>
          <p style={textStyle}><strong style={{ color: 'var(--foreground)', fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}>Spanish</strong> <br/> Native</p>
          <p style={textStyle}><strong style={{ color: 'var(--foreground)', fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}>English</strong> <br/> B2</p>
          <p style={textStyle}><strong style={{ color: 'var(--foreground)', fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}>French</strong> <br/> A2</p>
        </div>
      )
    }
  }
];

// ==========================================
// 3. COMPONENT PRINCIPAL
// ==========================================
export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isShowingText, setIsShowingText] = useState(false); 

  const handleNext = () => {
    if (activeStep < slideData.length - 1) {
      setIsShowingText(false); 
      setActiveStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setIsShowingText(false); 
      setActiveStep(prev => prev - 1);
    }
  };

  const toggleContent = () => setIsShowingText(!isShowingText);

  const progressPercentage = (activeStep / (slideData.length - 1)) * 100;

  return (
    <main style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-cos)', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      <Navbar title="About" />

      <section style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(80px, 10vh, 100px) clamp(10px, 2vw, 40px) clamp(20px, 3vh, 40px)', width: '100%', maxWidth: '1900px', margin: '0 auto' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(15px, 2.5vw, 50px)', width: '100%' }}>

          {/* =========================================
              CAIXA ESQUERRA
              ========================================= */}
          <div style={boxStyle}>
            {/* ESPAIADOR INVISIBLE */}
            <div style={{ width: '100%', height: '24px', marginBottom: 'clamp(15px, 2vh, 20px)', flexShrink: 0 }} />
            
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', justifyContent: 'flex-start' }}>
              <h2 style={mainTitleStyle}>Sergi Bosch Raga</h2>
              <p style={{...textStyle, textAlign: 'left', lineHeight: '1.8', marginBottom: '0'}}>
                I'm Sergi Bosch Raga, an interactive experience designer currently studying at Elisava. My work spans across visual communication, 3D design, and programming, driven by a deep curiosity to explore new tools and methods. I'm always eager to push boundaries and experiment within my projects. Recently, I've developed my skills in fields such as video mapping, sound reactive interfaces and 3D environments.
              </p>
            </div>
          </div>

          {/* =========================================
              CAIXA CENTRAL
              ========================================= */}
          <div style={{ ...boxStyle, position: 'relative' }}>
            
            {/* STEPPER */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '24px', marginBottom: 'clamp(15px, 2vh, 20px)', padding: '0 clamp(10px, 1.5vw, 20px)', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '50%', left: 'clamp(10px, 1.5vw, 20px)', right: 'clamp(10px, 1.5vw, 20px)', height: '3px', backgroundColor: 'var(--border)', transform: 'translateY(-50%)', zIndex: 1 }} />
              <div style={{ position: 'absolute', top: '50%', left: 'clamp(10px, 1.5vw, 20px)', height: '3px', backgroundColor: 'var(--foreground)', transform: 'translateY(-50%)', zIndex: 2, transition: 'width 0.4s ease-in-out', width: `calc(${progressPercentage}% - clamp(20px, 3vw, 40px))` }} />
              {slideData.map((_, index) => {
                const isCompletedOrActive = index <= activeStep;
                const delay = isCompletedOrActive && index === activeStep ? '0.3s' : '0s';
                return (
                  <div key={index} style={{
                    position: 'relative', zIndex: 3, width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'var(--background)', border: `3px solid ${isCompletedOrActive ? 'var(--foreground)' : 'var(--border)'}`, transition: `border-color 0.2s ease ${delay}`
                  }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--foreground)', opacity: isCompletedOrActive ? 1 : 0, transform: isCompletedOrActive ? 'scale(1)' : 'scale(0)', transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}` }} />
                  </div>
                );
              })}
            </div>

            {/* CONTENIDOR QUE NO OMPLE L'ESPAI BUID, NOMÉS OCUPA EL QUE NECESSITA */}
            <div style={{ width: '100%', overflow: 'visible', position: 'relative' }}>
              <div style={{ 
                display: 'flex', flexDirection: 'row', width: '100%', 
                transform: `translateX(-${activeStep * 100}%)`, transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' 
              }}>
                {slideData.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <div key={index} style={{ 
                      width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0,
                      opacity: isActive ? 1 : 0, transform: isActive ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}>
                      
                      {/* ESTRUCTURA MAGICA: El text agafa 100% de l'ample, però s'adapta a l'alçada de la imatge */}
                      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        
                        {/* IMATGE: Defineix l'alçada del bloc */}
                        <div style={{ 
                          width: 'clamp(180px, 16vw, 260px)', aspectRatio: '3/4', 
                          opacity: isShowingText ? 0 : 1, pointerEvents: isShowingText ? 'none' : 'auto', 
                          transition: 'opacity 0.4s ease', cursor: 'pointer'
                        }} onClick={toggleContent}>
                          <TiltedCard
                            imageSrc={step.center.image}
                            altText={step.center.title}
                            captionText={`${step.center.title} - Click to read`}
                            containerHeight="100%"
                            containerWidth="100%"
                            rotateAmplitude={12}
                            scaleOnHover={1.03}
                            showTooltip={true}
                          />
                        </div>

                        {/* TEXT: S'estira per sobre de la imatge i ocupa tot l'ample de la caixa central */}
                        <div className="no-scrollbar" style={{ 
                          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                          opacity: isShowingText ? 1 : 0, pointerEvents: isShowingText ? 'auto' : 'none', 
                          transition: 'opacity 0.4s ease', 
                          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left',
                          overflowY: 'auto', paddingRight: '5px'
                        }} onClick={toggleContent}>
                          <h2 style={mainTitleStyle}>{step.center.title}</h2>
                          <p style={{ ...textStyle, textAlign: 'left', width: '100%' }}>
                            {step.center.text}
                          </p>
                          <div style={{ marginTop: 'auto', paddingTop: '10px', fontSize: '0.8rem', color: 'var(--muted-foreground)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Click to close ↺
                          </div>
                        </div>
                        
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* BOTONS: PUGEN A DALT A SOTA DE LA IMATGE */}
            <div style={{ display: 'flex', gap: 'clamp(10px, 1vw, 15px)', width: '100%', justifyContent: 'space-between', marginTop: 'clamp(20px, 3vh, 30px)', flexShrink: 0, zIndex: 10 }}>
              <button onClick={handlePrev} disabled={activeStep === 0} style={{ ...buttonStyle, backgroundColor: 'var(--background)', color: activeStep === 0 ? 'var(--muted-foreground)' : 'var(--foreground)', opacity: activeStep === 0 ? 0.5 : 1, border: '1px solid var(--border)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><polyline points="15 18 9 12 15 6"></polyline></svg> Previous
              </button>
              <button onClick={handleNext} disabled={activeStep === slideData.length - 1} style={{ ...buttonStyle, backgroundColor: 'var(--foreground)', color: 'var(--background)', opacity: activeStep === slideData.length - 1 ? 0.5 : 1 }}>
                Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          {/* =========================================
              CAIXA DRETA
              ========================================= */}
          <div style={boxStyle}>
            {/* ESPAIADOR INVISIBLE */}
            <div style={{ width: '100%', height: '24px', marginBottom: 'clamp(15px, 2vh, 20px)', flexShrink: 0 }} />
            
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <div style={{ 
                display: 'flex', flexDirection: 'row', width: '100%', height: '100%',
                transform: `translateX(-${activeStep * 100}%)`, transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' 
              }}>
                {slideData.map((step, index) => {
                  const isActive = index === activeStep;
                  return (
                    <div key={index} style={{ 
                      width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', flexShrink: 0,
                      opacity: isActive ? 1 : 0, transform: isActive ? 'scale(1)' : 'scale(0.95)', transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}>
                      <h2 style={mainTitleStyle}>
                        {step.right.title}
                      </h2>
                      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                        {step.right.content}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ESTILS GLOBALS */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}