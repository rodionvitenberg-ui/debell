"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react"; 
import { BackgroundPaths } from "@/components/ui/background-paths";
import AnimatedContent from "./AnimatedContent";
import CardSwap, { Card } from "./CardSwap";

const SimulatedChat = () => {
  const [replayKey, setReplayKey] = useState(0);
  const messages = [
    { id: 1, text: "Can we change the header color?", isMe: false, delay: 0.5 },
    { id: 2, text: "Done. Check production.", isMe: true, delay: 2.5 },
    { id: 3, text: "Wait, that was fast. Thanks!", isMe: false, delay: 4.5 },
  ];

  useEffect(() => {
    // Длительность всей анимации сообщений: ~3 секунды (последнее выходит на 2.5с)
    // Пауза, которую ты просил: 5 секунд
    // Итого интервал: 3000 + 5000 = 8000 мс
    const interval = setInterval(() => {
      setReplayKey((prev) => prev + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-3 mt-6 px-2">
      {/* Ключ (key) находится здесь. Когда он меняется, 
         React "перерисовывает" всё содержимое div-а заново.
      */}
      <div key={replayKey} className="flex flex-col gap-3 w-full">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            // Важно: используем animate, а не whileInView, 
            // чтобы цикл работал даже если мы не скроллим страницу
            initial={{ opacity: 0, x: msg.isMe ? 20 : -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
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
      <div className="w-full max-w-4xl mx-auto mb-8 md:mb-20">
        <AnimatedContent
           distance={50}
           direction="vertical"
           duration={0.8}
           // items-center центрирует блок, но мы переопределим это для текста ниже
           className={`flex flex-col items-center p-8 md:p-9 ${windowStyle}`}
        >
          {/* text-left: текст слева. w-full: чтобы занимал всю ширину контейнера */}
          <p className="font-cool text-lg md:text-2xl leading-relaxed text-left w-full mb-6">
            Complex hierarchy kills creativity. I offer a direct path from your vision
            to digital reality, cutting through the noise of unnecessary management.
            No committees, no waiting, no excuses.
          </p>
          
          {/* Слоган оставляем по центру для эффекта "печати" или подписи */}
          <span className="p-2 text-xl md:text-4xl font-bold uppercase bg-gradient-to-r from-[#d28f13] via-[#f2ecec] to-[#1c9e45] bg-clip-text text-transparent text-center">
              One man - one decision.
          </span>
        </AnimatedContent>
      </div>

      {/* === НИЖНЯЯ ЧАСТЬ: АСИММЕТРИЧНАЯ СЕТКА === */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[600px]">
        
        {/* === ЛЕВАЯ КОЛОНКА (ЧАТ + КНОПКА) === */}
        {/* Теперь идет первой в потоке (order-1) и занимает 1 часть ширины */}
        <div className="order-1 lg:col-span-1 flex flex-col gap-6 h-full">
            
            {/* 1. ЧАТ */}
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

            {/* 2. FULL STACK + КНОПКА */}
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
                      href="/contact"
                      scroll={true} 
                      className="group/btn inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium uppercase tracking-wider"
                    >
                      Contact now
                    </Link>
                </div>
            </AnimatedContent>

        </div>

        {/* === ПРАВАЯ КОЛОНКА (CARDSWAP) === */}
        <AnimatedContent
            distance={150}
            direction="horizontal"
            reverse={true} 
            duration={1}
            className="order-2 lg:col-span-2 relative h-[500px] lg:h-full w-full !overflow-visible flex items-center justify-center"
        >
             <div className="w-full h-full relative z-20">
               <CardSwap 
                 width="100%" 
                 height="100%" 
                 cardDistance={70}       
                 verticalDistance={80}   
                 delay={6500}            
                 pauseOnHover={false}     
                 skewAmount={4}
               >
                  {/* КАРТОЧКА 1: FINANCE APP */}
                  <Card 
                    // ВОТ ЭТО "ЗАКЛИНАНИЕ" ИСПРАВЛЯЕТ МЕРЦАНИЕ УГЛОВ:
                    style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
                    customClass="border border-white/10 !w-[700px] !h-[600px] overflow-hidden group cursor-pointer rounded-xl"
                  >
                      <a 
                        href="https://daerdree.bar" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full h-full relative"
                      >
                          {/* Добавил 'transform-gpu' и 'will-change-transform' для плавности */}
                          <img 
                            src="/daerdree.bar_en.png" 
                            alt="Finance Project" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform"
                          />
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                              <div className="flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-3 rounded-full text-white">
                                  <span className="text-sm font-bold uppercase tracking-widest">Visit Site</span>
                                  <ExternalLink className="w-4 h-4" />
                              </div>
                          </div>
                      </a>
                  </Card>

                  {/* КАРТОЧКА 2: E-COMMERCE */}
                  <Card 
                    style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
                    customClass="border border-white/10 !w-[700px] !h-[600px] overflow-hidden group cursor-pointer rounded-xl"
                  >
                       <a 
                        href="https://careyour.pet" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full h-full relative"
                      >
                           <img 
                            src="/careyour.pet_en.png" 
                            alt="AI Dashboard" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform"
                          />
                          <div className="w-full h-full bg-gradient-to-br from-yellow-600 to-red-900 group-hover:scale-110 transition-transform duration-700 transform-gpu will-change-transform" />
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                              <div className="flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-3 rounded-full text-white">
                                  <span className="text-sm font-bold uppercase tracking-widest">Visit Site</span>
                                  <ExternalLink className="w-4 h-4" />
                              </div>
                          </div>
                      </a>
                  </Card>

                  {/* КАРТОЧКА 3: AI DASHBOARD */}
                  <Card 
                    style={{ WebkitMaskImage: "-webkit-radial-gradient(white, black)" }}
                    customClass="border border-white/10 !w-[700px] !h-[600px] overflow-hidden group cursor-pointer rounded-xl"
                  >
                       <a 
                        href="http://http://92.113.146.158/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full h-full relative"
                      >
                          <img 
                            src="/92.113.146.158.png" 
                            alt="AI Dashboard" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform"
                          />
                          
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                              <div className="flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-3 rounded-full text-white">
                                  <span className="text-sm font-bold uppercase tracking-widest">Visit Site</span>
                                  <ExternalLink className="w-4 h-4" />
                              </div>
                          </div>
                      </a>
                  </Card>
               </CardSwap>
            </div>
        </AnimatedContent>

      </div>

    
    </section>
  );
}