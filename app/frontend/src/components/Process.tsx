import { Search, Palette, Code2, Rocket } from "lucide-react";
import AnimatedSection, { StaggerContainer, StaggerItem } from "./AnimatedSection";
import TiltCard from "./TiltCard";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Découverte",
    description:
      "On analyse vos besoins, votre marché et vos objectifs en profondeur. Zéro supposition — on pose les bonnes questions pour poser des fondations solides.",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(0,102,255,0.25)",
  },
  {
    number: "02",
    icon: Palette,
    title: "Conception",
    description:
      "Maquettes, architecture technique et prototype validés avec vous avant d'écrire la première ligne de code. Vous savez exactement ce que vous allez obtenir.",
    color: "from-purple-500 to-pink-500",
    glow: "rgba(168,85,247,0.25)",
  },
  {
    number: "03",
    icon: Code2,
    title: "Développement",
    description:
      "Sprints agiles, code premium, tests rigoureux. Vous suivez l'avancement en temps réel et validez chaque étape. Pas de mauvaises surprises.",
    color: "from-orange-500 to-red-500",
    glow: "rgba(249,115,22,0.25)",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Livraison",
    description:
      "Déploiement, formation et accompagnement post-lancement. On ne disparaît pas après la mise en ligne — on reste partenaires de votre croissance.",
    color: "from-green-500 to-emerald-500",
    glow: "rgba(16,185,129,0.25)",
  },
];

const Process = () => {
  return (
    <section className="py-24 bg-white dark:bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-[#0066FF]/10 dark:bg-white/10 text-[#0066FF] dark:text-[#00D4FF] text-sm font-medium mb-4 backdrop-blur-sm border border-[#0066FF]/20 dark:border-white/10">
            Notre méthode
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#071a3d] dark:text-white mb-4">
            Comment on{" "}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
              travaille
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-white/70">
            Un processus clair, transparent et collaboratif. Vous savez toujours où en est votre projet.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Ligne connectrice — desktop uniquement */}
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/15 to-transparent hidden lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={index} animation="fade-up">
                <TiltCard className="h-full" intensity={8}>
                  <div
                    className="relative h-full rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-sm p-6 hover:bg-slate-50 dark:hover:bg-white/8 hover:border-slate-300 dark:hover:border-white/20 transition-colors duration-300 group shadow-sm dark:shadow-none"
                    style={{
                      boxShadow: `0 0 0 0 ${step.glow}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${step.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 0 ${step.glow}`;
                    }}
                  >
                    {/* Numéro de l'étape */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#071a3d] dark:bg-black border border-slate-300 dark:border-white/15 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white/70 dark:text-white/50">{step.number}</span>
                    </div>

                    {/* Icône */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-[#071a3d] dark:text-white mb-3">{step.title}</h3>
                    <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">{step.description}</p>

                    {/* Flèche vers l'étape suivante */}
                    {index < steps.length - 1 && (
                      <div className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/20 items-center justify-center hidden lg:flex">
                        <span className="text-slate-400 dark:text-white/50 text-xs">→</span>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Citation de confiance */}
        <AnimatedSection animation="fade-up" className="mt-14 text-center">
          <p className="text-slate-400 dark:text-white/40 text-sm">
            ⚡ Délai de réponse moyen :{" "}
            <span className="text-slate-700 dark:text-white/70 font-semibold">moins de 24h</span>
            {" · "}
            Premier échange{" "}
            <span className="text-slate-700 dark:text-white/70 font-semibold">100% gratuit</span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Process;
