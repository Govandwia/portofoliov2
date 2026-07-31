"use client";
import { motion } from "framer-motion";

export function Marquee({ text }: { text: string }) {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap pt-6 pb-16 md:pt-8 md:pb-20 flex no-scrollbar pointer-events-none bg-white/60 backdrop-blur-md">
      <motion.div
        className="text-[12vw] font-black font-heading tracking-tighter text-zinc-950 uppercase flex gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 50 }}

      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
