import React, { useState, useEffect } from 'react';
import AuroraBackground from './AuroraBackground';
import MagneticButton from './MagneticButton';

const ROLES = [
  "FP&A Professional",
  "Finance Graduate Student",
  "Data Analyst",
  "Strategic Planner"
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typeSpeed = isDeleting ? 50 : 150;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause at end
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
      <AuroraBackground />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-[-50px]">
        <h1 className="text-6xl md:text-8xl font-semibold mb-6 text-text-main tracking-tighter leading-tight animate-fade-in-up">
          I am <br className="md:hidden" />
          <span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-text-main to-gray-500 inline-block pb-4"
          >
            Maitrayee
          </span>
        </h1>
        
        <div className="h-8 mb-8 text-xl md:text-2xl text-text-secondary font-medium tracking-wide animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="text-accent">{text}</span>
          <span className="animate-pulse text-accent">|</span>
        </div>

        <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-normal animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Skilled in Financial Planning & Analysis, Excel, Power BI, SQL, and Python. 
          Transforming data into strategic business insights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <MagneticButton href="#projects" className="group">
            <span className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20 text-sm block">
                View Experience
            </span>
          </MagneticButton>
          
          <MagneticButton href="#contact" className="group">
            <span className="px-8 py-3 text-accent bg-white/50 backdrop-blur-sm border border-gray-200 font-medium rounded-full hover:bg-white transition-colors text-sm flex items-center justify-center shadow-sm block">
                Get In Touch <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </MagneticButton>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-text-secondary opacity-50 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;