"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
// import ColorBends from "@/components/ColorBends"; // Пока скроем, чтобы не тянул ресурсы
import RevealCurtain from "@/components/RevealCurtain";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // Добавил overflow-x-hidden, чтобы исключить горизонтальный скролл на мобильных
    <main className="relative w-full min-h-screen text-foreground overflow-x-hidden">
      
      {/* 1. ШТОРКА (Самый верхний слой z-[9999]) */}
      <RevealCurtain />

      {/* 2. ФОН (FIXED) -> ТЕПЕРЬ СПЛОШНОЙ SECONDARY */}
      {/* Заменили ColorBends на сплошную заливку bg-secondary.
          Убрали opacity-20, иначе фон будет прозрачным.
      */}
      <div className="fixed inset-0 w-full h-full z-0 bg-secondary pointer-events-none" />

      {/* 3. КОНТЕНТ (SCROLLABLE) */}
      {/* Z-10 поднимает контент над фоном */}
      <div className="relative z-10 flex flex-col">
          
          <div id="hero">
            <Hero />  
          </div>
          
          {/* Якорь для About с компенсацией высоты хедера */}
          <div className="relative">
            <div id="about" className="absolute top-0 md:-top-10 left-0 w-full h-1" />
            <About /> 
          </div>
          
          <div className="relative">
            <div id="services" className="absolute top-0 md:-top-5 left-0 w-full h-1" />
            <Services />
          </div>
          
          <Footer />
      </div>

    </main>
  );
}