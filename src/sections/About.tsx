import Reveal from '../components/Reveal';
import { images } from '../data/images';
import { business } from '../data/contact';

/** A cafeteria: texto factual (cardápio público do aiqfome). */
export default function About() {
  const a = business.address;
  return (
    <section id="cafeteria" className="about paper">
      <div className="wrap about-grid">
        <Reveal className="about-media">
          <img src={images['of-capa'].src} alt="Croissant com morangos e calda de chocolate, foto do Viñas Café" loading="lazy" width="906" height="770" />
          <p className="credit">Croissant Nutella com morango. Foto: Viñas Café.</p>
        </Reveal>
        <div className="about-copy">
          <p className="kicker">A cafeteria</p>
          <h2 className="h2">Café, confeitaria e cozinha nordestina no Sobral Shopping.</h2>
          <p className="lede">
            O cardápio junta a vitrine de confeitaria e a mesa de café da manhã cearense. Croissants folhados com recheios doces e salgados,
            croque monsieur e madame gratinados, tapiocas, crepiocas e cuscuz, toasts autorais, chocolate quente de receita própria, frapês e sucos naturais.
          </p>
          <dl className="facts">
            <div><dt>Onde</dt><dd>{a.complement}<br />{a.street}, {a.district}</dd></div>
            <div><dt>Quando</dt><dd>Segunda a domingo<br />10h às 21h30</dd></div>
            <div><dt>Delivery</dt><dd>aiqfome, {business.delivery.time}<br />Pedidos também pelo WhatsApp</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
