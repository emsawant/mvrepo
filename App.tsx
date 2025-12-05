import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CursorSpotlight from './components/CursorSpotlight';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-slate-100 selection:bg-accent selection:text-white">
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default App;