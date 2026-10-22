import { cva, type VariantProps } from "class-variance-authority";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/** Boutons de la maquette (captures/Frame 33.png). */
const buttonVariants = cva(
  "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap font-body font-medium transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        /** « Hero button » (Figma) : dégradé « Linear », réservé au bouton principal du hero */
        gradient:
          "overflow-hidden rounded-[5px] bg-[image:var(--gradient-button)] text-white shadow-[0_8px_20px_-12px_rgb(0_102_255/0.7)] hover:shadow-glow hover:brightness-110 active:scale-[0.98]",
        /** « Default button size » (Figma) : bleu plein #0066FF (en-tête, sections, formulaires) */
        primary:
          "rounded-[5px] bg-brand text-white shadow-[0_6px_16px_-10px_rgb(0_102_255/0.8)] hover:bg-[#0058E0] hover:shadow-glow active:scale-[0.98]",
        /** « Button ▷ » : lien texte avec icône */
        ghost: "text-body hover:text-brand",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-7 text-base",
        text: "h-auto px-0 text-sm",
        block: "h-10 w-full px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "sm" },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  className?: string;
};

type AsAnchor = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; asLink?: undefined };
/** Lien interne de l'application (react-router) */
type AsRouterLink = ButtonBaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { asLink: string; href?: undefined };
type AsButton = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; asLink?: undefined };

export type ButtonProps = AsAnchor | AsRouterLink | AsButton;

const Button = ({ variant, size, className, children, ...props }: ButtonProps) => {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (typeof props.asLink === "string") {
    const { asLink, ...rest } = props as AsRouterLink;
    return (
      <Link to={asLink} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (typeof (props as AsAnchor).href === "string") {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};

export default Button;
