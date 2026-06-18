"use client";

import { User, Settings2, Scale, Calculator, Settings, Shield, Building2, Briefcase, Globe2, BellRing, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuth();
  
  // Profile State
  const [company, setCompany] = useState("Acme Corp");
  const [role, setRole] = useState("General Counsel");
  const [jurisdiction, setJurisdiction] = useState("US-Delaware");
  const [notifyEscalated, setNotifyEscalated] = useState(true);
  const [notifyApproved, setNotifyApproved] = useState(false);
  const [isProfileSaved, setIsProfileSaved] = useState(false);

  // Mesh Config State
  const [lglModel, setLglModel] = useState("claude");
  const [finModel, setFinModel] = useState("llama3");
  const [rskModel, setRskModel] = useState("deepseek");
  const [opsModel, setOpsModel] = useState("llama3");
  const [isMeshSaved, setIsMeshSaved] = useState(false);

  const handleSaveProfile = () => {
    setIsProfileSaved(true);
    setTimeout(() => setIsProfileSaved(false), 2000);
  };

  const handleSaveMesh = () => {
    setIsMeshSaved(true);
    setTimeout(() => setIsMeshSaved(false), 2000);
  };

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
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === "profile" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h2 className="font-serif text-3xl mb-2">Account Profile</h2>
              <p className="opacity-60 text-sm">Manage your personal information, organization details, and review preferences.</p>
            </header>

            <div className="bg-background/40 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-xl flex flex-col gap-10">
              
              {/* Identity Section */}
              <div className="flex items-center gap-6 pb-8 border-b border-border/50">
                <div className="w-20 h-20 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-foreground/40" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-1">{user?.email?.address || user?.google?.email || "Authenticated User"}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase tracking-widest rounded-md flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Active Session
                    </span>
                    <span className="px-2 py-1 bg-foreground/5 text-foreground/60 border border-foreground/10 text-[10px] font-bold uppercase tracking-widest rounded-md">
                      {user?.google ? 'Google OAuth' : 'Email Login'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 flex items-center gap-2"><Building2 className="w-3 h-3"/> Organization</label>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 transition-all text-foreground" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 flex items-center gap-2"><Briefcase className="w-3 h-3"/> Role</label>
                  <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 transition-all text-foreground" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 flex items-center gap-2"><Globe2 className="w-3 h-3"/> Default Jurisdiction</label>
                  <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} className="bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 transition-all text-foreground appearance-none">
                    <option value="US-Delaware">United States (Delaware)</option>
                    <option value="US-NY">United States (New York)</option>
                    <option value="EU-GDPR">European Union (GDPR)</option>
                    <option value="UK-Eng">United Kingdom (England & Wales)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 flex items-center gap-2"><BellRing className="w-3 h-3"/> Notifications</label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${notifyEscalated ? 'bg-[#cc8b45]' : 'bg-foreground/10 border border-foreground/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${notifyEscalated ? 'right-0.5' : 'left-0.5 opacity-50'}`}></div>
                    </div>
                    <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">Email me on Escaped Deadlocks</span>
                    <input type="checkbox" className="hidden" checked={notifyEscalated} onChange={(e) => setNotifyEscalated(e.target.checked)} />
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${notifyApproved ? 'bg-[#cc8b45]' : 'bg-foreground/10 border border-foreground/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${notifyApproved ? 'right-0.5' : 'left-0.5 opacity-50'}`}></div>
                    </div>
                    <span className="text-sm opacity-80 group-hover:opacity-100 transition-opacity">Email me on Automatic Approvals</span>
                    <input type="checkbox" className="hidden" checked={notifyApproved} onChange={(e) => setNotifyApproved(e.target.checked)} />
                  </label>
                </div>

              </div>

              <div className="mt-4 pt-8 border-t border-border/50 flex justify-between items-center">
                <p className="text-[10px] font-mono opacity-40 break-all max-w-[200px] truncate" title={user?.id}>ID: {user?.id}</p>
                <button 
                  onClick={handleSaveProfile}
                  className={`px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-all flex items-center gap-2 ${isProfileSaved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#cc8b45] text-black hover:bg-[#b57a3c] shadow-[0_0_20px_rgba(204,139,69,0.3)]'}`}
                >
                  {isProfileSaved ? <><CheckCircle2 className="w-4 h-4"/> Saved</> : 'Save Preferences'}
                </button>
              </div>

            </div>
          </div>
        )}

        {activeTab === "mesh" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h2 className="font-serif text-3xl mb-2">Mesh Configuration</h2>
              <p className="opacity-60 text-sm">Configure the underlying LLMs that power each specialist agent in the mesh. Perfect for routing around provider outages.</p>
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
                  <select value={lglModel} onChange={(e) => setLglModel(e.target.value)} className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 appearance-none text-foreground cursor-pointer">
                    <option value="claude">Claude 3.5 Sonnet (AI/ML API)</option>
                    <option value="gpt4">GPT-4o (AI/ML API)</option>
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
                  <select value={finModel} onChange={(e) => setFinModel(e.target.value)} className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 appearance-none text-foreground cursor-pointer">
                    <option value="llama3">Llama 3 70B (AI/ML API)</option>
                    <option value="gpt4">GPT-4o (AI/ML API)</option>
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
                  <select value={rskModel} onChange={(e) => setRskModel(e.target.value)} className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 appearance-none text-foreground cursor-pointer">
                    <option value="deepseek">DeepSeek-Reasoner (AI/ML API)</option>
                    <option value="claude">Claude 3.5 Sonnet (AI/ML API)</option>
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
                  <select value={opsModel} onChange={(e) => setOpsModel(e.target.value)} className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-[#cc8b45]/50 focus:ring-1 focus:ring-[#cc8b45]/50 appearance-none text-foreground cursor-pointer">
                    <option value="llama3">Llama 3 70B (AI/ML API)</option>
                    <option value="gpt4">GPT-4o (AI/ML API)</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleSaveMesh}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest rounded-md transition-all flex items-center gap-2 ${isMeshSaved ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-[#cc8b45] text-black hover:bg-[#b57a3c] shadow-[0_0_20px_rgba(204,139,69,0.3)]'}`}
              >
                {isMeshSaved ? <><CheckCircle2 className="w-4 h-4"/> Saved</> : 'Save Configuration'}
              </button>
            </div>

          </div>
        )}
      </main>

    </div>
  );
}
