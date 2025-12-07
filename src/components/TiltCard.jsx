import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * TiltCard — lightweight, GPU-accelerated, smooth tilt effect
 * Matches your original aesthetic but more performant
 */
export default function TiltCard({ children, className = "", onClick, playHover }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // subtle 3D tilt
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX);
    y.set(offsetY);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playHover && playHover()}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      className={`transform-gpu transition-all duration-200 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
