import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agents | Cordane Consensus Engine",
  description: "View the active specialized AI agents enforcing compliance in the Cordane network.",
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
