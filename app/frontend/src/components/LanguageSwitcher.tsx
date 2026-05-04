import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Language } from "@/lib/translations";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const langs: { code: Language; label: string }[] = [
    { code: "fr", label: "FR" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100/95 p-1 shadow-sm backdrop-blur-sm">
      <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" aria-hidden="true" />
      {langs.map((lang) => {
        const isActive = language === lang.code;

        return (
          <motion.button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-[color,background-color,border-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/30 ${
              isActive
                ? "border-transparent bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white shadow-[0_6px_16px_rgba(0,102,255,0.22)]"
                : "border-slate-300 bg-slate-200 text-slate-900 shadow-sm hover:border-[#0066FF]/25 hover:bg-slate-200 hover:text-[#0066FF]"
            }`}
            aria-label={`Switch to ${lang.label}`}
            aria-pressed={isActive}
            style={
              isActive
                ? { color: "#ffffff" }
                : {
                    backgroundColor: "#e2e8f0",
                    color: "#0f172a",
                    borderColor: "#cbd5e1",
                  }
            }
          >
            <span style={{ color: isActive ? "#ffffff" : "#0f172a" }}>{lang.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
