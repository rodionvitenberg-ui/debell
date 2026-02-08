"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link"; // Импортируем Link

const projects = [
  { 
    id: 1, 
    title: "Daerdree bar & timeclub", 
    category: "Заведение с атмосферой и душой", 
    img: "/daerdree.png",
    link: "https://daerdree.bar" // Ссылка на проект
  },
  { 
    id: 2, 
    title: "Careyour.pet", 
    category: "CRM для заводчиков и ветеринаров", 
    img: "/careyourpet.png",
    link: "https://careyour.pet"
  },
  { 
    id: 3, 
    title: "Proffmusic", 
    category: "Аудиосток и маркетплейс", 
    img: "/proffmusic.png",
    link: "https://proffmusic.ru" // Пример ссылки (если есть)
  },
];

export default function Portfolio() {
  return (
    <section className="relative w-full bg-secondary py-14 md:py-24 px-4 md:px-0">
      <div className="flex flex-col gap-0 max-w-6xl mx-auto">

        {/* --- ШАПКА СЕКЦИИ --- */}
        <div className="mb-12 md:mb-24 px-2 md:px-0 flex flex-col items-start">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="font-cool text-5xl md:text-8xl text-background font-bold tracking-tight mb-4 uppercase"
          >
            Наши работы:
          </motion.h2>
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="flex flex-col items-start"
          >
            <p className="
                text-background 
                uppercase tracking-tight font-cool text-left
                
                /* РАЗМЕР ШРИФТА */
                text-[14px]       /* Мобилка: очень мелко, чтобы влезло */
                sm:text-xs        /* Планшет: чуть крупнее */
                md:text-base      /* Десктоп: как и было (16px) */

                /* ЗАПРЕТ ПЕРЕНОСА */
                whitespace-nowrap
            ">
              Живые проекты для реальных клиентов
            </p>
          </motion.div>
        </div>

        {/* СПИСОК КАРТОЧЕК */}
        <div className="flex flex-col gap-8 md:gap-32 w-full pb-0">
            {projects.map((project, i) => {
              return (
                <Card 
                  key={project.id} 
                  i={i} 
                  project={project} 
                />
              );
            })}
        </div>

      </div>
    </section>
  );
}

function Card({ i, project }: any) {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'center center']
  });

  // Вращение для мобилок (поменьше) и десктопа
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <div 
        ref={container}
        className="w-full flex justify-center [perspective:1000px]"
    >
      <motion.div 
        className="
            relative 
            w-full md:max-w-5xl 
            
            /* ЖЕСТКАЯ ВЫСОТА ЧЕРЕЗ КЛАССЫ TAILWIND */
            h-[220px]       /* Мобилка: фиксированные 350px */
            md:h-[500px]    /* Десктоп: 600px */
            
            rounded-[1.5rem] md:rounded-[2.5rem] 
            overflow-hidden 
            shadow-2xl 
            bg-background
            group /* Для ховер эффектов на картинку */
        "
        style={{ 
            rotateX: rotateX,
            scale: scale,
            opacity: opacity,
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
        }}
      >
        {/* ССЫЛКА НА ВСЮ КАРТОЧКУ */}
        <Link 
            href={project.link || "#"} 
            target="_blank" // Открываем в новой вкладке (опционально)
            className="relative w-full h-full block cursor-pointer"
        >
            
            <Image 
                src={project.img} 
                alt={project.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={i === 0}
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            
            {/* Градиент */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            {/* КОНТЕНТ (Прижат вниз) */}
            <div className="absolute bottom-0 left-0 w-full h-full p-3 md:p-12 flex flex-col items-start justify-end z-20 translate-z-10">
            

                <h3 className="font-cool text-2xl md:text-5xl text-white font-bold mb-2 md:mb-3 tracking-tight drop-shadow-xl uppercase leading-none text-left">
                    {project.title}
                </h3>
                
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-0">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent shadow-[0_0_10px_currentColor]" />
                    <p className="text-white/70 text-xs md:text-lg font-mono text-left">
                        {project.category}
                    </p>
                </div>

                {/* Кнопка удалена, так как вся карточка - ссылка */}

            </div>
        </Link>
      </motion.div>
    </div>
  );
}