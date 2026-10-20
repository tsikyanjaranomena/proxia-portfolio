import { useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BlurredRasterProps {
  /** Contenu SVG (defs + formes), dans le repère du viewBox. */
  markup: string;
  /** Taille du viewBox du contenu. */
  viewBox: [number, number];
  /** Taille affichée (px CSS) du contenu, avant flou. */
  width: number;
  height: number;
  /** Rayon du flou en px CSS (équivalent de `filter: blur(Npx)`). */
  blur: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Forme floutée « pré-calculée » : le SVG flouté est dessiné une seule fois dans un petit canvas,
 * puis affiché à sa taille normale.
 *
 * Pourquoi : un `filter: blur()` CSS sur une forme de 2 000 – 3 000 px oblige le GPU à garder
 * et retraiter une surface géante (des dizaines de Mo par forme). Une forme floutée n'a aucun
 * détail fin : la dessiner à une résolution réduite (pixel ≤ rayon / 5) puis l'agrandir est
 * visuellement identique, pour une fraction de la mémoire et du calcul.
 */
const BlurredRaster = ({ markup, viewBox: [vw, vh], width, height, blur, className, style }: BlurredRasterProps) => {
  const ref = useRef<HTMLCanvasElement>(null);
  // Marge pour que le flou ne soit pas coupé (≈ 3 écarts-types)
  const pad = Math.ceil(blur * 3);
  // Facteur de réduction : un pixel du canvas couvre au plus blur / 5 px affichés
  const factor = Math.max(1, Math.min(8, blur / 5));
  const outerW = width + pad * 2;
  const outerH = height + pad * 2;
  const canvasW = Math.max(1, Math.round(outerW / factor));
  const canvasH = Math.max(1, Math.round(outerH / factor));

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let cancelled = false;

    // Unités du viewBox par px affiché (horizontal / vertical)
    const ux = vw / width;
    const uy = vh / height;
    const padX = pad * ux;
    const padY = pad * uy;
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasW}" height="${canvasH}" ` +
      `viewBox="${-padX} ${-padY} ${vw + padX * 2} ${vh + padY * 2}" preserveAspectRatio="none">` +
      `<defs><filter id="raster-blur" filterUnits="userSpaceOnUse" x="${-padX}" y="${-padY}" width="${vw + padX * 2}" height="${vh + padY * 2}">` +
      `<feGaussianBlur stdDeviation="${blur * ux} ${blur * uy}"/></filter></defs>` +
      `<g filter="url(#raster-blur)">${markup}</g></svg>`;

    const image = new Image();
    image.decoding = "async";
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    image
      .decode()
      .then(() => {
        if (cancelled) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.drawImage(image, 0, 0, canvasW, canvasH);
      })
      .catch(() => {
        // Image non décodable (très ancien navigateur) : la forme décorative est simplement absente
      });
    return () => {
      cancelled = true;
    };
  }, [markup, vw, vh, width, height, blur, pad, canvasW, canvasH]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      width={canvasW}
      height={canvasH}
      className={cn("pointer-events-none absolute block select-none", className)}
      style={{ left: -pad, top: -pad, width: outerW, height: outerH, ...style }}
    />
  );
};

export default BlurredRaster;
