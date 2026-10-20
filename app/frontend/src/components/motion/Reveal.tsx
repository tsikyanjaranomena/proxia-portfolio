import { motion, useInView, type HTMLMotionProps, type Variants } from "framer-motion";
import { Fragment, useRef, type ReactNode } from "react";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

const revealVariants = (direction: Direction, distance: number, blur: boolean): Variants => ({
  hidden: { opacity: 0, ...offset(direction, distance), ...(blur ? { filter: "blur(8px)" } : {}) },
  visible: { opacity: 1, x: 0, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) },
});

/** Zone de déclenchement commune à toutes les apparitions (textes, traits…). */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  blur?: boolean;
}

/** Apparition fluide d'un bloc lorsqu'il entre dans le viewport. */
export const Reveal = ({
  children,
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 0.9,
  blur = true,
  ...props
}: RevealProps) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={VIEWPORT}
    variants={revealVariants(direction, distance, blur)}
    transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    {...props}
  >
    {children}
  </motion.div>
);

/** Balises possibles pour les blocs animés (sémantique conservée). */
type RevealTag = "div" | "article" | "figure" | "ul" | "li" | "h3" | "p" | "span" | "blockquote";
const motionTag = (tag: RevealTag) => motion[tag] as typeof motion.div;

interface RevealGroupProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  as?: RevealTag;
}

/** Conteneur qui déclenche ses <RevealItem> en cascade. */
export const RevealGroup = ({ children, stagger = 0.08, delay = 0, as = "div", ...props }: RevealGroupProps) => {
  const Tag = motionTag(as);
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...props}
    >
      {children}
    </Tag>
  );
};

interface RevealItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  blur?: boolean;
  as?: RevealTag;
}

export const RevealItem = ({
  children,
  direction = "up",
  distance = 24,
  duration = 0.8,
  blur = true,
  as = "div",
  ...props
}: RevealItemProps) => {
  const Tag = motionTag(as);
  return (
    <Tag variants={revealVariants(direction, distance, blur)} transition={{ duration, ease: EASE_OUT_EXPO }} {...props}>
      {children}
    </Tag>
  );
};

export interface TextSegment {
  text: string;
  className?: string;
}

const TAGS = { h1: "h1", h2: "h2", h3: "h3", p: "p" } as const;

interface SplitTextProps {
  /** Texte simple, ou segments pour styliser certains mots (ex. dégradé). */
  segments: TextSegment[] | string;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Révèle un titre mot par mot : chaque mot remonte depuis un masque.
 * Les sauts de ligne (\n) dans le texte sont conservés.
 * Chaque mot reçoit directement l'état visible/caché (pas de propagation de variants),
 * pour qu'aucun mot ne puisse rester bloqué à opacity: 0.
 */
export const SplitText = ({ segments, as = "h2", className, delay = 0, stagger = 0.06 }: SplitTextProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const Tag = TAGS[as];

  const parts: TextSegment[] = typeof segments === "string" ? [{ text: segments }] : segments;
  const label = parts.map((p) => p.text).join("").replace(/\n/g, " ");

  // 1. Découpe en jetons : mots, espaces, retours à la ligne.
  //    Un segment stylé (ex. dégradé) reste d'un seul bloc pour que le dégradé couvre toute l'expression.
  type Token = { kind: "word"; text: string; className?: string } | { kind: "space" } | { kind: "br" };
  const tokens: Token[] = parts.flatMap((segment) =>
    (segment.className ? [segment.text] : segment.text.split(/(\n| )/)).flatMap<Token>((piece) => {
      if (piece === "\n") return [{ kind: "br" }];
      if (piece === " ") return [{ kind: "space" }];
      return piece ? [{ kind: "word", text: piece, className: segment.className }] : [];
    }),
  );

  // 2. Regroupe les mots collés sans espace (ex. « l' » + « excellence ») : ils ne sont jamais séparés.
  const groups: Array<Token | Array<Extract<Token, { kind: "word" }>>> = [];
  for (const token of tokens) {
    const last = groups[groups.length - 1];
    if (token.kind === "word" && Array.isArray(last)) last.push(token);
    else groups.push(token.kind === "word" ? [token] : token);
  }

  let wordIndex = 0;
  const renderWord = (word: Extract<Token, { kind: "word" }>, key: string) => {
    const index = wordIndex++;
    return (
      <span key={key} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
        <motion.span
          className={`inline-block ${word.className ?? ""}`}
          initial={{ y: "105%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
          transition={{ duration: 0.9, delay: delay + index * stagger, ease: EASE_OUT_EXPO }}
        >
          {word.text}
        </motion.span>
      </span>
    );
  };

  const content = groups.map((group, i) => {
    if (Array.isArray(group)) {
      if (group.length === 1) return renderWord(group[0], `w${i}`);
      return (
        <span key={`g${i}`} className="inline-block whitespace-nowrap">
          {group.map((word, j) => renderWord(word, `w${i}-${j}`))}
        </span>
      );
    }
    // Espace + <br> : si le <br> est masqué (mobile), les mots restent séparés
    if (group.kind === "br") return <Fragment key={`b${i}`}> <br /></Fragment>;
    return " ";
  });
  return (
    <Tag ref={ref} className={className} aria-label={label}>
      <span aria-hidden="true">{content}</span>
    </Tag>
  );
};
