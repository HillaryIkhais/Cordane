"use client";
import { motion } from "framer-motion";
import { FileText, Plus } from "lucide-react";

export default function ScenariosPage() {
  const scenarios = [
    { id: "scenario_1", title: "Basic Software License (Happy Path)", status: "Ready", date: "Jun 08, 2026" },
    { id: "scenario_2", title: "Cloud Hosting Agreement (Compromise)", status: "Ready", date: "Jun 09, 2026" },
    { id: "scenario_3", title: "Vendor Liability Contract (Deadlock)", status: "Ready", date: "Jun 10, 2026" }
  ];

  return (
    <div className="flex flex-col items-center px-4 sm:px-8 pb-20">
      <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="w-full max-w-4xl mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-light text-[#4e342e] mb-4">Contract Scenarios</h1>
          <p className="text-[#8d6e63] font-light text-lg">Upload contracts and test how the agents negotiate.</p>
        </div>
        <button className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/80 text-[#e07a5f] px-6 py-3 rounded-full text-xs tracking-widest font-bold transition-all shadow-sm hover:shadow-md hover:bg-white/80 active:scale-95">
          <Plus className="w-4 h-4" />
          UPLOAD CONTRACT
        </button>
      </motion.div>

      <div className="w-full max-w-4xl flex flex-col gap-4">
        {scenarios.map((sc, i) => (
          <motion.div 
            key={sc.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/50 backdrop-blur-xl border border-white/80 rounded-2xl p-6 shadow-[0_8px_30px_-10px_rgba(224,122,95,0.1)] flex flex-col md:flex-row justify-between items-center hover:bg-white/70 transition-colors cursor-pointer gap-4"
          >
            <div className="flex items-center gap-6">
              <div className="bg-white/70 p-4 rounded-2xl border border-white shadow-sm">
                <FileText className="w-6 h-6 text-[#e07a5f]" strokeWidth={1.5} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold text-[#4e342e] mb-1">{sc.title}</h3>
                <p className="text-[#8d6e63] text-xs font-mono">{sc.id} • Added {sc.date}</p>
              </div>
            </div>
            <div className={`px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#fdfbf7] text-[#e07a5f] border border-white/80 shadow-inner`}>
              {sc.status}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
