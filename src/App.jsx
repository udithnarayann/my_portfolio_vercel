import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import ParticleNetwork from "./components/ParticleNetwork";
import ProjectModal from "./components/ProjectModal";
import ExperienceModal from "./components/ExperienceModal";
import ChatBot from "./components/ChatBot";
import TiltCard from "./components/TiltCard";
import ScrambleText from "./components/ScrambleText";
import useTheme from "./hooks/useTheme";
import { PORTFOLIO_DATA } from "./data/portfolioData";

import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  GraduationCap,
  ChevronDown,
  MapPin,
  Phone,
  Terminal,
  Database,
  Cpu,
  Code,
  Cloud,
  Server,
  Sparkles,
  X,
} from "lucide-react";

/* ===========================
   Helper components in App
   =========================== */

// Lighter Mouse Trail
const MouseTrail = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let ticking = false;
    const handleMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setPos({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-cyan-400 rounded-full pointer-events-none z-40 mix-blend-screen shadow-[0_0_15px_rgba(6,182,212,0.7)]"
      style={{
        x: pos.x - 16,
        y: pos.y - 16,
      }}
    >
      <div className="absolute inset-0 bg-cyan-400 opacity-20 rounded-full" />
    </motion.div>
  );
};

// Subtle parallax blobs
const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-900/15 rounded-full blur-[120px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/15 rounded-full blur-[120px]"
      />
    </div>
  );
};

// Skill bar
const SkillBar = ({ name, level, index }) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs font-mono mb-1 text-cyan-300">
      <span>{name}</span>
      <span>{level}%</span>
    </div>
    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: index * 0.1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 relative"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/40 animate-pulse" />
      </motion.div>
    </div>
  </div>
);

// Radar chart for skills
const RadarChart = ({ data }) => {
  const size = 260;
  const center = size / 2;
  const radius = 90;
  const angleSlice = (Math.PI * 2) / data.length;

  const getPoint = (value, index, rScale = 1) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = ((value / 100) * radius) * rScale;
    return [
      center + Math.cos(angle) * r,
      center + Math.sin(angle) * r,
    ];
  };

  const points = data
    .map((d, i) => getPoint(d.level, i).join(","))
    .join(" ");

  return (
    <svg width={size} height={size} className="overflow-visible">
      {[20, 40, 60, 80, 100].map((level) => (
        <polygon
          key={level}
          points={data
            .map((_, i) => getPoint(level, i).join(","))
            .join(" ")}
          fill="none"
          stroke="#1f2937"
          strokeWidth="1"
        />
      ))}

      {data.map((d, i) => {
        const [x, y] = getPoint(100, i);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="#374151"
          />
        );
      })}

      <motion.polygon
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 0.8 }}
        points={points}
        fill="rgba(6,182,212,0.4)"
        stroke="#22d3ee"
        strokeWidth="2"
      />

      {data.map((d, i) => {
        const [x, y] = getPoint(120, i, 1.1);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dy="0.3em"
            fill="#9ca3af"
            fontSize="10"
            className="font-mono uppercase"
          >
            {d.name.split(" ")[0]}
          </text>
        );
      })}
    </svg>
  );
};

// Skills modal with radar chart
const SkillsModal = ({ open, onClose, skills }) => {
  if (!open) return null;
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <TiltCard
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative bg-[#0f1624] border border-cyan-500/40 rounded-2xl p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-800/60 rounded-full text-gray-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Skill Radar
          </h2>
          <div className="flex justify-center mb-4">
            <RadarChart data={skills} />
          </div>
          <p className="text-xs text-gray-400 text-center max-w-xs mx-auto">
            Visual map of proficiency across core engineering domains.
          </p>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

// Simple AI email drafter 
const EmailDrafter = () => {
  const [draft, setDraft] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!draft.trim()) return;
    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("/api/email-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: draft }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data.email || "");
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard?.writeText(result);
  };

  return (
    <TiltCard className="mt-8">
      <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-700 max-w-2xl mx-auto backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Draft a quick email (AI)
        </h3>
        <p className="text-xs text-gray-400 mb-3 text-left">
          Paste rough notes (e.g. outreach to a recruiter) and let AI draft a professional email.
        </p>
        <textarea
          className="w-full h-28 bg-[#050910] border border-gray-700 rounded-xl p-3 text-sm text-gray-200 outline-none focus:border-cyan-500 resize-none mb-3"
          placeholder="Type rough notes here..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        {error && (
          <p className="text-xs text-red-400 mb-2 text-left">
            {error}
          </p>
        )}
        <div className="flex justify-between items-center gap-3 flex-wrap">
          <button
            onClick={handleGenerate}
            disabled={loading || !draft.trim()}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Asking AI..." : "Generate Email"}
          </button>
          {result && (
            <button
              onClick={copyResult}
              className="px-4 py-2 text-xs text-gray-300 hover:text-white"
            >
              Copy result
            </button>
          )}
        </div>
        {result && (
          <div className="mt-4 text-left">
            <h4 className="text-sm font-semibold text-cyan-300 mb-1">
              Suggested email:
            </h4>
            <pre className="whitespace-pre-wrap text-xs bg-black/40 border border-gray-700 rounded-lg p-3 text-gray-200">
              {result}
            </pre>
          </div>
        )}
      </div>
    </TiltCard>
  );
};


// Icon map for project cards
const projectIcons = {
  Terminal: <Terminal className="w-6 h-6 text-purple-400" />,
  Database: <Database className="w-6 h-6 text-cyan-400" />,
  Cpu: <Cpu className="w-6 h-6 text-emerald-400" />,
  Code: <Code className="w-6 h-6 text-orange-400" />,
  Cloud: <Cloud className="w-6 h-6 text-yellow-400" />,
  Server: <Server className="w-6 h-6 text-pink-400" />,
};

/* ===========================
   MAIN APP
   =========================== */

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [skillsOpen, setSkillsOpen] = useState(false);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const zoom = useTransform(scrollY, [0, 600], [0.90, 1.03]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Udith Narayan — AI Engineer";
  }, []);


  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#030609] text-gray-200"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Backgrounds */}
      <ParallaxBackground />
      <ParticleNetwork brightness={theme === "dark" ? 1.2 : 0.8} />
      <MouseTrail />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 origin-left z-40"
        style={{ scaleX }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-[#030609]/85 backdrop-blur-lg border-b border-gray-800 z-30 flex items-center justify-between px-6 md:px-12">
        <div
          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent cursor-pointer font-mono"
          onClick={() => scrollToId("home")}
        >
          &lt;UN /&gt;
        </div>
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-400">
          {["experience", "projects", "skills", "education", "contact"].map(
            (id) => (
              <li
                key={id}
                className="hover:text-cyan-400 cursor-pointer transition-colors"
                onClick={() => scrollToId(id)}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </li>
            )
          )}
        </ul>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="hidden md:inline-flex px-3 py-1 text-xs rounded-full border border-gray-700 text-gray-300 hover:text-white"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-400 text-black rounded-lg shadow hover:shadow-lg hover:from-cyan-300 hover:to-blue-300 transition flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            RESUME
          </a>
        </div>
      </nav>

      {/* CONTENT WRAPPER */}
      <motion.div
        style={{ scale: zoom }}
        className="relative z-10 pt-20 pb-24 overflow-x-hidden"
      >
        {/* HERO */}
        <main
          id="home"
          className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6"
        >
          <TiltCard className="rounded-full mb-8">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: "spring" }}
              className="relative w-40 h-40 md:w-48 md:h-48"
            >
              <motion.div
                animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-2xl opacity-50"
              />

              <motion.img
                src="/Professional_Udith.png"
                alt="Udith Narayan"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop";
                }}
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full object-cover rounded-full border-2 border-cyan-400/50 shadow-2xl"
              />
            </motion.div>
          </TiltCard>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1 border border-gray-700 bg-gray-900/40 rounded-full text-xs text-cyan-400 font-mono mb-4"
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-ping" />
            <ScrambleText text={PORTFOLIO_DATA.availability} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white"
          >
            Udith{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Narayan
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-lg md:text-xl max-w-2xl text-gray-400"
          >
            AI Engineer specializing in{" "}
            <span className="text-cyan-400 font-semibold">NLP Pipelines</span>,{" "}
            <span className="text-purple-400 font-semibold">
              Large Language Models
            </span>{" "}
            & scalable{" "}
            <span className="text-emerald-400 font-semibold">
              Cloud Architecture
            </span>
            .
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center gap-6 mt-6"
          >
            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="w-7 h-7 text-gray-400 hover:text-white hover:scale-110 transition-all" />
            </a>
            <a
              href={PORTFOLIO_DATA.socials.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="w-7 h-7 text-gray-400 hover:text-white hover:scale-110 transition-all" />
            </a>
            <a href={`mailto:${PORTFOLIO_DATA.socials.email}`}>
              <Mail className="w-7 h-7 text-gray-400 hover:text-white hover:scale-110 transition-all" />
            </a>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-10 text-gray-600"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </main>

        {/* EXPERIENCE TIMELINE */}
        <section
          id="experience"
          className="py-24 px-6 max-w-5xl mx-auto relative"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="text-cyan-400">/</span> Experience
          </h2>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-800 before:to-transparent">
            {PORTFOLIO_DATA.experience.map((job, idx) => (
              <div
                key={idx}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-[#030609] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-cyan-500 transition-colors">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                </div>

                {/* Card */}
                <TiltCard
                  className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)]"
                  onClick={() => setSelectedExperience(job)}
                >
                  <div className="p-6 rounded-xl border border-gray-800 bg-[#0f1624]/80 hover:border-cyan-500/30 transition-all shadow-lg hover:shadow-cyan-500/10 cursor-pointer">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                          {job.role}
                        </h3>
                        <p className="text-gray-400 text-sm">{job.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 font-mono border border-gray-800 px-2 py-1 rounded mt-2 md:mt-0 w-fit">
                        {job.date}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {job.fullDesc?.[0]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-1 bg-gray-800 text-gray-300 rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-cyan-400 text-xs mt-3">
                      Tap to view details →
                    </p>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section
          id="projects"
          className="py-24 px-6 max-w-6xl mx-auto relative"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="text-purple-400">/</span> Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <TiltCard
                key={idx}
                className="h-full"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-[#0f1624]/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group h-full flex flex-col justify-between hover:border-purple-500/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 mb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-gray-800/60 rounded-lg">
                        {project.icon && projectIcons[project.icon]}
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div className="relative z-10 mt-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-[10px] rounded-full bg-gray-900/70 border border-gray-700 text-gray-200 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Story{" "}
                      <ChevronDown className="w-3 h-3 -rotate-90" />
                    </span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* SKILLS + EDUCATION */}
        <section
          id="skills"
          className="py-24 px-6 max-w-6xl mx-auto relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Skills */}
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-cyan-400">/</span> Tech Stack
              </h2>
              <TiltCard onClick={() => setSkillsOpen(true)}>
                <div className="bg-[#0f1624]/60 backdrop-blur-md border border-cyan-900/30 rounded-2xl p-8 shadow-xl cursor-pointer hover:border-cyan-500/50 transition-all group">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                      Confidence Metrics
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
                  </div>
                  {PORTFOLIO_DATA.skillsList.map((skill, i) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      index={i}
                    />
                  ))}
                  <p className="mt-2 text-xs text-gray-500">
                    Tap to view full radar chart →
                  </p>
                </div>
              </TiltCard>
            </div>

            {/* Education */}
            <div id="education">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="text-purple-400">/</span> Education
              </h2>
              <div className="space-y-6">
                {PORTFOLIO_DATA.education.map((edu, i) => (
                  <TiltCard key={i}>
                    <div className="bg-[#0f1624]/60 backdrop-blur-md border border-purple-900/30 rounded-2xl p-6 shadow-xl flex items-start gap-4 hover:border-purple-500/50 transition-colors">
                      <div className="p-3 bg-purple-500/10 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {edu.degree}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {edu.school}
                        </p>
                        <span className="text-xs font-mono text-purple-400">
                          {edu.year}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT + EMAIL */}
        <section
          id="contact"
          className="py-24 px-6 max-w-4xl mx-auto text-center"
        >
          <TiltCard>
            <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-gray-800 rounded-3xl p-10 md:p-12 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent translate-y-[-100%] animate-[scan_3s_ease-in-out_infinite]" />
              <h2 className="text-4xl font-bold mb-6 text-white relative z-10">
                <ScrambleText text="Ready to Collaborate?" />
              </h2>
              <div className="flex justify-center gap-6 mb-6 text-gray-400 text-sm relative z-10 flex-wrap">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  {PORTFOLIO_DATA.location}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-500" />
                  {PORTFOLIO_DATA.phone}
                </span>
              </div>
              <a
                href={`mailto:${PORTFOLIO_DATA.socials.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] mb-6 relative z-10"
              >
                <Mail className="w-5 h-5" />
                Say Hello
              </a>

              <EmailDrafter />
            </div>
          </TiltCard>
        </section>
      </motion.div>

      {/* MODALS */}
      <ExperienceModal
        experience={selectedExperience}
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <SkillsModal
        open={skillsOpen}
        onClose={() => setSkillsOpen(false)}
        skills={PORTFOLIO_DATA.skillsList}
      />

      {/* CHATBOT */}
      <ChatBot />

      {/* FOOTER */}
      <footer className="w-full py-10 mt-10 border-t border-gray-800 bg-black/40 backdrop-blur-xl text-center text-sm relative shadow-[0_0_25px_rgba(34,211,238,0.25)] z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 opacity-70 blur-sm" />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-400"
        >
          © 2025 Udith Narayan — Built with React, Framer Motion & Care
        </motion.p>
      </footer>

      <style>
        {`
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
        `}
      </style>
    </div>
  );
}
