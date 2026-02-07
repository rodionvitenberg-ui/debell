"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ParallaxCard {
  content: React.ReactNode;
  className?: string;
}

interface ParallaxCardsProps {
  cards: ParallaxCard[];
}

export default function ParallaxCards({ cards }: ParallaxCardsProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pb-20">
      {cards.map((card, index) => {
        // Увеличил базовый отступ (150px) и шаг (60px), чтобы заголовки лучше читались в стопке
        const topOffset = 150 + index * 60; 
        
        return (
          <div
            key={index}
            className="sticky" // Липкое позиционирование
            style={{
              top: `${topOffset}px`,
              zIndex: index + 1,
              // Добавляем небольшой отступ снизу, чтобы скролл ощущался
              paddingBottom: "5vh", 
            }}
          >
            <div
              className={cn(
                "relative w-full overflow-hidden border border-white/10 shadow-2xl",
                "rounded-[2.5rem] bg-[#121212]",
                "min-h-[500px] md:h-[65vh]", // Высота карточки
                card.className
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
              <div className="relative z-10 h-full">
                {card.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}