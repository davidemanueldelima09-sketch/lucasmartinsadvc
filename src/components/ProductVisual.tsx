import { categoryOf, imageOf } from '../lib/menu';
import type { Product } from '../data/types';
import { images } from '../data/images';

/** Foto do produto, ou composição ilustrada quando não há fotografia. */
export default function ProductVisual({ p, size = 'card', eager = false }: { p: Product; size?: 'card' | 'stage'; eager?: boolean }) {
  const img = imageOf(p);
  const cat = categoryOf(p);
  if (img) {
    return (
      <img className={`pv-img pv-${size}`} src={img.src} alt={img.alt}
        loading={eager ? 'eager' : 'lazy'} decoding="async" width={size === 'stage' ? 1200 : 600} height={size === 'stage' ? 900 : 450} />
    );
  }
  return (
    <div className={`pv-art pv-${size}`} style={{ ['--a' as string]: cat.scene.accent }} role="img" aria-label={`${p.name}: foto em breve`}>
      <img className="pv-logo" src={images['of-logo'].src} alt="" width="96" height="96" />
      <span className="pv-soon">Foto em breve</span>
    </div>
  );
}
