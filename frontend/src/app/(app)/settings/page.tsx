"use client";

import { User, Settings2, CreditCard, Shield, Scale, Calculator, Settings, Key, Lock } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("mesh");

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 flex flex-col md:flex-row gap-12 relative z-10">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex flex-col gap-2 shrink-0">
        <h1 className="font-serif text-3xl tracking-tight mb-6">Settings</h1>
        
        <button 
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "profile" ? "bg-[#cc8b45]/10 text-[#cc8b45] border border-[#cc8b45]/30 shadow-[0_0_15px_rgba(204,139,69,0.2)]" : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}`}
        >
          <User className="w-4 h-4" /> Profile
        </button>
        
        <button 
          onClick={() => setActiveTab("mesh")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "mesh" ? "bg-[#cc8b45]/10 text-[#cc8b45] border border-[#cc8b45]/30 shadow-[0_0_15px_rgba(204,139,69,0.2)]" : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}`}
        >
          <Settings2 className="w-4 h-4" /> Mesh Configuration
        </button>

        <button 
          onClick={() => setActiveTab("api")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "api" ? "bg-[#cc8b45]/10 text-[#cc8b45] border border-[#cc8b45]/30 shadow-[0_0_15px_rgba(204,139,69,0.2)]" : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}`}
        >
          <Key className="w-4 h-4" /> API Keys
        </button>
        
        <button 
          onClick={() => setActiveTab("billing")}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === "billing" ? "bg-[#cc8b45]/10 text-[#cc8b45] border border-[#cc8b45]/30 shadow-[0_0_15px_rgba(204,139,69,0.2)]" : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"}`}
        >
          <CreditCard className="w-4 h-4" /> Billing
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === "mesh" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h2 className="font-serif text-3xl mb-2">Mesh Configuration</h2>
              <p className="opacity-60 text-sm">Configure the underlying LLMs that power each specialist agent in the mesh.</p>
            </header>

            <div className="grid grid-cols-1 gap-6">
              
              {/* Agent 1 */}
              <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
                    <Scale className="w-6 h-6 text-[#cc8b45]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-1">Legal Specialist</h3>
                    <p className="text-xs opacity-50 font-mono uppercase tracking-widest">Model Engine</p>
                  </div>
                </div>
                <div className="w-full sm:w-64">
                  <select className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 appearance-none text-foreground">
                    <option value="claude">Claude Sonnet 4.6 (AI/ML API)</option>
                    <option value="gpt4">GPT-4o (OpenAI)</option>
                    <option value="gemini">Gemini 1.5 Pro (Google)</option>
                  </select>
                </div>
              </div>

              {/* Agent 2 */}
              <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
                    <Calculator className="w-6 h-6 text-[#cc8b45]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-1">Finance Specialist</h3>
                    <p className="text-xs opacity-50 font-mono uppercase tracking-widest">Model Engine</p>
                  </div>
                </div>
                <div className="w-full sm:w-64">
                  <select className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 appearance-none text-foreground">
                    <option value="qwq">QwQ-32B (Featherless AI)</option>
                    <option value="claude">Claude Sonnet 4.6 (AI/ML API)</option>
                    <option value="deepseek">DeepSeek-Coder (Featherless AI)</option>
                  </select>
                </div>
              </div>

              {/* Agent 3 */}
              <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
                    <Shield className="w-6 h-6 text-[#cc8b45]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-1">Risk Specialist</h3>
                    <p className="text-xs opacity-50 font-mono uppercase tracking-widest">Model Engine</p>
                  </div>
                </div>
                <div className="w-full sm:w-64">
                  <select className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 appearance-none text-foreground">
                    <option value="deepseek">DeepSeek-R1 (Featherless AI)</option>
                    <option value="gpt4">GPT-4o (OpenAI)</option>
                    <option value="claude">Claude Opus (AI/ML API)</option>
                  </select>
                </div>
              </div>

              {/* Agent 4 */}
              <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-foreground/5 rounded-xl border border-foreground/10">
                    <Settings className="w-6 h-6 text-[#cc8b45]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-1">Ops Specialist</h3>
                    <p className="text-xs opacity-50 font-mono uppercase tracking-widest">Model Engine</p>
                  </div>
                </div>
                <div className="w-full sm:w-64">
                  <select className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 appearance-none text-foreground">
                    <option value="qwen">Qwen3-235B-A22B (Featherless AI)</option>
                    <option value="llama3">Llama 3 70B (Featherless AI)</option>
                    <option value="mixtral">Mixtral 8x22B (Featherless AI)</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="mt-8 flex justify-end">
              <button className="px-6 py-3 bg-[#cc8b45] text-black text-xs font-bold uppercase tracking-widest rounded-md hover:bg-[#b57a3c] transition-colors shadow-[0_0_20px_rgba(204,139,69,0.3)]">
                Save Configuration
              </button>
            </div>

          </div>
        )}

        {activeTab !== "mesh" && (
          <div className="animate-in fade-in flex flex-col items-center justify-center h-[60vh] text-center border-2 border-dashed border-foreground/5 rounded-3xl bg-background/20">
            <div className="p-4 bg-foreground/5 rounded-full mb-4">
              <Lock className="w-8 h-8 text-foreground/40" />
            </div>
            <h2 className="font-serif text-2xl mb-2">Development Preview</h2>
            <p className="opacity-60 text-sm max-w-sm">The {activeTab} settings are currently locked in this preview environment.</p>
          </div>
        )}
      </main>

    </div>
  );
}
