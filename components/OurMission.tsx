"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ColorBends from "./ColorBends";
import ScrambledText from "./ScrambledText";

export default function OurMission() {
  const t = useTranslations("OurMission");
  
  // Добавили whitespace-pre-line для корректной работы \n внутри ScrambledText
  const textSizeClasses = "whitespace-pre-line font-bold md:font-cool text-[1.4rem] sm:text-xl md:text-2xl lg:text-3xl leading-[1.0] md:leading-[1.1] tracking-tight md:tracking-normal";

  return (
    <section className="relative w-full min-h-screen flex flex-col-reverse md:flex-row">
      
      {/* --- ЛЕВЫЙ БЛОК (АНИМАЦИЯ + ИСТОРИЯ) --- */}
      <div className="relative w-full md:w-1/2 min-h-[60vh] md:h-auto flex flex-col">
        
        <div className="relative h-full mx-2 md:mx-0 md:ml-4 rounded-[2rem] md:rounded-[1.5rem] bg-[#080808] overflow-hidden">
            
            {/* 1. АНИМАЦИЯ */}
            <div className="absolute inset-0 w-full h-full opacity-60">
               <ColorBends
                  colors={["#84ab2f", "#84ab2f", "#84ab2f"]}
                  rotation={0}
                  speed={0.1}
                  scale={1.2}
                  frequency={1}
                  warpStrength={1}
                  mouseInfluence={0.5}
                  parallax={2}
                  noise={0}
                  transparent
                  autoRotate={0}
               />
            </div>

            {/* 2. ТЕКСТ ИСТОРИИ */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-12">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="max-w-md w-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl"
                >
                    <h3 className="font-cool text-2xl text-white mb-4 mix-blend-difference">
                      {t("historyTitle")}
                    </h3>
                    
                    <div className="space-y-6 text-white text-md leading-relaxed font-cool mix-blend-difference">
                      <p>{t("historyP1")}</p>
                      <p>{t("historyP2")}</p>
                      <p>{t("historyP3")}</p>
                      <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40">
                        <span>{t("origins")}</span>
                      </div>
                    </div>
                </motion.div>
            </div>

        </div>
      </div>

      {/* --- ПРАВЫЙ БЛОК (МИССИЯ) --- */}
      <div className="relative w-full md:w-1/2 flex flex-col justify-center p-8 md:p-20 md:min-h-screen">
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
           > 
              {/* Используем t.rich для обработки тега <br/> */}
              <h2 className="whitespace-pre-line font-cool text-4xl md:text-5xl lg:text-5xl text-background font-bold leading-[0.95] mb-8 md:mb-10">
  {t("missionTitle")}
</h2>

              {/* БЛОК С ScrambledText */}
              <div className={`text-background max-w-[1000px] mb-8 md:mb-12 ${textSizeClasses}`}>
                <ScrambledText
                  radius={70}
                  duration={1.9}
                  speed={0.7}
                  scrambleChars=".:"
                >
                  {t("missionText")}
                </ScrambledText>
              </div>

              <div className="mt-8 md:mt-12 w-full flex justify-center">
                <Link href="/contact" passHref>
                <button
                    className="group relative flex items-center gap-4 px-6 py-4 bg-background text-white rounded-full font-bold text-lg md:text-xl tracking-wide overflow-hidden shadow-lg hover:shadow-accent/20 transition-all duration-300"
                >
                    <span className="relative z-10 transition-colors duration-300">
                        {t("ctaButton")}
                    </span>
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight className="w-6 h-6" />
                    </span>
                </button>
                </Link>
            </div>
           </motion.div>
      </div>

    </section>
  );
}