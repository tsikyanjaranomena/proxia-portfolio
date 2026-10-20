import { sendProjectForm } from "@/services/FormService";
import { ProjectForm } from "@/types/ProjectForm";
import { useState } from "react";

export function useProjectContact() {
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState<string | null>(null);

    // Pas de préfixe « use » : c'est une simple fonction appelée au submit, pas un hook
    async function submitProjectForm(data: ProjectForm): Promise<void> {
        setLoading(true);
        setError(null);
        try {
                await sendProjectForm(data);
        } catch (error) {
            setError("Failed to send project form");
            // Relancée pour que la page affiche l'erreur au lieu du message de succès
            throw error;
        } finally {
            setLoading(false);
        }
    }
    return { loading, error, submitProjectForm };
}
