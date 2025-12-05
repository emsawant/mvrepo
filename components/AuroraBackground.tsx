import React from 'react';

const AuroraBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Blob 1: Blue */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob"
      ></div>
      
      {/* Blob 2: Purple */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000"
      ></div>
      
      {/* Blob 3: Pink/Accent */}
      <div 
        className="absolute bottom-[-20%] left-[20%] w-[50vw] h-[50vw] bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-4000"
      ></div>

      {/* Noise Overlay for texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
    </div>
  );
};

export default AuroraBackground;