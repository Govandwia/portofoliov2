import { motion } from "framer-motion";
import { Users, Briefcase, Puzzle, MessageSquare, Handshake, Brain } from "lucide-react";

// Helper to fetch SVG logos from devicon
const devicon = (name: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}`;

const topRowSkills = [
  { name: "Python", icon: devicon("python/python-original.svg") },
  { name: "Java", icon: devicon("java/java-original.svg") },
  { name: "JavaScript", icon: devicon("javascript/javascript-original.svg") },
  { name: "PHP", icon: devicon("php/php-original.svg") },
  { name: "Kotlin", icon: devicon("kotlin/kotlin-original.svg") },
  { name: "MySQL", icon: devicon("mysql/mysql-original.svg") },
  { name: "HTML5", icon: devicon("html5/html5-original.svg") },
  { name: "CSS3", icon: devicon("css3/css3-original.svg") },
  { name: "Laravel", icon: devicon("laravel/laravel-original.svg") },
  { name: "Next.js", icon: devicon("nextjs/nextjs-original.svg") },
  { name: "TensorFlow", icon: devicon("tensorflow/tensorflow-original.svg") },
  { name: "Pandas", icon: devicon("pandas/pandas-original.svg") },
];

const bottomRowSkills = [
  { name: "VS Code", icon: devicon("vscode/vscode-original.svg") },
  { name: "IntelliJ", icon: devicon("intellij/intellij-original.svg") },
  { name: "Android Studio", icon: devicon("androidstudio/androidstudio-original.svg") },
  { name: "Figma", icon: devicon("figma/figma-original.svg") },
  { name: "Git", icon: devicon("git/git-original.svg") },
  { name: "Adobe Photoshop", icon: devicon("photoshop/photoshop-original.svg") },
  { name: "Leadership", icon: <Users size={24} /> },
  { name: "Project Management", icon: <Briefcase size={24} /> },
  { name: "Problem Solving", icon: <Puzzle size={24} /> },
  { name: "Communication", icon: <MessageSquare size={24} /> },
  { name: "Collaboration", icon: <Handshake size={24} /> },
  { name: "Analytical Thinking", icon: <Brain size={24} /> },
];

const SkillPill = ({ skill }: { skill: { name: string, icon: string | React.ReactNode } }) => (
  <div className="px-6 py-4 border-2 border-zinc-200 rounded-full text-lg font-bold text-zinc-800 hover:border-black hover:bg-black hover:text-white transition-all cursor-default whitespace-nowrap bg-white flex items-center gap-3 group">
    {typeof skill.icon === "string" ? (
      <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform bg-white rounded-md p-[2px]" />
    ) : (
      <span className="group-hover:scale-110 transition-transform text-zinc-600 group-hover:text-white">{skill.icon}</span>
    )}
    {skill.name}
  </div>
);

const MarqueeRow = ({ items, reverse = false }: { items: { name: string, icon: string | React.ReactNode }[], reverse?: boolean }) => {
  return (
    <div 
      className="flex w-full overflow-hidden relative py-2" 
      style={{ 
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
      }}
    >
      <motion.div
        className="flex gap-6 w-max pr-6"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-6">
            {items.map((skill, idx) => <SkillPill key={`${skill.name}-${i}-${idx}`} skill={skill} />)}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export function Skills() {
  return (
    <div className="w-full flex flex-col gap-6 py-10">
      <MarqueeRow items={topRowSkills} />
      <MarqueeRow items={bottomRowSkills} reverse={true} />
    </div>
  );
}
