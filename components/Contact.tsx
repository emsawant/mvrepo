import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-secondary">
      <div className="container mx-auto px-6 max-w-2xl">
        <h2 className="text-4xl font-semibold text-center text-text-main mb-16 tracking-tight">
          Get In <span className="text-accent">Touch</span>
        </h2>
        
        <div className="space-y-10">
           <p className="text-center text-text-secondary text-lg leading-relaxed font-normal">
               I'm always interested in discussing finance, data analytics, and potential collaboration opportunities. 
               Currently based in New Jersey and pursuing my MS in Finance.
           </p>
           
           <div className="flex flex-col gap-6 items-center">
             
             {/* Email */}
             <a 
               href="https://mail.google.com/mail/?view=cm&fs=1&to=maitrayeeanandvishnu@gmail.com" 
               target="_blank" 
               rel="noopener noreferrer"
               className="w-full max-w-md bg-white p-6 rounded-2xl shadow-apple hover:shadow-apple-hover transition-all duration-300 flex items-center gap-6 group"
             >
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Email</p>
                    <p className="text-text-main font-medium group-hover:text-accent transition-colors">maitrayeeanandvishnu@gmail.com</p>
                </div>
             </a>

             {/* Phone */}
             <a href="tel:+15513443931" className="w-full max-w-md bg-white p-6 rounded-2xl shadow-apple hover:shadow-apple-hover transition-all duration-300 flex items-center gap-6 group">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-text-main font-medium group-hover:text-accent transition-colors">+1 551 344-3931</p>
                </div>
             </a>

             {/* LinkedIn */}
             <a href="https://www.linkedin.com/in/maitrayee-vishnu/" target="_blank" rel="noopener noreferrer" className="w-full max-w-md bg-white p-6 rounded-2xl shadow-apple hover:shadow-apple-hover transition-all duration-300 flex items-center gap-6 group">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">LinkedIn</p>
                    <p className="text-text-main font-medium group-hover:text-accent transition-colors">Connect on LinkedIn</p>
                </div>
             </a>

             {/* Location */}
             <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-apple transition-all duration-300 flex items-center gap-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-accent">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Location</p>
                    <p className="text-text-main font-medium">New Jersey, USA</p>
                </div>
             </div>

           </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;