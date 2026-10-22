import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GradientDefs from "@/components/brand/GradientDefs";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Contact from "@/components/sections/contact/Contact";
import Hero from "@/components/sections/hero/Hero";
import Method from "@/components/sections/method/Method";
import Portfolio from "@/components/sections/Portfolio";
import Services from "@/components/sections/Services";
import Technologies from "@/components/sections/Technologies";
import Testimonials from "@/components/sections/Testimonials";
import { scrollToSection } from "@/hooks/useActiveSection";

const Index = () => {
  const { hash } = useLocation();

  // Arrivée depuis une autre page sur une ancre (/#services…) : défilement vers la section
  useEffect(() => {
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash.slice(1)), 350);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <MotionConfig reducedMotion="user">
      <GradientDefs />
      <div className="relative min-h-screen overflow-clip bg-surface">
        <Header />
        <main>
          <Hero />
          <Services />
          <Method />
          <About />
          <Technologies />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default Index;
