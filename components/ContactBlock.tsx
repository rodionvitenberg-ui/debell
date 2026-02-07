"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";

export default function ContactBlock() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => !isMobile && setIsContactOpen(true);
  const handleMouseLeave = () => !isMobile && setIsContactOpen(false);
  const handleClick = () => isMobile && setIsContactOpen(!isContactOpen);

  return (
    <motion.div
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      initial={false}
      animate={{
        width: isMobile ? "55%" : 200,
        height: isContactOpen ? "auto" : 56,
        backgroundColor: isContactOpen ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)",
        borderRadius: 20
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
      className={`
        pointer-events-auto backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl hover:border-white/20 z-50
        flex flex-col
        
        /* === MOBILE STYLES (КРИТИЧНО ВАЖНО) === */
        /* relative: только в потоке! */
        /* w-full: на всю ширину */
        /* НИКАКИХ mt-auto или absolute bottom здесь быть не должно */
        relative w-full

        /* === DESKTOP STYLES === */
        md:absolute md:bottom-10 md:right-10 md:mt-0 md:w-auto
        
        ${isMobile ? 'cursor-pointer' : (isContactOpen ? 'cursor-default' : 'cursor-pointer')}
      `}
    >
      {/* HEADER */}
      <motion.div 
        layout="position"
        className="w-full h-[56px] shrink-0 flex items-center justify-between px-6"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>

          <div className="relative h-5 overflow-hidden flex flex-col justify-center min-w-[150px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {!isContactOpen ? (
                <motion.span
                  key="closed-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-sm font-medium text-white tracking-wider whitespace-nowrap absolute left-0"
                >
                  Связаться с нами
                </motion.span>
              ) : (
                <motion.span
                  key="open-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-xs text-white/40 uppercase tracking-widest font-bold absolute left-0"
                >
                  Контакты
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* BODY */}
      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full px-6 pb-6 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider font-medium">
                <Mail className="w-3 h-3" /> Email
              </div>
              <a href="mailto:hello@issikkul.soft" className="text-white text-sm font-medium hover:text-[#84ab2f] transition-colors select-text block">
                hello@issikkul.soft
              </a>
            </div>

            <div className="w-full h-[1px] bg-white/10" />

            <div className="flex flex-col gap-1 w-full">
               <div className="flex items-center gap-2 text-white/50 text-xs uppercase tracking-wider font-medium">
                 <Phone className="w-3 h-3" /> Телефон
               </div>
               <a href="tel:+996555123456" className="text-white text-sm font-medium hover:text-[#84ab2f] transition-colors select-text block">
                 +996 555 123 456
               </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}