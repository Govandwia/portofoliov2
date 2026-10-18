"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickySection } from "@/components/StickySection";

const processData = {
  DEFINE: {
    title: "DEFINE",
    text: "Before writing any code, I dive deep into understanding the core business problem. I analyze stakeholder requirements, identify target users, and map out the entire technical strategy to ensure we build exactly what is needed.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-startup-team-discussing-a-project-in-a-modern-office-4894-large.mp4",
    poster: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1080&auto=format&fit=crop"
  },
  DEVELOP: {
    title: "DEVELOP",
    text: "Building a great digital product is more than just writing code. Whether it's a dynamic web platform or a native mobile application, my philosophy remains the same: bridge the gap between user needs and robust technical architectures to create truly impactful solutions.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-4174-large.mp4",
    poster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1080&auto=format&fit=crop"
  },
  DELIVER: {
    title: "DELIVER",
    text: "A product isn't finished until it performs flawlessly in the real world. I rigorously test, optimize for performance, and deploy scalable solutions, ensuring a seamless and reliable user experience from day one.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-server-room-with-blinking-lights-4250-large.mp4",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop"
  }
};

export function Process() {
  const [activeTab, setActiveTab] = useState<"DEFINE" | "DEVELOP" | "DELIVER">("DEVELOP");

  return (
    <StickySection id="process" zIndex={50} className="min-h-screen py-20 md:py-28 px-6 md:px-12 bg-[#F0F0F0] flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-center overflow-hidden rounded-t-[3rem] -mt-10 shadow-[0_-25px_60px_rgba(0,0,0,0.15)]">
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="md:w-1/2 flex flex-col justify-center"
      >
        <h2 className="text-[12vw] md:text-[8vw] font-black font-heading leading-[0.8] tracking-tighter mb-10 flex flex-col">
          {(["DEFINE", "DEVELOP", "DELIVER"] as const).map((tab) => (
            <span 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer transition-colors duration-500 hover:opacity-80 ${activeTab === tab ? "text-black" : "text-zinc-300"}`}
            >
              {tab}
            </span>
          ))}
        </h2>
        
        <div className="text-lg text-zinc-700 max-w-lg leading-relaxed min-h-[150px] relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {processData[activeTab].text}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="md:w-1/2 flex justify-center items-center relative"
      >
        <div className="w-full max-w-[500px] aspect-[4/5] bg-zinc-800 rounded-3xl overflow-hidden flex justify-center items-center relative shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.video 
              key={activeTab}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              src={processData[activeTab].video} 
              poster={processData[activeTab].poster}
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </AnimatePresence>
        </div>
      </motion.div>
    </StickySection>
  );
}
