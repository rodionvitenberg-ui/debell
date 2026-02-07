"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ColorBends from "./ColorBends";

export default function OurMission() {
  return (
    // min-h-screen: Секция во весь экран
    // bg-secondary: Общий фон (как везде)
    // flex-col-reverse: На мобилках НИЖНИЙ блок (Миссия) станет ВЕРХНИМ
    // md:flex-row: На десктопе они встанут в ряд (Слева - Анимация, Справа - Миссия)
    <section className="relative w-full min-h-screen flex flex-col-reverse md:flex-row">
      
      {/* --- ЛЕВЫЙ БЛОК (АНИМАЦИЯ + ИСТОРИЯ) --- */}
      {/* На десктопе он СЛЕВА. На мобилках он СНИЗУ (из-за col-reverse) */}
      <div className="relative w-full md:w-1/2 min-h-[60vh] md:h-auto flex flex-col">
        
        {/* Тот самый "прямоугольный темный блок" */}
        {/* h-full: Растягивается на всю высоту колонки */}
        {/* sticky top-0: На десктопе можно сделать, чтобы он залипал, пока правая часть скроллится (опционально) */}
        <div className="relative h-full mx-2 md:mx-0 md:ml-4 rounded-[2rem] md:rounded-[1.5rem] bg-[#080808] overflow-hidden">
            
            {/* 1. АНИМАЦИЯ (Внутри темного блока) */}
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

            {/* 2. ВНУТРЕННИЙ БЛОК С ТЕКСТОМ (История) */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-6 md:p-12">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  // Полупрозрачная плашка поверх анимации
                  className="max-w-md w-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl"
                >
                    <h3 className="font-cool text-2xl text-white mb-4 mix-blend-difference">
                      Почему мы здесь?
                    </h3>
                    
                    <div className="space-y-6 text-white text-md leading-relaxed font-cool mix-blend-difference">
                      <p>
                        Мы создали IkSoft, потому что устали видеть, как перспективные бренды в Кыргызстане буксуют из-за немощных технологий. Слишком долго наш рынок кормили шаблонными решениями, медленными сайтами на конструкторах и "красивыми" картинками, за которыми нет никакой инженерной базы.
                      </p>
                      <p>
                        Рекламные агентства предлагают блестящие стратегии, но клиент получает продукт, который разваливается при первом же масштабировании.
                      </p>
                      <p>
                        Мы верим, что успех бренда сегодня - это на 50% его цифровая инфраструктура. Мы не используем генераторы, которые обещают всё и сразу, но выдают мусор. Мы пишем чистый, структурированный код, потому что он работает на ваш бизнес быстрее и эффективнее.
                      </p>
                      <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40">
                        <span>IKSoft Origins</span>
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
              <h2 className="font-cool text-4xl md:text-5xl lg:text-5xl text-background font-bold leading-[0.95] mb-8 md:mb-10">
                Основаны в Кыргызстане,<br />а работаем на весь мир.
              </h2>

              <p className="text-background text-lg md:text-2xl leading-relaxed max-w-[1000px] mb-8 md:mb-12 font-cool font-bold tracking-wide">
                Наша команда понимает ценность современных инструментов и умеет их использовать, чтобы ваш бизнес рос день ото дня, а не просто "присутствовал" в сети.<br /> Мы здесь, чтобы поднять планку. Засучив рукава.
              </p>

              <div className="mt-8 md:mt-12 w-full flex justify-center">
                 <Link href="/contact" passHref>
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex items-center gap-4 px-6 py-4 bg-background text-white rounded-full font-bold text-lg md:text-xl tracking-wide overflow-hidden shadow-lg hover:shadow-accent/20 transition-all duration-300"
                    >
                      {/* Фоновый эффект при наведении (опционально) */}
                      <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                      
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Поговорим о деле
                      </span>
                      
                      <span className="relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                        {/* Если нет lucide-react, замени на <svg>...</svg> */}
                        <ArrowRight className="w-6 h-6" />
                      </span>
                    </motion.button>
                 </Link>
              </div>
           </motion.div>
      </div>

    </section>
  );
}