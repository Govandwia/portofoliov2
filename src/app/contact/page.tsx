"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import WebGL component (no SSR - needs browser APIs)
const WebGLTunnel = dynamic(() => import("@/components/WebGLTunnel"), {
  ssr: false,
});

export default function ContactPage() {
  const [showOpening, setShowOpening] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Using mailto to redirect to the user's email client natively.
    window.location.href = `mailto:Govandwi01@gmail.com?subject=Portfolio Inquiry from ${formData.name}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
  };

  const contactDetails = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "Govandwi01@gmail.com", href: "mailto:Govandwi01@gmail.com" },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+628156508128", href: "tel:+628156508128" },
    { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 group-hover:brightness-200 contrast-200" alt="LinkedIn" />, label: "LinkedIn", value: "Govan Dwi Aditya", href: "https://www.linkedin.com/in/govan-dwi-aditya-744544280" },
    { icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 group-hover:invert" alt="GitHub" />, label: "GitHub", value: "Govandwi.a", href: "https://github.com/Govandwia" }
  ];

  return (
    <>
      <AnimatePresence>
        {showOpening && (
          <motion.div
            key="tunnel"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WebGLTunnel onComplete={() => setShowOpening(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen w-full bg-zinc-200 flex flex-col lg:flex-row overflow-hidden pt-20 lg:pt-0">
      
      {/* Left Side - The Bold Statement */}
      <motion.div 
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 bg-[#1A1A1A] min-h-[40vh] lg:min-h-screen flex flex-col justify-center items-center lg:items-start p-10 lg:p-24 relative z-10"
      >
        <div className="text-white w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[25vw] lg:text-[13vw] font-black font-heading leading-[0.8] tracking-tighter uppercase mb-8"
          >
            SAY<br />HELLO
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="w-16 h-2 bg-white mb-8"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg lg:text-2xl font-medium max-w-md leading-relaxed"
          >
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Clean Form & Info Layout */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-1/2 bg-zinc-200 min-h-[60vh] lg:min-h-screen flex flex-col justify-center p-10 lg:p-24"
      >
        <div className="max-w-xl w-full mx-auto space-y-16">
          
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactDetails.map((detail, index) => (
              <motion.a 
                key={index}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1), duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col items-start gap-4 p-5 border-2 border-zinc-300 hover:border-black rounded-3xl transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-zinc-300 group-hover:bg-[#1A1A1A] group-hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
                  {detail.icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{detail.label}</p>
                  <p className="font-bold text-zinc-900 group-hover:underline underline-offset-4 decoration-2 text-sm">{detail.value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-3xl font-black font-heading tracking-tighter uppercase mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-white focus:border-[#1A1A1A] focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-white focus:border-[#1A1A1A] focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-white border-2 border-white focus:border-[#1A1A1A] focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-sm resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold uppercase tracking-widest py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>
          
        </div>
      </motion.div>

    </main>
    </>
  );
}
