import { sendContactForm } from "@/services/FormService";
import { ContactForm } from "@/types/ContactForm";
import { useState } from "react";

export function useContact() {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);

    // Pas de préfixe « use » : c'est une simple fonction appelée au submit, pas un hook
    async function submitContactForm(data: ContactForm): Promise<void> {
        setLoading(true);
        setError(null);

        try {
            await sendContactForm(data);
        } catch (error) {
            setError("Failed to send contact form");
            // Relancée pour que le formulaire affiche l'erreur au lieu du message de succès
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { loading, error, submitContactForm };
}
