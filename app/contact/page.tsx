"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, MessageCircle, Send, Mail } from "lucide-react";
import Link from "next/link";
// Header удален, так как он в Layout
import RevealCurtain from "@/components/RevealCurtain";
import ColorBends from "@/components/ColorBends";
import Aurora from "@/components/Aurora";
import Footer from "@/components/Footer";

export default function Contact() {
  
  const contacts = [
    {
      name: "WhatsApp",
      link: "https://wa.me/+996550418317", 
      icon: <MessageCircle className="w-6 h-6" />,
      description: "Direct Chat",
      color: "hover:bg-[#25D366] hover:text-black"
    },
    {
      name: "Telegram",
      link: "https://t.me/pwnedking", 
      icon: <Send className="w-6 h-6" />,
      description: "Instant Messaging",
      color: "hover:bg-[#229ED9] hover:text-white"
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/rodion-vitenberg-4200363a4/",
      icon: <Linkedin className="w-6 h-6" />,
      description: "Professional Profile",
      color: "hover:bg-[#0077B5] hover:text-white"
    },
    {
      name: "Email",
      link: "mailto:contact@debell.dev",
      icon: <Mail className="w-6 h-6" />,
      description: "Formal Inquiries",
      color: "hover:bg-accent hover:text-white"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="relative w-full min-h-screen text-foreground bg-black flex flex-col justify-between">
      
      {/* 2. ФОНОВЫЙ ЭФФЕКТ */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-40 pointer-events-none">
          <ColorBends
              colors={["#c7c4c4", "#e0e0e0", "#b3b3b3"]}
              overlayColor="var(--background)" 
              frequency={1}
              parallax={1}
              noise={0} 
          />
      </div>

      {/* 3. ЦЕНТРАЛЬНЫЙ КОНТЕНТ */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-4 py-24">
        
        {/* Стеклянная карточка */}
        <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-2xl">
            
            {/* Внутренняя Аврора */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <Aurora
                    colorStops={["#1d1d1d", "#212020", "#1f1f1f"]}
                    blend={0.5}
                    amplitude={0.8}
                    speed={0.4}
                />
            </div>

            <div className="relative z-10 p-8 md:p-12">
                
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-10 text-center"
                >
                    <span className="font-mono text-xs text-accent uppercase tracking-widest mb-3 block">
                        Comms Link
                    </span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mb-2">
                        Get in Touch
                    </h1>
                    <p className="text-white/50 text-sm md:text-base">
                        Select your preferred channel. I usually respond within 24h.
                    </p>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-4"
                >
                    {contacts.map((contact, idx) => (
                        <motion.div key={idx} variants={itemVariants}>
                            <Link 
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative flex items-center justify-between p-6 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 ${contact.color}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                        {contact.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-heading text-lg font-bold uppercase tracking-wide">
                                            {contact.name}
                                        </span>
                                        <span className="text-xs text-white/50 group-hover:text-white/80 font-mono">
                                            {contact.description}
                                        </span>
                                    </div>
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </div>
      </div>

      {/* 4. ФУТЕР */}
      <Footer />

    </main>
  );
}