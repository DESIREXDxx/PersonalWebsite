import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "3D Product Configurator",
    description: "Interactive WebGL product visualization with real-time customization options. Built with Three.js and React.",
    tags: ["Three.js", "React", "WebGL", "GSAP"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Particle System Generator",
    description: "GPU-accelerated particle physics simulation with custom shaders and performance optimization.",
    tags: ["WebGL", "GLSL", "JavaScript", "Canvas"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Interactive Data Dashboard",
    description: "Real-time data visualization platform with 3D charts and responsive design.",
    tags: ["D3.js", "Three.js", "TypeScript", "API"],
    image: "/placeholder.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <span className="text-gradient text-glow">{"{"}</span>
            {" Projects "}
            <span className="text-gradient text-glow">{"}"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of creative work and experiments
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl card-glow"
            >
              {/* Project image placeholder */}
              <div className="aspect-video bg-secondary/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-glow-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary opacity-50 group-hover:opacity-75 transition-opacity" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-body mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-display rounded-md bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-display"
                    aria-label={`View ${project.title} live`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors font-display"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="ghost" size="lg" className="group" asChild>
            <a href="https://github.com/DESIREXDxx?tab=repositories" target="_blank" rel="noopener noreferrer">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
