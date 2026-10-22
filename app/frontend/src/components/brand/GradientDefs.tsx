/**
 * Dégradés SVG partagés, à monter une seule fois dans la page.
 * Usage : <Icon stroke="url(#brand-stroke)" />
 * (userSpaceOnUse sur le viewBox 256 des icônes : fonctionne aussi sur les lignes droites)
 */
export const BRAND_STROKE = "url(#brand-stroke)";

const GradientDefs = () => (
  <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="brand-stroke" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="256" y2="256">
        <stop offset="0" stopColor="#00EEFD" />
        <stop offset="0.37" stopColor="#01C0FE" />
        <stop offset="0.79" stopColor="#0065FC" />
      </linearGradient>
    </defs>
  </svg>
);

export default GradientDefs;
