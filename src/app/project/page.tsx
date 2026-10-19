"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, ExternalLink, Calendar, ShieldCheck, Search } from "lucide-react";
import dynamic from "next/dynamic";

const TypeWallHero = dynamic(() => import("@/components/TypeWallHero"), {
  ssr: false,
});

interface Project {
  id: number;
  code: string;
  tabLabel: string;
  title: string;
  category: string;
  filterType: "web" | "ai" | "desktop" | "profile";
  year: string;
  status: string;
  image: string;
  description: string;
  role: string;
  techStack: string[];
  impact: string;
}

const allProjects: Project[] = [
  {
    id: 1,
    code: "DOC-01",
    tabLabel: "AWP Profile",
    title: "PT Adiwarna Pratama",
    category: "Corporate Profile • Web Architecture",
    filterType: "profile",
    year: "2026",
    status: "PRODUCTION",
    image: "/images/company profile PT adiwarna pratama.png",
    description: "High-impact digital corporate profile platform engineered for PT Adiwarna Pratama. Featuring responsive typography, interactive capability matrices, and modern editorial aesthetics.",
    role: "Full-Stack Developer & UI Strategist",
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion"],
    impact: "Established unified brand identity and scaled corporate client outreach by 65%."
  },
  {
    id: 2,
    code: "DOC-02",
    tabLabel: "TDG Profile",
    title: "PT Tata Data Global",
    category: "Corporate Profile • Web Strategy",
    filterType: "profile",
    year: "2026",
    status: "PRODUCTION",
    image: "/images/20231011_150711.png",
    description: "Optimized corporate identity and digital web presence showcasing enterprise business intelligence consulting, real-time analytics solutions, and client success metrics.",
    role: "System Analyst & Frontend Lead",
    techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    impact: "Streamlined stakeholder discovery with high-speed interactive service portals."
  },
  {
    id: 3,
    code: "DOC-03",
    tabLabel: "Novaren Profile",
    title: "PT Novaren Teknologi",
    category: "Technology Agency • Digital Portal",
    filterType: "profile",
    year: "2026",
    status: "PRODUCTION",
    image: "/images/20231011_150711.png",
    description: "Comprehensive corporate profile platform developed for PT Novaren Teknologi Indonesia to highlight flagship engineering solutions and software consulting portfolios.",
    role: "Project Manager & Tech Lead",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    impact: "Coordinated technical specifications across teams and delivered production MVP within 4 weeks."
  },
  {
    id: 4,
    code: "DOC-04",
    tabLabel: "Wormibox",
    title: "Wormibox Eco-Tech",
    category: "Eco-Tech Platform • Web Design",
    filterType: "profile",
    year: "2026",
    status: "PRODUCTION",
    image: "/images/company profile wormibox.png",
    description: "Strategic digital identity and company profile tailored for Wormibox eco-technology, articulating vermiculture waste management systems and organic fertilizer products.",
    role: "UI/UX Designer & Frontend Developer",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    impact: "Elevated sustainability narrative, directly supporting key investor pitch decks."
  },
  {
    id: 5,
    code: "DOC-05",
    tabLabel: "Defreze Vet",
    title: "Klinik Hewan D'Frezee",
    category: "Veterinary Clinic • Web Platform",
    filterType: "profile",
    year: "2026",
    status: "PRODUCTION",
    image: "/images/company profile klinik hewan d'frezee and son.png",
    description: "Digital web platform and scheduling intake interface developed for Klinik Hewan D'Frezee & Son, offering veterinary services, doctor profiles, and appointment bookings.",
    role: "Full-Stack Web Developer",
    techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Node.js"],
    impact: "Digitized appointment scheduling and expanded patient reach by 80%."
  },
  {
    id: 6,
    code: "DOC-06",
    tabLabel: "INYS Profile",
    title: "INYS Youth Society",
    category: "Youth Organization • Digital Identity",
    filterType: "profile",
    year: "2026",
    status: "PRODUCTION",
    image: "/images/company profiile INYS.png",
    description: "Strategic digital platform for the Indonesian Nuclear Youth Society (INYS), translating nuclear energy science education and youth advocacy into clean web design.",
    role: "System Analyst & Web Designer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    impact: "Supported national youth symposiums, generating 10,000+ public impressions."
  },
  {
    id: 7,
    code: "DOC-07",
    tabLabel: "APPIKS Platform",
    title: "APPIKS Anti-Bullying",
    category: "Web App • AI Counseling Portal",
    filterType: "web",
    year: "2025",
    status: "DEPLOYED",
    image: "/images/20231011_150711.png",
    description: "An innovative high school anti-bullying platform equipped with an AI-powered 'Curhat' (confidential confession) ecosystem, sentiment escalation, and anonymous incident reporting.",
    role: "Full-Stack Developer",
    techStack: ["Next.js", "Laravel 11", "MySQL", "Tailwind CSS"],
    impact: "Piloted in 3 high schools, facilitating 200+ secure, encrypted counseling inquiries."
  },
  {
    id: 8,
    code: "DOC-08",
    tabLabel: "AWP System",
    title: "AWP Internal ERP",
    category: "Web App • Enterprise ERP",
    filterType: "web",
    year: "2026",
    status: "INTERNAL",
    image: "/images/20231011_150711.png",
    description: "Full-scale codebase migration from legacy architecture to Next.js 15 and Laravel 12 API, with role-based access control, purchase requisition, and inventory asset tracking.",
    role: "System Architect & Backend Lead",
    techStack: ["Laravel 12", "Next.js 15", "PostgreSQL", "Redis"],
    impact: "Boosted system query response time by 40% and eliminated paper workflows."
  },
  {
    id: 9,
    code: "DOC-09",
    tabLabel: "INVIRO CRM",
    title: "INVIRO CRM",
    category: "Web App • Enterprise Lead CRM",
    filterType: "web",
    year: "2025",
    status: "ENTERPRISE",
    image: "/images/20231011_150711.png",
    description: "Enterprise lead tracking and relationship management system featuring an 'Early Warning System' algorithm based on client activity degradation and churn patterns.",
    role: "Full-Stack Engineer",
    techStack: ["Laravel", "Vue.js", "Tailwind CSS", "MySQL"],
    impact: "Monitored 1,500+ active enterprise client accounts with proactive alerts."
  },
  {
    id: 10,
    code: "DOC-10",
    tabLabel: "Finance AI",
    title: "Sentiment Analyzer",
    category: "AI / NLP Model • Python & BERT",
    filterType: "ai",
    year: "2025",
    status: "RESEARCH",
    image: "/images/20231011_150711.png",
    description: "Fine-tuned NLP Transformer models (BERT & RoBERTa) trained on large financial datasets to extract and classify market sentiment from news releases with high precision.",
    role: "AI / Machine Learning Engineer",
    techStack: ["Python", "PyTorch", "Hugging Face", "Pandas", "BERT"],
    impact: "Achieved 91.4% sentiment classification accuracy on test benchmarks."
  },
  {
    id: 11,
    code: "DOC-11",
    tabLabel: "TDG Finance",
    title: "TDG Finance BI",
    category: "Web App • BI & Financial Analytics",
    filterType: "web",
    year: "2026",
    status: "PRODUCTION",
    image: "/images/20231011_150711.png",
    description: "Interactive Business Intelligence dashboard visualizing real-time financial metrics, department burn rates, and cash flow KPIs with drill-down historical reports.",
    role: "Frontend Developer & BI Analyst",
    techStack: ["Next.js", "Recharts", "Tailwind CSS", "TypeScript"],
    impact: "Decreased weekly financial report compilation time by 75% for leadership."
  },
  {
    id: 12,
    code: "DOC-12",
    tabLabel: "Sorak Pandak",
    title: "Sorak Pandak Portal",
    category: "Web App • Community Initiative",
    filterType: "profile",
    year: "2025",
    status: "DEPLOYED",
    image: "/images/20231011_150711.png",
    description: "Digital village profile and community initiative portal engineered for the Sorak Pandak KKN program at Universitas Gadjah Mada, publicizing local crafts and administrative services.",
    role: "Web Lead & Community Liaison",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    impact: "Cataloged 20+ village MSMEs and served as central digital hub for programs."
  },
  {
    id: 13,
    code: "DOC-13",
    tabLabel: "Library App",
    title: "Library Management",
    category: "Desktop App • Management System",
    filterType: "desktop",
    year: "2024",
    status: "COMPLETED",
    image: "/images/20231011_150711.png",
    description: "A robust desktop application for institutional library administration, streamlining ISBN barcode scanning, member circulation records, book reservations, and overdue penalties.",
    role: "Desktop Software Developer",
    techStack: ["Java", "JavaFX", "MySQL", "Scene Builder"],
    impact: "Replaced paper-based logbooks with an automated relational database."
  }
];

export default function ProjectPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "profile" | "web" | "ai" | "desktop">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = allProjects.filter(project => {
    const matchesFilter = activeFilter === "all" || project.filterType === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-[#F4F4F6] text-zinc-950 overflow-x-clip relative flex flex-col">
      {/* 3D Typographic Folding Wall Hero (ported from 333southwabash.com/the-red) */}
      <TypeWallHero />

      <main id="project-list" className="min-h-screen bg-[#F4F4F6] text-zinc-950 pt-16 pb-0 overflow-x-clip relative z-20 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.06)] border-t border-zinc-300/80 flex flex-col">
      
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#000000_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="w-full px-4 md:px-8 lg:px-12 mx-auto relative z-10 flex-grow flex flex-col">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8 pb-5 border-b border-zinc-300">
          <div>
            <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter uppercase text-zinc-950 leading-none">
              Projects
            </h1>
            <p className="text-zinc-500 font-mono text-xs md:text-sm mt-2 tracking-wider">
              [INDEX: {filteredProjects.length} DOCUMENTS REGISTERED]
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search file..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-zinc-300 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "all", label: "ALL" },
                { id: "profile", label: "PROFILES" },
                { id: "web", label: "WEB APPS" },
                { id: "ai", label: "AI & NLP" },
                { id: "desktop", label: "DESKTOP" },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-colors border ${
                    activeFilter === tab.id
                      ? "bg-black text-white border-black"
                      : "bg-white text-zinc-600 border-zinc-300 hover:border-zinc-500 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FULL-WIDTH 3D FILING DRAWER */}
        <div className="flex-grow flex flex-col items-center justify-end relative mt-24">
          
          {/* THE STACKED CARDS IN 3D PERSPECTIVE */}
          <div className="relative w-full max-w-[1700px] h-[550px] md:h-[700px] flex items-end justify-center perspective-[1500px] z-20 pointer-events-none">
            {filteredProjects.map((project, i) => {
              const total = filteredProjects.length;
              const reverseI = total - 1 - i; 

              const tabPos = reverseI % 4;
              const tabLeft = `${tabPos * 25}%`;

              let cardRoundedClass = "rounded-t-2xl";
              if (tabPos === 0) cardRoundedClass = "rounded-tr-2xl rounded-tl-none";
              if (tabPos === 3) cardRoundedClass = "rounded-tl-2xl rounded-tr-none";

              const isSelected = selectedProject?.id === project.id;
              const anySelected = selectedProject !== null;
              
              const selectedIndex = filteredProjects.findIndex(p => p.id === selectedProject?.id);
              const selectedReverseI = anySelected ? filteredProjects.length - 1 - selectedIndex : 0;
              
              let targetY = -(reverseI * 20);
              if (isSelected) {
                targetY = 0;
              } else if (anySelected) {
                if (i < selectedIndex) {
                  // Move folders behind the selected folder up so their tabs remain visible
                  const shiftUp = 350 - (selectedReverseI * 20);
                  targetY = -(reverseI * 20) - shiftUp;
                } else {
                  targetY = -(reverseI * 20);
                }
              } else if (hoveredIndex !== null) {
                if (i <= hoveredIndex) {
                  // Folder is hovered, or is behind the hovered folder
                  targetY = -(reverseI * 20) - 60;
                }
              }

              return (
                <motion.div
                  key={project.id}
                  onMouseEnter={() => !anySelected && setHoveredIndex(i)}
                  onMouseLeave={() => !anySelected && setHoveredIndex(null)}
                  onClick={() => {
                    if (!isSelected) {
                      setSelectedProject(project);
                      setHoveredIndex(null);
                    }
                  }}
                  initial={false}
                  animate={{
                    y: targetY,
                    scale: 1,
                    zIndex: isSelected ? 100 : (anySelected ? 10 : i),
                    height: isSelected ? "700px" : "350px",
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`group absolute bottom-0 w-full ${cardRoundedClass} border-2 transition-colors pointer-events-auto
                    ${isSelected ? "bg-[#121214] text-white border-zinc-700 cursor-default" : "border-zinc-300 bg-[#F8F8F8] hover:bg-black text-zinc-950 hover:text-white hover:border-black cursor-pointer"}
                  `}
                  style={{
                    transformOrigin: "bottom center",
                    boxShadow: isSelected ? "0 -20px 50px rgba(0,0,0,0.4)" : "0 -4px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Folder Tab (Bagian Menonjol) */}
                  <div 
                    className={`absolute -top-10 h-10 px-4 flex items-center border-t-2 border-x-2 rounded-t-xl transition-colors z-30 shadow-sm
                      ${isSelected ? "bg-[#121214] border-zinc-700 text-white" : "border-zinc-300 bg-[#F8F8F8] text-zinc-700 group-hover:bg-black group-hover:border-black group-hover:text-white"}
                    `}
                    style={{ left: tabLeft, width: "25%" }}
                  >
                    <span className="text-[10px] md:text-[11px] font-mono font-bold tracking-widest uppercase truncate w-full text-center">
                      {project.tabLabel}
                    </span>
                  </div>

                  {/* Card Face Content (Conditional) */}
                  <div className={`w-full h-full relative z-20 overflow-hidden ${cardRoundedClass}`}>
                    <AnimatePresence mode="wait">
                      {!isSelected ? (
                        <motion.div 
                          key="summary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-full h-full p-6 md:p-10 flex flex-col justify-between"
                        >
                          <div className="flex justify-between items-start">
                            <span className={`text-xs font-mono font-bold tracking-widest uppercase group-hover:text-zinc-400 ${anySelected ? "text-zinc-400" : "text-zinc-500"}`}>
                              /{project.category} • {project.year}
                            </span>
                            <span className={`text-sm font-mono font-black group-hover:text-zinc-600 ${anySelected ? "text-zinc-400" : "text-zinc-300"}`}>
                              {project.code}
                            </span>
                          </div>

                          <div>
                            <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase leading-none mb-4">
                              {project.title}
                            </h2>
                            <div className="w-full h-px bg-zinc-300 group-hover:bg-zinc-800" />
                            <div className="flex justify-between items-center mt-4">
                              <p className="text-xs md:text-sm font-mono text-zinc-600 group-hover:text-zinc-300">
                                CLICK TO INSPECT DOSSIER
                              </p>
                              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="detail"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: 0.2 }}
                          className="w-full h-full p-6 md:p-10 flex flex-col gap-8 overflow-y-auto custom-scrollbar"
                        >
                          {/* DOSSIER CONTENT */}
                          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 shrink-0">
                            <div className="flex items-center gap-3">
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              <span className="text-xs md:text-sm font-mono font-bold tracking-widest uppercase text-zinc-300">
                                DOCUMENT ARCHIVE — [{project.code}]
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(null);
                              }}
                              className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-white hover:text-black transition-colors flex items-center justify-center text-zinc-400 border border-zinc-700 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex flex-col md:flex-row justify-between items-start gap-4 border-b border-zinc-800 pb-6 shrink-0">
                            <div>
                              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                                /{project.category}
                              </span>
                              <h2 className="text-3xl md:text-5xl font-black font-heading tracking-tight uppercase text-white mt-1">
                                {project.title}
                              </h2>
                            </div>

                            <div className="flex flex-wrap gap-2 md:self-end">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-900 text-zinc-300 border border-zinc-700">
                                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                                YEAR: {project.year}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-zinc-950">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                {project.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start shrink-0">
                            {/* Left: Visual Screenshot */}
                            <div className="w-full lg:w-1/2 flex flex-col gap-2">
                              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-zinc-950 border border-zinc-700 shadow-xl relative group">
                                <img 
                                  src={project.image} 
                                  alt={project.title}
                                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                              </div>
                              <span className="text-[11px] font-mono text-zinc-500">
                                VISUAL SPECIMEN // TOP-ALIGNED CAPTURE
                              </span>
                            </div>

                            {/* Right: Technical Details Grid */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
                              <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800">
                                <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                                  01 // FULL PROJECT NARRATIVE
                                </span>
                                <p className="text-sm text-zinc-300 mt-2 leading-relaxed">
                                  {project.description}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                                    02 // ROLE
                                  </span>
                                  <h4 className="text-xs font-bold text-white mt-1.5">
                                    {project.role}
                                  </h4>
                                </div>
                                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                  <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                                    03 // IMPACT
                                  </span>
                                  <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                                    {project.impact}
                                  </p>
                                </div>
                              </div>

                              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                                  04 // TECH STACK
                                </span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {project.techStack.map(tech => (
                                    <span 
                                      key={tech}
                                      className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-zinc-800 text-zinc-300 border border-zinc-700"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProject(null);
                                  }}
                                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                                >
                                  [CLOSE FILE]
                                </button>
                                <a 
                                  href="#"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 text-xs font-mono font-bold tracking-wider hover:bg-zinc-200 transition-colors shadow-md"
                                >
                                  <span>VISIT PLATFORM</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>



        </div>

      </div>



    </main>
    </div>
  );
}
