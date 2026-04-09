import { motion } from "framer-motion";
import { Code2, Layers, Palette, Zap, Database, Globe } from "lucide-react";

const skills = [
  {
    icon: Layers,
    title: "Three.js / WebGL",
    description: "Creating immersive 3D experiences and interactive visualizations for the web.",
  },
  {
    icon: Code2,
    title: "JavaScript / TypeScript",
    description: "Building robust, type-safe applications with modern ES6+ features.",
  },
  {
    icon: Palette,
    title: "CSS / Tailwind",
    description: "Crafting pixel-perfect, responsive designs with smooth animations.",
  },
  {
    icon: Globe,
    title: "HTML5 / Semantic Web",
    description: "Structuring accessible, SEO-friendly markup following best practices.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing load times, render performance, and user experience.",
  },
  {
    icon: Database,
    title: "Full-Stack",
    description: "Node.js, APIs, databases, and cloud deployment expertise.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
      
      <div className="container relative px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient text-glow">{"<"}</span>
            Skills
            <span className="text-gradient text-glow">{" />"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              className="group p-6 rounded-xl card-glow transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <skill.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2 text-foreground">
                {skill.title}
              </h3>
              <p className="text-muted-foreground font-body">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
