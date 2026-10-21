/// <reference types="vite/client" />

/** Variables d'environnement lues par le front (voir .env.example). Toutes sont publiques une fois buildées. */
interface ImportMetaEnv {
  /** Adresse de l'API si elle n'est pas sur le même domaine que le site (ex. https://api.proxiatech.com). */
  readonly VITE_API_URL?: string;
  /** Domaine public du site (liens canoniques du blog, actuellement désactivé). */
  readonly VITE_SITE_URL?: string;
  readonly VITE_APP_TITLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
