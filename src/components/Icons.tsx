type P = { className?: string };
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export const ArrowRight = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ArrowLeft = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
export const Close = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const Search = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
export const Pin = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>;
export const Clock = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const Bag = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>;
export const Plus = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>;
export const Menu = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><path d="M4 8h16M4 16h16" /></svg>;
export const Instagram = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>;
export const Phone = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} {...s} aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
export const Star = ({ className }: P) => <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path fill="currentColor" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" /></svg>;
export const WhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z" /></svg>
);
