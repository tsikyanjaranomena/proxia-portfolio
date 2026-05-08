export type Language = "fr" | "en";

export const translations = {
  fr: {
    // Header
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      portfolio: "Portfolio",
      testimonials: "Témoignages",
      contact: "Contact",
    },
    cta: {
      startProject: "Démarrer un projet",
      discoverServices: "Découvrir nos services",
      contactUs: "Nous contacter",
    },
    // Hero
    hero: {
      badge: "Agence digitale à Madagascar",
      title1: "Votre partenaire pour une",
      titleHighlight: "transformation digitale",
      title2: "réussie",
      description:
        "ProxiaTech accompagne les entreprises dans la conception et le développement de solutions digitales innovantes, sur mesure et performantes.",
      stats: {
        projects: "Projets livrés",
        clients: "Clients satisfaits",
        experience: "Années d'expérience",
      },
    },
    // Services
    services: {
      badge: "Nos Services",
      title1: "Des solutions",
      titleHighlight: "sur mesure",
      title2: "pour votre croissance",
      description:
        "Nous combinons expertise technique et créativité pour vous offrir des services digitaux de haute qualité.",
      items: {
        web: {
          title: "Développement Web",
          description:
            "Sites vitrines, applications web et plateformes e-commerce modernes, performantes et sécurisées.",
        },
        mobile: {
          title: "Développement Mobile",
          description:
            "Applications mobiles natives et cross-platform pour iOS et Android, adaptées à vos utilisateurs.",
        },
        software: {
          title: "Solutions Logicielles",
          description:
            "ERP, CRM et logiciels métier sur mesure pour optimiser vos processus et augmenter votre productivité.",
        },
        consulting: {
          title: "Conseil IT",
          description:
            "Accompagnement stratégique, audit technique et conseil en transformation digitale pour votre entreprise.",
        },
        cloud: {
          title: "Cloud & DevOps",
          description:
            "Déploiement cloud, automatisation, CI/CD et infrastructure scalable pour vos applications critiques.",
        },
        design: {
          title: "UI/UX Design",
          description:
            "Interfaces intuitives et expériences utilisateur engageantes pour maximiser l'impact de vos produits.",
        },
      },
    },
    // About
    about: {
      badge: "À propos de nous",
      title: "Qui sommes-nous ?",
      p1Prefix: "",
      p1Brand: "ProxiaTech",
      p1Suffix:
        " est une société de développement informatique dédiée à la création de solutions digitales innovantes. Depuis notre création, nous mettons notre expertise technique au service des entreprises qui souhaitent accélérer leur transformation numérique.",
      p2: "Notre équipe pluridisciplinaire combine rigueur technique, créativité et écoute active pour livrer des projets qui font la différence.",
      values: {
        expertise: "Expertise technique",
        partnership: "Partenariat de confiance",
        innovation: "Innovation continue",
        quality: "Qualité garantie",
      },
      techTitle: "Technologies maîtrisées",
    },
    // Portfolio
    portfolio: {
      badge: "Nos Réalisations",
      title1: "Un savoir-faire",
      titleHighlight: "éprouvé",
      description:
        "Découvrez quelques projets qui illustrent notre expertise et notre engagement à livrer des solutions de qualité.",
      projects: {
        ecommerce: {
          title: "Plateforme E-commerce",
          category: "Développement Web",
          description:
            "Marketplace multi-vendeurs avec paiement intégré, gestion de stock en temps réel et tableau de bord analytique.",
        },
        banking: {
          title: "Application Mobile Bancaire",
          category: "Développement Mobile",
          description:
            "Application de gestion financière avec authentification biométrique et transactions sécurisées.",
        },
        erp: {
          title: "ERP Sur Mesure",
          category: "Solution Logicielle",
          description:
            "Système de gestion intégré pour PME couvrant RH, comptabilité, stock et relations clients.",
        },
        institutional: {
          title: "Site Institutionnel",
          category: "Développement Web",
          description:
            "Site vitrine moderne avec CMS personnalisé pour un cabinet de conseil international.",
        },
        dashboard: {
          title: "Dashboard Analytics",
          category: "Solution Logicielle",
          description:
            "Tableau de bord interactif pour visualisation de données en temps réel avec exports personnalisés.",
        },
        iot: {
          title: "Application IoT",
          category: "Conseil IT",
          description:
            "Solution de surveillance à distance pour équipements industriels connectés avec alertes automatisées.",
        },
      },
    },
    // Testimonials
    testimonials: {
      badge: "Témoignages",
      title1: "Ils nous font",
      titleHighlight: "confiance",
      description: "La satisfaction de nos clients est notre meilleure récompense.",
      items: {
        t1: {
          role: "Directeur Général, Société Madagascar Trade",
          content:
            "ProxiaTech a transformé notre vision en une plateforme e-commerce performante. Leur professionnalisme et leur réactivité sont remarquables.",
        },
        t2: {
          role: "Fondatrice, StartupTech Océan Indien",
          content:
            "Une équipe à l'écoute qui comprend vraiment nos besoins. Le résultat a dépassé nos attentes, tant sur le plan technique qu'esthétique.",
        },
        t3: {
          role: "CTO, FinTech Solutions",
          content:
            "Excellente maîtrise technique et respect des délais. ProxiaTech est devenu notre partenaire de confiance pour tous nos projets digitaux.",
        },
      },
    },
    // Contact
    contact: {
      badge: "Contact",
      title1: "Parlons de votre",
      titleHighlight: "projet",
      description:
        "Une idée ? Un projet ? Contactez-nous, nous serions ravis d'en discuter avec vous.",
      infoTitle: "Informations",
      infoDescription: "N'hésitez pas à nous contacter par l'un des moyens suivants.",
      labels: {
        email: "Email",
        phone: "Téléphone",
        location: "Localisation",
        country: "PRO 100 ANKAZOBE",
        name: "Nom complet",
        namePlaceholder: "Votre nom",
        emailPlaceholder: "vous@exemple.com",
        subject: "Sujet",
        subjectPlaceholder: "Sujet de votre demande",
        message: "Message",
        messagePlaceholder: "Décrivez votre projet...",
        send: "Envoyer le message",
        sending: "Envoi en cours...",
      },
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
    // Footer
    footer: {
      description:
        "Votre partenaire digital à Madagascar pour des solutions web, mobile et logicielles sur mesure.",
      quickLinks: "Liens rapides",
      servicesTitle: "Services",
      contactTitle: "Contact",
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    cta: {
      startProject: "Start a project",
      discoverServices: "Discover our services",
      contactUs: "Contact us",
    },
    hero: {
      badge: "Digital agency in Madagascar",
      title1: "Your partner for a successful",
      titleHighlight: "digital transformation",
      title2: "",
      description:
        "ProxiaTech supports businesses in designing and developing innovative, tailor-made and high-performance digital solutions.",
      stats: {
        projects: "Projects delivered",
        clients: "Satisfied clients",
        experience: "Years of experience",
      },
    },
    services: {
      badge: "Our Services",
      title1: "Tailor-made",
      titleHighlight: "solutions",
      title2: "for your growth",
      description:
        "We combine technical expertise and creativity to offer you high-quality digital services.",
      items: {
        web: {
          title: "Web Development",
          description:
            "Modern, high-performance and secure showcase sites, web applications and e-commerce platforms.",
        },
        mobile: {
          title: "Mobile Development",
          description:
            "Native and cross-platform mobile applications for iOS and Android, adapted to your users.",
        },
        software: {
          title: "Software Solutions",
          description:
            "Custom ERP, CRM and business software to optimize your processes and boost productivity.",
        },
        consulting: {
          title: "IT Consulting",
          description:
            "Strategic support, technical audit and digital transformation consulting for your business.",
        },
        cloud: {
          title: "Cloud & DevOps",
          description:
            "Cloud deployment, automation, CI/CD and scalable infrastructure for your critical applications.",
        },
        design: {
          title: "UI/UX Design",
          description:
            "Intuitive interfaces and engaging user experiences to maximize the impact of your products.",
        },
      },
    },
    about: {
      badge: "About us",
      title: "Who are we?",
      p1Prefix: "",
      p1Brand: "ProxiaTech",
      p1Suffix:
        " is a software development company dedicated to creating innovative digital solutions. Since our founding, we have put our technical expertise at the service of companies looking to accelerate their digital transformation.",
      p2: "Our multidisciplinary team combines technical rigor, creativity and active listening to deliver projects that make a difference.",
      values: {
        expertise: "Technical expertise",
        partnership: "Trusted partnership",
        innovation: "Continuous innovation",
        quality: "Guaranteed quality",
      },
      techTitle: "Technologies we master",
    },
    portfolio: {
      badge: "Our Work",
      title1: "Proven",
      titleHighlight: "expertise",
      description:
        "Discover some projects that illustrate our expertise and our commitment to delivering quality solutions.",
      projects: {
        ecommerce: {
          title: "E-commerce Platform",
          category: "Web Development",
          description:
            "Multi-vendor marketplace with integrated payment, real-time inventory management and analytics dashboard.",
        },
        banking: {
          title: "Mobile Banking App",
          category: "Mobile Development",
          description:
            "Financial management app with biometric authentication and secure transactions.",
        },
        erp: {
          title: "Custom ERP",
          category: "Software Solution",
          description:
            "Integrated management system for SMEs covering HR, accounting, inventory and customer relations.",
        },
        institutional: {
          title: "Corporate Website",
          category: "Web Development",
          description:
            "Modern showcase website with custom CMS for an international consulting firm.",
        },
        dashboard: {
          title: "Analytics Dashboard",
          category: "Software Solution",
          description:
            "Interactive dashboard for real-time data visualization with customized exports.",
        },
        iot: {
          title: "IoT Application",
          category: "IT Consulting",
          description:
            "Remote monitoring solution for connected industrial equipment with automated alerts.",
        },
      },
    },
    testimonials: {
      badge: "Testimonials",
      title1: "They trust",
      titleHighlight: "us",
      description: "Our clients' satisfaction is our greatest reward.",
      items: {
        t1: {
          role: "CEO, Madagascar Trade Company",
          content:
            "ProxiaTech transformed our vision into a high-performing e-commerce platform. Their professionalism and responsiveness are remarkable.",
        },
        t2: {
          role: "Founder, StartupTech Indian Ocean",
          content:
            "A team that listens and truly understands our needs. The result exceeded our expectations, both technically and aesthetically.",
        },
        t3: {
          role: "CTO, FinTech Solutions",
          content:
            "Excellent technical mastery and respect for deadlines. ProxiaTech has become our trusted partner for all our digital projects.",
        },
      },
    },
    contact: {
      badge: "Contact",
      title1: "Let's talk about your",
      titleHighlight: "project",
      description:
        "An idea? A project? Contact us, we'd be delighted to discuss it with you.",
      infoTitle: "Information",
      infoDescription: "Don't hesitate to contact us through any of the following channels.",
      labels: {
        email: "Email",
        phone: "Phone",
        location: "Location",
        country: "PRO 100 ANKAZOBE",
        name: "Full name",
        namePlaceholder: "Your name",
        emailPlaceholder: "you@example.com",
        subject: "Subject",
        subjectPlaceholder: "Subject of your request",
        message: "Message",
        messagePlaceholder: "Describe your project...",
        send: "Send message",
        sending: "Sending...",
      },
      success: {
        title: "Thank you for your message!",
        description: "Your message has been sent successfully. We will reply soon.",
      },
      error: {
        title: "Unable to send",
        description:
          "The message could not be sent right now. Please try again in a moment or email us directly.",
      },
    },
    footer: {
      description:
        "Your digital partner in Madagascar for tailor-made web, mobile and software solutions.",
      quickLinks: "Quick links",
      servicesTitle: "Services",
      contactTitle: "Contact",
      rights: "All rights reserved.",
    },
  },
} as const;

export type TranslationKeys = typeof translations.fr;
