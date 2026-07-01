import { motion } from "framer-motion";

const clients = [
  { name: "Madalift", abbr: "ML", color: "from-blue-500 to-cyan-500" },
  { name: "Chambre Notariale", abbr: "CN", color: "from-indigo-500 to-blue-500" },
  { name: "Madagascar Trade", abbr: "MT", color: "from-teal-500 to-cyan-500" },
  { name: "StartupTech OI", abbr: "ST", color: "from-purple-500 to-pink-500" },
  { name: "FinTech Solutions", abbr: "FS", color: "from-orange-500 to-red-500" },
  { name: "École Nationale", abbr: "EN", color: "from-green-500 to-emerald-500" },
];

// Dupliqué pour la boucle infinie
const allClients = [...clients, ...clients];

const ClientCard = ({ client }: { client: typeof clients[0] }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex-shrink-0 mx-3">
    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${client.color} flex items-center justify-center flex-shrink-0`}>
      <span className="text-white text-xs font-bold">{client.abbr}</span>
    </div>
    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
      {client.name}
    </span>
  </div>
);

const ClientLogos = () => {
  return (
    <section className="py-10 bg-slate-50/80 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 overflow-hidden">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
          Ils nous font confiance
        </span>
      </div>

      <div className="relative">
        {/* Dégradé masque gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50/80 dark:from-slate-900/60 to-transparent z-10 pointer-events-none" />
        {/* Dégradé masque droite */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/80 dark:from-slate-900/60 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {allClients.map((client, i) => (
            <ClientCard key={i} client={client} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
