"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function RevealCurtain() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <motion.div
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ 
        duration: 1.2, 
        ease: [0.76, 0, 0.24, 1],
        delay: 0.2 
      }}
      onAnimationComplete={() => setIsVisible(false)}
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center pointer-events-none ${
        !isVisible ? "hidden" : "block"
      }`}
    >
        {/* ЛОГОТИП */}
        {/* Добавил w-full и text-center, чтобы гарантировать центровку */}
        <div className="overflow-hidden w-full text-center">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
                className="font-heading text-6xl md:text-9xl font-extrabold tracking-tighter text-black uppercase inline-block"
            >
                DEBELL
            </motion.h1>
        </div>
    </motion.div>
  );
}