import Reveal from '../components/Reveal';

/**
 * História baseada apenas no cardápio público.
 * PENDENTE: história de fundação (ano, fundadores) não encontrada em fonte pública.
 */
const cols = [
  { t: 'Do Ceará', d: 'Carne de sol desfiada, queijo coalho, mel cearense, castanha de caju e cuscuz no centro do prato.', tags: 'Tostex Sertanejo, Toast Lampião, Salada Nordestina' },
  { t: 'Da França', d: 'Croissants amanteigados e croques com béchamel da casa e parmesão gratinado, clássicos de boulangerie.', tags: 'Croque Madame, Croissant Salmão Defumado, Croissant Caprese' },
  { t: 'Do balcão', d: 'Chocolate nobre com cacau 50% e especiarias, frapês cremosos e sucos espremidos na hora.', tags: 'Chocolate Quente, Frapê com Doce de Leite e Paçoca, Suco Verde' },
];

export default function Story() {
  return (
    <section id="historia" className="story">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Nossa história</p>
            <h2 className="h2">Duas cozinhas, uma mesa.</h2>
          </div>
        </div>
        <div className="story-cols">
          {cols.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08} className="story-col">
              <h3>{c.t}</h3>
              <p>{c.d}</p>
              <p className="story-tags">{c.tags}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
