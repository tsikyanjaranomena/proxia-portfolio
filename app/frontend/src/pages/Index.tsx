import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";
import SectionTransition from "@/components/SectionTransition";
import { ParallaxBackground } from "@/components/ParallaxSection";

const Index = () => {
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-white dark:bg-[#0A0E27] relative overflow-x-hidden transition-colors duration-500">
        <ParallaxBackground speed={0.4} className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#0066FF]/8 to-transparent blur-3xl" />
          <div className="absolute top-[60%] -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#00D4FF]/8 to-transparent blur-3xl" />
          <div className="absolute top-[120%] left-1/3 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#0066FF]/6 to-[#00D4FF]/6 blur-3xl" />
          <div className="absolute top-[180%] -left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#00D4FF]/8 to-transparent blur-3xl" />
        </ParallaxBackground>

        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <SectionTransition>
              <Services />
            </SectionTransition>
            <SectionTransition>
              <About />
            </SectionTransition>
            <SectionTransition>
              <Portfolio />
            </SectionTransition>
            <SectionTransition>
              <Testimonials />
            </SectionTransition>
            <SectionTransition>
              <Contact />
            </SectionTransition>
          </main>
          <Footer />
          <ScrollToTop />
        </div>
      </div>
    </>
  );
};

export default Index;
