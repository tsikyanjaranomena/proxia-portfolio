import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";

const Testimonials = () => {
  const { language } = useLanguage();

  const testimonials = [
    {
      name: "Rakoto A.",
      role: language === "fr" ? "Directeur Général, Société Madagascar Trade" : "CEO, Madagascar Trade Company",
      content: language === "fr"
        ? "ProxiaTech a transformé notre vision en une plateforme e-commerce performante. Leur professionnalisme et leur réactivité sont remarquables."
        : "ProxiaTech transformed our vision into a high-performing e-commerce platform. Their professionalism and responsiveness are remarkable.",
      rating: 5,
      initials: "RA",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Marie Randria",
      role: language === "fr" ? "Fondatrice, StartupTech Océan Indien" : "Founder, StartupTech Indian Ocean",
      content: language === "fr"
        ? "Une équipe à l'écoute qui comprend vraiment nos besoins. Le résultat a dépassé nos attentes, tant sur le plan technique qu'esthétique."
        : "A team that listens and truly understands our needs. The result exceeded our expectations, both technically and aesthetically.",
      rating: 5,
      initials: "MR",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Jean-Pierre H.",
      role: language === "fr" ? "CTO, FinTech Solutions" : "CTO, FinTech Solutions",
      content: language === "fr"
        ? "Excellente maîtrise technique et respect des délais. ProxiaTech est devenu notre partenaire de confiance pour tous nos projets digitaux."
        : "Excellent technical mastery and respect for deadlines. ProxiaTech has become our trusted partner for all our digital projects.",
      rating: 5,
      initials: "JH",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Madalift",
      role: language === "fr" ? "Client, Madalift" : "Client, Madalift",
      content: language === "fr"
        ? "ProxiaTech a réalisé notre site vitrine avec un résultat professionnel et soigné. Livraison rapide et équipe très à l'écoute de nos besoins."
        : "ProxiaTech delivered our showcase website with a professional and polished result. Fast delivery and a team that truly listened to our needs.",
      rating: 5,
      initials: "ML",
      color: "from-teal-500 to-cyan-500",
    },
    {
      name: "Chambre Notariale",
      role: language === "fr" ? "Client, Chambre Notariale de Madagascar" : "Client, Chamber of Notaries of Madagascar",
      content: language === "fr"
        ? "Une solution complète et innovante pour la gestion de nos actes et l'identification biométrique de nos clients. ProxiaTech a su répondre à nos exigences métier."
        : "A complete and innovative solution for managing our notarial acts and biometric client identification. ProxiaTech met all our professional requirements.",
      rating: 5,
      initials: "CN",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const badge = language === "fr" ? "Témoignages" : "Testimonials";
  const title1 = language === "fr" ? "Ils nous font" : "They trust";
  const titleHighlight = language === "fr" ? "confiance" : "us";
  const description = language === "fr"
    ? "La satisfaction de nos clients est notre meilleure récompense."
    : "Our clients' satisfaction is our greatest reward.";

  return (
    <section id="temoignages" className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-[#0066FF] rounded-full dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20"
          animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-[#00D4FF] rounded-full dark:mix-blend-screen filter blur-3xl opacity-5 dark:opacity-10"
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[#0066FF]/10 dark:bg-white/10 text-[#0066FF] dark:text-[#00D4FF] text-sm font-medium mb-4 backdrop-blur-sm border border-[#0066FF]/20 dark:border-white/10">
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#071a3d] dark:text-white mb-4">
            {title1}{" "}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-white/70">
            {description}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index} animation="fade-up">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-200 dark:border-white/10 rounded-2xl p-8 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-[#0066FF]/40 dark:hover:border-[#0066FF]/50 transition-colors duration-300 relative h-full shadow-sm dark:shadow-none"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-[#0066FF]/30" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i + 0.2 }}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-slate-700 dark:text-white/80 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold shadow-lg`}
                  >
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-[#071a3d] dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Testimonials;
