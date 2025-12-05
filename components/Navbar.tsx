import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100; // Navbar height + buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL hash for shareability without jump
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Name / Logo */}
        <div 
          onClick={scrollToTop}
          className="text-2xl font-semibold text-text-main tracking-tight cursor-pointer hover:text-accent transition-colors"
        >
          Maitrayee Vishnu
        </div>
        
        {/* Links */}
        <ul className="hidden md:flex gap-10">
          {['Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className="text-base text-text-secondary hover:text-text-main transition-colors font-medium tracking-wide"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-100 ease-out opacity-80" style={{ width: `${scrollProgress * 100}%` }}></div>
    </nav>
  );
};

export default Navbar;