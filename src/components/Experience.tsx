"use client";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const experiences = [
  {
    id: 'pm-novaren',
    title: 'Project Manager',
    company: 'PT. Novaren Teknologi Indonesia',
    period: '2026 - Present',
    image: "/images/profile-photo.png"
  },
  {
    id: 'sekjen-assets',
    title: 'Secretary General',
    company: 'ASSETS TRPL UGM',
    period: '2025 - 2026',
    image: "/images/profile-photo.png"
  },
  {
    id: 'hustler-gdg',
    title: 'Hustler',
    company: 'GDG on Campus UGM',
    period: '2024 - 2025',
    image: "/images/profile-photo.png"
  },
  {
    id: 'pm-fundation',
    title: 'Project Manager',
    company: 'FUNDation',
    period: '2024 - 2025',
    image: "/images/profile-photo.png"
  }
];

export function Experience() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth the mouse position for a premium feel
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="w-full flex flex-col relative">
      <div className="border-t border-white/20" />
      {experiences.map((exp) => (
        <div 
          key={exp.id}
          className="group relative border-b border-white/20 py-10 md:py-16 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-white/5 transition-colors duration-500 px-4 md:px-10 -mx-4 md:-mx-10"
          onMouseEnter={() => setHoveredId(exp.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div className="flex flex-col gap-2 relative z-10">
            <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white transition-transform duration-500 group-hover:translate-x-4">
              {exp.company}
            </h3>
            <p className="text-lg md:text-xl text-zinc-400 transition-transform duration-500 group-hover:translate-x-4">
              {exp.title}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 relative z-10">
            <h4 className="text-sm md:text-base font-bold tracking-widest text-zinc-500 uppercase transition-colors duration-500 group-hover:text-white">
              {exp.period}
            </h4>
          </div>
        </div>
      ))}
      
      {/* Floating Image Reveal */}
      <div className="fixed inset-0 pointer-events-none z-[100] hidden md:block">
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
              }}
              className="absolute top-0 left-0 w-80 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img 
                src={experiences.find(e => e.id === hoveredId)?.image} 
                alt="Experience Preview" 
                className="w-full h-full object-cover grayscale transition-all duration-500"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* View Full Experience CTA */}
      <div className="flex justify-center py-12">
        <a 
          href="/experience"
          className="group relative inline-flex items-center gap-4 bg-white text-zinc-950 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors"
        >
          <span>View Full Experience</span>
          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
  );
}
