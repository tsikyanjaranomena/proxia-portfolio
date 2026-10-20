import { BRAND_STROKE } from "@/components/brand/GradientDefs";
import SectionBackground from "@/components/brand/SectionBackground";
import SectionIntro from "@/components/common/SectionIntro";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { DESKTOP_BACKGROUNDS } from "@/data/backgrounds";
import { PROJECT_PATH, SECTION_IDS, SERVICES } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id={SECTION_IDS.services} className="relative overflow-x-clip py-24 lg:pb-32 lg:pt-[150px]">
      <SectionBackground desktop={DESKTOP_BACKGROUNDS.services} />
      <div className="container relative">
        <SectionIntro
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
          cta={{ label: t.services.cta, to: PROJECT_PATH }}
          layout="title-start"
          tone="body"
        />

        <RevealGroup
          stagger={0.09}
          className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-[190px] lg:gap-y-[62px] lg:px-3"
        >
          {SERVICES.map(({ id, icon: Icon, tilt }) => {
            const item = t.services.items[id];
            return (
              <RevealItem key={id}>
                <article className="group relative overflow-hidden pb-14 lg:pb-[60px]">
                  {/* Titre au-dessus du texte (mobile / tablette), côte à côte en desktop */}
                  <div className="relative z-10 grid gap-5 lg:grid-cols-[130px_1fr] lg:gap-3 lg:gap-x-7">
                    {/* Titre sur deux lignes comme la maquette (« Développement / Web ») */}
                    <h3 className="type-subtitle max-w-[140px] text-brand">{item.title}</h3>
                    <p className="type-text text-pretty text-body sm:max-w-[300px] lg:max-w-[400px]">{item.description}</p>
                  </div>

                  {/* Grande icône décorative inclinée (comme Figma), coupée par le trait du bas */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[118px] right-0"
                    style={{ transform: `rotate(${tilt}deg)` }}
                  >
                    <Icon
                      size={210}
                      strokeWidth={14}
                      stroke={BRAND_STROKE}
                      className="text-brand-sky opacity-[0.06] transition-all duration-700 ease-out-expo group-hover:-translate-y-3 group-hover:opacity-[0.16] dark:opacity-[0.12]"
                    />
                  </span>

                  <div className="hairline-fade absolute bottom-0 left-0 right-0 lg:left-[157px]" />
                  <div className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-brand-gradient opacity-60 transition-transform duration-700 ease-out-expo group-hover:scale-x-100 lg:left-[157px]" />
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
};

export default Services;
