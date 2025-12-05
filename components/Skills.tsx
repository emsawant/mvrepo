import React, { useState } from 'react';

const COMPETENCIES = [
  {
    id: 'fpa',
    title: "Financial Planning & Analysis",
    description: "Expertise in managing large-scale budgets ($1.06B), conducting variance analysis, and driving strategic financial planning initiatives.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
      </svg>
    )
  },
  {
    id: 'budget',
    title: "Budget & Forecast Management",
    description: "Led comprehensive headcount planning for 7,000+ FTEs and automated monthly forecasting workflows to improve accuracy by 5%.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'cost',
    title: "Cost Optimization Strategies",
    description: "Partnered with global CFOs to identify inefficiencies, resulting in 6-8% YoY expense reductions and $6M in annualized savings.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 'data',
    title: "Data-Driven Decision Making",
    description: "Transforming complex datasets into actionable insights using Power BI, SQL, and Python to support senior leadership strategy.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

const TECH_STACK = [
  "Excel", "Power BI", "SQL", "Python", "Tableau", "VBA", 
  "SAP", "Hyperion", "Essbase", "Pitchbook", "Bloomberg", 
  "Financial Modeling", "Variance Analysis", "KPI Tracking", "Forecasts"
];

const Skills: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>('fpa');

  return (
    <section id="skills" className="py-32 bg-secondary overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-text-main mb-16 tracking-tight">
          Core <span className="text-accent">Competencies</span>
        </h2>
        
        {/* Interactive Competency List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {COMPETENCIES.map((item) => (
            <div 
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              className={`group relative overflow-hidden bg-white rounded-2xl border transition-all duration-500 ease-out cursor-default
                ${activeId === item.id 
                  ? 'border-accent/30 shadow-apple-hover' 
                  : 'border-gray-100 shadow-sm hover:border-gray-200'
                }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-6 md:p-8 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors duration-300 ${activeId === item.id ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {item.icon}
                    </div>
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${activeId === item.id ? 'text-text-main' : 'text-gray-500'}`}>
                      {item.title}
                    </h3>
                  </div>
                  
                  {/* Indicator Icon */}
                  <div className={`transform transition-transform duration-500 ${activeId === item.id ? 'rotate-90 text-accent' : 'text-gray-300'}`}>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                  </div>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeId === item.id ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-text-secondary text-lg leading-relaxed pl-[3.75rem]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Scroll Marquee */}
      <div className="relative w-full py-10 bg-white border-y border-gray-100">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        
        <div className="flex overflow-hidden group">
          <div className="flex animate-scroll whitespace-nowrap group-hover:pause">
            {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <div key={i} className="mx-8 flex items-center">
                <span className="text-lg font-medium text-text-secondary/80 tracking-wide hover:text-accent transition-colors cursor-default">
                  {tech}
                </span>
                <span className="ml-8 text-gray-300">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;