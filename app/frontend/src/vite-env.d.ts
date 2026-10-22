/// <reference types="vite/client" />

/** Variables d'environnement lues par le front (voir .env.example). Toutes sont publiques une fois buildées. */
interface ImportMetaEnv {
  /** Adresse FormSubmit des formulaires (par défaut : https://formsubmit.co/ajax/sales@proxiatech.com). */
  readonly VITE_CONTACT_FORM_ENDPOINT?: string;
  /** Domaine public du site (liens canoniques du blog, actuellement désactivé). */
  readonly VITE_SITE_URL?: string;
  readonly VITE_APP_TITLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
