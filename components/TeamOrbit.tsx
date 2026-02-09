"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  RadialSocials,
  RadialSocialsContent,
  RadialCircular,
  RadialIcon,
} from "@/components/radial-socials";

export default function TeamOrbit() {
  // Начальные значения (десктопные)
  const [radii, setRadii] = useState([150, 250, 350]);

  useEffect(() => {
    const updateRadii = () => {
      // Адаптация под мобильные устройства (< 768px)
      if (window.innerWidth < 768) {
        setRadii([75, 115, 155]); // Компактные орбиты
      } else {
        setRadii([150, 250, 350]); // Просторные орбиты
      }
    };

    updateRadii();
    window.addEventListener("resize", updateRadii);
    return () => window.removeEventListener("resize", updateRadii);
  }, []);

  // Единый класс размера для всех аватарок
  const avatarSizeClass = "w-10 h-10 md:w-14 md:h-14 border-none shadow-2xl transition-transform";

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-gradient-to-b from-background to-secondary/10 overflow-hidden">
      <style jsx global>{`
        @keyframes rotate-0 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotate-1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes rotate-2 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        @keyframes counter-rotate-0 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes counter-rotate-1 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes counter-rotate-2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>

      {/* ЦЕНТРАЛЬНЫЙ ТЕКСТ */}
      <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none max-w-[130px] md:max-w-[220px]">
        
        <h3 className="font-cool text-white text-[0.80rem] md:text-[1.35rem] font-bold tracking-wide leading-tight">
          Маленькая, ламповая, но очень сильная команда.
        </h3>
      </div>

      <RadialSocials 
         animationDelay={0}
         expandDuration={800} 
         className="w-full h-full flex items-center justify-center"
      >
        <RadialSocialsContent 
            className="max-w-none w-full h-full aspect-auto"
            containerClassName="p-0"
        >
          
          {/* ОРБИТА 1 */}
          <RadialCircular 
            radius={radii[0]} 
            duration={30} 
            className="border-accent/20"
            circleLineClassName="border-accent/20"
            circleIndex={0}
          >
            <RadialIcon
              icon={
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
                  <Image
                    src="/vova.jpg"
                    alt="Сотрудник 1"
                    fill
                    className="object-cover fill" 
                  />
                </div>
              }
              className={avatarSizeClass}
              angle={0}
              circleIndex={0}
            />
          </RadialCircular>

          {/* ОРБИТА 2 */}
          <RadialCircular 
            radius={radii[1]} 
            duration={40} 
            className="border-accent/20"
            circleLineClassName="border-accent/20"
            circleIndex={1}
          >
            <RadialIcon
              icon={
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
                  <Image
                    src="/rodion.jpg"
                    alt="Сотрудник 2"
                    fill
                    className="object-cover"
                  />
                </div>
              }
              className={avatarSizeClass}
              angle={120}
              circleIndex={1}
            />
          </RadialCircular>

          {/* ОРБИТА 3 */}
          <RadialCircular 
            radius={radii[2]} 
            duration={50} 
            className="border-accent/20"
            circleLineClassName="border-accent/20"
            circleIndex={2}
          >
            <RadialIcon
              icon={
                <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20">
                  <Image
                    src="/tanya.jpg"
                    alt="Сотрудник 3"
                    fill
                    className="object-cover"
                  />
                </div>
              }
              className={avatarSizeClass}
              angle={240}
              circleIndex={2}
            />
          </RadialCircular>

        </RadialSocialsContent>
      </RadialSocials>
    </div>
  );
}