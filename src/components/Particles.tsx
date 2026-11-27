import { useMemo } from 'react';
import { seeded } from '../lib/menu';
import type { Particle } from '../data/types';

/** Grão de café em SVG com sulco central e volume. */
export function Bean({ size = 40, tone = '#5a321c' }: { size?: number; tone?: string }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 40 52" aria-hidden="true">
      <defs>
        <radialGradient id="bean-g" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#a2643a" />
          <stop offset=".45" stopColor={tone} />
          <stop offset="1" stopColor="#1c0d06" />
        </radialGradient>
      </defs>
      <ellipse cx="20" cy="26" rx="17" ry="24" fill="url(#bean-g)" />
      <path d="M20 4c-7 9 7 18 0 26s5 14 0 18" stroke="#140803" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <ellipse cx="13" cy="15" rx="4" ry="7" fill="#fff" opacity=".12" />
    </svg>
  );
}

const shape = (k: Particle, s: number, r: () => number) => {
  switch (k) {
    case 'bean': return <Bean size={s} />;
    case 'ice': return <svg width={s} height={s} viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="4" fill="rgba(220,245,255,.28)" stroke="rgba(255,255,255,.7)" strokeWidth=".8" /><path d="M5 6l4-1" stroke="#fff" strokeWidth="1.2" opacity=".8" strokeLinecap="round" /></svg>;
    case 'bubble': return <svg width={s} height={s} viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.6)" strokeWidth=".9" /><circle cx="7" cy="7" r="1.6" fill="#fff" opacity=".8" /></svg>;
    case 'crumb': return <svg width={s * 0.5} height={s * 0.5} viewBox="0 0 10 10"><path d={`M1 ${3 + r() * 3}L${4 + r() * 2} 1 9 ${3 + r() * 2} ${7 + r() * 2} 9 2 8z`} fill="#d79a4b" /></svg>;
    case 'flake': return <svg width={s} height={s * 0.5} viewBox="0 0 20 10"><path d="M1 8C6 1 14 1 19 5c-6-1-12 0-18 3z" fill="#e9b36a" opacity=".9" /></svg>;
    case 'leaf': return <svg width={s} height={s} viewBox="0 0 20 20"><path d="M3 17C3 8 9 3 18 3c0 9-6 14-15 14z" fill="#6aa84f" /><path d="M3 17 14 7" stroke="#2e5a22" strokeWidth=".8" /></svg>;
    case 'herb': return <svg width={s * 0.6} height={s * 0.6} viewBox="0 0 20 20"><path d="M10 2c5 4 5 12 0 16C5 14 5 6 10 2z" fill="#7cb342" /></svg>;
    case 'citrus': return <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#f7d046" /><circle cx="12" cy="12" r="9" fill="#fff4b0" />{[0, 60, 120, 180, 240, 300].map((a) => <path key={a} d="M12 12 12 4.5" stroke="#f2c230" strokeWidth="1.2" transform={`rotate(${a} 12 12)`} />)}</svg>;
    case 'berry': return <svg width={s} height={s} viewBox="0 0 20 22"><path d="M10 21C4 16 2 11 3 8c1-3 5-3 7-2 2-1 6-1 7 2 1 3-1 8-7 13z" fill="#d8273b" /><path d="M6 4l4 2 4-2-4-3z" fill="#4c8a2f" />{[[7, 10], [12, 10], [9, 14], [11, 17]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r=".6" fill="#ffd27a" />)}</svg>;
    case 'cocoa': return <svg width={s * 0.35} height={s * 0.35} viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.5" fill="#3a1a0c" /></svg>;
    case 'sparkle': return <svg width={s * 0.6} height={s * 0.6} viewBox="0 0 20 20"><path d="M10 0c1 6 4 9 10 10-6 1-9 4-10 10-1-6-4-9-10-10 6-1 9-4 10-10z" fill="#f6d79a" /></svg>;
    case 'drop': return <svg width={s * 0.6} height={s * 0.8} viewBox="0 0 16 22"><path d="M8 1C5 7 2 10 2 14a6 6 0 0 0 12 0c0-4-3-7-6-13z" fill="#e7a93a" opacity=".9" /><ellipse cx="6" cy="14" rx="1.5" ry="2.5" fill="#fff" opacity=".5" /></svg>;
    case 'steam': return null;
  }
};

/**
 * Camada de partículas flutuantes, determinística por `seed` —
 * cada produto ganha uma constelação própria.
 */
export default function Particles({ kinds, seed, count = 16, className = '' }: { kinds: Particle[]; seed: string; count?: number; className?: string }) {
  const items = useMemo(() => {
    const r = seeded(seed);
    const usable = kinds.filter((k) => k !== 'steam');
    if (!usable.length) return [];
    return Array.from({ length: count }, (_, i) => {
      const k = usable[i % usable.length];
      const depth = r();
      return {
        k, i,
        x: r() * 100, y: r() * 100,
        size: 14 + depth * 34,
        rot: r() * 360,
        dur: 7 + r() * 9,
        delay: -r() * 10,
        blur: depth < 0.25 ? 3 : depth > 0.9 ? 1.5 : 0,
        depth,
        node: shape(k, 14 + depth * 34, r),
      };
    });
  }, [kinds, seed, count]);

  return (
    <div className={`particles ${className}`} aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.i}
          className="particle"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
            opacity: 0.45 + p.depth * 0.55,
            zIndex: p.depth > 0.6 ? 3 : 0,
            ['--r' as string]: `${p.rot}deg`,
            ['--dur' as string]: `${p.dur}s`,
            ['--delay' as string]: `${p.delay}s`,
            ['--drift' as string]: `${(p.depth - 0.5) * 40}px`,
          }}
        >
          {p.node}
        </span>
      ))}
    </div>
  );
}

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
