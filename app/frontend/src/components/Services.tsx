import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  Globe,
  Database,
  Cloud,
  Shield,
  Palette,
  Headphones,
} from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";

const Services = () => {
  const { language } = useLanguage();

  const services = [
    {
      icon: Globe,
      title: language === "fr" ? "Développement Web" : "Web Development",
      description: language === "fr"
        ? "Sites vitrines, plateformes e-commerce et applications web modernes, performantes et responsives."
        : "Showcase sites, e-commerce platforms and modern, high-performance and responsive web applications.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: language === "fr" ? "Applications Mobiles" : "Mobile Applications",
      description: language === "fr"
        ? "Apps iOS et Android natives ou cross-platform (React Native, Flutter) conçues pour l'excellence."
        : "Native or cross-platform iOS and Android apps (React Native, Flutter) designed for excellence.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Code,
      title: language === "fr" ? "Logiciels sur mesure" : "Custom Software",
      description: language === "fr"
        ? "Solutions métiers personnalisées pour digitaliser et optimiser vos processus internes."
        : "Custom business solutions to digitize and optimize your internal processes.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Database,
      title: language === "fr" ? "Bases de données" : "Databases",
      description: language === "fr"
        ? "Conception, modélisation et optimisation de bases de données fiables et scalables."
        : "Design, modeling and optimization of reliable and scalable databases.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Cloud,
      title: language === "fr" ? "Cloud & DevOps" : "Cloud & DevOps",
      description: language === "fr"
        ? "Déploiement cloud (AWS, GCP, Azure), CI/CD et infrastructure moderne pour vos applications."
        : "Cloud deployment (AWS, GCP, Azure), CI/CD and modern infrastructure for your applications.",
      color: "from-sky-500 to-indigo-500",
    },
    {
      icon: Shield,
      title: language === "fr" ? "Sécurité & Audit" : "Security & Audit",
      description: language === "fr"
        ? "Audit de sécurité, protection des données et mise en conformité pour vos systèmes."
        : "Security audits, data protection and compliance for your systems.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Palette,
      title: language === "fr" ? "UI/UX Design" : "UI/UX Design",
      description: language === "fr"
        ? "Interfaces utilisateur élégantes et expériences engageantes pensées pour vos utilisateurs."
        : "Elegant user interfaces and engaging experiences designed for your users.",
      color: "from-fuchsia-500 to-purple-500",
    },
    {
      icon: Headphones,
      title: language === "fr" ? "Support & Maintenance" : "Support & Maintenance",
      description: language === "fr"
        ? "Accompagnement continu, maintenance évolutive et support technique pour vos solutions."
        : "Continuous support, evolutionary maintenance and technical assistance for your solutions.",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const badge = language === "fr" ? "Nos Services" : "Our Services";
  const title1 = language === "fr" ? "Des solutions complètes pour votre" : "Complete solutions for your";
  const titleHighlight = language === "fr" ? "réussite digitale" : "digital success";
  const description = language === "fr"
    ? "De l'idée à la mise en production, nous vous accompagnons à chaque étape avec expertise, créativité et engagement."
    : "From idea to production, we support you at every step with expertise, creativity and commitment.";

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-[#0066FF] text-sm font-medium mb-4">
            {badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-6">
            {title1}{" "}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            {description}
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={index} animation="fade-up">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:border-transparent transition-all duration-300 h-full overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`}
                  />
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0E27] mb-2 relative z-10">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed relative z-10">
                    {service.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;
