export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M20 6C12.268 6 6 12.268 6 20C6 27.732 12.268 34 20 34H34V20C34 12.268 27.732 6 20 6Z" 
        className="fill-[#e07a5f]/10 stroke-[#e07a5f]" 
        strokeWidth="3" 
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="5" className="fill-[#e07a5f]"/>
      <path d="M34 20H20" className="stroke-[#e07a5f]" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
