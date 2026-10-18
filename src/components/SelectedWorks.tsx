"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const works = [
  { id: 1, title: "APPIKS", category: "Web App • Next.js & Laravel" },
  { id: 2, title: "AWP Internal", category: "Web App • Laravel 12 & Next.js 15" },
  { id: 3, title: "INVIRO CRM", category: "Web App • Enterprise" },
  { id: 4, title: "TDG Dashboard", category: "Web App • BI" },
  { id: 5, title: "INYS Profile", category: "Web App • UI/UX Strategy" },
];

export function SelectedWorks() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col relative w-full border-t border-zinc-200 border-dashed">
      {works.map((work, index) => (
        <div 
          key={work.id}
          className="group relative flex flex-col md:flex-row justify-between items-center py-4 md:py-6 border-b border-zinc-200 border-dashed cursor-pointer"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <h4 className="text-4xl md:text-[6vw] font-black font-heading leading-[0.8] tracking-tighter uppercase relative z-10 transition-transform duration-500 group-hover:translate-x-4">
            {work.title}
          </h4>
          <span className="text-sm md:text-base text-zinc-900 font-bold mt-4 md:mt-0 relative z-10">
            {work.category}
          </span>
          
          {/* Hover Image Reveal */}
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 50, rotate: -5 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-96 aspect-video bg-zinc-800 pointer-events-none z-30 shadow-2xl flex items-center justify-center overflow-hidden"
              >
                  <span className="text-white text-sm font-bold">Project {work.id} Snapshot</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      
      
      {/* View All Projects CTA */}
      <div className="flex justify-center py-10">
        <Link 
          href="/project"
          className="group relative inline-flex items-center gap-4 bg-zinc-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black transition-colors"
        >
          <span>View All Projects</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
