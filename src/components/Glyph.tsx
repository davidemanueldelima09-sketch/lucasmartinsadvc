import type { Glyph as G } from '../data/types';

/** Ilustrações em traço fino (estilo gravura dourada) — usadas quando não há foto. */
const paths: Record<G, React.ReactNode> = {
  cup: (<><path d="M24 52h60v8c0 20-13 34-30 34S24 80 24 60z" /><path d="M84 58c10 0 14 5 14 11s-5 11-14 11" /><ellipse cx="54" cy="52" rx="30" ry="6" /><path d="M14 98c10 6 70 6 80 0" /><path d="M44 40c-4-6 4-10 0-16M56 40c-4-6 4-10 0-18M68 40c-4-6 4-10 0-16" /></>),
  frappe: (<><path d="M36 44h48l-6 60H42z" /><path d="M32 44c0-10 12-16 28-16s28 6 28 16" /><path d="M46 28c2-8 8-12 14-12s12 4 14 12" /><path d="M70 10 62 44" /><path d="M42 62h36M44 80h32" /><circle cx="52" cy="70" r="2" /><circle cx="66" cy="90" r="2" /></>),
  sandwich: (<><path d="M16 48c0-12 20-20 44-20s44 8 44 20H16z" /><path d="M14 56c8 4 16-4 24 0s16-4 24 0 16-4 24 0 16-4 22 0" /><path d="M16 64h88" /><path d="M18 72c10 3 20-3 30 0s20-3 30 0 18-3 26 0" /><path d="M16 80h88v8c0 4-4 6-8 6H24c-4 0-8-2-8-6z" /></>),
  croissant: (<><path d="M14 74c6-22 26-38 46-38s40 16 46 38c-8 6-18 4-24-2-6 8-16 10-22 10s-16-2-22-10c-6 6-16 8-24 2z" /><path d="M38 44c4 10 4 22 0 32M60 36v44M82 44c-4 10-4 22 0 32" /><path d="M24 56c4 4 6 10 6 16M96 56c-4 4-6 10-6 16" /></>),
  tapioca: (<><path d="M14 78a46 46 0 0 1 92 0z" /><path d="M22 78a38 38 0 0 1 76 0" strokeDasharray="2 5" /><path d="M10 86h100" /><circle cx="46" cy="62" r="2" /><circle cx="64" cy="56" r="2" /><circle cx="78" cy="66" r="2" /></>),
  crepioca: (<><path d="M18 60c0-12 18-20 42-20s42 8 42 20-18 20-42 20-42-8-42-20z" /><path d="M18 60c8 8 26 12 42 12s34-4 42-12" /><path d="M30 46c6 4 8 12 6 22M90 46c-6 4-8 12-6 22" /><path d="M12 94h96" /></>),
  omelete: (<><path d="M14 70c0-18 20-32 46-32s46 14 46 32c-12 8-28 12-46 12s-34-4-46-12z" /><path d="M14 70c16-6 30-8 46-8s30 2 46 8" /><path d="M38 52l4-4M60 46l2-5M80 52l4-3" /><path d="M10 92h100" /></>),
  cuscuz: (<><path d="M22 84c0-30 16-50 38-50s38 20 38 50z" /><path d="M14 84h92v6H14z" /><path d="M34 70h52M30 58h40" strokeDasharray="1 5" /><path d="M48 26c-3-5 3-8 0-14M60 26c-3-5 3-8 0-16M72 26c-3-5 3-8 0-14" /></>),
  salad: (<><path d="M12 62h96c0 22-20 36-48 36S12 84 12 62z" /><path d="M24 62c2-14 10-22 20-22 2-8 10-12 16-10 6-6 18-4 20 4 10 0 16 10 16 28" /><path d="M42 62c0-8 6-14 12-14M66 62c2-8 8-12 14-10" /><circle cx="36" cy="54" r="4" /><circle cx="84" cy="56" r="3" /></>),
  toast: (<><path d="M24 92V48c-8 0-12-6-12-12 0-10 12-16 24-16h48c12 0 24 6 24 16 0 6-4 12-12 12v44z" /><path d="M36 60c8-4 14 4 22 0s14-4 22 0" /><circle cx="44" cy="74" r="3" /><circle cx="70" cy="78" r="3" /><path d="M58 70c0 4 2 6 4 6" /></>),
  savory: (<><path d="M60 18c-6 10-30 34-30 56a30 30 0 0 0 60 0c0-22-24-46-30-56z" /><path d="M44 70c4 8 10 12 18 12" /><path d="M14 104h92" /><circle cx="50" cy="56" r="1.5" /><circle cx="68" cy="64" r="1.5" /><circle cx="58" cy="88" r="1.5" /></>),
  cake: (<><path d="M18 56 92 34l12 10v44H18z" /><path d="M18 56h86" /><path d="M18 72h86" /><path d="M18 64c8 3 14-3 22 0s14-3 22 0 14-3 22 0 14-3 20 0" /><path d="M92 34v22" /><circle cx="84" cy="30" r="5" /><path d="M10 96h100" /></>),
  tart: (<><path d="M12 64h96l-8 24H20z" /><path d="M12 64c0-12 22-20 48-20s48 8 48 20" /><path d="M28 64l4 24M44 64l2 24M60 64v24M76 64l-2 24M92 64l-4 24" /><circle cx="42" cy="48" r="4" /><circle cx="60" cy="44" r="4" /><circle cx="78" cy="48" r="4" /></>),
  sweet: (<><circle cx="60" cy="56" r="22" /><path d="M42 72l-6 22h48l-6-22" /><path d="M36 94h48" /><path d="M46 46l3 2M58 40l1 3M70 46l-2 3M52 58l3-1M66 60l2 2" /></>),
  juice: (<><path d="M36 30h48l-6 76H42z" /><path d="M40 54h40" /><path d="M76 30 88 8" /><circle cx="84" cy="34" r="14" /><path d="M84 20v28M70 34h28M74 24l20 20M94 24 74 44" /></>),
  'tall-glass': (<><path d="M40 20h40l-4 88H44z" /><path d="M42 40h36" /><rect x="48" y="52" width="12" height="12" rx="2" /><rect x="62" y="66" width="10" height="10" rx="2" /><path d="M58 20c4-8 12-10 18-8" /><path d="M64 14c6-4 14-2 16 4-6 2-12 0-16-4z" /></>),
  can: (<><path d="M38 24h44v80H38z" /><path d="M38 24c0-4 4-6 22-6s22 2 22 6M38 104c0 4 4 6 22 6s22-2 22-6" /><path d="M38 40h44M38 90h44" /><circle cx="52" cy="62" r="2" /><circle cx="66" cy="72" r="3" /><circle cx="58" cy="80" r="1.5" /></>),
  combo: (<><path d="M14 92c4-20 14-40 22-46 8 6 18 26 22 46z" /><circle cx="84" cy="66" r="16" /><path d="M72 82l-4 12h32l-4-12" /><path d="M76 58l2 2M88 56l-1 3M84 70l3 1" /><path d="M8 98h104" /></>),
};

export default function Glyph({ name, className }: { name: G; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
