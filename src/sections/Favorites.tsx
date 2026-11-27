import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { brl, imageOf, productBySlug, signatureSlugs } from '../lib/menu';

/** Seleção editorial (não é ranking de vendas): só itens com imagem. */
export default function Favorites() {
  const items = signatureSlugs.map((s) => productBySlug.get(s)!).filter((p) => p && imageOf(p));
  return (
    <section className="favs paper" aria-labelledby="favs-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Da vitrine</p>
            <h2 className="h2" id="favs-title">Escolhas da casa</h2>
          </div>
          <a href="#cardapio" className="link-arrow">Ver cardápio completo</a>
        </div>
        <ul className="favs-grid">
          {items.map((p, i) => {
            const img = imageOf(p)!;
            return (
              <Reveal key={p.slug} delay={(i % 4) * 0.05} className="fav">
                <Link to={`/cardapio/${p.slug}`}>
                  <div className="fav-media"><img src={img.src} alt={img.alt} loading="lazy" decoding="async" /></div>
                  <div className="fav-body">
                    <h3>{p.name}</h3>
                    <span className="price">{brl(p.price)}</span>
                  </div>
                  {img.kind === 'ilustrativa' && <p className="credit">Imagem ilustrativa</p>}
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
