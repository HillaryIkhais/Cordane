import Image from "next/image";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      <Image 
        src="/logo-icon.png" 
        alt="Cordane Logo" 
        fill 
        className="object-contain drop-shadow-[0_0_10px_rgba(204,139,69,0.6)]" 
      />
    </div>
  );
}
