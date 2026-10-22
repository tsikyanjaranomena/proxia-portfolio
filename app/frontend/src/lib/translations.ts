export type Language = "fr" | "en";

/**
 * Tous les textes du site. Les champs `title` des sections sont découpés en
 * segments : { text } normal, { text, highlight: true } en dégradé de marque.
 * "\n" force un retour à la ligne (desktop).
 */
const fr = {
  nav: {
    home: "Accueil",
    services: "Services",
    about: "À propos",
    portfolio: "Portfolio",
    testimonials: "Témoignages",
    contact: "Contact",
    cta: "Démarrer un projet",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    toLight: "Passer en mode clair",
    toDark: "Passer en mode sombre",
  },
  hero: {
    title: [
      { text: "Nous créons l'" },
      { text: "excellence", highlight: true },
      { text: " digitale" },
    ],
    description:
      "De l'idée au déploiement, ProxiaTech transforme vos ambitions en solutions digitales de haute performance. Web, mobile et logiciels sur mesure.",
    primaryCta: "Découvrir nos services",
    secondaryCta: "Voir nos réalisations",
    highlights: {
      code: "Code premium",
      delivery: "Livraison rapide",
      support: "Support 24/7",
      custom: "Sur mesure",
      network: "Réseau global",
    },
    stats: {
      projects: "Projets livrés",
      clients: "Clients satisfaits",
      experience: "Années d'expérience",
    },
  },
  services: {
    eyebrow: "Nos Services",
    cta: "Parlons de vos besoins",
    title: [
      { text: "Des solutions complètes\npour votre " },
      { text: "réussite digitale", highlight: true },
    ],
    description:
      "De l'idée à la mise en production, nous vous accompagnons à chaque étape avec expertise, créativité et engagement.",
    items: {
      web: {
        title: "Développement Web",
        description: "Sites vitrines, plateformes e-commerce et applications web modernes, performantes et responsives.",
      },
      mobile: {
        title: "Applications Mobiles",
        description: "Applications natives et cross-platform pour iOS et Android, fluides et pensées pour vos utilisateurs.",
      },
      software: {
        title: "Logiciels sur mesure",
        description: "Solutions métiers personnalisées pour digitaliser et optimiser vos processus internes.",
      },
      database: {
        title: "Bases de données",
        description: "Conception, modélisation et optimisation de bases de données fiables et scalables.",
      },
      cloud: {
        title: "Cloud & DevOps",
        description: "Déploiement cloud (AWS, GCP, Azure), CI/CD et infrastructure moderne pour vos applications.",
      },
      security: {
        title: "Sécurité & Audit",
        description: "Audit de sécurité, protection des données et mise en conformité pour vos systèmes.",
      },
      design: {
        title: "UI/UX Design",
        description: "Interfaces utilisateur élégantes et expériences engageantes pensées pour vos utilisateurs.",
      },
      support: {
        title: "Support & Maintenance",
        description: "Accompagnement continu, maintenance évolutive et support technique pour vos solutions.",
      },
    },
  },
  method: {
    eyebrow: "Notre méthode",
    cta: "Définissons votre projet",
    description: "Un processus clair, transparent et collaboratif.\nVous savez toujours où en est votre projet.",
    title: [{ text: "Une " }, { text: "approche", highlight: true }, { text: " pensée\npour vos projets" }],
    steps: {
      discovery: {
        title: "Découverte",
        description:
          "On analyse vos besoins, votre marché et vos objectifs en profondeur. Zéro supposition — on pose les bonnes questions pour poser des fondations solides.",
      },
      design: {
        title: "Conception",
        description:
          "Maquettes, architecture technique et prototype validés avec vous avant d'écrire la première ligne de code. Vous savez exactement ce que vous allez obtenir.",
      },
      development: {
        title: "Développement",
        description:
          "Sprints agiles, code premium, tests rigoureux. Vous suivez l'avancement en temps réel et validez chaque étape. Pas de mauvaises surprises.",
      },
      delivery: {
        title: "Livraison",
        description:
          "Déploiement, formation et accompagnement post-lancement. On ne disparaît pas après la mise en ligne — on reste partenaires de votre croissance.",
      },
    },
  },
  about: {
    eyebrow: "À propos de nous",
    cta: "Échangeons avec l’équipe",
    title: [{ text: "Découvrez notre " }, { text: "identité", highlight: true }, { text: "\net notre vision" }],
    description:
      "Une vision du digital portée par l'expertise, la créativité et l'envie de donner vie à des projets ambitieux.",
    pillars: {
      mission: {
        title: "Notre mission",
        description:
          "Accompagner les entreprises dans leur transformation numérique en livrant des solutions sur mesure, performantes et évolutives.",
      },
      values: {
        title: "Nos valeurs",
        description:
          "Intégrité, innovation, excellence et engagement client. Nous cultivons des relations durables basées sur la confiance.",
      },
      expertise: {
        title: "Notre expertise",
        description:
          "Une équipe passionnée maîtrisant les technologies modernes pour garantir la qualité et la pertinence de chaque projet.",
      },
    },
    brand: "ProxiaTech",
    p1: " est une société de développement informatique dédiée à la création de solutions digitales innovantes. Depuis notre création, nous mettons notre expertise technique au service des entreprises qui souhaitent accélérer leur transformation numérique.",
    p2: "Notre approche combine rigueur technique, créativité et écoute client pour livrer des projets qui font réellement la différence. Chaque solution que nous développons est pensée pour être robuste, évolutive et parfaitement alignée avec vos objectifs business.",
  },
  technologies: {
    eyebrow: "Nos technologies",
    cta: "Discutons de vos solutions",
    title: [{ text: "Technologies", highlight: true }, { text: " maîtrisées" }],
    description: "Nous utilisons un écosystème technologique moderne et éprouvé\npour livrer des solutions robustes.",
  },
  portfolio: {
    eyebrow: "Nos réalisations",
    cta: "Créons votre prochain projet",
    description:
      "Découvrez quelques projets qui illustrent notre expertise et notre engagement à livrer des solutions de qualité.",
    title: [{ text: "Un savoir-faire\n" }, { text: "éprouvé", highlight: true }],
    projects: {
      budget: {
        title: "Gestion de budget",
        category: "Développement mobile",
        description:
          "Application mobile de gestion de budget développée avec Flutter, livrée en APK avec suivi des dépenses et tableaux de bord clairs.",
        imageAlt: "Mockup de l'application mobile de gestion de budget",
      },
      school: {
        title: "Gestion école",
        category: "Solution logicielle",
        description: "Plateforme de gestion scolaire pour les inscriptions, les notes, les présences et l'administration.",
        imageAlt: "Tableau de bord de la plateforme de gestion scolaire",
      },
      madalift: {
        title: "Site Vitrine Madalift",
        category: "Développement web",
        description:
          "Site vitrine moderne pour Madalift, conçu pour valoriser leur image de marque avec une expérience utilisateur fluide et un design professionnel.",
        imageAlt: "Page d'accueil du site vitrine Madalift",
      },
      notary: {
        title: "Gestion Actes Notariaux",
        category: "Solution logicielle",
        description:
          "Plateforme complète pour la Chambre Notariale de Madagascar : gestion des actes, des clients et identification biométrique intégrée.",
        imageAlt: "Écran de connexion de la plateforme notariale",
      },
    },
  },
  testimonials: {
    eyebrow: "Témoignages",
    cta: "Parlons de votre projet",
    description: "La satisfaction de nos clients est notre meilleure récompense.",
    title: [{ text: "Ils nous font\n" }, { text: "confiance", highlight: true }],
    items: {
      fintech: {
        role: "CTO, FinTech Solutions",
        quote:
          "Excellente maîtrise technique et respect des délais. ProxiaTech est devenu notre partenaire de confiance pour tous nos projets digitaux.",
      },
      trade: {
        role: "Directeur Général, Société Madagascar Trade",
        quote:
          "ProxiaTech a transformé notre vision en une plateforme e-commerce performante. Leur professionnalisme et leur réactivité sont remarquables.",
      },
      startup: {
        role: "Fondatrice, StartupTech Océan Indien",
        quote:
          "Une équipe à l'écoute qui comprend vraiment nos besoins. Le résultat a dépassé nos attentes, tant sur le plan technique qu'esthétique.",
      },
      madalift: {
        role: "Client, Madalift",
        quote:
          "ProxiaTech a réalisé notre site vitrine avec un résultat professionnel et soigné. Livraison rapide et équipe très à l'écoute de nos besoins.",
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Construisons ensemble votre\nprochain projet",
    description: "Une question, un besoin ou une demande d’information ? Notre équipe est à votre écoute.",
    formTitle: "Nous contacter",
    fields: {
      name: "Votre nom",
      email: "E-mail",
      subject: "Sujet",
      message: "Message",
    },
    closing: "Au plaisir d’échanger avec vous.",
    send: "Envoyer",
    sending: "Envoi en cours…",
    defaultSubject: "Demande d'information",
    success: {
      title: "Merci pour votre message !",
      description: "Votre message a bien été envoyé. Nous vous répondrons rapidement.",
    },
    error: {
      title: "Envoi impossible",
      description:
        "Le message n'a pas pu être envoyé pour le moment. Réessayez dans quelques instants ou écrivez-nous directement.",
    },
  },
  project: {
    metaTitle: "Parlons de votre projet",
    title: [{ text: "Parlons de votre " }, { text: "projet", highlight: true }],
    description: "Décrivez-nous vos besoins et vos objectifs afin que nous puissions vous proposer une solution adaptée.",
    fields: {
      services: "De quels services avez-vous besoin ?",
      stage: "Où en êtes-vous dans votre projet ?",
      timeline: "Quand souhaitez-vous démarrer ?",
      details: "Décrivez votre projet",
      name: "Nom complet",
      email: "Email",
      organization: "Organisation",
      phone: "Téléphone",
    },
    placeholders: {
      details: "Parlez-nous de votre projet...",
      name: "Votre nom",
      email: "Votre e-mail",
      organization: "Nom de votre organisation",
      phone: "Votre numéro de téléphone",
    },
    stages: ["J’ai une idée à concrétiser", "J’ai déjà un cahier des charges", "Mon projet est en cours", "Je souhaite refondre un existant"],
    timelines: ["Dès que possible", "Dans le mois à venir", "Dans les 3 prochains mois", "Je ne sais pas encore"],
    required: "Champ obligatoire",
    send: "Envoyer ma demande",
    sending: "Envoi en cours…",
    success: {
      title: "Merci, votre demande est bien envoyée !",
      description: "Notre équipe revient vers vous très rapidement pour en discuter.",
      back: "Retour à l’accueil",
    },
    error: {
      title: "Envoi impossible",
      description: "La demande n’a pas pu être envoyée pour le moment. Réessayez dans quelques instants ou écrivez-nous directement.",
    },
  },
  footer: {
    description: "Votre partenaire de confiance pour des solutions informatiques innovantes et performantes.",
    quickLinks: "Liens rapides",
    servicesTitle: "Services",
    services: ["Développement web", "Développement mobile", "Solution sur mesure", "Conseil IT", "Maintenance"],
    contactTitle: "Contact",
    rights: "Tous droits réservés.",
    legal: ["Mentions légales", "Politique de confidentialité", "CGU"],
    language: "Langue",
  },
} as const;

/** Même forme que `fr`, mais avec des chaînes libres (pour les autres langues). */
type Widen<T> = T extends string
  ? string
  : T extends boolean
    ? boolean
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : { readonly [K in keyof T]: Widen<T[K]> };

export type Translations = Widen<typeof fr>;

const en: Translations = {
  nav: {
    home: "Home",
    services: "Services",
    about: "About",
    portfolio: "Portfolio",
    testimonials: "Testimonials",
    contact: "Contact",
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  hero: {
    title: [{ text: "We craft digital " }, { text: "excellence", highlight: true }],
    description:
      "From idea to deployment, ProxiaTech turns your ambitions into high-performance digital solutions. Custom web, mobile and software.",
    primaryCta: "Discover our services",
    secondaryCta: "See our work",
    highlights: {
      code: "Premium code",
      delivery: "Fast delivery",
      support: "24/7 support",
      custom: "Tailor-made",
      network: "Global network",
    },
    stats: {
      projects: "Projects delivered",
      clients: "Satisfied clients",
      experience: "Years of experience",
    },
  },
  services: {
    eyebrow: "Our Services",
    cta: "Tell us your needs",
    title: [{ text: "Complete solutions\nfor your " }, { text: "digital success", highlight: true }],
    description:
      "From idea to production, we support you at every step with expertise, creativity and commitment.",
    items: {
      web: {
        title: "Web Development",
        description: "Showcase sites, e-commerce platforms and web applications that are modern, fast and responsive.",
      },
      mobile: {
        title: "Mobile Apps",
        description: "Native and cross-platform apps for iOS and Android, smooth and designed for your users.",
      },
      software: {
        title: "Custom Software",
        description: "Tailored business solutions to digitize and optimize your internal processes.",
      },
      database: {
        title: "Databases",
        description: "Design, modeling and optimization of reliable and scalable databases.",
      },
      cloud: {
        title: "Cloud & DevOps",
        description: "Cloud deployment (AWS, GCP, Azure), CI/CD and modern infrastructure for your applications.",
      },
      security: {
        title: "Security & Audit",
        description: "Security audits, data protection and compliance for your systems.",
      },
      design: {
        title: "UI/UX Design",
        description: "Elegant user interfaces and engaging experiences designed for your users.",
      },
      support: {
        title: "Support & Maintenance",
        description: "Ongoing support, evolutive maintenance and technical assistance for your solutions.",
      },
    },
  },
  method: {
    eyebrow: "Our method",
    cta: "Let’s define your project",
    description: "A clear, transparent and collaborative process.\nYou always know where your project stands.",
    title: [{ text: "An " }, { text: "approach", highlight: true }, { text: " designed\nfor your projects" }],
    steps: {
      discovery: {
        title: "Discovery",
        description:
          "We dig deep into your needs, your market and your goals. No assumptions — we ask the right questions to lay solid foundations.",
      },
      design: {
        title: "Design",
        description:
          "Mockups, technical architecture and prototype validated with you before the first line of code. You know exactly what you will get.",
      },
      development: {
        title: "Development",
        description:
          "Agile sprints, premium code, rigorous testing. You follow progress in real time and approve every step. No bad surprises.",
      },
      delivery: {
        title: "Delivery",
        description:
          "Deployment, training and post-launch support. We don't vanish after go-live — we stay partners in your growth.",
      },
    },
  },
  about: {
    eyebrow: "About us",
    cta: "Talk with the team",
    title: [{ text: "Discover our " }, { text: "identity", highlight: true }, { text: "\nand our vision" }],
    description: "A vision of digital driven by expertise, creativity and the desire to bring ambitious projects to life.",
    pillars: {
      mission: {
        title: "Our mission",
        description:
          "Support companies in their digital transformation by delivering tailor-made, high-performance and scalable solutions.",
      },
      values: {
        title: "Our values",
        description:
          "Integrity, innovation, excellence and client commitment. We build lasting relationships based on trust.",
      },
      expertise: {
        title: "Our expertise",
        description: "A passionate team mastering modern technologies to ensure the quality and relevance of every project.",
      },
    },
    brand: "ProxiaTech",
    p1: " is a software development company dedicated to creating innovative digital solutions. Since our founding, we have put our technical expertise at the service of companies looking to accelerate their digital transformation.",
    p2: "Our approach combines technical rigor, creativity and close listening to deliver projects that truly make a difference. Every solution we build is designed to be robust, scalable and perfectly aligned with your business goals.",
  },
  technologies: {
    eyebrow: "Our technologies",
    cta: "Let’s discuss your solutions",
    title: [{ text: "Technologies", highlight: true }, { text: " we master" }],
    description: "We rely on a modern, proven technology ecosystem\nto deliver robust solutions.",
  },
  portfolio: {
    eyebrow: "Our work",
    cta: "Let’s build your next project",
    description:
      "Discover some projects that illustrate our expertise and our commitment to delivering quality solutions.",
    title: [{ text: "Proven\n" }, { text: "know-how", highlight: true }],
    projects: {
      budget: {
        title: "Budget management",
        category: "Mobile development",
        description:
          "Budget management mobile app built with Flutter, delivered as an APK with expense tracking and clear dashboards.",
        imageAlt: "Budget management mobile app mockup",
      },
      school: {
        title: "School management",
        category: "Software solution",
        description: "School management platform for enrollments, grades, attendance and administration.",
        imageAlt: "School management platform dashboard",
      },
      madalift: {
        title: "Madalift Showcase Website",
        category: "Web development",
        description:
          "Modern showcase website for Madalift, designed to strengthen their brand image with a smooth user experience and professional design.",
        imageAlt: "Madalift showcase website home page",
      },
      notary: {
        title: "Notarial Acts Management",
        category: "Software solution",
        description:
          "Complete platform for the Chamber of Notaries of Madagascar: act management, client records and integrated biometric identification.",
        imageAlt: "Notarial platform login screen",
      },
    },
  },
  testimonials: {
    eyebrow: "Testimonials",
    cta: "Tell us about your project",
    description: "Our clients' satisfaction is our greatest reward.",
    title: [{ text: "They put their\n" }, { text: "trust", highlight: true }, { text: " in us" }],
    items: {
      fintech: {
        role: "CTO, FinTech Solutions",
        quote:
          "Excellent technical mastery and respect for deadlines. ProxiaTech has become our trusted partner for all our digital projects.",
      },
      trade: {
        role: "CEO, Madagascar Trade Company",
        quote:
          "ProxiaTech turned our vision into a high-performing e-commerce platform. Their professionalism and responsiveness are remarkable.",
      },
      startup: {
        role: "Founder, StartupTech Indian Ocean",
        quote:
          "A team that listens and truly understands our needs. The result exceeded our expectations, both technically and aesthetically.",
      },
      madalift: {
        role: "Client, Madalift",
        quote:
          "ProxiaTech built our showcase website with a professional, polished result. Fast delivery and a team that really listens to our needs.",
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build your next\nproject together",
    description: "A question, a need or a request for information? Our team is here to listen.",
    formTitle: "Contact us",
    fields: {
      name: "Your name",
      email: "Email",
      subject: "Subject",
      message: "Message",
    },
    closing: "We look forward to hearing from you.",
    send: "Send",
    sending: "Sending…",
    defaultSubject: "Information request",
    success: {
      title: "Thank you for your message!",
      description: "Your message has been sent successfully. We will get back to you soon.",
    },
    error: {
      title: "Unable to send",
      description: "The message could not be sent right now. Please try again in a moment or email us directly.",
    },
  },
  project: {
    metaTitle: "Tell us about your project",
    title: [{ text: "Tell us about your " }, { text: "project", highlight: true }],
    description: "Describe your needs and goals so that we can offer you a tailored solution.",
    fields: {
      services: "Which services do you need?",
      stage: "Where are you in your project?",
      timeline: "When would you like to start?",
      details: "Describe your project",
      name: "Full name",
      email: "Email",
      organization: "Organization",
      phone: "Phone",
    },
    placeholders: {
      details: "Tell us about your project...",
      name: "Your name",
      email: "Your email",
      organization: "Your organization's name",
      phone: "Your phone number",
    },
    stages: ["I have an idea to bring to life", "I already have specifications", "My project is in progress", "I want to redesign an existing product"],
    timelines: ["As soon as possible", "Within the next month", "Within the next 3 months", "I don't know yet"],
    required: "Required field",
    send: "Send my request",
    sending: "Sending…",
    success: {
      title: "Thank you, your request has been sent!",
      description: "Our team will get back to you very soon to discuss it.",
      back: "Back to home",
    },
    error: {
      title: "Unable to send",
      description: "The request could not be sent right now. Please try again in a moment or email us directly.",
    },
  },
  footer: {
    description: "Your trusted partner for innovative, high-performance IT solutions.",
    quickLinks: "Quick links",
    servicesTitle: "Services",
    services: ["Web development", "Mobile development", "Custom solutions", "IT consulting", "Maintenance"],
    contactTitle: "Contact",
    rights: "All rights reserved.",
    legal: ["Legal notice", "Privacy policy", "Terms of use"],
    language: "Language",
  },
};

export const translations: Record<Language, Translations> = { fr, en };

export interface TitleSegment {
  readonly text: string;
  readonly highlight?: boolean;
}
