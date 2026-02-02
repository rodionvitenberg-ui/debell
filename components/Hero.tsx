"use client";

import { motion, useScroll, useTransform, LayoutGroup } from "framer-motion";
import { ChevronDown } from "lucide-react";
import BlurText from "./BlurText";
import RotatingText from "./RotatingText";
import FloatingLines from "./FloatingLines";
import ContactBlock from "./ContactBlock";

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  const topLabels = [
    "Увеличение продаж",
    "Узнаваемость бренда",
    "Индивидуальный дизайн",
    "Персональная поддержка",
  ];

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-start pt-24 md:pt-28 px-3 pb-8 md:pb-4 overflow-hidden">
      
      {/* 1. ЗАГОЛОВОК */}
      <div className="relative z-10 flex flex-col items-center w-full mb-4 md:mb-6 shrink-0">
        <BlurText
          text="Issik-Kul Soft"
          delay={1}
          animateBy="letters"
          direction="top"
          stepDuration={0.8}
          className="font-cool text-[13vw] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold tracking-tighter leading-none whitespace-nowrap text-accent-foreground"
        />
      </div>

      {/* 2. КАРТОЧКА-КОНТЕЙНЕР */}
      <LayoutGroup>
        <motion.div 
          layout // Карточка анимирует свои размеры
          className="relative w-full max-w-[100%] md:max-w-[100%] 
                     
                     /* === MOBILE LAYOUT === */
                     /* justify-between: Текст сверху, Контакты снизу */
                     flex flex-col justify-between
                     /* min-h задает начальную длину. */
                     min-h-[60vh] h-auto
                     
                     /* === DESKTOP LAYOUT === */
                     md:flex-1 md:min-h-[45vh] md:justify-between
                     
                     bg-[#171717] rounded-[2rem] md:rounded-[2.5rem] 
                     overflow-hidden"
          transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
        >
          
          {/* --- ФОН --- */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
              <div className="absolute inset-0 bg-black/80 z-[1]" />
              <div className="absolute inset-0 z-[2]">
                  <FloatingLines 
                      enabledWaves={["bottom","middle","top"]}
                      lineCount={5}
                      lineDistance={2}
                      bendRadius={5}
                      bendStrength={-0.5}
                      interactive={true}
                      parallax={true}
                      linesGradient={['#84ab2f', '#84ab2f', '#84ab2f']} 
                  />
              </div>
              <div className="absolute inset-0 z-[3] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
          </div>

          {/* --- ВЕРХНИЕ НАДПИСИ (DESKTOP ONLY) --- */}
          <div className="relative z-10 w-full hidden md:flex justify-between px-8 pt-6 pointer-events-none">
            {topLabels.map((label, index) => (
              <div 
                key={index}
                className="group flex flex-col items-center justify-start flex-1 mx-4"
              >
                <span className="text-xs uppercase tracking-[0.15em] text-white/60 font-medium text-center group-hover:text-white transition-colors duration-300 pointer-events-auto pb-4">
                  {label}
                </span>
                <div className="w-full h-[1px] bg-white/10 group-hover:bg-white/30 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
<motion.div 
  layout="position"
  className="relative z-10 w-full p-5 md:p-10 flex flex-col flex-grow md:block md:flex-grow-0 pointer-events-none"
>
    
    {/* ТЕКСТОВЫЙ БЛОК */}
    {/* md:bottom-10 md:left-8 — позиционирование на десктопе */}
    <div className="relative md:absolute md:bottom-10 md:left-8 w-full md:w-auto max-w-[90%] md:max-w-[480px] text-left pointer-events-auto">
        
        {/* 1. НОВЫЙ ТЕКСТ (Eyebrow) */}
        {/* text-white/50 — серый, tracking-widest — разрядка */}
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/50 mb-3 md:mb-4 font-medium">
          Веб-разработка & Дизайн
        </p>

        {/* 2. ОСНОВНОЙ ЗАГОЛОВОК */}
        {/* text-base — база для моб., md:text-2xl — десктоп.
            leading-[1.2] — ручное управление межстрочным интервалом.
            Чем меньше число, тем плотнее строки. */}
        <div className="font-cool text-[1.3rem] sm:text-xl md:text-3xl lg:text-4xl tracking-wide text-white leading-[1.2]">
            <span className="opacity-100 block mb-1 md:inline md:mb-0 md:mr-2">
                Современные цифровые решения для
            </span>
            
            {/* Контейнер для вращающегося текста */}
            <div className="text-white relative inline-flex justify-start align-top md:align-bottom">
                <RotatingText
                    texts={['отелей.', 'хостелов.', 'ресторанов.', 'баров.', 'бизнеса.']}
                    // mainClassName:
                    // h-[1.2em] — фиксируем высоту строки под размер шрифта, чтобы не прыгало
                    mainClassName="overflow-hidden h-[1.3em] w-[130px] sm:w-[160px] md:w-[230px] lg:w-[300px] justify-start"
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
        </div>
    </div>

    {/* ПУСТОЕ МЕСТО (Spacer) */}
    <div className="flex-grow min-h-6" />

    {/* КОНТАКТЫ */}
    <motion.div layout className="pointer-events-auto w-full md:w-auto md:mt-0">
       <ContactBlock />
    </motion.div>

</motion.div>

        </motion.div>
      </LayoutGroup>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <ChevronDown className="w-6 h-6 text-white/30 animate-bounce" />
      </motion.div>

    </section>
  );
}