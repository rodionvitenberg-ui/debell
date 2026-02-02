"use client";

import { useState, useEffect } from "react"; 
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import StaggeredMenu from "./StaggeredMenu";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const menuItems = [
  { label: 'Главная', ariaLabel: 'Go to home page', link: '/#hero' },
  { label: 'О нас', ariaLabel: 'Learn about us', link: '/#about' },
  { label: 'Услуги', ariaLabel: 'View our services', link: '/#services' },
  { label: 'Контакты', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/rodionvitenberg-ui/' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/rodion-vitenberg-4200363a4/' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  const router = useRouter(); 
  const pathname = usePathname(); 
  const { scrollY } = useScroll();

  const isContactPage = pathname === '/contact';

  useMotionValueEvent(scrollY, "change", (latest) => {
      const previous = scrollY.getPrevious() ?? 0;
      if (latest > previous && latest > 150) {
          setHidden(true);
      } else {
          setHidden(false);
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
            className="fixed inset-0 z-[100] bg-secondary pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" }}}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 z-[60] w-full flex items-center justify-between px-6 py-2 md:px-12 bg-accent-foreground/95 pointer-events-auto shadow-sm transform-gpu isolation-auto"
      >
        
        {/* === LOGO (DESKTOP) === */}
        <Link 
          href="/#hero" 
          onClick={(e) => handleTransition(e, "/#hero")} 
          className={`hidden md:flex group items-center gap-2 transition-all duration-500 ${isOpen ? blurredClass : ''}`}
        >
          <div className="relative w-48 h-14">
             <Image 
               src="/logo.png" 
               alt="IKSoft Logo" 
               fill
               className="object-contain object-left scale-170 origin-left"
               priority
               sizes="1000px"
               unoptimized
             />
          </div>
        </Link>

        {/* === MOBILE LEFT ELEMENT === */}
        {/* Здесь теперь ЛОГОТИП вместо текста Let's Talk */}
        <Link
             href={isContactPage ? "/" : "/contact"}
             onClick={(e) => handleTransition(e, isContactPage ? "/" : "/contact")}
             className={`md:hidden relative z-[70] transition-all duration-300 ${isOpen ? blurredClass : ''}`}
        >
            <div className="relative w-32 h-12">
                <Image 
                    src="/logo.png" 
                    alt="IKSoft" 
                    fill
                    className="object-contain object-left scale-140"
                    priority
                    quality={100}
                />
            </div>
        </Link>

        {/* === NAV (DESKTOP) === */}
        <nav className="hidden md:flex items-center gap-8">
          <div className={`flex items-center gap-8 transition-all duration-500 ${isOpen ? blurredClass : ''}`}>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.link}
                onClick={(e) => handleTransition(e, item.link)}
                className="font-sans text-xs font-bold uppercase tracking-[0.2em] relative group text-white transition-colors duration-300"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <button 
            onClick={toggleMenu} 
            className="flex flex-col gap-1.5 group cursor-pointer z-[70] ml-4"
            aria-label="Toggle Menu"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-8 h-[2px] bg-accent transition-colors duration-300" 
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-8 h-[2px] bg-accent transition-all duration-300 group-hover:w-1/2 group-hover:self-end" 
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-8 h-[2px] bg-accent  transition-all duration-300 group-hover:w-full" 
            />
          </button>
        </nav>

        {/* === MOBILE BURGER === */}
        <div className="md:hidden">
             <button 
                onClick={toggleMenu} 
                className="relative z-[70] flex flex-col gap-1.5 group cursor-pointer"
            >
                <motion.span 
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-8 h-[2px] bg-accent" 
                />
                <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-8 h-[2px] bg-accent" 
                />
                <motion.span 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-8 h-[2px] bg-accent" 
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
        // Передаем цвет, хотя лучше задать классом внутри самого компонента
        colors={['#171717']}
        logoUrl="/logo.png" 
      />
    </>
  );
}