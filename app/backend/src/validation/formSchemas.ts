import { z } from "zod";
import type { ContactForm } from "../types/ContactForm.js";
import type { ProjectForm } from "../types/ProjectForm.js";

/** Texte obligatoire : espaces retirés, au moins 1 caractère, longueur maximale. */
const requiredText = (max: number) => z.string().trim().min(1).max(max);
/** Texte facultatif : peut être vide ou absent (devient alors ""). */
const optionalText = (max: number) => z.string().trim().max(max).default("");
/** Adresse email : format vérifié, 200 caractères max. */
const email = z.string().trim().max(200).pipe(z.email());

/**
 * Règles du formulaire de contact (mêmes que le front : nom, email, message obligatoires).
 * `satisfies` garantit que le schéma reste conforme à l'interface ContactForm.
 */
export const contactSchema = z.object({
  name: requiredText(100),
  email,
  subject: optionalText(200),
  message: requiredText(5000),
}) satisfies z.ZodType<ContactForm>;

/** Règles du formulaire projet (organisation et téléphone facultatifs). */
export const projectSchema = z.object({
  name: requiredText(100),
  email,
  organisation: optionalText(150),
  telephone: optionalText(40),
  services: requiredText(150),
  avancement: requiredText(150),
  deadline: requiredText(150),
  description: requiredText(5000),
}) satisfies z.ZodType<ProjectForm>;
