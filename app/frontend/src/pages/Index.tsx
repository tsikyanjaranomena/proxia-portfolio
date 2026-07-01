import Header from "@/components/Header";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingScreen from "@/components/LoadingScreen";
import SectionTransition from "@/components/SectionTransition";

const Index = () => {
  return (
    <>
      <CustomCursor />
      <LoadingScreen />
      <div className="min-h-screen bg-white dark:bg-black relative overflow-x-hidden transition-colors duration-500">
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Fond SVG — noir en light, blanc en dark via invert */}
          <img
            src="/images/fond.svg"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.045] dark:invert dark:opacity-[0.055] transition-opacity duration-500"
          />
          {/* Accents bleus conservés */}
          <div className="absolute top-[8%] -left-24 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-[#0066FF]/6 to-transparent blur-2xl" />
          <div className="absolute top-[65%] -right-24 w-[620px] h-[620px] rounded-full bg-gradient-to-br from-[#00D4FF]/5 to-transparent blur-2xl" />
        </div>

        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <SectionTransition>
              <Services />
            </SectionTransition>
            <Process />
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
