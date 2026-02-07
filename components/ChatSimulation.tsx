"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const allMessages = [
  { id: 1, user: "Alex", text: "Дизайн главной утвердили?", time: "10:23", align: "left", avatar: "/logo2.png" },
  { id: 2, user: "Maria", text: "Да, клиенту понравилось 🔥", time: "10:24", align: "right", avatar: "/logo4.png" },
  
  // ГРУППА СООБЩЕНИЙ ОТ АЛЕКСА
  { id: 3, user: "Alex", text: "Супер! Начинаю верстку.", time: "10:25", align: "left", avatar: "/logo2.png" },
  { id: 4, user: "Alex", text: "Думаю, к вечеру будет готово.", time: "10:25", align: "left", avatar: "/logo2.png", hideAvatar: true },
  { id: 5, user: "Alex", text: "Скину ссылку в этот чат.", time: "10:26", align: "left", avatar: "/logo2.png", hideAvatar: true },
];

export default function ChatSimulation() {
  const [displayedMessages, setDisplayedMessages] = useState<typeof allMessages>([]);
  
  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const showNextMessage = () => {
      const nextMsg = allMessages[currentIndex];

      if (nextMsg) {
        setDisplayedMessages((prev) => [...prev, nextMsg]);
        currentIndex++;
        const delay = nextMsg.hideAvatar ? 800 : 1500;
        timeoutId = setTimeout(showNextMessage, delay); 
      } else {
        timeoutId = setTimeout(() => {
          setDisplayedMessages([]); 
          currentIndex = 0;
          timeoutId = setTimeout(showNextMessage, 500);
        }, 3000);
      }
    };

    timeoutId = setTimeout(showNextMessage, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full h-full bg-chart-1 p-4 md:p-6 flex flex-col relative overflow-hidden">
        
        {/* ЗАГОЛОВОК ЧАТА */}
        {/* absolute: теперь он парит сверху и не занимает места в потоке (нет невидимой стены) */}
        {/* z-10: текст поверх сообщений */}
        <div className="absolute top-4 md:top-6 left-0 w-full flex items-center justify-center z-10 pointer-events-none">
            <span className="text-[10px] md:text-xs font-bold text-black/85 uppercase tracking-widest text-center px-4 backdrop-blur-[2px] rounded-full py-1">
                Рабочая переписка, ничего необычного
            </span>
        </div>

        {/* СООБЩЕНИЯ */}
        {/* pt-12: отступ сверху, чтобы первые сообщения не прилипали сразу под заголовок, если чат полный */}
        <div className="flex-1 flex flex-col gap-2 overflow-hidden justify-end pb-2 md:pb-4 pt-12">
            <AnimatePresence mode="popLayout">
                {displayedMessages.map((msg) => {
                    if (!msg) return null;

                    const isRight = msg.align === "right";
                    const isCenter = msg.align === "center";

                    return (
                        <motion.div
                            key={`${msg.id}-${msg.time}`}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className={`flex w-full ${
                                isRight ? "justify-end" : isCenter ? "justify-center" : "justify-start"
                            }`}
                        >
                            <div className={`flex gap-2 md:gap-3 max-w-[95%] md:max-w-[90%] items-center ${isRight ? "flex-row-reverse" : "flex-row"}`}>
                                
                                {/* АВАТАРКА */}
                                {!isCenter && msg.avatar && (
                                    msg.hideAvatar ? (
                                        // Пустое место (уменьшил для моб: w-8 h-8)
                                        <div className="w-8 h-8 md:w-10 md:h-10 shrink-0" />
                                    ) : (
                                        // Аватарка (уменьшил для моб: w-8 h-8)
                                        <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-white/10 bg-white/5 shrink-0">
                                            <Image 
                                                src={msg.avatar} 
                                                alt={msg.user}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )
                                )}

                                {/* Пузырь сообщения */}
                                {isCenter ? (
                                    <div className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-wider my-2">
                                        {msg.text}
                                    </div>
                                ) : (
                                    <div className={`
                                        /* КОМПАКТНОСТЬ НА МОБИЛКАХ: */
                                        /* p-2 px-3 (было больше) */
                                        /* text-[11px] или text-xs */
                                        /* rounded-xl (чуть меньше радиус) */
                                        p-2 px-3 md:p-3 md:px-4 
                                        rounded-xl md:rounded-2xl 
                                        text-[13px] md:text-sm font-medium leading-relaxed shadow-sm relative
                                        
                                        ${isRight 
                                            ? "bg-black text-white border border-white/10 rounded-br-sm" 
                                            : "bg-white text-black border border-transparent rounded-bl-sm"}
                                    `}>
                                        {msg.text}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    </div>
  );
}