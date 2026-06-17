"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const messages = [
  { agent: "LGL", color: "text-foreground/40", text: "Clause 4.2 limits liability to $1M. Unacceptable for this volume." },
  { agent: "FIN", color: "text-foreground/40", text: "Agreed. Raising ceiling to $5M aligns with our risk matrix." },
  { agent: "RSK", color: "text-foreground/40", text: "Checking vendor compliance... OFAC cleared. GDPR compliant." },
  { agent: "OPS", color: "text-[#cc8b45]", text: "SLA obligations verified. Systems go for signature." }
];

export function TypewriterFeed({ activeIndex, onActiveIndexChange }: { activeIndex: number, onActiveIndexChange: (idx: number) => void }) {
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  
  useEffect(() => {
    if (activeIndex >= messages.length) {
      const timer = setTimeout(() => {
        onActiveIndexChange(0);
        setCurrentCharIdx(0);
      }, 5000);
      return () => clearTimeout(timer);
    }

    const currentText = messages[activeIndex].text;
    if (currentCharIdx < currentText.length) {
      const timer = setTimeout(() => {
        setCurrentCharIdx(prev => prev + 1);
      }, 30); // typing speed
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onActiveIndexChange(activeIndex + 1);
        setCurrentCharIdx(0);
      }, 2000); // pause between messages
      return () => clearTimeout(timer);
    }
  }, [activeIndex, currentCharIdx, onActiveIndexChange]);

  return (
    <div className="w-[105%] -ml-[2.5%] bg-background/80 backdrop-blur-2xl border border-border/50 rounded-xl p-6 shadow-2xl mt-8 flex flex-col gap-3 min-h-[140px] transition-colors duration-700 ease-in-out">
      {messages.map((msg, idx) => {
        if (idx > activeIndex) return null;
        
        const isCurrent = idx === activeIndex;
        const displayedText = isCurrent ? msg.text.substring(0, currentCharIdx) : msg.text;
        
        return (
          <div key={idx} className="flex gap-4 items-start">
            <span className={`font-mono text-[10px] uppercase font-bold pt-0.5 ${msg.color}`}>{msg.agent}</span>
            <p className={`text-xs ${idx === messages.length - 1 ? 'text-foreground font-medium' : 'text-foreground/70'} transition-colors duration-700`}>
              {displayedText}
              {isCurrent && (
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }} 
                  className="inline-block w-1.5 h-3 bg-[#cc8b45] ml-1 align-middle" 
                />
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
