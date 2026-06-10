import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Cordane | Multi-Agent Consensus Engine",
  description: "Enterprise Behavioral Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative overflow-x-hidden font-sans text-[#4e342e]">
        {/* Global Persistent Background */}
        <div className="fixed inset-0 z-[-2] bg-[#fdfbf7]"></div>
        <div className="fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        
        <Navbar />
        <div className="pt-32">
          {children}
        </div>
      </body>
    </html>
  );
}
