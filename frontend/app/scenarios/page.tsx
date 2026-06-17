"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Plus, X } from "lucide-react";

export default function ScenariosPage() {
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contractText, setContractText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    try {
      const res = await fetch("/api/scenarios");
      if (res.ok) {
        const data = await res.json();
        setScenarios(data);
      }
    } catch (e) {
      console.error("Failed to fetch scenarios", e);
    }
  };

  const handleUpload = async () => {
    if (!title || !contractText) return;
    setLoading(true);
    try {
      const res = await fetch("/api/scenarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, contract_text: contractText }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setTitle("");
        setContractText("");
        fetchScenarios();
      }
    } catch (e) {
      console.error("Failed to upload scenario", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="scenarios-main" className="flex flex-col items-center px-4 sm:px-8 pb-20 relative min-h-[80vh]">
      <motion.div initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} className="w-full max-w-4xl mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-light text-[#4e342e] mb-4">Contract Scenarios</h1>
          <p className="text-[#8d6e63] font-light text-lg">Upload contracts and test how the agents negotiate.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/80 text-[#e07a5f] px-6 py-3 rounded-full text-xs tracking-widest font-bold transition-all shadow-sm hover:shadow-md hover:bg-white/80 active:scale-95"
        >
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

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#fdfbf7]/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/90 backdrop-blur-2xl border border-white p-8 rounded-[2rem] w-full max-w-2xl shadow-2xl relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-[#8d6e63] hover:text-[#e07a5f] transition-colors">
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-semibold text-[#4e342e] mb-2">Upload Contract</h2>
              <p className="text-[#8d6e63] text-sm mb-6">Paste your raw contract text below to inject it into the Cordane knowledge base.</p>
              
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Contract Title (e.g. AWS Enterprise SLA)" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/50 border border-white/80 rounded-xl px-4 py-3 text-[#4e342e] outline-none focus:ring-2 ring-[#e07a5f]/50 placeholder-[#a1887f]"
                />
                <textarea 
                  placeholder="Paste contract text here..." 
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  className="w-full h-48 bg-white/50 border border-white/80 rounded-xl px-4 py-3 text-[#4e342e] outline-none focus:ring-2 ring-[#e07a5f]/50 placeholder-[#a1887f] resize-none"
                />
                
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={handleUpload}
                    disabled={loading || !title || !contractText}
                    className="bg-gradient-to-r from-[#e07a5f] to-[#e29578] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-[0_4px_15px_0_rgba(224,122,95,0.3)] hover:shadow-[0_8px_25px_0_rgba(224,122,95,0.5)] disabled:opacity-50 active:scale-95"
                  >
                    {loading ? "UPLOADING..." : "SAVE SCENARIO"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
