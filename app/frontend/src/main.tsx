import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function initializeApp() {
  // Prerendered blog pages are served as pure static HTML for SEO.
  // Intentionally skip React mounting so the crawler-facing markup stays
  // lightweight and self-contained — no client-side hydration needed.
  if (
    document
      .querySelector('meta[name="prerender-static-page"]')
      ?.getAttribute('content') === 'blog'
  ) {
    return;
  }

  // Plus de chargement de /api/config (reste du SDK MGX) : le site n'en a pas besoin,
  // et l'appel provoquait une erreur 404 + des logs de debug à chaque chargement en production.

  // Render the app
  createRoot(document.getElementById('root')!).render(<App />);
}

// Initialize the app
initializeApp();
