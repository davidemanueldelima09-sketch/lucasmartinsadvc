import { useMemo } from 'react';
import { seeded } from '../lib/menu';

/**
 * Gotas de café saltando da coroa do espirro: sobem em arco, caem com
 * "gravidade" e somem. Posição de origem em % da imagem do hero.
 */
export default function CoffeeDrops({ count = 16, originX = 62, originY = 22 }: { count?: number; originX?: number; originY?: number }) {
  const drops = useMemo(() => {
    const r = seeded('vinas-drops');
    return Array.from({ length: count }, (_, i) => {
      const dir = r() < 0.5 ? -1 : 1;
      return {
        i,
        x: originX + (r() - 0.5) * 16,
        y: originY + (r() - 0.5) * 6,
        dx: dir * (40 + r() * 160),
        h: 70 + r() * 150,
        fall: 160 + r() * 220,
        size: 5 + r() * 9,
        dur: 2.2 + r() * 1.8,
        delay: -r() * 4,
      };
    });
  }, [count, originX, originY]);

  return (
    <div className="coffee-drops" aria-hidden="true">
      {drops.map((d) => (
        <span key={d.i} className="cdrop" style={{
          left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size * 1.15,
          ['--dx' as string]: `${d.dx}px`, ['--h' as string]: `${d.h}px`, ['--fall' as string]: `${d.fall}px`,
          ['--dur' as string]: `${d.dur}s`, ['--delay' as string]: `${d.delay}s`,
        }} />
      ))}
    </div>
  );
}
