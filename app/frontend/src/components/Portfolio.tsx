import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import TiltCard from "./TiltCard";
import { useLanguage } from "@/hooks/useLanguage";

const Portfolio = () => {
  const { language } = useLanguage();

  const projects = [
    {
      title: language === "fr" ? "Gestion de Budget" : "Budget Management",
      category: language === "fr" ? "Développement Mobile" : "Mobile Development",
      description: language === "fr"
        ? "Application mobile de gestion de budget développée avec Flutter, livrée en APK avec suivi des dépenses et tableaux de bord clairs."
        : "Budget management mobile app built with Flutter, delivered as an APK with expense tracking and clear dashboards.",
      tags: ["Flutter", "Dart", "APK"],
      image: "/images/portfolio-mockups/budget-mobile-app.png",
      imageAlt: language === "fr" ? "Mockup d'une application mobile de budget" : "Budget mobile app mockup",
      overlay: "from-[#7c3aed]/20 via-[#0f172a]/12 to-transparent",
    },
    {
      title: language === "fr" ? "Gestion Ecole" : "School Management",
      category: language === "fr" ? "Solution Logicielle" : "Software Solution",
      description: language === "fr"
        ? "Plateforme de gestion scolaire pour les inscriptions, les notes, les présences et l'administration."
        : "School management platform for enrollments, grades, attendance and administration.",
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      image: "/images/portfolio-mockups/school-management.png",
      imageAlt: language === "fr" ? "Mockup d'une plateforme de gestion scolaire" : "School management platform mockup",
      overlay: "from-[#10b981]/18 via-[#0f172a]/10 to-transparent",
    },
    {
      title: language === "fr" ? "Site Vitrine Madalift" : "Madalift Showcase Website",
      category: language === "fr" ? "Développement Web" : "Web Development",
      description: language === "fr"
        ? "Site vitrine moderne pour Madalift, conçu pour valoriser leur image de marque avec une expérience utilisateur fluide et un design professionnel."
        : "Modern showcase website for Madalift, designed to strengthen their brand image with a smooth user experience and professional design.",
      tags: ["React", "Tailwind CSS", "Vite"],
      image: "/images/portfolio-mockups/madalift.png",
      imageAlt: language === "fr" ? "Mockup du site vitrine Madalift" : "Madalift showcase website mockup",
      overlay: "from-[#0066FF]/22 via-[#071a3d]/14 to-transparent",
    },
    {
      title: language === "fr" ? "Gestion Actes Notariaux" : "Notarial Acts Management",
      category: language === "fr" ? "Solution Logicielle" : "Software Solution",
      description: language === "fr"
        ? "Plateforme complète pour la Chambre Notariale de Madagascar : gestion des actes, des clients et identification biométrique intégrée."
        : "Complete platform for the Chamber of Notaries of Madagascar: notarial act management, client records and integrated biometric identification.",
      tags: ["Django", "React", "PostgreSQL", "Biométrie"],
      image: "/images/portfolio-mockups/notaire.png",
      imageAlt: language === "fr" ? "Mockup de la plateforme notariale" : "Notarial platform mockup",
      overlay: "from-[#1d4ed8]/22 via-[#0f172a]/14 to-transparent",
    },
  ];

  const badge = language === "fr" ? "Nos Réalisations" : "Our Work";
  const title1 = language === "fr" ? "Un savoir-faire" : "Proven";
  const titleHighlight = language === "fr" ? "éprouvé" : "expertise";
  const description = language === "fr"
    ? "Découvrez quelques projets qui illustrent notre expertise et notre engagement à livrer des solutions de qualité."
    : "Discover some projects that illustrate our expertise and our commitment to delivering quality solutions.";

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#0066FF] dark:text-[#60a5fa] text-sm font-medium mb-4">
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] dark:text-white mb-4">
            {title1}{" "}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index} animation="fade-up">
              <TiltCard className="h-full" intensity={6}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] shadow-[0_18px_50px_rgba(15,23,42,0.06)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-2xl"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.overlay}`} />
                  <div
                    className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                  <motion.div
                    className="absolute -right-10 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071a3d]/85 via-[#071a3d]/28 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded-full bg-white/18 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute right-4 top-4 rounded-full bg-black/20 p-2 backdrop-blur-md">
                    <ExternalLink className="h-4 w-4 text-white/90 opacity-80 transition-all group-hover:rotate-12 group-hover:opacity-100" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A0E27] dark:text-white mb-3 group-hover:text-[#0066FF] dark:group-hover:text-[#60a5fa] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-[#0066FF] dark:hover:text-[#60a5fa] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Portfolio;
