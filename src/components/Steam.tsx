/** Vapor: fios suaves subindo, desfocados. */
export function Steam({ className = '', strands = 3 }: { className?: string; strands?: number }) {
  return (
    <div className={`steam ${className}`} aria-hidden="true">
      {Array.from({ length: strands }, (_, i) => (
        <svg key={i} viewBox="0 0 60 220" className="steam-strand" style={{ ['--i' as string]: i }}>
          <path d="M30 215C10 180 50 150 30 115S12 50 32 5" />
        </svg>
      ))}
    </div>
  );
}
