"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const allProjects = [
  {
    id: 1,
    title: "AWP Profile",
    category: "Web App • UI/UX Strategy",
    year: "2026",
    image: "/images/20231011_150711.png",
    description: "High-impact digital corporate profile platform engineered for PT Adiwarna Pratama.",
  },
  {
    id: 2,
    title: "TDG Profile",
    category: "Web App • UI/UX Strategy",
    year: "2026",
    image: "/images/20231011_150711.png",
    description: "Optimized corporate identity and digital web presence for PT Tata Data Global.",
  },
  {
    id: 3,
    title: "Novaren Profile",
    category: "Web App • UI/UX Strategy",
    year: "2026",
    image: "/images/20231011_150711.png",
    description: "Comprehensive corporate profile platform developed for PT Novaren Teknologi Indonesia.",
  },
  {
    id: 4,
    title: "Wormibox Profile",
    category: "Web App • UI/UX Strategy",
    year: "2026",
    image: "/images/20231011_150711.png",
    description: "Strategic digital identity and company profile tailored for Wormibox.",
  },
  {
    id: 5,
    title: "Defreze Profile",
    category: "Web App • UI/UX Strategy",
    year: "2026",
    image: "/images/20231011_150711.png",
    description: "Corporate platform development providing digital assets for Defreze Veterinary services.",
  },
  {
    id: 6,
    title: "INYS Profile",
    category: "Web App • UI/UX Strategy",
    year: "2026",
    image: "/images/20231011_150711.png",
    description: "Strategic digital identity creation for the Indonesian Nuclear Youth Society, translating their core philosophy.",
  },
  {
    id: 7,
    title: "APPIKS",
    category: "Web App • Next.js & Laravel",
    year: "2025",
    image: "/images/20231011_150711.png",
    description: "A high school anti-bullying platform with an advanced, AI-powered 'Curhat' (confession) ecosystem.",
  },
  {
    id: 8,
    title: "AWP Internal System",
    category: "Web App • Laravel & Next.js",
    year: "2026",
    image: "/images/20231011_150711.png",
    description: "Full-scale codebase migration from legacy architecture to a modern stack, boosting system performance by 40%.",
  },
  {
    id: 9,
    title: "INVIRO CRM",
    category: "Web App • Enterprise",
    year: "2025",
    image: "/images/20231011_150711.png",
    description: "Digital lead tracking system with an 'Early Warning System' based on customer churn patterns.",
  },
  {
    id: 10,
    title: "Finance Sentiment Analyzer",
    category: "AI Model • Python & NLP",
    year: "2025",
    image: "/images/20231011_150711.png",
    description: "Fine-tuned NLP models (Transformers/BERT) to classify market sentiment from large-scale financial datasets.",
  },
  {
    id: 11,
    title: "TDG Finance Dashboard",
    category: "Web App • BI",
    year: "2026",
    image: "/images/20231011_150711.png",
    description: "Interactive Business Intelligence tool to visualize real-time corporate financial metrics and KPIs.",
  }
];

export default function ProjectPage() {
  return (
    <main className="min-h-screen bg-[#F0F0F0] text-zinc-950 pt-40 pb-20 px-4 md:px-10 selection:bg-zinc-900 selection:text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 mb-20"
        >
          <h1 className="text-6xl md:text-[8vw] font-black font-heading leading-[0.8] tracking-tighter uppercase">
            All Projects
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl font-bold">
            A comprehensive archive of my selected works, experiments, and professional projects spanning from web applications to mobile development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-200 mb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-2xl font-black font-heading uppercase tracking-tight group-hover:underline underline-offset-4 decoration-2">
                    {project.title}
                  </h3>
                  <span className="text-sm font-bold text-zinc-500 shrink-0">{project.year}</span>
                </div>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                  {project.category}
                </p>
                <p className="text-base text-zinc-600 mt-2 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
