import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Dashboard | Cordane",
  description: "Upload contracts, run automated reviews, and see what each department thinks.",
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return children;
}
