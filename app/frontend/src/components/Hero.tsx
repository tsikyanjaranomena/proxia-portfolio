import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle2, Play, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const DIGITALIZATION_IMAGE = "https://mgx-backend-cdn.metadl.com/generate/images/798409/2026-05-03/n2q7leqaafnq/digitalization-professional-white.png";

// Animated counter component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const { t, language } = useLanguage();

  const features = language === "fr"
    ? ["Livraison rapide", "Code premium", "Support 24/7"]
    : ["Fast delivery", "Premium code", "24/7 support"];

  const creationText = language === "fr" ? "Nous créons" : "We create";
  const excellenceText = language === "fr" ? "l'excellence" : "digital";
  const digitalText = language === "fr" ? "digitale" : "excellence";
  const heroSubtitle = language === "fr"
    ? (
        <>
          De l'idée au déploiement, <span className="text-[#0A0E27] font-semibold">Proxiatech</span> transforme vos ambitions en solutions digitales de haute performance. Web, mobile et logiciels sur mesure.
        </>
      )
    : (
        <>
          From idea to deployment, <span className="text-[#0A0E27] font-semibold">Proxiatech</span> transforms your ambitions into high-performance digital solutions. Web, mobile and custom software.
        </>
      );
  const seeWorkText = language === "fr" ? "Voir nos réalisations" : "See our work";
  const performanceLabel = language === "fr" ? "Performance" : "Performance";
  const networkLabel = language === "fr" ? "Réseau global" : "Global network";

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0A0E27] mb-6 leading-[1.05] tracking-tight"
            >
              {creationText}
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#0066FF] via-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {excellenceText}
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 1 }}
                />
              </span>
              <br />
              <span className="text-4xl md:text-5xl lg:text-6xl">{digitalText}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              {heroSubtitle}
            </motion.p>

            {/* Features list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {feature}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white hover:opacity-90 px-8 py-6 text-base shadow-xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all relative overflow-hidden group"
                >
                  <a href="#contact">
                    <span className="relative z-10 flex items-center">
                      {t.cta.startProject}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="!bg-transparent !hover:bg-transparent border-2 border-slate-300 text-[#0A0E27] hover:text-[#0066FF] hover:border-[#0066FF] px-8 py-6 text-base group"
                >
                  <a href="#portfolio">
                    <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                    {seeWorkText}
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
            >
              {[
                { value: 50, suffix: "+", label: t.hero.stats.projects },
                { value: 30, suffix: "+", label: t.hero.stats.clients },
                { value: 5, suffix: "+", label: t.hero.stats.experience },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="text-center lg:text-left cursor-default p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-slate-600 mt-1 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right column - Simple professional image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative max-w-md mx-auto">
              <img
                src={DIGITALIZATION_IMAGE}
                alt="Digital transformation"
                className="w-full h-auto object-contain select-none"
                draggable={false}
              />
            </div>

            {/* Floating badge - top right */}
            <div className="absolute top-4 -right-2 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{performanceLabel}</div>
                  <div className="text-lg font-bold text-[#0A0E27]">
                    <AnimatedCounter value={99} suffix="%" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge - bottom left */}
            <div className="absolute bottom-4 -left-2 bg-white rounded-2xl shadow-xl p-4 border border-slate-100 z-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{networkLabel}</div>
                  <div className="text-lg font-bold text-[#0A0E27]">24/7</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[#0066FF] rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;