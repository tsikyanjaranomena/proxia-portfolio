import { rateLimit } from "express-rate-limit";

/**
 * Limite d'envoi des formulaires, par adresse IP.
 * Un vrai visiteur n'envoie jamais 5 formulaires en 10 minutes ; un script est stoppé
 * dès la 6e requête (erreur 429) avant qu'un mail ne parte.
 * Protège la boîte, le quota d'envoi Private Email et la réputation de proxiatech.com.
 */
export const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // fenêtre de 10 minutes
  limit: 5, // 5 envois par IP et par fenêtre (contact + projet confondus)
  standardHeaders: "draft-8", // en-tête RateLimit standard (le navigateur sait quand réessayer)
  legacyHeaders: false,
  message: { message: "Too many requests" }, // même format JSON que les autres réponses
});
