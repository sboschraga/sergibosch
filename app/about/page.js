'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Image from 'next/image';

// ==========================================
// 1. ESTILS REUTILITZABLES
// ==========================================
const boxStyle = {
  backgroundColor: 'var(--background)',
  border: '1px solid var(--border)', 
  borderRadius: '16px', 
  padding: '30px', 
  display: 'flex', 
  flexDirection: 'column', 
  alignItems: 'center', 
  textAlign: 'center', 
  boxShadow: 'var(--shadow-sm)', 
  height: '70vh', 
  maxHeight: '650px', 
  minHeight: '520px', 
  width: '100%',
  overflow: 'hidden' 
};

const imageContainerStyle = {
  width: '100%', height: '280px', position: 'relative', marginBottom: '20px', flexShrink: 0 
};

const titleStyle = {
  fontFamily: 'var(--font-titol)', fontSize: '1.3rem', fontWeight: '600', marginBottom: '15px', color: 'var(--foreground)'
};

const subtitleStyle = {
  fontFamily: 'var(--font-titol)', fontSize: '1rem', fontWeight: '600', marginBottom: '15px', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '1px', flexShrink: 0
};

const textContainerStyle = {
  width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden'
};

const textStyle = {
  fontFamily: 'var(--font-text)', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--muted-foreground)', margin: 0
};

const listStyle = {
  listStyleType: 'none', padding: 0, margin: 0, width: '100%',
  display: 'flex', flexDirection: 'column', gap: '12px',
  overflowY: 'auto', paddingRight: '5px', scrollbarWidth: 'none', // Permet scroll intern si hi ha molta experiència
  flex: 1
};

const listItemStyle = {
  fontFamily: 'var(--font-text)', fontSize: '0.9rem', color: 'var(--muted-foreground)', display: 'flex', gap: '15px', alignItems: 'flex-start'
};

const listDateStyle = {
  fontFamily: 'var(--font-titol)', fontWeight: '600', color: 'var(--foreground)', minWidth: '85px', flexShrink: 0
};

const buttonStyle = {
  width: '120px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
  borderRadius: '8px', fontFamily: 'var(--font-text)', fontSize: '0.9rem', fontWeight: '500', 
  cursor: 'pointer', transition: 'all 0.2s ease', border: 'none', flexShrink: 0
};

// ==========================================
// 2. DADES DELS SLIDES (El Centre i la Dreta canvien simultàniament)
// ==========================================
const slideData = [
  {
    center: { 
      title: 'Background', 
      text: "Format a Elisava. He treballat en projectes de recerca i disseny especulatiu, sempre buscant anar un pas més enllà del que és convencional.", 
      image: '/about/primaria.png' 
    },
    right: { 
      title: 'Programs Knowledge', 
      content: (
        // Graella de 2 columnes per encabir bé tot el software
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '100%', overflowY: 'auto', paddingRight: '5px', scrollbarWidth: 'none', flex: 1 }}>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>Rhino 3D</strong><br/>Advanced</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>InDesign</strong><br/>Advanced</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>Arduino</strong><br/>Advanced</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>Processing</strong><br/>Advanced</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>Unity</strong><br/>Intermediate</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>DaVinci Resolve</strong><br/>Intermediate</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>Illustrator</strong><br/>Intermediate</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>KeyShot</strong><br/>Intermediate</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>After Effects</strong><br/>Beginner</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>Blender</strong><br/>Beginner</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>Photoshop</strong><br/>Beginner</p>
          <p style={{...textStyle, fontSize: '0.85rem'}}><strong style={{ color: 'var(--foreground)' }}>p5.js</strong><br/>Beginner</p>
        </div>
      )
    }
  },
  {
    center: { 
      title: 'Approach', 
      text: "Cada projecte és una investigació. Tracto l'espai digital com un lloc on habitar, cuidant cada detall tipogràfic i d'interacció.", 
      image: '/about/eso.png' 
    },
    right: { 
      title: 'Experience', 
      content: (
        <ul style={listStyle}>
          <li style={listItemStyle}><span style={listDateStyle}>2026</span> <span>Intern <br/><span style={{fontSize: '0.8rem'}}>Artec Light Studio</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2021-2026</span> <span>Catering Assistant <br/><span style={{fontSize: '0.8rem'}}>ALaCartaGranollers</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2025</span> <span>Bartender <br/><span style={{fontSize: '0.8rem'}}>Mas Sorrer</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2025</span> <span>Expositor <br/><span style={{fontSize: '0.8rem'}}>Sónar Festival</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2024</span> <span>Volunteer <br/><span style={{fontSize: '0.8rem'}}>Mira Festival</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2024</span> <span>Kitchen Assistant <br/><span style={{fontSize: '0.8rem'}}>El Camí de Ronda</span></span></li>
          <li style={listItemStyle}><span style={listDateStyle}>2023</span> <span>Waiter <br/><span style={{fontSize: '0.8rem'}}>La Pineda</span></span></li>
        </ul>
      )
    }
  },
  {
    center: { 
      title: 'Toolkit', 
      text: "Les meves eines de construcció digitals, des de la conceptualització visual fins a la programació d'interfícies interactives.", 
      image: '/about/uni.png' 
    },
    right: { 
      title: 'Languages', 
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p style={textStyle}><strong style={{ color: 'var(--foreground)' }}>Catalan</strong> - Native</p>
          <p style={textStyle}><strong style={{ color: 'var(--foreground)' }}>Spanish</strong> - Native</p>
          <p style={textStyle}><strong style={{ color: 'var(--foreground)' }}>English</strong> - B2</p>
          <p style={textStyle}><strong style={{ color: 'var(--foreground)' }}>French</strong> - A2</p>
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

  const handleNext = () => {
    if (activeStep < slideData.length - 1) setActiveStep(prev => prev + 1);
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(prev => prev - 1);
  };

  const progressPercentage = (activeStep / (slideData.length - 1)) * 100;

  return (
    <main style={{ 
      backgroundColor: 'var(--background)', color: 'var(--foreground)', fontFamily: 'var(--font-cos)', 
      height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    }}>
      
      <Navbar title="About" />

      <section style={{ 
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', 
        padding: '80px clamp(20px, 4vw, 60px) 20px', width: '100%', maxWidth: '1600px', margin: '0 auto'
      }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--gap-large)', width: '100%' }}>

          {/* =========================================
              CAIXA ESQUERRA (ESTÀTICA - Perfil)
              ========================================= */}
          <div style={boxStyle}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              
              <h2 style={{...titleStyle, fontSize: '2rem', marginBottom: '20px'}}>Sergi Bosch Raga</h2>
              
              <p style={{...textStyle, textAlign: 'left', lineHeight: '1.7'}}>
                I’m Sergi Bosch Raga, an interactive experience designer, currently studying at Elisava. My work spans across visual communication, interactive experiences, and programming, driven by a deep curiosity to explore new tools and methods. I’m always eager to push boundaries and experiment within my projects. Recently, I’ve also started to develop my skills in the gaming industry, shaping my own unique path in this field.
              </p>

            </div>
          </div>

          {/* =========================================
              CAIXA CENTRAL (DINÀMICA - Stepper)
              ========================================= */}
          <div style={{ ...boxStyle, position: 'relative' }}>
            
            {/* BARRA DE PROGRÉS */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: '24px', marginBottom: '20px', padding: '0 20px', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '50%', left: '20px', right: '20px', height: '3px', backgroundColor: 'var(--border)', transform: 'translateY(-50%)', zIndex: 1 }} />
              
              <div style={{ position: 'absolute', top: '50%', left: '20px', height: '3px', backgroundColor: 'var(--foreground)', transform: 'translateY(-50%)', zIndex: 2, transition: 'width 0.4s ease-in-out', width: `calc(${progressPercentage}% - 40px)` }} />

              {slideData.map((_, index) => {
                const isCompletedOrActive = index <= activeStep;
                const delay = isCompletedOrActive && index === activeStep ? '0.3s' : '0s';

                return (
                  <div key={index} style={{
                    position: 'relative', zIndex: 3, width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: 'var(--background)',
                    border: `3px solid ${isCompletedOrActive ? 'var(--foreground)' : 'var(--border)'}`,
                    transition: `border-color 0.2s ease ${delay}`
                  }}>
                    <div style={{ 
                      width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--foreground)',
                      opacity: isCompletedOrActive ? 1 : 0,
                      transform: isCompletedOrActive ? 'scale(1)' : 'scale(0)',
                      transition: `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}`
                    }} />
                  </div>
                );
              })}
            </div>

            {/* CARRIL DE LLISCAMENT CENTRAL */}
            <div style={{ width: '100%', flex: 1, overflow: 'hidden', position: 'relative' }}>
              <div style={{ 
                display: 'flex', flexDirection: 'row', width: '100%', height: '100%',
                transform: `translateX(-${activeStep * 100}%)`,
                transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' 
              }}>
                {slideData.map((step, index) => (
                  <div key={index} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    
                    <div style={imageContainerStyle}>
                      <Image 
                        src={step.center.image} alt={step.center.title} 
                        fill sizes="(max-width: 768px) 33vw, 33vw" 
                        style={{ objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} 
                      />
                    </div>
                    
                    <h2 style={titleStyle}>{step.center.title}</h2>
                    <div style={textContainerStyle}>
                      <p style={textStyle}>{step.center.text}</p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* BOTONS FIXOS */}
            <div style={{ display: 'flex', gap: '15px', marginTop: 'auto', width: '100%', justifyContent: 'space-between', paddingTop: '20px', flexShrink: 0 }}>
              <button onClick={handlePrev} disabled={activeStep === 0} style={{ ...buttonStyle, backgroundColor: 'var(--background)', color: activeStep === 0 ? 'var(--muted-foreground)' : 'var(--foreground)', opacity: activeStep === 0 ? 0.5 : 1, border: '1px solid var(--border)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}><polyline points="15 18 9 12 15 6"></polyline></svg>
                Previous
              </button>
              <button onClick={handleNext} disabled={activeStep === slideData.length - 1} style={{ ...buttonStyle, backgroundColor: 'var(--foreground)', color: 'var(--background)', opacity: activeStep === slideData.length - 1 ? 0.5 : 1 }}>
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '5px' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          {/* =========================================
              CAIXA DRETA (DINÀMICA - Resume Slider)
              ========================================= */}
          <div style={{ ...boxStyle, position: 'relative' }}>
            
            {/* CARRIL DE LLISCAMENT DRET */}
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <div style={{ 
                display: 'flex', flexDirection: 'row', width: '100%', height: '100%',
                transform: `translateX(-${activeStep * 100}%)`,
                transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' 
              }}>
                {slideData.map((step, index) => (
                  <div key={index} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', flexShrink: 0 }}>
                    
                    <h3 style={subtitleStyle}>{step.right.title}</h3>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                      {step.right.content}
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </section>
    </main>
  );
}