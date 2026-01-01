"use client";

import * as React from "react";
import { Card } from "@/components/card";

interface ParallaxCard {
  content: React.ReactNode;
}

interface ParallaxCardsProps {
  cards?: ParallaxCard[];
}

export default function ParallaxCards({
  cards,
}: ParallaxCardsProps) {
  const cardCount = cards?.length || 0;

  return (
    <section className="relative w-full px-4 md:px-0">
      {/* ИСПРАВЛЕНИЕ:
         cardCount * 100 = 100vh скролла на каждую карточку. 
         Это даст достаточно времени, чтобы прочитать контент.
      */}
      <div style={{ height: `${cardCount * 100}vh` }} className="relative">
        {cards?.map((card, index) => (
          <div 
            key={index} 
            // sticky: прилипает
            // top-0: к самому верху
            // h-screen: контейнер карточки равен высоте экрана (важно!)
            className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
            // z-index увеличивается с каждой карточкой, чтобы новая перекрывала старую
            style={{ zIndex: index + 1 }}
          >
            <Card
              className="
                w-full max-w-4xl h-[50vh] md:h-[50vh]
                flex flex-col items-center justify-center text-center p-8 md:p-16
                rounded-none 
                border-y border-x-0 border-white/10 
                bg-black/50 backdrop-blur-md shadow-2xl
                transition-all duration-500 rounded-lg
              "
            >
              {card.content}
            </Card>
          </div>
        ))}
      </div>
      
      {/* Небольшой буфер внизу, чтобы последняя карточка не улетала мгновенно */}
      <div className="h-[20vh]" />
    </section>
  );
}