import React, { useState, MouseEvent, useRef } from 'react';
import { Project } from '../types';

interface ProjectWithCategory extends Project {
  category: 'finance' | 'analytics' | 'strategy' | 'automation';
}

const projects: ProjectWithCategory[] = [
  {
    id: 1,
    title: "Budget Optimization",
    description: "Created comprehensive Power BI dashboard tracking $1.06B budget across 15+ cost centers with real-time variance analysis. Achieved 6-8% YoY expense reduction.",
    tech: ["Power BI", "Excel", "SQL"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600",
    link: "#",
    category: 'finance'
  },
  {
    id: 2,
    title: "Strategic Location Modelling",
    description: "Developed data-driven location strategy model analyzing cost structures across regions, leading to optimal resource allocation for 300+ roles and $6M annualized savings.",
    tech: ["Excel", "Python", "Analytics"],
    imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600",
    link: "#",
    category: 'strategy'
  },
  {
    id: 3,
    title: "Forecasting Automation",
    description: "Automated monthly forecasting workflows using Python and VBA, integrating data from multiple sources. Resulted in a 30% reduction in manual processes.",
    tech: ["Python", "VBA", "Automation"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    link: "#",
    category: 'automation'
  },
  {
    id: 4,
    title: "Headcount Planning Model",
    description: "Built comprehensive headcount planning framework for 7,041 FTEs across 15+ cost centers, incorporating salary projections, attrition rates, and strategic hiring plans.",
    tech: ["Excel", "Modeling", "HR Analytics"],
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600",
    link: "#",
    category: 'strategy'
  },
  {
    id: 5,
    title: "Fx Exposure Automation",
    description: "Standardized foreign exchange exposure management across regional finance teams with automated multi-currency P&L forecasting, reducing variance by 15%.",
    tech: ["Excel", "SQL", "Risk Mgmt"],
    imageUrl: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=600",
    link: "#",
    category: 'finance'
  },
  {
    id: 6,
    title: "MIS Dashboard Tracking",
    description: "Designed executive-level MIS reports (50+ annually) with KPI tracking, variance analysis, and strategic insights for senior leadership decision-making.",
    tech: ["Power BI", "Tableau", "SQL"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    link: "#",
    category: 'analytics'
  }
];

const TiltCard: React.FC<{ project: ProjectWithCategory }> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Very subtle tilt for Apple feel
    const rotateX = ((y - centerY) / centerY) * -4; 
    const rotateY = ((x - centerX) / centerX) * 4;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className="perspective-1000 h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className="group relative bg-white rounded-2xl overflow-hidden h-full shadow-apple hover:shadow-apple-hover transition-all duration-300 ease-out preserve-3d border border-gray-100"
        style={{ 
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="h-56 overflow-hidden relative">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
          <span className="absolute bottom-4 left-4 text-[10px] uppercase font-bold text-white bg-black/30 backdrop-blur-md border border-white/20 rounded-md px-2 py-1 tracking-wider">
            {project.category}
          </span>
        </div>
        
        <div className="p-8">
          <h3 className="text-xl font-semibold text-text-main mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-text-secondary mb-6 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t, i) => (
              <span key={i} className="text-xs font-medium bg-secondary text-text-secondary px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
          
          <span className="inline-flex items-center text-accent font-medium text-sm hover:underline">
            View Details
          </span>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'finance' | 'analytics' | 'strategy' | 'automation'>('all');

  const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

  return (
    <section id="projects" className="py-32 bg-primary">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-text-main mb-12 tracking-tight animate-fade-in-up">
          Key <span className="text-accent">Initiatives</span>
        </h2>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          {['all', 'finance', 'analytics', 'strategy', 'automation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                filter === cat 
                  ? 'bg-text-main text-white' 
                  : 'bg-secondary text-text-secondary hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} project={project} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center text-text-secondary py-12">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;