import "dotenv/config";
import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();
// Port fourni par l'hébergeur ; 8000 en local
const PORT = Number(process.env.PORT ?? 8000);

// Ne pas annoncer la technologie du serveur (en-tête X-Powered-By: Express)
app.disable("x-powered-by");

// Nombre de proxys devant le backend, pour que le limiteur lise la vraie IP du visiteur (X-Forwarded-For).
// 0 en local (aucun proxy) ; en production : 1 derrière l'hébergeur, 2 si Cloudflare est aussi devant.
// Ne jamais mettre plus que le nombre réel de proxys : sinon n'importe qui peut falsifier son IP.
const trustProxy = Number(process.env.TRUST_PROXY ?? 0);
app.set("trust proxy", Number.isInteger(trustProxy) && trustProxy >= 0 ? trustProxy : 0);

// CORS : uniquement si le front est servi depuis un AUTRE domaine que l'API (ex. API sur api.proxiatech.com).
// CORS_ORIGIN="https://proxiatech.com" (plusieurs origines séparées par des virgules).
// Vide / absent (front et API sur le même domaine, ou en local via le proxy Vite) : CORS désactivé.
const corsOrigins = (process.env.CORS_ORIGIN ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
if (corsOrigins.length > 0) {
  app.use(cors({ origin: corsOrigins, methods: ["GET", "POST"] }));
}

// Corps JSON limité à 20 Ko : un formulaire normal pèse moins de 6 Ko
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", contactRouter);

// Route inconnue : réponse JSON (au lieu de la page HTML par défaut d'Express)
app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Toute erreur non gérée (JSON malformé, corps trop gros…) : réponse JSON, sans aucun détail interne.
// Les 4 paramètres sont obligatoires pour qu'Express reconnaisse un gestionnaire d'erreurs.
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status =
    typeof err === "object" && err !== null && "status" in err && typeof err.status === "number" ? err.status : 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ message: status >= 500 ? "Server error" : "Invalid request" });
});

app.listen(PORT, () => {
  console.log(`Backend : http://localhost:${PORT}`);
});
