"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; // Импортируем иконку стрелки
import BlurText from "./BlurText";
import RotatingText from "./RotatingText";
import ColorBends from "./ColorBends"; // Импортируем эффект фона

export default function Hero() {
  return (
    <motion.section
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      // Добавил overflow-hidden, чтобы фон не вылезал за пределы шторы
      className="relative z-50 flex h-screen w-full flex-col items-center justify-start pt-32 md:pt-10 bg-background text-foreground overflow-hidden"
    >
      {/* === 1. ФОНОВЫЙ ЭФФЕКТ (ColorBends) === */}
      {/* Позиционируем абсолютно позади всего контента */}
<div className="absolute inset-0 z-0 opacity-50 pointer-events-none">
  <ColorBends
    overlayColor="var(--background)" // Моя настройка: смешивает края с черным фоном сайта
    frequency={1}                  // Твоя настройка: частота волн
    parallax={1}                     // Твоя настройка: глубина движения
    noise={0}
    colors={['#03bbfeff', '#ffffffff', '#6a00ffff', '#ffbb00ff']}                        // Твоя настройка: убирает шум, делает гладким                // Твоя настройка: серебристый цвет
  />
</div>

      {/* === 2. ЦЕНТРАЛЬНЫЙ БЛОК КОНТЕНТА === */}
      {/* relative z-10: поднимаем текст над фоном */}
      <div className="relative z-10 flex flex-col items-center w-full mt-28 md:mt-24 px-4">
        
        {/* ГЛАВНЫЙ ЛОГОТИП */}
        <BlurText
          text="DEBELL"
          delay={150}
          animateBy="letters"
          direction="top"
          stepDuration={0.5}
          // Твои настройки размеров:
          className="font-cool text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[16rem] xl:text-[18rem] font-bold uppercase tracking-tighter leading-[0.8]"
        />

        {/* ПОДЗАГОЛОВОК */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            // Твои настройки размеров:
            className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-6 md:mt-4 font-cool text-sm sm:text-xl md:text-2xl lg:text-3xl uppercase tracking-wide text-center"
        >
            <span className="opacity-100">Digital solutions for</span>
            
            <div className="text-accent relative">
                <RotatingText
                    texts={['BARS', 'RESTAURANTS', 'CLUBS', 'SPACES']}
                    // Твои настройки ширины:
                    mainClassName="overflow-hidden h-[1.15em] w-[110px] sm:w-[160px] md:w-[200px] lg:w-[260px] justify-center md:justify-start"
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

{/* === 3. ИНДИКАТОР СКРОЛЛА (СТРЕЛКА) === */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        // relative z-10: чтобы стрелка была над фоном
        className="absolute bottom-12 flex flex-col items-center z-10"
      >
        {/* Обертка для ховер-эффекта */}
        <div className="p-3 rounded-full transition-colors duration-300 hover:bg-white/10 cursor-pointer">
            <ChevronDown className="w-8 h-8 text-foreground opacity-80" />
        </div>
      </motion.div>
    </motion.section>
  );
}