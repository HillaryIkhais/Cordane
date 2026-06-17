import Image from "next/image";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative rounded-full overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(224,122,95,0.4)] ${className}`}>
      <Image src="/orb.png" alt="Cordane Orb Logo" fill className="object-cover scale-110" />
    </div>
  );
}
