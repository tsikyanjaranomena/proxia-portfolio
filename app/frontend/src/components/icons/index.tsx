import type { ReactNode, SVGProps } from "react";

/**
 * Icônes du projet — tracés repris tels quels de /icônes/*.svg (Phosphor, viewBox 256).
 * Elles héritent de `currentColor` : la couleur se règle avec une classe `text-*`,
 * la taille avec `size` (px) et l'épaisseur avec `strokeWidth` (unités du viewBox).
 */
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  size?: number | string;
  strokeWidth?: number;
}

const createIcon = (displayName: string, body: ReactNode) => {
  const Icon = ({ size = 20, strokeWidth = 16, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {body}
    </svg>
  );
  Icon.displayName = displayName;
  return Icon;
};

export const ArrowDownRightIcon = createIcon(
  "ArrowDownRightIcon",
  <>
    <line x1="64" y1="64" x2="192" y2="192" />
    <polyline points="88 192 192 192 192 88" />
  </>,
);

export const CaretLeftIcon = createIcon("CaretLeftIcon", <polyline points="160 208 80 128 160 48" />);

export const CaretRightIcon = createIcon("CaretRightIcon", <polyline points="96 48 176 128 96 208" />);

/** caret-left + caret-right combinés (« < > ») pour le service Logiciels sur mesure. */
export const CodeIcon = createIcon(
  "CodeIcon",
  <>
    <polyline points="104 208 24 128 104 48" />
    <polyline points="152 48 232 128 152 208" />
  </>,
);

export const CheckCircleIcon = createIcon(
  "CheckCircleIcon",
  <>
    <polyline points="88 136 112 160 168 104" />
    <circle cx="128" cy="128" r="96" />
  </>,
);

export const CloudIcon = createIcon(
  "CloudIcon",
  <path d="M80,128a80,80,0,1,1,80,80H72A56,56,0,1,1,85.92,97.74" />,
);

export const DatabaseIcon = createIcon(
  "DatabaseIcon",
  <>
    <ellipse cx="128" cy="80" rx="88" ry="48" />
    <path d="M40,80v48c0,26.51,39.4,48,88,48s88-21.49,88-48V80" />
    <path d="M40,128v48c0,26.51,39.4,48,88,48s88-21.49,88-48V128" />
  </>,
);

export const DeviceMobileIcon = createIcon(
  "DeviceMobileIcon",
  <>
    <rect x="24" y="64" width="208" height="128" rx="16" transform="translate(256) rotate(90)" />
    <circle cx="128" cy="60" r="12" fill="currentColor" stroke="none" />
  </>,
);

export const EnvelopeIcon = createIcon(
  "EnvelopeIcon",
  <>
    <path d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z" />
    <polyline points="224 56 128 144 32 56" />
  </>,
);

export const GlobeIcon = createIcon(
  "GlobeIcon",
  <>
    <line x1="32" y1="128" x2="224" y2="128" />
    <circle cx="128" cy="128" r="96" />
    <path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z" />
  </>,
);

export const HeadphonesIcon = createIcon(
  "HeadphonesIcon",
  <path d="M224,128H192a16,16,0,0,0-16,16v40a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16V128a96,96,0,1,0-192,0v56a16,16,0,0,0,16,16H64a16,16,0,0,0,16-16V144a16,16,0,0,0-16-16H32" />,
);

export const MapPinIcon = createIcon(
  "MapPinIcon",
  <>
    <circle cx="128" cy="104" r="32" />
    <path d="M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z" />
  </>,
);

export const MoonIcon = createIcon(
  "MoonIcon",
  <path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" />,
);

export const PaletteIcon = createIcon(
  "PaletteIcon",
  <>
    <path d="M128,192a24,24,0,0,1,24-24h46.21a24,24,0,0,0,23.4-18.65A96.48,96.48,0,0,0,224,127.17c-.45-52.82-44.16-95.7-97-95.17a96,96,0,0,0-95,96c0,41.81,26.73,73.44,64,86.61A24,24,0,0,0,128,192Z" />
    <g fill="currentColor" stroke="none">
      <circle cx="128" cy="76" r="12" />
      <circle cx="84" cy="100" r="12" />
      <circle cx="84" cy="156" r="12" />
      <circle cx="172" cy="100" r="12" />
    </g>
  </>,
);

export const PaperPlaneIcon = createIcon(
  "PaperPlaneIcon",
  <>
    <line x1="144" y1="128" x2="80" y2="128" />
    <path d="M48.49,221.28A8,8,0,0,0,59.93,231l168-96.09a8,8,0,0,0,0-14l-168-95.85a8,8,0,0,0-11.44,9.67L80,128Z" />
  </>,
);

export const PhoneIcon = createIcon(
  "PhoneIcon",
  <path d="M164.39,145.34a8,8,0,0,1,7.59-.69l47.16,21.13a8,8,0,0,1,4.8,8.3A48.33,48.33,0,0,1,176,216,136,136,0,0,1,40,80,48.33,48.33,0,0,1,81.92,32.06a8,8,0,0,1,8.3,4.8l21.13,47.2a8,8,0,0,1-.66,7.53L89.32,117a7.93,7.93,0,0,0-.54,7.81c8.27,16.93,25.77,34.22,42.75,42.41a7.92,7.92,0,0,0,7.83-.59Z" />,
);

export const PlayIcon = createIcon(
  "PlayIcon",
  <path d="M72,39.88V216.12a8,8,0,0,0,12.15,6.69l144.08-88.12a7.82,7.82,0,0,0,0-13.38L84.15,33.19A8,8,0,0,0,72,39.88Z" />,
);

export const ShieldIcon = createIcon(
  "ShieldIcon",
  <path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" />,
);

const STAR_PATH =
  "M128,189.09l54.72,33.65a8.4,8.4,0,0,0,12.52-9.17l-14.88-62.79,48.7-42A8.46,8.46,0,0,0,224.27,94L160.36,88.8,135.74,29.2a8.36,8.36,0,0,0-15.48,0L95.64,88.8,31.73,94a8.46,8.46,0,0,0-4.79,14.83l48.7,42L60.76,213.57a8.4,8.4,0,0,0,12.52,9.17Z";

export const StarIcon = createIcon("StarIcon", <path d={STAR_PATH} />);

/** Variante pleine de star.svg (étoiles des témoignages). */
export const StarFilledIcon = createIcon(
  "StarFilledIcon",
  <path d={STAR_PATH} fill="currentColor" />,
);

export const HeartIcon = createIcon(
  "HeartIcon",
  <path d="M128,224S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32a54,54,0,0,1,54,54C232,168,128,224,128,224Z" />,
);

export const TargetIcon = createIcon(
  "TargetIcon",
  <>
    <line x1="128" y1="128" x2="224" y2="32" />
    <path d="M195.88,60.12a95.88,95.88,0,1,0,18.77,26.49" />
    <path d="M161.94,94.06a48,48,0,1,0,14,31.2" />
  </>,
);

export const MedalIcon = createIcon(
  "MedalIcon",
  <>
    <circle cx="128" cy="96" r="80" />
    <circle cx="128" cy="96" r="48" />
    <polyline points="176 160 176 240 127.99 216 80 240 80 160.01" />
  </>,
);

/** Icônes absentes du dossier, construites dans le même style (trait 16, viewBox 256). */
export const SunIcon = createIcon(
  "SunIcon",
  <>
    <circle cx="128" cy="128" r="56" />
    <line x1="128" y1="16" x2="128" y2="40" />
    <line x1="128" y1="216" x2="128" y2="240" />
    <line x1="48.8" y1="48.8" x2="65.8" y2="65.8" />
    <line x1="190.2" y1="190.2" x2="207.2" y2="207.2" />
    <line x1="16" y1="128" x2="40" y2="128" />
    <line x1="216" y1="128" x2="240" y2="128" />
    <line x1="48.8" y1="207.2" x2="65.8" y2="190.2" />
    <line x1="190.2" y1="65.8" x2="207.2" y2="48.8" />
  </>,
);

export const ListIcon = createIcon(
  "ListIcon",
  <>
    <line x1="40" y1="80" x2="216" y2="80" />
    <line x1="40" y1="128" x2="216" y2="128" />
    <line x1="40" y1="176" x2="216" y2="176" />
  </>,
);

export const XIcon = createIcon(
  "XIcon",
  <>
    <line x1="200" y1="56" x2="56" y2="200" />
    <line x1="200" y1="200" x2="56" y2="56" />
  </>,
);

export const WarningCircleIcon = createIcon(
  "WarningCircleIcon",
  <>
    <circle cx="128" cy="128" r="96" />
    <line x1="128" y1="80" x2="128" y2="136" />
    <circle cx="128" cy="172" r="6" fill="currentColor" />
  </>,
);
