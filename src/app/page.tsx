"use client";
import { Marquee } from "@/components/Marquee";
import { SelectedWorks } from "@/components/SelectedWorks";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Process } from "@/components/Process";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F0F0F0]">
      {/* HEADER IS NOW EXTRACTED GLOBALLY */}
      
      {/* HERO SECTION */}
      <section className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden pt-20 z-0">
        
        {/* Animated Background Wireframe Circle - Top Left */}
        <div className="absolute top-0 left-0 w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <circle cx="50" cy="50" r="50" fill="none" stroke="#d4d4d8" strokeWidth="0.2" />
              <circle cx="100" cy="50" r="0.8" fill="#F0F0F0" stroke="#71717a" strokeWidth="0.3" />
            </svg>
          </motion.div>
        </div>

        {/* Animated Background Wireframe Circle - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[120vw] h-[120vw] md:w-[70vw] md:h-[70vw] translate-x-1/3 translate-y-1/3 -z-10 pointer-events-none">
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="w-full h-full"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <circle cx="50" cy="50" r="50" fill="none" stroke="#d4d4d8" strokeWidth="0.2" />
              <circle cx="100" cy="50" r="0.8" fill="#F0F0F0" stroke="#71717a" strokeWidth="0.3" />
            </svg>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="absolute top-[15%] md:top-[20%] left-6 md:left-10 flex flex-col z-20 text-black"
        >
          <span className="text-2xl md:text-3xl font-black tracking-tight">Software Engineering</span>
          <span className="text-2xl md:text-3xl font-black tracking-tight text-zinc-600">Student & Developer</span>
        </motion.div>
        
        {/* Huge Background Text (Moving) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] md:-translate-y-1/2 w-full text-center z-10 opacity-10 pointer-events-none mix-blend-overlay overflow-hidden transform-gpu"
        >
          <motion.h1 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 15, repeatType: "loop" }}
            className="text-[80vw] md:text-[25vw] font-black font-heading leading-none tracking-tighter text-[#1A1A1A] flex w-max transform-gpu"
          >
            <span className="shrink-0 whitespace-nowrap pr-16">GOVAN DWI ADITYA</span>
            <span className="shrink-0 whitespace-nowrap pr-16">GOVAN DWI ADITYA</span>
          </motion.h1>
        </motion.div>

        {/* Center Portrait - No Frame, Raw Image */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 w-full h-[50vh] md:h-[60vh] z-20 flex justify-center items-end pointer-events-none"
        >
          <img 
            src="/images/profile-photo.png" 
            alt="Govan Dwi Aditya" 
            className="w-auto h-full object-contain object-bottom origin-bottom transition-all duration-700 ease-in-out drop-shadow-2xl pointer-events-auto translate-y-[95%] md:translate-y-[105%] grayscale scale-[2.0] md:scale-[2.5] hover:grayscale-0 transform-gpu" 
          />
        </motion.div>

        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2">
          <span className="text-sm font-bold uppercase tracking-widest">Scroll down</span>
          <div className="w-[1px] h-12 bg-black"></div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 bg-[#111] text-white py-32 px-10 min-h-screen flex flex-col justify-center overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <motion.div 
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start"
        >
          <h2 className="text-[12vw] md:text-[7vw] font-black font-heading leading-none tracking-tighter mb-10 md:mb-0 mt-8">
            <span className="text-zinc-500">/</span>ABOUT
          </h2>
          
          <div className="md:w-1/2 flex flex-col justify-center items-start">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ArrowUpRight className="w-16 h-16 mb-8 text-white/50" strokeWidth={1} />
            </motion.div>
            <div className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl space-y-4">
              <p>
                As a Software Engineering student at Universitas Gadjah Mada, I combine technical excellence with effective leadership. My background as a Project Manager and Lab Assistant has deeply shaped my ability to bridge theory with real-world applications.
              </p>
              <p>
                What sets me apart is my versatility. Whether I'm analyzing requirements as a System Analyst, building systems as a Full-Stack Developer, or ensuring quality as a QA specialist, I deliver comprehensive, end-to-end solutions that truly solve user needs.
              </p>
            </div>
            <div className="mt-20 text-xs font-bold tracking-widest text-zinc-500 uppercase">
              DEFINE -&gt; DEVELOP -&gt; DELIVER
            </div>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <section className="relative z-20 border-y border-zinc-200 overflow-hidden">
        <Marquee text="PROJECT MANAGER { } QUALITY ASSESSOR { } SYSTEM ANALYST { } FULL STACK DEVELOPER { }" />
      </section>

      {/* SELECTED WORKS */}
      <section id="work" className="relative z-20 bg-white py-32 px-10 rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex justify-between items-start mb-20">
            <div className="max-w-md">
              <p className="text-xl leading-relaxed text-zinc-600">
                Here I showcase my technical skills and problem-solving abilities through real-world applications. My ultimate goal is to deliver value to every project and consistently exceed your expectations.
              </p>
              <div className="mt-12 text-xs font-bold tracking-widest text-zinc-400 uppercase">
                SELECTED WORKS
              </div>
            </div>
            
            <div className="hidden md:flex flex-col items-center justify-center w-32 h-32 rounded-full border border-zinc-200 text-xs font-bold tracking-widest uppercase hover:bg-[#111] hover:text-white transition-colors cursor-pointer">
              <span>GET IN</span>
              <span>TOUCH</span>
            </div>
          </div>

          <SelectedWorks />
          
        </motion.div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="relative z-[30] py-32 px-10 bg-[#1A1A1A] text-white overflow-hidden rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <h2 className="text-[12vw] md:text-[6vw] font-black font-heading leading-none tracking-tighter">
              <span className="text-zinc-500">/</span>EXPERIENCE
            </h2>
            <div className="text-sm font-bold tracking-widest text-zinc-400 uppercase">
              4+ years of experience
            </div>
          </div>
          <Experience />
          
          <div className="mt-20 text-center">
            <a href="#" className="text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">
              View all experience
            </a>
          </div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-[40] bg-white py-32 px-10 rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex justify-between items-start mb-20">
            <div className="max-w-md">
              <p className="text-xl leading-relaxed text-zinc-600">
                A comprehensive overview of my technical toolkit, from core programming languages and frameworks to essential soft skills.
              </p>
              <div className="mt-12 text-xs font-bold tracking-widest text-zinc-400 uppercase">
                SKILLS & TECHNOLOGIES
              </div>
            </div>
          </div>
          <Skills />
        </motion.div>
      </section>

      {/* PROCESS */}
      <Process />

      {/* FOOTER */}
      <section id="contact" className="relative z-[60] bg-[#1A1A1A] text-white pt-32 px-10 pb-10 overflow-hidden rounded-t-[3rem] -mt-10">
        <motion.div
          initial={{ opacity: 0, y: 150 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex justify-between items-start mb-20">
            <ArrowUpRight className="w-32 h-32 text-white/50" strokeWidth={1} />
            <div className="text-right">
              <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tighter mb-4">
                LET'S WORK<br />TOGETHER
              </h2>
              <button className="border-2 border-white rounded-full px-6 py-2 text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors">
                SEND ME A MESSAGE
              </button>
            </div>
          </div>

          <div className="relative w-full overflow-hidden bg-[#1A1A1A] group cursor-default mb-10">
            {/* Background Video - Lightened to ensure no pixel is darker than the background */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover mix-blend-lighten"
              src="https://assets.codepen.io/3364143/7btrrd.mp4" 
            />
            {/* The Blend Mask - Darken ensures the background stays #1A1A1A and text reveals video */}
            <div className="relative w-full py-10 md:py-20 bg-[#1A1A1A] mix-blend-darken flex flex-col items-center justify-center pointer-events-none">
              <h1 className="text-[18vw] md:text-[15vw] font-black font-heading text-center tracking-tighter uppercase leading-[0.85] text-white">
                GOVAN<br />DWI<br />ADITYA
              </h1>
            </div>

            {/* Solid White Overlay - Fades out on hover to reveal the video underneath */}
            <div className="absolute inset-0 w-full h-full bg-[#1A1A1A] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 ease-in-out group-hover:opacity-0">
              <h1 className="text-[18vw] md:text-[15vw] font-black font-heading text-center tracking-tighter uppercase leading-[0.85] text-white">
                GOVAN<br />DWI<br />ADITYA
              </h1>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase border-t border-white/20 pt-8 flex-col md:flex-row gap-4">
            <span className="text-white/50">© 2026 DESIGN BY GOVAN. ALL RIGHT RESERVED.</span>
            <div className="flex gap-6 text-white/80">
              <a href="#" className="hover:text-white transition-colors">AWWWARDS</a>
              <a href="#" className="hover:text-white transition-colors">DRIBBBLE</a>
              <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
              <a href="#" className="hover:text-white transition-colors">LINKEDIN</a>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
