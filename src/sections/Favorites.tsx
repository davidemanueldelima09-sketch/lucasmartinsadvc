import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProductVisual, { ImageBadge } from '../components/ProductVisual';
import Reveal from '../components/Reveal';
import { brl, categoryOf, productBySlug, signatureSlugs } from '../lib/menu';
import { ArrowRight } from '../components/Icons';

/** Seleção da casa — faixa horizontal com rolagem cinematográfica. */
export default function Favorites() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-26%']);
  const items = signatureSlugs.map((s) => productBySlug.get(s)!).filter(Boolean);
  return (
    <section className="favs" ref={ref} aria-labelledby="favs-title">
      <div className="favs-head">
        <Reveal as="p" className="eyebrow">Seleção da casa</Reveal>
        <Reveal as="h2" className="display"><span id="favs-title">Assinaturas <em>Viñas</em></span></Reveal>
        <Reveal as="p" className="lede">Uma curadoria do nosso cardápio. Toque em qualquer peça para abrir sua apresentação.</Reveal>
      </div>
      <motion.ul className="favs-track" style={{ x }}>
        {items.map((p, i) => {
          const c = categoryOf(p);
          return (
            <li key={p.slug} className="fav" style={{ ['--bg1' as string]: c.scene.bg[0], ['--bg2' as string]: c.scene.bg[1], ['--a' as string]: c.scene.accent }}>
              <Link to={`/cardapio/${p.slug}`}>
                <span className="fav-n">{String(i + 1).padStart(2, '0')}</span>
                <div className="fav-media"><ProductVisual p={p} /><ImageBadge p={p} /></div>
                <div className="fav-body">
                  <small>{c.name}</small>
                  <h3>{p.name}</h3>
                  <span className="fav-price">{brl(p.price)} <ArrowRight /></span>
                </div>
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </section>
  );
}
