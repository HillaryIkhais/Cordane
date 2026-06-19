"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, FileText, Settings2, ShieldAlert, Zap, Lock } from "lucide-react";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  
  // Mesh Config Toggle States
  const [strictLiability, setStrictLiability] = useState(true);
  const [gdprCompliance, setGdprCompliance] = useState(false);
  const [fastExecution, setFastExecution] = useState(false);

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileAction = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    let file: File | undefined;
    let uploadMethod = 'browse';

    if ('dataTransfer' in e) {
      file = e.dataTransfer.files?.[0];
      uploadMethod = 'drag_and_drop';
    } else {
      file = e.target.files?.[0];
    }

    pendo.track("contract_file_uploaded", {
      fileType: file?.type || "unknown",
      fileName: file?.name || "unknown",
      fileSize: file?.size || 0,
      uploadMethod: uploadMethod,
    });

    // In a real app we'd process the file here. For now, navigate.
    router.push('/platform');
  };

  const handleToggleConfig = (configName: string, setter: (v: boolean) => void, currentValue: boolean) => {
    const newValue = !currentValue;
    setter(newValue);
    pendo.track("upload_mesh_config_toggled", {
      configName: configName,
      enabled: newValue,
      strictLiability: configName === "Strict Liability Focus" ? newValue : strictLiability,
      gdprCompliance: configName === "GDPR Compliance" ? newValue : gdprCompliance,
      fastExecution: configName === "Fast Execution Mode" ? newValue : fastExecution,
    });
  };
  
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 flex flex-col gap-12 relative z-10">
      
      <header className="flex justify-between items-end mb-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight mb-2">Upload Contract</h1>
          <p className="opacity-60 text-sm font-mono uppercase tracking-widest">Initialize New Review Mesh</p>
        </div>
      </header>

      {/* Main Drag & Drop Zone */}
      <div 
        onClick={handleFileAction}
        className={`w-full h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center text-center transition-all duration-500 relative overflow-hidden group cursor-pointer ${isDragging ? 'bg-[#cc8b45]/10 border-[#cc8b45] shadow-[0_0_50px_rgba(204,139,69,0.2)]' : 'bg-background/40 backdrop-blur-xl border-border/50 hover:bg-background/60 hover:border-[#cc8b45]/50 shadow-2xl'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { setIsDragging(false); handleFileSelect(e); }}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileSelect} 
          accept=".pdf,.doc,.docx,.txt"
        />
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#cc8b45] blur-[150px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"></div>
        
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-transform duration-500 ${isDragging ? 'bg-[#cc8b45] scale-110 shadow-[0_0_30px_rgba(204,139,69,0.5)]' : 'bg-[#cc8b45]/10 group-hover:bg-[#cc8b45]/20 group-hover:scale-105'}`}>
          <Upload className={`w-10 h-10 ${isDragging ? 'text-black' : 'text-[#cc8b45]'}`} />
        </div>
        
        <h3 className="font-serif text-3xl mb-3">Drag & Drop Document</h3>
        <p className="text-sm opacity-50 font-mono uppercase tracking-widest max-w-sm">Supports PDF, DOCX, TXT. <br/>Maximum file size: 50MB.</p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 relative z-20">
          <button onClick={handleFileAction} className="px-8 py-3 bg-foreground/5 border border-foreground/10 text-foreground text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#cc8b45]/20 hover:border-[#cc8b45]/50 hover:text-[#cc8b45] transition-all shadow-xl">
            Browse Files
          </button>
          <button onClick={(e) => { e.stopPropagation(); router.push('/platform'); }} className="px-8 py-3 bg-transparent border border-transparent text-[#cc8b45] text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#cc8b45]/10 hover:border-[#cc8b45]/30 transition-all">
            Run Demo Scenario
          </button>
        </div>
      </div>

      {/* Advanced Configuration */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Settings2 className="w-5 h-5 text-[#cc8b45]" />
          <h2 className="font-serif text-2xl">Mesh Configuration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Config Toggle 1 */}
          <div 
            onClick={() => handleToggleConfig("Strict Liability Focus", setStrictLiability, strictLiability)}
            className={`bg-background/60 backdrop-blur-xl border rounded-xl p-6 flex flex-col gap-4 shadow-xl transition-all group cursor-pointer ${strictLiability ? 'border-[#cc8b45]/30' : 'border-border/50 hover:border-foreground/20 opacity-70 hover:opacity-100'}`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-lg border transition-colors ${strictLiability ? 'bg-[#cc8b45]/10 border-[#cc8b45]/20 text-[#cc8b45]' : 'bg-foreground/5 border-foreground/10 text-foreground/60 group-hover:text-foreground'}`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${strictLiability ? 'bg-[#cc8b45] shadow-[0_0_15px_rgba(204,139,69,0.4)]' : 'bg-foreground/10 border border-foreground/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${strictLiability ? 'bg-black right-0.5' : 'bg-foreground/40 left-0.5'}`}></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-1">Strict Liability Focus</h4>
              <p className="text-xs opacity-60 leading-relaxed">Forces the Legal agent to aggressively flag any uncapped liability clauses regardless of deal size.</p>
            </div>
          </div>

          {/* Config Toggle 2 */}
          <div 
            onClick={() => handleToggleConfig("GDPR Compliance", setGdprCompliance, gdprCompliance)}
            className={`bg-background/60 backdrop-blur-xl border rounded-xl p-6 flex flex-col gap-4 shadow-xl transition-all group cursor-pointer ${gdprCompliance ? 'border-[#cc8b45]/30' : 'border-border/50 hover:border-foreground/20 opacity-70 hover:opacity-100'}`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-lg border transition-colors ${gdprCompliance ? 'bg-[#cc8b45]/10 border-[#cc8b45]/20 text-[#cc8b45]' : 'bg-foreground/5 border-foreground/10 text-foreground/60 group-hover:text-foreground'}`}>
                <Lock className="w-5 h-5" />
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${gdprCompliance ? 'bg-[#cc8b45] shadow-[0_0_15px_rgba(204,139,69,0.4)]' : 'bg-foreground/10 border border-foreground/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${gdprCompliance ? 'bg-black right-0.5' : 'bg-foreground/40 left-0.5'}`}></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-1">GDPR Compliance</h4>
              <p className="text-xs opacity-60 leading-relaxed">Prioritizes European data residency and processing checks across all agent models.</p>
            </div>
          </div>

          {/* Config Toggle 3 */}
          <div 
            onClick={() => handleToggleConfig("Fast Execution Mode", setFastExecution, fastExecution)}
            className={`bg-background/60 backdrop-blur-xl border rounded-xl p-6 flex flex-col gap-4 shadow-xl transition-all group cursor-pointer ${fastExecution ? 'border-[#cc8b45]/30' : 'border-border/50 hover:border-foreground/20 opacity-70 hover:opacity-100'}`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-lg border transition-colors ${fastExecution ? 'bg-[#cc8b45]/10 border-[#cc8b45]/20 text-[#cc8b45]' : 'bg-foreground/5 border-foreground/10 text-foreground/60 group-hover:text-foreground'}`}>
                <Zap className="w-5 h-5" />
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${fastExecution ? 'bg-[#cc8b45] shadow-[0_0_15px_rgba(204,139,69,0.4)]' : 'bg-foreground/10 border border-foreground/10'}`}>
                <div className={`w-4 h-4 rounded-full absolute top-0.5 transition-all ${fastExecution ? 'bg-black right-0.5' : 'bg-foreground/40 left-0.5'}`}></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-1">Fast Execution Mode</h4>
              <p className="text-xs opacity-60 leading-relaxed">Limits the negotiation mesh to a single round to drastically speed up time-to-verdict.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
