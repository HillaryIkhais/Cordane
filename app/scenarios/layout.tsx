import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scenarios | Cordane Consensus Engine",
  description: "Upload and manage contract scenarios for multi-agent evaluation.",
};

export default function ScenariosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
