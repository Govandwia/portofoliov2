"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fullExperience = [
  {
    id: 'pm-novaren',
    title: 'Project Manager',
    company: 'PT. Novaren Teknologi Indonesia',
    period: 'Jan 2026 - Present',
    location: 'Yogyakarta, Indonesia',
    description: 'Spearheaded technology and innovation strategies, overseeing all technical aspects of product development. Managed the end-to-end SDLC and translated business requirements into technical specifications (SRS & API Specs). Conducted rigorous QA testing.',
    skills: ['SDLC', 'System Architecture', 'QA Testing', 'Project Management']
  },
  {
    id: 'sekjen-assets',
    title: 'Secretary General',
    company: 'ASSETS TRPL UGM',
    period: 'Feb 2025 - Jan 2026',
    location: 'Yogyakarta, Indonesia',
    description: 'Assisted the Chairperson in high-level strategic decision-making. Coordinated internal organizational affairs and oversaw the execution of work programs across various divisions, aligning with the association\'s vision.',
    skills: ['Public Affairs', 'Human Capital Management', 'Strategic Planning']
  },
  {
    id: 'asdos-1',
    title: 'Assistant Lecturer for Computer Programming',
    company: 'Universitas Gadjah Mada',
    period: 'Jul 2025 - Dec 2025',
    location: 'Yogyakarta, Indonesia',
    description: 'Developed and updated practicum modules, designing relevant programming assignments. Provided dedicated technical mentorship and conducted rigorous code reviews of student assignments.',
    skills: ['Python', 'Teaching', 'Code Review']
  },
  {
    id: 'asdos-2',
    title: 'Assistant Lecturer for Data Structure and Algorithm',
    company: 'Universitas Gadjah Mada',
    period: 'Feb 2025 - Jul 2025',
    location: 'Yogyakarta, Indonesia',
    description: 'Mentored students in understanding fundamental algorithms, data structures, and complex problem-solving techniques using Python. Developed practicum modules focused on algorithmic logic.',
    skills: ['Python', 'Data Structures', 'Code Review', 'Mentorship']
  },
  {
    id: 'hustler-gdg',
    title: 'Hustler',
    company: 'Google Developer Group on Campus UGM',
    period: 'Dec 2024 - Jul 2025',
    location: 'Yogyakarta, Indonesia',
    description: 'Analyzed SDGs to formulate team ideas and develop socially impactful digital products. Designed business strategies and led cross-functional teams through the application development process to meet MVP targets.',
    skills: ['Business Strategy', 'Cross-functional Leadership', 'Market Analysis']
  },
  {
    id: 'pm-fundation',
    title: 'Project Manager',
    company: 'FUNDation',
    period: 'Jul 2024 - Jul 2025',
    location: 'Yogyakarta, Indonesia',
    description: 'Led a cross-functional technical team developing a Flutter and Laravel mobile marketplace connecting student event organizers with sponsors. Streamlined stakeholder collaboration by digitizing the proposal submission process.',
    skills: ['Agile', 'Flutter', 'Laravel', 'System Analysis']
  },
  {
    id: 'kastrad-assets',
    title: 'Staff Strategic Analysis and Advocacy (Kastrad)',
    company: 'ASSETS TRPL UGM',
    period: 'May 2024 - Feb 2025',
    location: 'Yogyakarta, Indonesia',
    description: 'Executed strategic division programs designed to foster critical thinking and analytical skills. Orchestrated interactive educational forums and discussion programs such as "Kastrad Think" and "Kastrad Talk".',
    skills: ['Analytical Skills', 'Critical Thinking', 'Event Coordination']
  },
  {
    id: 'social-media-palpod',
    title: 'Social Media Specialist',
    company: 'PalPod',
    period: 'Dec 2024 - May 2025',
    location: 'Remote',
    description: 'Managed the organization\'s social media presence and developed comprehensive content strategies. Conducted weekly performance evaluations to analyze metrics and increase digital engagement.',
    skills: ['Social Media Marketing', 'Content Strategy', 'Analytics']
  },
  {
    id: 'deputy-komatik',
    title: 'Deputy Head of Public Relation',
    company: 'Komunitas Mahasiswa TIK UGM',
    period: 'Nov 2024 - Dec 2025',
    location: 'Yogyakarta, Indonesia',
    description: 'Managed communications and built strategic relationships with external partners. Executed external public relations work programs and led the planning and production of organizational merchandise as a key branding strategy.',
    skills: ['Public Relations', 'Strategic Partnerships', 'Branding']
  },
  {
    id: 'boost-assets',
    title: 'Head of Event Division at BOOST',
    company: 'ASSETS TRPL UGM',
    period: 'Dec 2024',
    location: 'Yogyakarta, Indonesia',
    description: 'Directed the end-to-end event lifecycle, from initial concept design to final execution. Managed tight project timelines, resource allocation, and logistical requirements.',
    skills: ['Event Management', 'Cross-functional Team Leadership', 'Logistics']
  },
  {
    id: 'asdos-3',
    title: 'Assistant Lecturer for Computer Programming',
    company: 'Universitas Gadjah Mada',
    period: 'Jul 2024 - Dec 2024',
    location: 'Yogyakarta, Indonesia',
    description: 'Guided students through foundational programming concepts, focusing on practical problem-solving methodologies. Evaluated student performance through detailed code reviews.',
    skills: ['Python', 'Teaching', 'Technical Feedback']
  },
  {
    id: 'liga-assets',
    title: 'Staff of Public Relations for LIGA TRPL',
    company: 'ASSETS TRPL UGM',
    period: 'Sep 2024 - Nov 2024',
    location: 'Yogyakarta, Indonesia',
    description: 'Managed public communication campaigns and produced publication materials to promote league activities. Acted as a reliable point of contact for participants and stakeholders.',
    skills: ['Public Relations', 'Stakeholder Communication', 'Media Production']
  },
  {
    id: 'tech-enthusiast',
    title: 'Staff of Competition Division',
    company: 'Tech Enthusiast Day',
    period: 'Sep 2024 - Nov 2024',
    location: 'Yogyakarta, Indonesia',
    description: 'Organized and managed technical competition segments. Coordinated with participants and ensured smooth execution of the competition agenda.',
    skills: ['Event Execution', 'Communication', 'Coordination']
  },
  {
    id: 'series-assets',
    title: 'Head of Event Division at SERIES',
    company: 'ASSETS TRPL UGM',
    period: 'Sep 2024',
    location: 'Yogyakarta, Indonesia',
    description: 'Directed the entire event lifecycle, managing the project from initial concept to execution. Coordinated with cross-functional teams to ensure seamless delivery.',
    skills: ['Event Planning', 'Cross-functional Coordination', 'Project Management']
  },
  {
    id: 'sma-amarade',
    title: 'Main Coordinator for Amarade 2023/2024',
    company: 'SMA Unggulan CT Arsa Foundation',
    period: 'Dec 2023 - Jan 2024',
    location: 'Sukoharjo, Indonesia',
    description: 'Led the coordination and execution of the Amarade school event, overseeing team assignments and timelines.',
    skills: ['Analytical Skills', 'Event Coordination']
  },
  {
    id: 'sma-campus',
    title: 'Main Coordinator for Campus Expo 2024',
    company: 'SMA Unggulan CT Arsa Foundation',
    period: 'Dec 2023 - Jan 2024',
    location: 'Sukoharjo, Indonesia',
    description: 'Coordinated the Campus Expo event, connecting students with university representatives and managing overall event flow.',
    skills: ['Analytical Skills', 'Public Speaking', 'Leadership']
  },
  {
    id: 'sma-batch',
    title: '3rd Batch Leader',
    company: 'SMA Unggulan CT Arsa Foundation',
    period: 'May 2021 - Jun 2023',
    location: 'Sukoharjo, Indonesia',
    description: 'Served as the primary leader and representative for the 3rd batch of students. Facilitated communication between the student body and school administration.',
    skills: ['Communication', 'Leadership', 'Student Representation']
  },
  {
    id: 'sma-yearbook',
    title: 'Main Coordinator for Yearbook Batch 3',
    company: 'SMA Unggulan CT Arsa Foundation',
    period: 'Feb 2023 - Apr 2023',
    location: 'Sukoharjo, Indonesia',
    description: 'Directed the conceptualization, production, and distribution of the batch yearbook, coordinating with design and editorial teams.',
    skills: ['Event Planning', 'Team Coordination', 'Project Management']
  },
  {
    id: 'sma-disciplinary',
    title: 'Staff of Disciplinary Commission',
    company: 'SMA Unggulan CT Arsa Foundation',
    period: 'Jan 2022 - Oct 2022',
    location: 'Sukoharjo, Indonesia',
    description: 'Enforced school regulations and maintained disciplinary standards among students.',
    skills: ['Policy Enforcement', 'Communication', 'Discipline']
  }
];

const ExperienceArchitectureHero = dynamic(
  () => import("@/components/ExperienceArchitectureHero"),
  { ssr: false }
);

export default function ExperiencePage() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen selection:bg-white selection:text-black">
      {/* 3D Typographic Architectural Hero */}
      <ExperienceArchitectureHero />

      <main 
        id="experience-timeline" 
        className="pt-20 md:pt-28 pb-16 px-4 md:px-8 max-w-5xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 mb-12 md:mb-16 text-center items-center"
        >
          <h1 className="text-5xl md:text-7xl font-black font-heading leading-tight tracking-tighter uppercase">
            Experience
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl font-medium">
            A detailed timeline of my professional journey, leadership roles, and technical contributions over the years.
          </p>
        </motion.div>

        {/* Alternating Timeline with Center Line */}
        <div className="relative">
          {/* Vertical Line: on left for mobile, centered on desktop */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1px] bg-white/20 -translate-x-1/2" />

          <div className="flex flex-col gap-8 md:gap-10">
            {fullExperience.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="relative flex flex-col md:flex-row items-start"
                >
                  {/* Left Column (Desktop) */}
                  {isEven ? (
                    <div className="w-full md:w-1/2 pl-10 md:pl-0 md:pr-12 md:text-right">
                      <div className="flex flex-col gap-2 group md:items-end">
                        {/* Period & Location */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase md:justify-end text-zinc-500">
                          <span className="text-zinc-400">{exp.period}</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-600" />
                          <span className="text-zinc-500">{exp.location}</span>
                        </div>

                        {/* Title & Company */}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black font-heading tracking-tight text-white group-hover:text-zinc-300 transition-colors leading-tight">
                            {exp.title}
                          </h3>
                          <h4 className="text-base md:text-lg font-bold text-zinc-400 mt-0.5">
                            {exp.company}
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-md mt-1">
                          {exp.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5 mt-2 md:justify-end">
                          {exp.skills.map(skill => (
                            <span 
                              key={skill}
                              className="px-3 py-1 rounded-full border border-white/15 text-[11px] font-bold tracking-wider uppercase text-zinc-300 bg-white/5 hover:bg-white hover:text-black transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:block w-1/2" />
                  )}

                  {/* Center Node / Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-white shadow-[0_0_12px_rgba(255,255,255,0.7)] group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Right Column (Desktop) */}
                  {!isEven ? (
                    <div className="w-full md:w-1/2 pl-10 md:pl-12 md:text-left">
                      <div className="flex flex-col gap-2 group md:items-start">
                        {/* Period & Location */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-500">
                          <span className="text-zinc-400">{exp.period}</span>
                          <span className="w-1 h-1 rounded-full bg-zinc-600" />
                          <span className="text-zinc-500">{exp.location}</span>
                        </div>

                        {/* Title & Company */}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black font-heading tracking-tight text-white group-hover:text-zinc-300 transition-colors leading-tight">
                            {exp.title}
                          </h3>
                          <h4 className="text-base md:text-lg font-bold text-zinc-400 mt-0.5">
                            {exp.company}
                          </h4>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-md mt-1">
                          {exp.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.skills.map(skill => (
                            <span 
                              key={skill}
                              className="px-3 py-1 rounded-full border border-white/15 text-[11px] font-bold tracking-wider uppercase text-zinc-300 bg-white/5 hover:bg-white hover:text-black transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:block w-1/2" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom Resume CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-10 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <h3 className="text-2xl font-black tracking-tight">Want the full picture?</h3>
          <button className="group relative inline-flex items-center gap-3 bg-white text-zinc-950 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors">
            <span>Download Resume</span>
            <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </motion.div>
      </main>
    </div>
  );
}
