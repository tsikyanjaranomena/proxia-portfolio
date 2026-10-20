import { ContactForm } from "@/types/ContactForm";
import { ProjectForm } from "@/types/ProjectForm";

/**
 * Adresse de l'API. Vide par défaut : appels relatifs (/api/...), quand l'API est servie sur le même domaine
 * que le site (ou en local via le proxy Vite). Si l'API est ailleurs (ex. https://api.proxiatech.com),
 * définir VITE_API_URL au moment du build. Le slash final éventuel est retiré.
 */
const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

export async function sendContactForm(data: ContactForm): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if(!response.ok) {
        throw new Error('error');
    }
    return response.json();
}

export async function sendProjectForm(data: ProjectForm): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/projet`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if(!response.ok) {
        throw new Error('error');
    }
    return response.json();
}