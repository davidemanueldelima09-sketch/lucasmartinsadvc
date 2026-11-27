import { useDeferredValue, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Close } from '../components/Icons';
import { categories } from '../data/categories';
import { brl, imageOf, orderedProducts } from '../lib/menu';
import type { CategoryId, Product } from '../data/types';

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
type Sort = 'menu' | 'asc' | 'desc';

function Row({ p }: { p: Product }) {
  const img = imageOf(p);
  return (
    <li className={`mrow ${p.available === false ? 'is-off' : ''}`}>
      <Link to={`/cardapio/${p.slug}`}>
        {img && <img className="mrow-img" src={img.src} alt="" loading="lazy" decoding="async" width="64" height="64" />}
        <div className="mrow-main">
          <div className="mrow-line">
            <h4>{p.name}{p.size && <small> {p.size}</small>}</h4>
            <span className="mrow-dots" aria-hidden="true" />
            <span className="mrow-price">{brl(p.price)}</span>
          </div>
          {p.description && <p>{p.description}</p>}
          {p.available === false && <p className="mrow-off">Indisponível no momento</p>}
        </div>
      </Link>
    </li>
  );
}

export default function Menu() {
  const [cat, setCat] = useState<CategoryId | 'all'>('all');
  const [q, setQ] = useState('');
  const [onlyAvail, setOnlyAvail] = useState(false);
  const [sort, setSort] = useState<Sort>('menu');
  const dq = useDeferredValue(q);

  const groups = useMemo(() => {
    const t = norm(dq.trim());
    return categories
      .filter((c) => cat === 'all' || c.id === cat)
      .map((c) => {
        let items = orderedProducts.filter((p) =>
          p.category === c.id &&
          (!onlyAvail || p.available !== false) &&
          (!t || norm(`${p.name} ${p.description} ${p.ingredients.join(' ')}`).includes(t)));
        if (sort !== 'menu') items = [...items].sort((a, b) => (sort === 'asc' ? a.price - b.price : b.price - a.price));
        return { c, items };
      })
      .filter((g) => g.items.length);
  }, [cat, dq, onlyAvail, sort]);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section id="cardapio" className="menu" aria-labelledby="menu-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Cardápio</p>
            <h2 className="h2" id="menu-title">O que tem hoje</h2>
          </div>
          <p className="section-note">{orderedProducts.length} itens, conforme o cardápio publicado no aiqfome. Toque em um item para ver detalhes e pedir.</p>
        </div>

        <div className="menu-tools">
          <label className="search">
            <Search className="ico" />
            <span className="sr-only">Buscar no cardápio</span>
            <input id="menu-search" type="search" placeholder="Buscar por nome ou ingrediente" value={q} onChange={(e) => setQ(e.target.value)} />
            {q && <button type="button" onClick={() => setQ('')} aria-label="Limpar busca"><Close /></button>}
          </label>
          <label className="check"><input id="menu-avail" type="checkbox" checked={onlyAvail} onChange={(e) => setOnlyAvail(e.target.checked)} /> Somente disponíveis</label>
          <label className="select">
            <span className="sr-only">Ordenar</span>
            <select id="menu-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="menu">Ordem do cardápio</option>
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </label>
        </div>

        <div className="tabs" role="tablist" aria-label="Categorias">
          <button role="tab" aria-selected={cat === 'all'} onClick={() => setCat('all')}>Tudo</button>
          {categories.map((c) => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}>{c.name}</button>
          ))}
        </div>

        {total ? (
          <div className="menu-groups">
            {groups.map(({ c, items }) => (
              <section key={c.id} className="mgroup" aria-labelledby={`g-${c.id}`}>
                <header className="mgroup-head">
                  <h3 id={`g-${c.id}`}>{c.name}</h3>
                  <span>{items.length} {items.length === 1 ? 'item' : 'itens'}</span>
                </header>
                <ul className="mgroup-list">{items.map((p) => <Row key={p.slug} p={p} />)}</ul>
              </section>
            ))}
          </div>
        ) : (
          <p className="menu-empty">Nada encontrado para “{q}”. Tente outro nome ou ingrediente.</p>
        )}
      </div>
    </section>
  );
}
