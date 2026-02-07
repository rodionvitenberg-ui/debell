"use client";

import { ChevronDown } from "lucide-react";
import RotatingText from "./RotatingText";
import FloatingLines from "./FloatingLines";
import ContactBlock from "./ContactBlock";

export default function Hero() {
  const topLabels = [
    "Увеличение продаж",
    "Узнаваемость бренда",
    "Индивидуальный дизайн",
    "Персональная поддержка",
  ];

  return (
    <section className="relative mix-blend-mode: difference w-full min-h-auto md:min-h-[102dvh] flex flex-col items-center justify-start pt-20 md:pt-25 px-4 pb-8 md:pb-4 overflow-hidden">
      
      {/* 1. ЗАГОЛОВОК (Статика) */}
      <div className="relative z-10 flex flex-col items-start md:flex-col md:items-center md:justify-center w-full mb-4 md:mb-4 shrink-0 gap-0 md:gap-0">
        
        {/* ЧАСТЬ 1: IkSoft */}
        <h1 className="font-cool text-[14.5vw] md:text-[8rem] lg:text-[10rem] xl:text-[10rem] font-bold tracking-tighter leading-[0.9] md:leading-none whitespace-nowrap text-left md:text-center text-accent-foreground">
          Issik-Kul Soft
        </h1>

        {/* ЧАСТЬ 2: We know how to sell */}
        <div className="font-cool text-[6vw] md:text-[8rem] lg:text-[10rem] xl:text-[6rem] font-bold tracking-tighter leading-[0.9] md:leading-none whitespace-nowrap text-left md:text-center text-accent-foreground">
          Мы знаем, как сделать лучше
        </div>
        
      </div>

      {/* 2. КАРТОЧКА-КОНТЕЙНЕР (Статика) */}
      <div 
        className="relative w-full  max-w-[100%] md:max-w-100%] 
                   flex flex-col justify-between
                   min-h-[50vh] h-auto
                   md:flex-1 md:min-h-[45vh] md:justify-between
                   bg-background rounded-[2rem] md:rounded-[2.5rem] 
                   overflow-hidden"
      >
        
        {/* --- ФОН --- */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[inherit]">
            <div className="absolute inset-0 bg-background z-[1]" />
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
            <div className="absolute inset-0 z-[3] bg-background opacity-10 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"></div>
        </div>

        {/* --- ВЕРХНИЕ НАДПИСИ (DESKTOP ONLY) --- */}
        <div className="relative z-10 w-full hidden md:flex justify-between px-8 pt-6 pointer-events-none">
          {topLabels.map((label, index) => (
            <div 
              key={index}
              className="group flex flex-col items-center justify-start flex-1 mx-4"
            >
              <span className="
                text-xs uppercase tracking-[0.15em] font-medium text-center 
                transition-opacity duration-300 pointer-events-auto pb-4
                text-white mix-blend-difference 
                opacity-60 group-hover:opacity-100
              ">
                {label}
              </span>
              
              <div className="
                w-full h-[1px] transition-opacity duration-300
                bg-white mix-blend-difference 
                opacity-20 group-hover:opacity-100
              " />
            </div>
          ))}
        </div>

        {/* --- ОСНОВНОЙ КОНТЕНТ --- */}
        <div className="relative z-10 w-full p-5 md:p-10 flex flex-col flex-grow md:block md:flex-grow-0 pointer-events-none">
            
            {/* ТЕКСТОВЫЙ БЛОК */}
            <div className="relative md:absolute md:bottom-10 md:left-8 w-full md:w-auto max-w-[90%] md:max-w-[480px] text-left pointer-events-auto">
                
                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-white/50 mb-3 md:mb-4 font-medium">
                  Веб-разработка & Дизайн
                </p>

                <div className="font-cool text-[2rem] sm:text-3xl md:text-3xl lg:text-4xl tracking-wide text-white leading-[1.2]">
                    <span className="opacity-100 inline mr-2">
                        Современные цифровые решения для
                    </span>
                    
                    <div className="text-white relative inline-flex justify-start items-baseline">
                        <RotatingText
                            texts={['отелей.', 'хостелов.', 'ресторанов.', 'баров.', 'бизнеса.']}
                            mainClassName="overflow-hidden h-[1.3em] w-[210px] sm:w-[220px] md:w-[230px] lg:w-[300px] justify-start"
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

            <div className="flex-grow min-h-6" />

            {/* КОНТАКТЫ */}
            <div className="pointer-events-auto w-full md:w-auto md:mt-0">
               <ContactBlock />
            </div>

        </div>

      </div>

      <div className="absolute bottom-2 md:bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <ChevronDown className="w-6 h-6 text-white/30 animate-bounce" />
      </div>

    </section>
  );
}