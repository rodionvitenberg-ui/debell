"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react"; 
import BlurText from "./BlurText";
import RotatingText from "./RotatingText";

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-start pt-32 md:pt-10 overflow-hidden pointer-events-none">
      
      {/* === ЦЕНТРАЛЬНЫЙ БЛОК КОНТЕНТА === */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-full mt-28 md:mt-24 px-4 pointer-events-auto">
        
        <BlurText
          text="Rodion"
          delay={150}
          animateBy="letters"
          direction="top"
          stepDuration={0.8}
          className="font-cool text-[14vw] sm:text-[8rem] md:text-[11rem] lg:text-[16rem] xl:text-[11rem] font-bold uppercase tracking-tighter leading-[0.8] whitespace-nowrap"
        />

        <BlurText
          text="Vitenberg"
          delay={200} /* Увеличили задержку, чтобы фамилия вышла второй */
          animateBy="letters"
          direction="top"
          stepDuration={0.8}
          className="font-cool text-[14vw] sm:text-[8rem] md:text-[11rem] lg:text-[16rem] xl:text-[11rem] font-bold uppercase tracking-tighter leading-[0.8] whitespace-nowrap"
        />

        

        {/* ПОДЗАГОЛОВОК */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mt-6 md:mt-4 font-cool text-lg sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wide text-center w-full"
        >
            {/* whitespace-nowrap: Чтобы "Digital solutions for" не разбивалось на две строки на узких экранах */}
            <span className="opacity-100 whitespace-nowrap">Digital solutions for</span>
            
            {/* Обертка для меняющегося текста */}
            <div className="text-accent relative inline-flex justify-center">
                <RotatingText
                    texts={['BARS', 'RESTAURANTS', 'CLUBS', 'STARTAPPS', 'MARKETPLACES', 'SELF-EMPLOYERS']}
                    // mainClassName: justify-center (для мобилок) -> md:justify-start (для десктопа, чтобы прилипало к тексту слева)
                    mainClassName="overflow-hidden h-[1.15em] w-[150px] sm:w-[160px] md:w-[200px] lg:w-[280px] justify-center md:justify-start"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3000}
                />
            </div>
        </motion.div>
      </div>

      {/* === ИНДИКАТОР СКРОЛЛА === */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center z-10 pointer-events-auto"
      >
        <motion.div style={{ opacity }}>
            <div className="p-3 rounded-full transition-colors duration-300 hover:bg-white/10 cursor-pointer">
                <ChevronDown className="w-8 h-8 text-foreground opacity-80" />
            </div>
        </motion.div>
      </motion.div>
    </section>
  );
}