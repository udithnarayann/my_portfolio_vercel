import React, { useEffect, useState } from "react";

/**
 * ScrambleText — animates text by cycling random characters
 * Used for headings, section titles, badges, etc.
 */

export default function ScrambleText({ text, className = "" }) {
  const [scrambled, setScrambled] = useState(text);

  useEffect(() => {
    let iteration = 0;
    const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    let raf;

    const animate = () => {
      setScrambled((prev) =>
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3;
      if (iteration < text.length) {
        raf = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return <span className={className}>{scrambled}</span>;
}
