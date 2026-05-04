import { motion } from "framer-motion";
import { Target, Heart, Award, Zap } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";

const technologies = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Laravel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

const About = () => {
  const { language } = useLanguage();

  const values = [
    {
      icon: Target,
      title: language === "fr" ? "Notre Mission" : "Our Mission",
      description: language === "fr"
        ? "Accompagner les entreprises dans leur transformation numérique en livrant des solutions sur mesure, performantes et évolutives."
        : "Supporting businesses in their digital transformation by delivering tailor-made, high-performance and scalable solutions.",
    },
    {
      icon: Heart,
      title: language === "fr" ? "Nos Valeurs" : "Our Values",
      description: language === "fr"
        ? "Intégrité, innovation, excellence et engagement client. Nous cultivons des relations durables basées sur la confiance."
        : "Integrity, innovation, excellence and customer commitment. We cultivate lasting relationships based on trust.",
    },
    {
      icon: Award,
      title: language === "fr" ? "Notre Expertise" : "Our Expertise",
      description: language === "fr"
        ? "Une équipe passionnée maîtrisant les technologies modernes pour garantir la qualité et la pertinence de chaque projet."
        : "A passionate team mastering modern technologies to guarantee the quality and relevance of every project.",
    },
  ];

  const badge = language === "fr" ? "À propos de nous" : "About us";
  const title = language === "fr" ? "Qui sommes-nous ?" : "Who are we?";
  const p1 = language === "fr"
    ? (
        <>
          <strong className="text-[#0A0E27]">Proxiatech</strong> est une société de développement informatique dédiée à la création de solutions digitales innovantes. Depuis notre création, nous mettons notre expertise technique au service des entreprises qui souhaitent accélérer leur transformation numérique.
        </>
      )
    : (
        <>
          <strong className="text-[#0A0E27]">Proxiatech</strong> is a software development company dedicated to creating innovative digital solutions. Since our founding, we have put our technical expertise at the service of companies looking to accelerate their digital transformation.
        </>
      );
  const p2 = language === "fr"
    ? "Notre approche combine rigueur technique, créativité et écoute client pour livrer des projets qui font réellement la différence. Chaque solution que nous développons est pensée pour être robuste, évolutive et parfaitement alignée avec vos objectifs business."
    : "Our approach combines technical rigor, creativity and active listening to deliver projects that truly make a difference. Every solution we develop is designed to be robust, scalable and perfectly aligned with your business objectives.";

  const agilityLabel = language === "fr" ? "Agilité" : "Agility";
  const agilityDesc = language === "fr" ? "Méthodologie flexible" : "Flexible methodology";
  const qualityLabel = language === "fr" ? "Qualité" : "Quality";
  const qualityDesc = language === "fr" ? "Code premium" : "Premium code";
  const techTitle = language === "fr" ? "Technologies maîtrisées" : "Technologies we master";
  const techDesc = language === "fr"
    ? "Nous utilisons un écosystème technologique moderne et éprouvé pour livrer des solutions robustes."
    : "We use a modern and proven technology ecosystem to deliver robust solutions.";

  return (
    <section id="apropos" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <AnimatedSection animation="slide-right">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-[#0066FF] text-sm font-medium mb-4">
              {badge}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] mb-6">
              {title}
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              {p1}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {p2}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.05, x: 4 }}
                className="flex items-start gap-3"
              >
                <Zap className="w-6 h-6 text-[#0066FF] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#0A0E27]">{agilityLabel}</div>
                  <div className="text-sm text-slate-600">{agilityDesc}</div>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, x: 4 }}
                className="flex items-start gap-3"
              >
                <Award className="w-6 h-6 text-[#0066FF] flex-shrink-0 mt-1" />
                <div>
                  <div className="font-semibold text-[#0A0E27]">{qualityLabel}</div>
                  <div className="text-sm text-slate-600">{qualityDesc}</div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <StaggerItem key={index} animation="slide-left">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#0A0E27] mb-2">
                          {value.title}
                        </h3>
                        <p className="text-slate-600">{value.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>

        <AnimatedSection animation="fade-up" className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-[#0A0E27] mb-3">
            {techTitle}
          </h3>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto">
            {techDesc}
          </p>
        </AnimatedSection>

        <StaggerContainer
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 max-w-5xl mx-auto"
          staggerDelay={0.04}
        >
          {technologies.map((tech) => (
            <StaggerItem key={tech.name} animation="scale">
              <motion.div
                whileHover={{ y: -6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="group flex flex-col items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-xl hover:border-[#0066FF] hover:shadow-lg transition-all cursor-default"
                title={tech.name}
              >
                <img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
                <span className="text-xs font-medium text-slate-700 text-center">
                  {tech.name}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default About;