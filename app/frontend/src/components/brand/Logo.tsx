import { BRAND_LOGOS, BRAND_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** `auto` : logo standard en clair, version blanc/cyan en sombre. `white` : tout blanc (footer). */
  variant?: "auto" | "white";
  className?: string;
}

const Logo = ({ variant = "auto", className }: LogoProps) => {
  if (variant === "white") {
    return <img src={BRAND_LOGOS.white} alt={BRAND_NAME} className={cn("h-11 w-auto", className)} />;
  }

  return (
    <span className={cn("relative inline-flex h-12 shrink-0", className)}>
      <img src={BRAND_LOGOS.standard} alt={BRAND_NAME} className="h-full w-auto dark:hidden" />
      <img src={BRAND_LOGOS.dark} alt={BRAND_NAME} className="hidden h-full w-auto dark:block" />
    </span>
  );
};

export default Logo;
