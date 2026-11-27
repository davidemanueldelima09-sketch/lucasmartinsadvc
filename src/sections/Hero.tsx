import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, type PanInfo, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { productBySlug, brl } from '../lib/menu';
import { images } from '../data/images';
import { business } from '../data/contact';

const highlights = ['croissant-nutella-c-morango', 'coxinha-frango-com-requeijao-brigadeiro-gourmet'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Giro 360°: arrastar (mouse ou dedo) gira em torno do eixo vertical, com inércia;
  // ao parar, assenta de frente (múltiplo de 360°).
  const spin = useMotionValue(0), lean = useMotionValue(0);
  const [used, setUsed] = useState(false);
  const onPan = (_: PointerEvent, i: PanInfo) => {
    spin.set(spin.get() + i.delta.x * 0.7);
    lean.set(Math.max(-12, Math.min(12, lean.get() - i.delta.y * 0.15)));
  };
  const onPanStart = () => { setUsed(true); spin.stop(); };
  const onPanEnd = (_: PointerEvent, i: PanInfo) => {
    const v = i.velocity.x * 0.7;
    animate(spin, Math.round((spin.get() + v * 0.35) / 360) * 360, { type: 'spring', velocity: v, stiffness: 40, damping: 14 });
    animate(lean, 0, { type: 'spring', stiffness: 120, damping: 12 });
  };
  const spinOnce = () => { setUsed(true); animate(spin, Math.round(spin.get() / 360) * 360 + 360, { duration: 1.6, ease: [0.45, 0, 0.2, 1] }); };

  const a = business.address;
  return (
    <section id="inicio" className="hero" ref={ref}>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker">Sobral Shopping · Sobral, CE</p>
          <h1 className="hero-title">Viñas Café</h1>
          <p className="hero-tagline">{business.tagline}</p>
          <p className="hero-lede">
            Croissants recheados, chocolate quente de receita própria, frapês e a cozinha de café da manhã do Ceará: tapioca, cuscuz e carne de sol.
          </p>
          <div className="hero-ctas">
            <a href="#cardapio" className="btn btn-primary">Explorar cardápio</a>
            <a href="#cafeteria" className="btn btn-line">Conheça nossa cafeteria</a>
          </div>
          <ul className="hero-highlights" aria-label="Destaques">
            {highlights.map((slug) => {
              const p = productBySlug.get(slug)!;
              const img = images[p.image!];
              return (
                <li key={slug}>
                  <Link to={`/cardapio/${slug}`}>
                    <img src={img.src} alt="" width="72" height="72" />
                    <span><strong>{p.name}</strong><em>{brl(p.price)}</em></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <motion.figure className="hero-figure" style={{ y: reduce ? 0 : imgY }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}>
          <motion.div className="hero-spin"
            onPan={reduce ? undefined : onPan} onPanStart={reduce ? undefined : onPanStart} onPanEnd={reduce ? undefined : onPanEnd}
            style={{ rotateY: spin, rotateX: lean }}>
            <div className="spin-face">
              <img src={images['ia-hero'].src} alt={images['ia-hero'].alt} width="1250" height="1000" fetchPriority="high" decoding="async" draggable={false} />
            </div>
            <div className="spin-face spin-back" aria-hidden="true">
              <img src={images['ia-hero'].src} alt="" width="1250" height="1000" decoding="async" draggable={false} />
            </div>
          </motion.div>
          <figcaption>
            {!reduce && <button type="button" className="spin-btn" onClick={spinOnce}>{used ? 'Girar 360°' : 'Arraste para girar · 360°'}</button>}
          </figcaption>
        </motion.figure>
      </div>

      <div className="wrap hero-info">
        <div><span>Horário</span><p>Todos os dias, 10h às 21h30</p></div>
        <div><span>Endereço</span><p>{a.complement}</p></div>
        <div><span>Delivery</span><p>aiqfome e WhatsApp {business.phoneDisplay}</p></div>
      </div>
    </section>
  );
}
