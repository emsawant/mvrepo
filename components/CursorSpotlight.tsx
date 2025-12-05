import React, { useEffect, useState } from 'react';

const CursorSpotlight: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      style={{ opacity }}
    >
      <div 
        className="absolute bg-accent/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 will-change-transform"
        style={{ 
          left: position.x, 
          top: position.y,
          width: '400px',
          height: '400px',
        }}
      />
    </div>
  );
};

export default CursorSpotlight;