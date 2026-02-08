"use client";

import { ArrowUpRight } from "lucide-react";
import TeamOrbit from "./TeamOrbit";
import ChatSimulation from "./ChatSimulation";
import MetallicPaint from "./MetallicPaint"; // Импортируем компонент эффекта

export default function AboutTeam() {
  return (
    <section className="relative w-full pb-5 md:pb-20 bg-secondary px-2 md:px-4">
      
      {/* СЕТКА (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 h-auto md:h-[850px] w-full">
        
        {/* --- ЛЕВЫЙ БЛОК (Орбиты) --- */}
        <div className="col-span-1 rounded-[2rem] md:rounded-[1.5rem] overflow-hidden shadow-2xl relative min-h-[500px] md:min-h-full bg-[#171717]">
           <TeamOrbit />
        </div>

        {/* --- ПРАВАЯ КОЛОНКА --- */}
        <div className="flex flex-col gap-4 md:gap-4 h-full">
          
          {/* Правый Верхний Блок (Чат) */}
          <div className="flex-1 rounded-[2rem] md:rounded-[1.5rem] overflow-hidden min-h-[350px]">
             <ChatSimulation />
          </div>

          {/* Правый Нижний Блок (Metallic Paint) */}
          {/* relative group — для позиционирования и ховеров */}
          <div className="flex-1 rounded-[2rem] md:rounded-[1.5rem] overflow-hidden bg-background min-h-[300px] relative flex flex-col justify-between p-6 md:p-8">
              
              {/* 1. ФОНОВЫЙ ЭФФЕКТ (MetallicPaint) */}
              {/* Размещаем абсолютно, центрируем по горизонтали, прижимаем к низу */}
              <div className="absolute bottom-[10%] left-[70%] md:left-[50%] -translate-x-1/2 w-[80%] h-[80%] pointer-events-none opacity-80 md:opacity-100 mix-blend-screen">
                <MetallicPaint
                    imageSrc="/metaliclogo.png" // Ваше изображение из public
                    seed={42}
                    scale={3}
                    patternSharpness={1}
                    noiseScale={0.5}
                    speed={0.05}
                    liquid={0.75}
                    mouseAnimation={false} // Отключили реакцию на мышь для стабильности фона
                    brightness={1.5}       // Чуть убавил яркость, чтобы текст читался (было 2)
                    contrast={1.2}         // Чуть добавил контраста (было 0.5)
                    refraction={0.01}
                    blur={0.015}
                    chromaticSpread={2}
                    fresnel={1}
                    angle={0}
                    waveAmplitude={1}
                    distortion={1}
                    contour={0.2}
                    lightColor="#66812c"   // Ваш акцентный цвет
                    darkColor="#131313"
                    tintColor="#b8b8b8c0"
                />
              </div>

              {/* 2. КОНТЕНТ (Поверх эффекта) */}
<div className="
    relative z-10 w-full h-full pointer-events-none
    flex flex-col md:flex-row          /* Мобилка: колонка, Десктоп: строка */
    justify-between                    /* ГЛАВНОЕ: Раскидываем элементы по краям (Верх/Низ или Лево/Право) */
    items-start                        /* Прижимаем к левому краю (или верхнему на десктопе) */
">
    
    {/* Левая часть: Текст */}
    {/* w-full на мобилке, чтобы занимал ширину. pt-2 для небольшого отступа сверху */}
    <div className="max-w-[45%] md:max-w-[35%] flex flex-col justify-start pt-1">
        <p className="font-cool text-white text-[1rem] md:text-[1.35rem] font-bold tracking-wide leading-tight ">
          Первые на Иссык-Куле,<br /> мы создали команду, которая не просто следует трендам,<br /> а задает их.
        </p>
    </div>

    {/* Правая часть: Кнопка-ссылка */}
    {/* pointer-events-auto: чтобы кнопка нажималась */}
    {/* pb-2: небольшой отступ снизу для красоты на мобилке (опционально) */}
    <div className="pointer-events-auto pb-2 md:pb-0">
      <a 
        href="#contact" 
        className="group flex items-center gap-2 px-2 md:px-6 md:py-4 py-2 rounded-full bg-accent/70 backdrop-blur-md transition-all duration-300"
      >
          <span className="text-white font-bold text-[0.6rem] md:text-[1rem] uppercase duration-300">
            Связаться с нами
          </span>
          <ArrowUpRight className="w-5 h-5 text-white duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 transform" />
      </a>
    </div>

</div>
          </div>
        </div>

      </div>
    </section>
  );
}