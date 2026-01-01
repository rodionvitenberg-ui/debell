"use client";

import { useState, useEffect } from "react"; 
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import StaggeredMenu from "./StaggeredMenu";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/#hero' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/#about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/#services' },
  { label: 'Contacts', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/rodionvitenberg-ui/' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/rodion-vitenberg-4200363a4/' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPossession, setIsPossession] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  
  const router = useRouter(); 
  const pathname = usePathname(); 
  const { scrollY } = useScroll();

  const isContactPage = pathname === '/contact';

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (typeof window !== "undefined") {
      const threshold = window.innerHeight * 1.1; 
      if (latest > threshold && !isPossession) {
        setIsPossession(true);
      } else if (latest <= threshold && isPossession) {
        setIsPossession(false);
      }
    }
  });

  useEffect(() => {
    if (isNavigating) {
        const timer = setTimeout(() => {
            setIsNavigating(false);
        }, 500); 
        return () => clearTimeout(timer);
    }
  }, [pathname]); 


  const toggleMenu = () => setIsOpen((prev) => !prev);
  const blurredClass = "blur-sm opacity-50 pointer-events-none";

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement> | null, href: string) => {
    if (e) e.preventDefault(); 

    const targetPath = href.includes('#') ? href.split('#')[0] || '/' : href;
    const isAnchorOnCurrentPage = href.includes('#') && (targetPath === pathname || (targetPath === '/' && pathname === '/'));

    if (isAnchorOnCurrentPage) {
      setIsOpen(false); 
      const targetId = href.split('#')[1];
      
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: `#${targetId}`, offsetY: 0 },
        ease: "power4.inOut"
      });

    } else {
      setIsNavigating(true); 

      setTimeout(() => {
        setIsOpen(false); 
        router.push(href);
      }, 600);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
        className="fixed top-0 left-0 z-[60] w-full flex items-center justify-between px-6 py-6 md:px-12 md:mix-blend-difference text-white pointer-events-none transform-gpu isolation-auto"
      >
        
        <Link 
          href="/#hero" 
          onClick={(e) => handleTransition(e, "/#hero")} 
          className={`hidden md:flex group pointer-events-auto items-center gap-2 transition-all duration-500 ${isOpen ? blurredClass : ''}`}
        >
          <div className="font-heading font-medium text-md tracking-widest uppercase flex overflow-hidden h-[1.2em]">
            <span className="mr-2">DIGITAL</span>
            <div className="relative flex flex-col">
              <AnimatePresence mode="wait">
                {isPossession ? (
                  <motion.span
                    key="possession"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="block text-accent"
                  >
                    POSSESSION
                  </motion.span>
                ) : (
                  <motion.span
                    key="depression"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="block"
                  >
                    DEPRESSION
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-1" />
        </Link>

        {/* === 2. MOBILE LEFT ELEMENT (Кнопка Let's Talk / Лого) === */}
        {isContactPage ? (
            <Link
                href="/"
                onClick={(e) => handleTransition(e, "/")}
                className={`md:hidden pointer-events-auto font-heading text-lg font-bold uppercase tracking-widest hover:text-white/80 transition-colors duration-300 ${isOpen ? blurredClass : ''}`}
            >
                DEBELL
            </Link>
        ) : (
            <Link
                href="/contact"
                onClick={(e) => handleTransition(e, "/contact")}
                // Добавил z-index и relative, чтобы быть уверенным в кликабельности
                className={`md:hidden pointer-events-auto relative z-[70] font-sans text-xs font-bold uppercase tracking-[0.2em] group transition-colors duration-300 ${isOpen ? blurredClass : ''}`}
            >
                Let's Talk
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
        )}

        {/* === DESKTOP NAV === */}
        <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
          <div className={`flex items-center gap-8 transition-all duration-500 ${isOpen ? blurredClass : ''}`}>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                onClick={(e) => handleTransition(e, item.link)}
                className="font-sans text-xs font-bold uppercase tracking-[0.2em] relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <button 
            onClick={toggleMenu} 
            className="flex flex-col gap-1.5 group pointer-events-auto cursor-pointer z-[70] ml-4"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-8 h-[2px] bg-white transition-colors duration-300" 
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-1/2 group-hover:self-end" 
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-8 h-[2px] bg-white transition-all duration-300 group-hover:w-full" 
            />
          </button>
        </nav>

        {/* === MOBILE BURGER === */}
        <div className="md:hidden pointer-events-auto">
             <button 
                onClick={toggleMenu} 
                // Добавил relative z-[70] для надежности
                className="relative z-[70] flex flex-col gap-1.5 group cursor-pointer"
            >
                <motion.span 
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-8 h-[2px] bg-white" 
                />
                <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-8 h-[2px] bg-white" 
                />
                <motion.span 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-8 h-[2px] bg-white" 
                />
            </button>
        </div>

      </motion.header>

      <StaggeredMenu 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onItemClick={(link) => handleTransition(null, link)}
        menuItems={menuItems}
        socialItems={socialItems}
        colors={['rgba(0, 0, 0, 0.7)']} 
      />
    </>
  );
}