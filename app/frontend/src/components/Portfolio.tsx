import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";

const Portfolio = () => {
  const { language } = useLanguage();

  const projects = [
    {
      title: language === "fr" ? "Plateforme E-commerce" : "E-commerce Platform",
      category: language === "fr" ? "Développement Web" : "Web Development",
      description: language === "fr"
        ? "Marketplace multi-vendeurs avec paiement intégré, gestion de stock en temps réel et tableau de bord analytique."
        : "Multi-vendor marketplace with integrated payment, real-time inventory management and analytics dashboard.",
      tags: ["React", "Node.js", "PostgreSQL"],
      gradient: "from-blue-500 via-cyan-500 to-teal-400",
    },
    {
      title: language === "fr" ? "Application Mobile Bancaire" : "Mobile Banking App",
      category: language === "fr" ? "Développement Mobile" : "Mobile Development",
      description: language === "fr"
        ? "Application de gestion financière avec authentification biométrique et transactions sécurisées."
        : "Financial management app with biometric authentication and secure transactions.",
      tags: ["Flutter", "Firebase", "REST API"],
      gradient: "from-purple-500 via-pink-500 to-red-400",
    },
    {
      title: language === "fr" ? "ERP Sur Mesure" : "Custom ERP",
      category: language === "fr" ? "Solution Logicielle" : "Software Solution",
      description: language === "fr"
        ? "Système de gestion intégré pour PME couvrant RH, comptabilité, stock et relations clients."
        : "Integrated management system for SMEs covering HR, accounting, inventory and customer relations.",
      tags: ["Django", "Vue.js", "PostgreSQL"],
      gradient: "from-orange-500 via-amber-500 to-yellow-400",
    },
    {
      title: language === "fr" ? "Site Institutionnel" : "Corporate Website",
      category: language === "fr" ? "Développement Web" : "Web Development",
      description: language === "fr"
        ? "Site vitrine moderne avec CMS personnalisé pour un cabinet de conseil international."
        : "Modern showcase website with custom CMS for an international consulting firm.",
      tags: ["Next.js", "Sanity", "Tailwind"],
      gradient: "from-emerald-500 via-green-500 to-lime-400",
    },
    {
      title: language === "fr" ? "Dashboard Analytics" : "Analytics Dashboard",
      category: language === "fr" ? "Solution Logicielle" : "Software Solution",
      description: language === "fr"
        ? "Tableau de bord interactif pour visualisation de données en temps réel avec exports personnalisés."
        : "Interactive dashboard for real-time data visualization with customized exports.",
      tags: ["React", "D3.js", "Python"],
      gradient: "from-indigo-500 via-blue-500 to-cyan-400",
    },
    {
      title: language === "fr" ? "Application IoT" : "IoT Application",
      category: language === "fr" ? "Conseil IT" : "IT Consulting",
      description: language === "fr"
        ? "Solution de surveillance à distance pour équipements industriels connectés avec alertes automatisées."
        : "Remote monitoring solution for connected industrial equipment with automated alerts.",
      tags: ["Node.js", "MQTT", "React"],
      gradient: "from-rose-500 via-pink-500 to-fuchsia-400",
    },
  ];

  const badge = language === "fr" ? "Nos Réalisations" : "Our Work";
  const title1 = language === "fr" ? "Un savoir-faire" : "Proven";
  const titleHighlight = language === "fr" ? "éprouvé" : "expertise";
  const description = language === "fr"
    ? "Découvrez quelques projets qui illustrent notre expertise et notre engagement à livrer des solutions de qualité."
    : "Discover some projects that illustrate our expertise and our commitment to delivering quality solutions.";

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-[#0066FF] text-sm font-medium mb-4">
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-4">
            {title1}{" "}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            {description}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index} animation="fade-up">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-shadow duration-300 h-full"
              >
                <div
                  className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-black/10"
                    whileHover={{ opacity: 0 }}
                  />
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                  <motion.div
                    className="absolute -right-10 -top-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/25 backdrop-blur-md rounded-full text-white text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                  <ExternalLink className="absolute top-4 right-4 w-5 h-5 text-white/80 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0A0E27] mb-3 group-hover:text-[#0066FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium hover:bg-blue-50 hover:text-[#0066FF] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
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

export default Portfolio;
