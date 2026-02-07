"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const projects = [
  { 
    id: 1, 
    title: "Daerdree bar & timeclub", 
    category: "Заведение с атмосферой и душой", 
    img: "/project1.jpg",
  },
  { 
    id: 2, 
    title: "Careyour.pet", 
    category: "CRM для заводчиков и ветеринаров", 
    img: "/project2.jpg",
  },
  { 
    id: 3, 
    title: "Proffmusic", 
    category: "Аудиосток и маркетплейс", 
    img: "/project3.jpg",
  },
];

export default function Portfolio() {
  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef} 
      // perspective: Обязательно для 3D эффекта
      // pb-[50vh]: Добавляем много места снизу, чтобы последние карточки успели проанимироваться
      className="relative w-full bg-secondary pt-0 pb-[5vh] px-4 md:px-0 [perspective:1000px]"
    >
      <div className="flex flex-col gap-0 max-w-5xl mx-auto">

        {/* --- ШАПКА СЕКЦИИ --- */}
        <div className="mb-10 md:mb-10 px-2 md:px-0 flex flex-col items-start">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="font-cool text-4xl md:text-8xl text-background font-bold tracking-tight mb-4"
          >
            Наши работы:
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="gap-4"
          >
            <span className="h-[1px] w-12 bg-white/30"></span>
            <p className="text-background text-sm md:text-base uppercase tracking-tight">
              Живые проекты для реальных клиентов
            </p>
          </motion.div>
        </div>

        {projects.map((project, i) => {
          const targetScale = 1 - ( (projects.length - i) * 0.000 );
          
          return (
            <Card 
              key={project.id} 
              i={i} 
              project={project} 
              targetScale={targetScale}
              total={projects.length}
            />
          );
        })}
      </div>
    </section>
  );
}

function Card({ i, project, targetScale }: any) {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start 0.05']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const rotateX = useTransform(scrollYProgress, [0.02, 1], [50, 0]); 
  const opacity = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div 
        ref={container} 
        
        // ШАГ ОТСТУПА:
        className="h-[28vh] md:h-[70vh] flex items-center justify-center sticky top-0 [--step:0px] md:[--step:0px]"
        
        style={{ 
            top: `calc(10vh + (var(--step) * ${i}))`, 
            perspective: "1000px" 
        }}
    >
      <motion.div 
        // ВЫСОТА КАРТОЧКИ:
        // 200px для мобилок
        className="relative w-full max-w-[100%] md:max-w-5xl h-[200px] md:h-[500px] rounded-[1rem] md:rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl origin-top bg-[#171717]"
        style={{ 
            scale: imageScale,      
            rotateX: rotateX,  
            opacity: opacity,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
        }}
      >
        <div className="relative w-full h-full group cursor-pointer">
            
            <Image 
                src={project.img} 
                alt={project.title} 
                fill 
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
                priority={i === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-0 left-0 w-full p-5 md:p-10 flex flex-col items-start justify-end transform-gpu translate-z-10">
                <h3 className="font-cool text-xl md:text-4xl text-white font-bold mb-1 md:mb-2 tracking-wide drop-shadow-lg">
                    {project.title}
                </h3>
                <div className="flex items-center gap-2 md:gap-3">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_currentColor]" />
                    <p className="text-white/70 text-[10px] md:text-sm uppercase tracking-[0.2em] font-medium">
                        {project.category}
                    </p>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
}