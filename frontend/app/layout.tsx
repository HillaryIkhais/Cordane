import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/modules/Navbar";

export const metadata: Metadata = {
  title: "Cordane | Automated Contract Review",
  description: "Upload a vendor contract. Four specialist agents review it, negotiate, and give you a clear verdict.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen relative overflow-x-hidden font-sans text-white bg-[#050505]">
        {children}
      </body>
    </html>
  );
}
