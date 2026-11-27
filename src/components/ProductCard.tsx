import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductVisual from './ProductVisual';
import { brl, categoryOf } from '../lib/menu';
import type { Product } from '../data/types';
import { ArrowRight } from './Icons';

export default function ProductCard({ p, index }: { p: Product; index: number }) {
  const cat = categoryOf(p);
  return (
    <motion.li layout initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }} className={`pcard ${p.available === false ? 'is-off' : ''}`}>
      <Link to={`/cardapio/${p.slug}`} className="pcard-link" aria-label={`${p.name} — ${brl(p.price)}. Abrir apresentação`}
        style={{ ['--bg1' as string]: cat.scene.bg[0], ['--bg2' as string]: cat.scene.bg[1], ['--a' as string]: cat.scene.accent }}>
        <div className="pcard-media">
          <ProductVisual p={p} />
          {p.available === false && <span className="pcard-off">Indisponível no momento</span>}
        </div>
        <div className="pcard-body">
          <span className="pcard-cat">{cat.name}</span>
          <h3>{p.name}</h3>
          {p.description && <p>{p.description}</p>}
          <div className="pcard-foot">
            <strong>{brl(p.price)}</strong>
            {p.size && <small>{p.size}</small>}
            <span className="pcard-go" aria-hidden="true"><ArrowRight /></span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
