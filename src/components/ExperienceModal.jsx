import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./TiltCard";
import { X, Briefcase, CheckCircle2 } from "lucide-react";

export default function ExperienceModal({ experience, isOpen, onClose }) {
  if (!isOpen || !experience) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <TiltCard onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl">
            <motion.div
              className="relative bg-[#0f1624] dark:bg-[#0f1624] light:bg-white border border-cyan-500/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.25)] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-900/70 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* HEADER */}
              <div className="mb-6 flex items-start gap-3 relative z-10">
                <div className="p-3 rounded-xl bg-cyan-500/10">
                  <Briefcase className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {experience.role}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {experience.company} • {experience.date}
                  </p>
                </div>
              </div>

              {/* BULLET POINT LIST */}
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="space-y-4 mt-6 mb-10"
              >
                {experience.fullDesc?.map((line, idx) => (
                  <motion.li
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, x: -15 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-start gap-3 text-gray-300 leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.8)] shrink-0" />
                    <span className="text-sm md:text-base">{line}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* TECH STACK */}
              <div className="relative z-10">
                <h3 className="text-xs uppercase text-gray-400 mb-2 tracking-wider">
                  Tech Stack
                </h3>

                <div className="flex flex-wrap gap-2">
                  {experience.stack?.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 text-xs font-mono border border-cyan-500/30 bg-cyan-900/20 text-cyan-200 rounded-full"
                    >
                      {item}
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
