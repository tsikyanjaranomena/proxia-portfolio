import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  DeviceMobileIcon,
  GlobeIcon,
  HeadphonesIcon,
  HeartIcon,
  MedalIcon,
  PaletteIcon,
  ShieldIcon,
  TargetIcon,
  type IconProps,
} from "@/components/icons";
import type { Translations } from "@/lib/translations";
import type { ComponentType } from "react";

/**
 * Données structurelles du site (ordre, icônes, images, tags).
 * Les textes associés vivent dans src/lib/translations.ts, sous la même clé.
 */

export const SECTION_IDS = {
  home: "accueil",
  services: "services",
  method: "methode",
  about: "apropos",
  portfolio: "portfolio",
  testimonials: "temoignages",
  contact: "contact",
} as const;

/** Page du formulaire détaillé « Parlons de votre projet ». */
export const PROJECT_PATH = "/projet";

export const NAV_ITEMS = [
  { id: SECTION_IDS.home, label: "home" },
  { id: SECTION_IDS.services, label: "services" },
  { id: SECTION_IDS.about, label: "about" },
  { id: SECTION_IDS.portfolio, label: "portfolio" },
  { id: SECTION_IDS.testimonials, label: "testimonials" },
  { id: SECTION_IDS.contact, label: "contact" },
] as const satisfies ReadonlyArray<{ id: string; label: keyof Translations["nav"] }>;

export type HeroHighlight = keyof Translations["hero"]["highlights"];

/**
 * Pastilles du hero (Figma, Frames 42–46) : longues bandes vitrées (918–929 px) qui partent
 * de l'icône et s'estompent vers l'autre bout. Positions en px dans une zone de 680 px
 * alignée à droite du container (x = 658 sur la maquette 1440).
 * - `side` : côté de l'icône (les deux « Code premium » sont inversées dans Figma)
 * - `fill` : positions (%) du fond blanc 100 % → 51 % → 0 %
 * - `border` : position (%) où le contour #F8F8F8 devient transparent
 * - `dim` : opacité 0.9 des bandes inversées ; `blur` : flou d'arrière-plan Figma
 */
export const HERO_HIGHLIGHTS: ReadonlyArray<{
  id: HeroHighlight;
  side: "left" | "right";
  left: number;
  top: number;
  width: number;
  fill: [number, number, number];
  border: number;
  dim?: number;
  blur: number;
}> = [
  { id: "code", side: "right", left: -587, top: 0, width: 929, fill: [3, 18, 35], border: 52, dim: 0.9, blur: 10 },
  { id: "delivery", side: "left", left: 362, top: 0, width: 918, fill: [12, 52, 100], border: 70, blur: 10 },
  { id: "support", side: "left", left: 243, top: 74, width: 918, fill: [12, 52, 100], border: 64, blur: 10 },
  { id: "custom", side: "right", left: -422, top: 146, width: 929, fill: [12, 52, 100], border: 52, dim: 0.9, blur: 10 },
  { id: "network", side: "left", left: 216, top: 222, width: 918, fill: [12, 52, 100], border: 64, blur: 1000 },
];
export const STATS: ReadonlyArray<{ id: keyof Translations["hero"]["stats"]; value: number; suffix: string }> = [
  { id: "projects", value: 20, suffix: "+" },
  { id: "clients", value: 15, suffix: "+" },
  { id: "experience", value: 3, suffix: "+" },
];

/**
 * `tilt` : inclinaison de la grande icône de fond (°, négatif = vers la gauche), relevée dans Figma :
 * groupe tourné de -35.9° + rotation propre de chaque icône.
 */
export const SERVICES: ReadonlyArray<{
  id: keyof Translations["services"]["items"];
  icon: ComponentType<IconProps>;
  tilt: number;
}> = [
  { id: "web", icon: GlobeIcon, tilt: -35.9 },
  { id: "mobile", icon: DeviceMobileIcon, tilt: -16.8 },
  { id: "software", icon: CodeIcon, tilt: -7 },
  { id: "database", icon: DatabaseIcon, tilt: -15 },
  { id: "cloud", icon: CloudIcon, tilt: 0 },
  { id: "security", icon: ShieldIcon, tilt: -19.5 },
  { id: "design", icon: PaletteIcon, tilt: -26 },
  { id: "support", icon: HeadphonesIcon, tilt: -22.8 },
];

export const METHOD_STEPS: ReadonlyArray<keyof Translations["method"]["steps"]> = [
  "discovery",
  "design",
  "development",
  "delivery",
];

/**
 * Piliers « À propos » :
 * - `offset` : décalage desktop (quinconce de la maquette)
 * - `align` : alignement mobile (zigzag gauche / droite / gauche)
 * - `icon` / `tilt` : grande icône de fond en desktop, comme les cartes Services
 */
export const ABOUT_PILLARS: ReadonlyArray<{
  id: keyof Translations["about"]["pillars"];
  offset: string;
  align: "left" | "right";
  icon: ComponentType<IconProps>;
  tilt: number;
  /** Remontée de l'icône de fond (px), au-dessus de sa position commune. */
  raise: number;
}> = [
  // Nouvelle maquette : cartes alignées en colonne (desktop) et toutes à gauche (mobile)
  { id: "mission", offset: "", align: "left", icon: TargetIcon, tilt: -18, raise: 14 },
  { id: "values", offset: "", align: "left", icon: HeartIcon, tilt: -14, raise: 14 },
  { id: "expertise", offset: "", align: "left", icon: MedalIcon, tilt: -20, raise: 0 },
];

export interface Technology {
  name: string;
  icon: string;
  /** Logo monochrome noir à inverser en dark mode. */
  invertOnDark?: boolean;
}

const tech = (name: string, file: string, invertOnDark = false): Technology => ({
  name,
  icon: `/images/technos/${file}.svg`,
  invertOnDark,
});

/**
 * Bande vitrée sous une rangée (Figma, Rectangles 95–98), propre à chaque rangée :
 * - `left` / `right` : débordement (px) par rapport aux items
 * - `fill` : fond (dégradé CSS, déjà multiplié par l'opacité 0.3 du calque)
 * - `line` : position (%) du pic du filet bas, entre `lineFrom` et `lineTo` transparents
 * - `innerShadow` : ombre intérieure en haut (désactivée sur les deux premières rangées)
 * - `blur` : flou d'arrière-plan Figma (0 = aucun)
 */
export interface TechnologyBand {
  left: number;
  right: number;
  fill: string;
  line: { from: number; peak: number; to: number };
  innerShadow: boolean;
  blur: number;
}

/** Grille en quinconce (Figma : rangées de 4 × 225 px). */
export const TECHNOLOGY_ROWS: ReadonlyArray<{
  offset: string;
  band: TechnologyBand | null;
  items: Technology[];
}> = [
  {
    offset: "",
    band: {
      left: -51,
      right: 12,
      fill: "rgb(var(--surface) / 0.3)",
      line: { from: 0, peak: 37, to: 97 },
      innerShadow: false,
      blur: 0,
    },
    items: [
      tech("Javascript", "javascript-original"),
      tech("React", "react-original"),
      tech("Next.js", "nextjs-original", true),
      tech("Node.js", "nodejs-original"),
    ],
  },
  {
    offset: "lg:ml-[94px]",
    band: {
      left: -63,
      right: -14,
      fill: "linear-gradient(90deg, rgb(var(--hairline-soft) / 0.045) 1%, rgb(var(--surface) / 0.3) 27%, rgb(var(--surface) / 0.3) 95%)",
      line: { from: 0, peak: 42, to: 100 },
      innerShadow: false,
      blur: 15,
    },
    items: [
      tech("Typescript", "typescript-original"),
      tech("Java", "java-original"),
      tech("Python", "python-original"),
      tech("Django", "django-plain", true),
    ],
  },
  {
    offset: "",
    band: {
      left: -19,
      right: 12,
      fill: "linear-gradient(90deg, rgb(var(--surface) / 0.3) 68%, rgb(var(--hairline-soft) / 0) 100%)",
      line: { from: 3, peak: 47, to: 96 },
      innerShadow: true,
      blur: 0,
    },
    items: [
      tech("Flutter", "flutter-original"),
      tech("React Native", "react-original"),
      tech("Angular", "angular-original"),
      tech("Vue.js", "vuejs-original"),
    ],
  },
  {
    offset: "lg:ml-[94px]",
    band: {
      left: -94,
      right: 61,
      fill: "linear-gradient(90deg, rgb(var(--surface) / 0.3) 67%, rgb(var(--hairline-soft) / 0) 93%)",
      line: { from: 0, peak: 29, to: 96 },
      innerShadow: true,
      blur: 11.3,
    },
    items: [
      tech("Laravel", "laravel-original"),
      tech("Mongodb", "mongodb-original"),
      tech("Mysql", "mysql-original"),
      tech("Oracle", "oracle-original"),
    ],
  },
  {
    offset: "lg:ml-[47px]",
    band: null,
    items: [
      tech("Postgresql", "postgresql-original"),
      tech("Tailwind CSS", "tailwindcss-original"),
      tech("Git", "git-original"),
      tech("Docker", "docker-original"),
    ],
  },
];

export const PROJECTS: ReadonlyArray<{
  id: keyof Translations["portfolio"]["projects"];
  image: string;
  tags: string[];
}> = [
  { id: "budget", image: "/images/portfolio-mockups/budget-mobile-app.png", tags: ["Flutter", "Dart", "APK"] },
  { id: "school", image: "/images/portfolio-mockups/school-management.png", tags: ["Next.js", "TypeScript", "PostgreSQL"] },
  { id: "madalift", image: "/images/portfolio-mockups/madalift.png", tags: ["React", "Tailwind CSS", "Vite"] },
  { id: "notary", image: "/images/portfolio-mockups/notaire.png", tags: ["Django", "React", "PostgreSQL", "Biométrie"] },
];

/** `color` : fond de l'avatar (captures/témoignage.png). */
export const TESTIMONIALS: ReadonlyArray<{
  id: keyof Translations["testimonials"]["items"];
  name: string;
  initials: string;
  rating: number;
  color: string;
}> = [
  { id: "fintech", name: "Jean-Pierre H.", initials: "JH", rating: 5, color: "#E376CD" },
  { id: "trade", name: "Rakoto A.", initials: "RA", rating: 5, color: "#0065FC" },
  { id: "startup", name: "Marie Randria", initials: "MR", rating: 5, color: "#EB5E5E" },
  { id: "madalift", name: "Madalift", initials: "ML", rating: 5, color: "#5FDF61" },
];

export const SOCIAL_LINKS = [
  { id: "linkedin", 
    label: "LinkedIn", 
    href: "https://www.linkedin.com/company/proxiatech/", 
    icon: "/images/social/linkedin.png" 
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61570683964020",
    icon: "/images/social/facebook.png",
  },
] as const;
