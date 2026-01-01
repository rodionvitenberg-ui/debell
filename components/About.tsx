"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; 
import { BackgroundPaths } from "@/components/ui/background-paths";
import AnimatedContent from "./AnimatedContent";

const SimulatedChat = () => {
  const messages = [
    { id: 1, text: "Can we change the header color?", isMe: false, delay: 0.5 },
    { id: 2, text: "Done. Check production.", isMe: true, delay: 1.5 },
    { id: 3, text: "Wait, that was fast. Thanks!", isMe: false, delay: 2.5 },
  ];

  return (
    <div className="w-full flex flex-col gap-3 mt-6 px-2">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, x: msg.isMe ? 20 : -20, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: msg.delay, duration: 0.4 }}
          className={`relative max-w-[80%] p-3 rounded-2xl text-xs md:text-sm font-medium ${
            msg.isMe 
              ? "self-end bg-accent text-black rounded-tr-sm" 
              : "self-start bg-white/10 text-white rounded-tl-sm"
          }`}
        >
          {msg.text}
        </motion.div>
      ))}
    </div>
  );
};

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // ИСПРАВЛЕННАЯ ФУНКЦИЯ
  const handleMouseEnter = () => {
    if (videoRef.current) {
      // Сохраняем промис воспроизведения
      const playPromise = videoRef.current.play();

      // Если браузер вернул промис (современные браузеры)
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Игнорируем ошибку прерывания (AbortError), 
          // которая возникает при быстром уводе мыши.
          // Это штатная ситуация, просто глушим ошибку в консоли.
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      // Опционально: можно не сбрасывать время в 0, если хочешь, 
      // чтобы при повторном наведении видео продолжалось, а не начиналось сначала.
      // Но если нужно с начала — оставляй как есть:
      videoRef.current.currentTime = 0;
    }
  };

  const windowStyle = "relative rounded-3xl border border-white/10 bg-[rgba(0,0,0,0.7)] backdrop-blur-md overflow-hidden transition-colors duration-500 hover:border-white/20";

  return (
    <section className="relative z-10 min-h-screen w-full flex flex-col justify-center px-4 md:px-10 py-24 text-foreground">
      
      {/* === ВЕРХНЯЯ ЧАСТЬ: МАНИФЕСТ === */}
      <div className="w-full max-w-4xl mx-auto mb-8 md:mb-12">
        <AnimatedContent
           distance={50}
           direction="vertical"
           duration={0.8}
           className="flex flex-col items-center"
        >
          <p className="font-cool text-lg md:text-2xl leading-relaxed text-left w-full">
            Complex hierarchy kills creativity. I offer a direct path from your vision 
            to digital reality, cutting through the noise of unnecessary management. 
            No committees, no waiting, no excuses.
            
            <span className="ml-2 font-bold uppercase bg-gradient-to-r from-[#d28f13] via-[#f2ecec] to-[#1c9e45] bg-clip-text text-transparent">
              1 man - 1 decision.
            </span>
          </p>
        </AnimatedContent>
      </div>

      {/* === НИЖНЯЯ ЧАСТЬ: АСИММЕТРИЧНАЯ СЕТКА === */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
        
        {/* === 1. ЛЕВОЕ БОЛЬШОЕ ОКНО (ВИДЕО) === */}
        <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={true} 
            duration={1}
            className={`order-2 lg:order-1 lg:col-span-2 group h-[400px] lg:h-full flex flex-col justify-end ${windowStyle}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video 
                ref={videoRef}
                muted
                loop
                playsInline
                src="/videos/project-showcase.mp4"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-90 transition-opacity duration-700 grayscale group-hover:grayscale-0"
            />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className="text-white/20 uppercase tracking-widest text-sm">Project Video Preview</span>
            </div>

            <div className="relative z-10 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-3xl font-heading font-bold uppercase text-white mb-2">Example</h3>
                <p className="text-sm text-white/60">Hover to play</p>
            </div>
        </AnimatedContent>


        {/* === ПРАВАЯ КОЛОНКА (ЧАТ + КНОПКА) === */}
        <div className="order-1 lg:order-2 flex flex-col gap-6 h-full">
            
            {/* 2. ЧАТ */}
            <AnimatedContent
                distance={150}
                direction="horizontal"
                reverse={false} 
                duration={1}
                delay={0.1}
                className={`flex-1 p-6 flex flex-col ${windowStyle}`}
            >
                <span className="absolute top-6 left-6 text-xs text-white/40 uppercase tracking-widest font-bold">
                    Direct Connection
                </span>

                <div className="flex-1 flex items-center justify-center mt-4">
                    <SimulatedChat />
                </div>
            </AnimatedContent>

            {/* 3. FULL STACK + КНОПКА */}
            <AnimatedContent
                distance={150}
                direction="horizontal"
                reverse={false}
                duration={1}
                delay={0.2}
                className={`flex-1 p-8 flex flex-col ${windowStyle} relative`}
            >
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <BackgroundPaths />
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent z-10" />

                <div className="relative z-20 flex flex-col items-start h-full">
                    <div className="flex gap-4 mb-4 text-accent">
                    </div>
                    
                    <h3 className="text-xl font-heading font-bold uppercase text-white mb-3">
                        Versatile Developer
                    </h3>
                    
                    <p className="text-sm text-white/60 leading-relaxed mb-6">
                        I bridge the gap between backend logic and frontend aesthetics. 
                        Capable of building complex server architectures and pixel-perfect web designs simultaneously.
                    </p>

                    <Link 
                      href="/about-me" 
                      className="group/btn inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium uppercase tracking-wider"
                    >
                      About me
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </AnimatedContent>

        </div>

      </div>
    </section>
  );
}