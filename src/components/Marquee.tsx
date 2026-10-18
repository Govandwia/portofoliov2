"use client";
import { motion } from "framer-motion";

export function Marquee({ text }: { text: string }) {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-4 md:py-5 flex no-scrollbar pointer-events-none bg-white/90 backdrop-blur-md">
      <motion.div
        className="text-[6vw] md:text-[3.2vw] font-black font-heading tracking-tighter text-zinc-950 uppercase flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
