"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import AboutTeam from "@/components/AboutTeam";
import Portfolio from "@/components/Portfolio";
import OurMission from "@/components/OurMission";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import RevealCurtain from "@/components/RevealCurtain";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // УБРАЛ overflow-x-hidden, чтобы заработал sticky в Services
    <main className="relative w-full min-h-screen text-foreground bg-secondary">
      
      {/* 1. ШТОРКА */}
      <RevealCurtain />

      {/* 2. ФОН */}
      <div className="fixed inset-0 w-full h-full z-0 bg-secondary pointer-events-none" />

      {/* 3. КОНТЕНТ */}
      <div className="relative z-10 flex flex-col">
          
          <div id="hero">
            <Hero />  
          </div>
          
          <div className="relative">
            <div id="about" className="absolute top-0 md:-top-10 left-0 w-full h-1" />
            <About /> 
          </div>

          <div className="relative">
            <AboutTeam /> 
          </div>
          
          <div className="relative">
            <div id="portfolio" className="absolute top-0 md:-top-10 left-0 w-full h-1" />
            <Portfolio /> 
          </div>

          <div className="relative">
            <div id="mission" className="absolute top-0 md:-top-10 left-0 w-full h-1" />
            <OurMission /> 
          </div>
          
          {/* СЕКЦИЯ УСЛУГ */}
          <div className="relative">
             <div id="services" className="absolute top-0 md:-top-5 left-0 w-full h-1" />
             <Services />
          </div>

          <div className="relative">
             <div id="FAQ" className="absolute top-0 md:-top-5 left-0 w-full h-1" />
             <FAQ />
          </div>

          <div className="relative">
             <div id="ContactSection" className="absolute top-0 md:-top-5 left-0 w-full h-1" />
             <ContactSection />
          </div>
          
      </div>

    </main>
  );
}