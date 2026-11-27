import Glyph from './Glyph';
import { categoryOf, imageOf } from '../lib/menu';
import type { Product } from '../data/types';

/** Selo honesto de procedência da imagem. */
export function ImageBadge({ p }: { p: Product }) {
  const img = imageOf(p);
  if (!img) return <span className="img-badge is-none">Foto em breve</span>;
  return img.kind === 'oficial'
    ? <span className="img-badge is-official">Foto oficial</span>
    : <span className="img-badge is-illus" title={img.credit}>Ilustrativa</span>;
}

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
    <div className={`pv-art pv-${size}`} style={{ ['--a' as string]: cat.scene.accent, ['--g' as string]: cat.scene.glow }} role="img" aria-label={`Ilustração: ${p.name}`}>
      <Glyph name={cat.scene.glyph} className="pv-glyph" />
      <span className="pv-mono">VC</span>
    </div>
  );
}
