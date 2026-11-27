import { useDeferredValue, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { Search, Close } from '../components/Icons';
import { categories } from '../data/categories';
import { orderedProducts } from '../lib/menu';
import type { CategoryId } from '../data/types';

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
type Sort = 'menu' | 'asc' | 'desc';

export default function Menu() {
  const [cat, setCat] = useState<CategoryId | 'all'>('all');
  const [q, setQ] = useState('');
  const [onlyAvail, setOnlyAvail] = useState(false);
  const [sort, setSort] = useState<Sort>('menu');
  const dq = useDeferredValue(q);

  const list = useMemo(() => {
    const t = norm(dq.trim());
    let r = orderedProducts.filter((p) =>
      (cat === 'all' || p.category === cat) &&
      (!onlyAvail || p.available !== false) &&
      (!t || norm(`${p.name} ${p.description} ${p.ingredients.join(' ')}`).includes(t)));
    if (sort !== 'menu') r = [...r].sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
    return r;
  }, [cat, dq, onlyAvail, sort]);

  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, orderedProducts.filter((p) => p.category === c.id).length])), []);

  return (
    <section id="cardapio" className="menu" aria-labelledby="menu-title">
      <div className="menu-head">
        <Reveal as="p" className="eyebrow">Cardápio completo</Reveal>
        <Reveal as="h2" className="display"><span id="menu-title">Explore o <em>cardápio</em></span></Reveal>
        <Reveal as="p" className="lede">{orderedProducts.length} itens em {categories.length} categorias, conforme o cardápio oficial publicado no aiqfome. Cada item abre sua própria apresentação.</Reveal>
      </div>

      <div className="menu-tools">
        <label className="search">
          <Search className="ico" />
          <span className="sr-only">Buscar no cardápio</span>
          <input type="search" placeholder="Buscar: croissant, coalho, morango…" value={q} onChange={(e) => setQ(e.target.value)} />
          {q && <button type="button" onClick={() => setQ('')} aria-label="Limpar busca"><Close /></button>}
        </label>
        <div className="menu-opts">
          <label className="toggle"><input type="checkbox" checked={onlyAvail} onChange={(e) => setOnlyAvail(e.target.checked)} /><span />Somente disponíveis</label>
          <label className="select">
            <span className="sr-only">Ordenar</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="menu">Ordem do cardápio</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </label>
        </div>
      </div>

      <div className="chips" role="tablist" aria-label="Categorias">
        <button role="tab" aria-selected={cat === 'all'} className={cat === 'all' ? 'on' : ''} onClick={() => setCat('all')}>Tudo <sup>{orderedProducts.length}</sup></button>
        {categories.map((c) => (
          <button key={c.id} role="tab" aria-selected={cat === c.id} className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)}>
            {c.name} <sup>{counts[c.id]}</sup>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={cat} className="menu-tag" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {cat === 'all' ? `${list.length} itens` : `${categories.find((c) => c.id === cat)!.tagline} · ${list.length} itens`}
        </motion.p>
      </AnimatePresence>

      {list.length ? (
        <motion.ul layout className="menu-grid">
          {list.map((p, i) => <ProductCard key={p.slug} p={p} index={i} />)}
        </motion.ul>
      ) : (
        <p className="menu-empty">Nenhum item encontrado para “{q}”.</p>
      )}
    </section>
  );
}
