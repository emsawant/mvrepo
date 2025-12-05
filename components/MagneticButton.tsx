import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', href, onClick }) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    // Move the button partially towards the cursor
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Content = (
    <div
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      className={`transition-transform duration-200 ease-out cursor-pointer inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );

  if (href) {
    return <a href={href} className="inline-block">{Content}</a>;
  }

  return Content;
};

export default MagneticButton;