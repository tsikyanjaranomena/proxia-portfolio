import "dotenv/config";
import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

// Configuration vérifiée au démarrage : une variable manquante bloque le lancement avec un message clair,
// au lieu d'un échec silencieux au premier formulaire envoyé.
if (!host || !user || !pass || !Number.isFinite(port) || port <= 0) {
  throw new Error("SMTP configuration is missing or invalid (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS).");
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

// export const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });