import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./TiltCard";
import { X, Sparkles } from "lucide-react";

/**
 * Fully modernized + smoother Project Modal
 * Brighter glow, better performance, lighter animations
 */
export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* MODAL CARD */}
          <TiltCard onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-[#0f1624] border border-cyan-500/30 rounded-2xl p-8 shadow-xl overflow-hidden"
            >
              {/* TOP GRADIENT BAR */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500" />

              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-gray-800/50 text-gray-300 hover:text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* TITLE + DESC */}
              <div className="relative z-10 mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-cyan-300 text-sm font-mono">{project.desc}</p>
              </div>

              {/* STORY */}
              <div className="relative z-10 mb-8">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> Project Story
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-gray-700 pl-4">
                  {project.story}
                </p>
              </div>

              {/* TECH STACK TAGS */}
              <div className="relative z-10">
                <h3 className="text-xs uppercase text-gray-400 mb-3 tracking-wider">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-mono border border-purple-500/30 bg-purple-900/20 text-purple-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
