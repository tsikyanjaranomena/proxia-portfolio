import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  variant?: "fixed" | "inline";
}

const ThemeToggle = ({ variant = "fixed" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const icon = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.22, type: "spring", stiffness: 400, damping: 22 }}
      >
        {isDark
          ? <Sun className="w-7 h-7 text-white drop-shadow-sm" />
          : <Moon className="w-7 h-7 text-white drop-shadow-sm" />
        }
      </motion.div>
    </AnimatePresence>
  );

  if (variant === "inline") {
    return (
      <motion.button
        type="button"
        onClick={toggleTheme}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] shadow-md cursor-pointer"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.22, type: "spring", stiffness: 400, damping: 22 }}
          >
            {isDark
              ? <Sun className="w-4 h-4 text-white" />
              : <Moon className="w-4 h-4 text-white" />
            }
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="fixed top-0 right-0 z-[999] w-[88px] h-[88px] rounded-bl-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-start justify-end shadow-[0_4px_24px_rgba(0,102,255,0.45)] cursor-pointer"
    >
      <div className="pt-3 pr-3">
        {icon}
      </div>
    </motion.button>
  );
};

export default ThemeToggle;
