import React from 'react';

interface TimelineItem {
  id: number;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  type: 'work' | 'education';
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    role: "Master of Science in Finance",
    company: "Stevens Institute of Technology",
    period: "Sep 2025 - Dec 2026",
    location: "Hoboken, NJ",
    description: "Specializing in Financial Analytics and Quantitative Finance.",
    type: 'education'
  },
  {
    id: 2,
    role: "FP&A Associate",
    company: "JP Morgan Chase",
    period: "Apr 2022 - Aug 2025",
    location: "Mumbai, India",
    description: "Managed $1.06B budget, led headcount planning for 7,000+ FTEs, and partnered with CFOs to drive 6-8% YoY expense reduction.",
    type: 'work'
  },
  {
    id: 3,
    role: "MBA in Finance",
    company: "ICFAI Business School",
    period: "May 2020 - Feb 2022",
    location: "Mumbai, India",
    description: "graduated with 9.2/10 GPA. Focused on Corporate Finance and Investment Management.",
    type: 'education'
  },
  {
    id: 4,
    role: "Finance Intern",
    company: "Aditya Birla Sun Life Insurance",
    period: "Jan 2021 - Jun 2021",
    location: "Mumbai, India",
    description: "Managed trade lifecycles for 1,000+ weekly transactions and improved process turnaround time by 15%.",
    type: 'work'
  }
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-text-main mb-20 tracking-tight">
          Career <span className="text-accent">Journey</span>
        </h2>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {timelineData.map((item, index) => (
            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon / Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-gray-100 group-hover:bg-accent transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                {item.type === 'work' ? (
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                )}
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-apple transition-all duration-300 hover:shadow-apple-hover border border-gray-100 relative">
                 {/* Arrow for Desktop */}
                 <div className={`hidden md:block absolute top-1/2 -mt-2 w-4 h-4 bg-white border-t border-r border-gray-100 transform rotate-45 ${index % 2 === 0 ? '-right-2 border-l-0 border-b-0' : '-left-2 border-r-0 border-t-0 bg-white'}`}></div>
                 
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide ${item.type === 'work' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {item.type}
                    </span>
                    <span className="text-xs text-text-secondary font-medium mt-1 sm:mt-0">{item.period}</span>
                 </div>
                 
                 <h3 className="text-lg font-bold text-text-main mb-1">{item.role}</h3>
                 <div className="text-sm font-medium text-accent mb-3">{item.company} <span className="text-gray-400 font-normal">• {item.location}</span></div>
                 <p className="text-text-secondary text-sm leading-relaxed">
                    {item.description}
                 </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;