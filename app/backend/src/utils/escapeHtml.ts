const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/**
 * Rend une valeur saisie par un visiteur inoffensive dans le HTML d'un mail :
 * `<a href=...>` s'affiche tel quel en texte au lieu de devenir un vrai lien / bouton / image.
 * Accepte n'importe quelle valeur (le corps de la requête n'est pas encore validé).
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ENTITIES[char] ?? char);
}

/** Comme escapeHtml, en conservant les retours à la ligne du texte (messages, descriptions). */
export function escapeMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}
