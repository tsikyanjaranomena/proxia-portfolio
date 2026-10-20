import { Router } from "express";
import type { ContactForm } from "../types/ContactForm.js";
import { sendContactEmail, sendProjectEmail } from "../services/mailService.js";
import type { ProjectForm } from "../types/ProjectForm.js";
import { formLimiter } from "../middleware/formLimiter.js";
import { contactSchema, projectSchema } from "../validation/formSchemas.js";

const contactRouter  = Router();

contactRouter.post("/contact", formLimiter, async (req, res) => {
    // Vérifie la structure réelle des données reçues (le type seul ne vérifie rien à l'exécution)
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid data" });
        return;
    }
    const contactForm: ContactForm = parsed.data;

    try {
        // On attend la réponse du serveur SMTP avant de répondre au front
        await sendContactEmail(contactForm);
        res.status(200).json({ message: "Contact received" });
    } catch (error) {
        console.error("Contact mail failed:", error);
        res.status(500).json({ message: "Contact failed" });
    }
});

contactRouter.post("/projet", formLimiter, async (req, res) => {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ message: "Invalid data" });
        return;
    }
    const projectForm: ProjectForm = parsed.data;

    try {
        // On attend la réponse du serveur SMTP avant de répondre au front
        await sendProjectEmail(projectForm);
        res.status(200).json({ message: "Project received" });
    } catch (error) {
        console.error("Project mail failed:", error);
        res.status(500).json({ message: "Project failed" });
    }
});

export default contactRouter;