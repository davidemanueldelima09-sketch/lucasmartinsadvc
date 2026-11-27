import Reveal from '../components/Reveal';
import { Bean } from '../components/Particles';

/**
 * "Nossa história" — construída apenas a partir do que o cardápio público mostra.
 * PENDENTE: história de fundação (ano, fundadores) não encontrada em fonte pública.
 */
const chapters = [
  { k: '01', t: 'Do Ceará', d: 'Carne de sol desfiada, queijo coalho, mel cearense, praliné de castanha de caju e cuscuz — ingredientes da nossa terra no centro do prato.', tags: ['Tostex Sertanejo', 'Toast Lampião', 'Salada Nordestina'] },
  { k: '02', t: 'à França', d: 'Croissants amanteigados, croque monsieur e croque madame com béchamel da casa e parmesão gratinado — clássicos de boulangerie, à nossa maneira.', tags: ['Croque Madame', 'Croissant Salmão Defumado', 'Croissant Caprese'] },
  { k: '03', t: 'na mesma xícara', d: 'Chocolate nobre com cacau 50% e especiarias, frapês cremosos e sucos espremidos: receitas da casa para acompanhar cada momento do dia.', tags: ['Chocolate Quente', 'Frapê c/ Doce de Leite e Paçoca', 'Suco Verde'] },
];

export default function Story() {
  return (
    <section id="historia" className="story">
      <div className="story-head">
        <Reveal as="p" className="eyebrow">Nossa história</Reveal>
        <Reveal as="h2" className="display">Do Ceará à França, <em>na mesma mesa.</em></Reveal>
      </div>
      <div className="story-list">
        {chapters.map((c, i) => (
          <Reveal key={c.k} delay={i * 0.1} className="story-item">
            <span className="story-k">{c.k}</span>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
            <ul>{c.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="story-bean" aria-hidden="true"><Bean size={26} /></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
