import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, type PanInfo, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Plus } from '../components/Icons';
import { productBySlug, brl } from '../lib/menu';
import { images } from '../data/images';

const mini = ['croissant-nutella-c-morango', 'coxinha-frango-com-requeijao-brigadeiro-gourmet'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }), sy = useSpring(my, { stiffness: 60, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const cupY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const cupRot = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const tiltX = useTransform(sy, (v) => v * -6), tiltY = useTransform(sx, (v) => v * 8);

  // giro 360°: arrastar (mouse ou dedo) gira os copos em torno do eixo vertical,
  // com inércia; ao parar, assenta de frente (múltiplo de 360°).
  const spin = useMotionValue(0), lean = useMotionValue(0);
  const [used, setUsed] = useState(false);
  const settle = (velocity = 0) => {
    const target = Math.round((spin.get() + velocity * 0.35) / 360) * 360;
    animate(spin, target, { type: 'spring', velocity, stiffness: 40, damping: 14 });
    animate(lean, 0, { type: 'spring', stiffness: 120, damping: 12 });
  };
  const onPan = (_: PointerEvent, i: PanInfo) => {
    spin.set(spin.get() + i.delta.x * 0.7);
    lean.set(Math.max(-14, Math.min(14, lean.get() - i.delta.y * 0.15)));
  };
  const onPanStart = () => { setUsed(true); spin.stop(); };
  const onPanEnd = (_: PointerEvent, i: PanInfo) => settle(i.velocity.x * 0.7);
  const spinOnce = () => { setUsed(true); animate(spin, Math.round(spin.get() / 360) * 360 + 360, { duration: 1.6, ease: [0.45, 0, 0.2, 1] }); };

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="inicio" className="hero" ref={ref} onPointerMove={onMove}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-spot" />
        <div className="hero-rays" />
        <motion.div className="hero-ghost" style={{ x: ghostX }}>VIÑAS·CAFÉ·VIÑAS·CAFÉ</motion.div>
      </div>

      <motion.div className="hero-copy" style={{ y: reduce ? 0 : textY }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Cafeteria · Sobral Shopping
        </motion.p>
        <h1 className="hero-title">
          <motion.span initial={{ opacity: 0, y: 60, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.25 }}>Viñas</motion.span>
          <motion.span initial={{ opacity: 0, y: 60, rotate: 4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], delay: 0.4 }}><em>Café</em></motion.span>
        </h1>
        <motion.p className="hero-lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          Croissants folhados, chocolate quente de receita própria, sabores do Ceará e a pausa que o seu dia merece.
        </motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <a href="#cardapio" className="btn btn-gold">Explorar cardápio <span className="btn-dot"><ArrowRight /></span></a>
          <a href="#cafeteria" className="btn btn-ghost">Conheça nossa cafeteria</a>
        </motion.div>
        <motion.aside className="hero-minis" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }} aria-label="Destaques">
          {mini.map((slug) => {
            const p = productBySlug.get(slug)!;
            const img = images[p.image!];
            return (
              <Link key={slug} to={`/cardapio/${slug}`} className="mini-card">
                <img src={img.src} alt={img.alt} width="120" height="80" />
                <span className="mini-text"><span className="mini-name">{p.name}</span><span className="mini-price">{brl(p.price)}</span></span>
              </Link>
            );
          })}
        </motion.aside>
      </motion.div>

      <motion.div className="hero-stage" style={{ y: reduce ? 0 : cupY, rotate: reduce ? 0 : cupRot }}>
        <motion.div className="hero-cup" style={{ rotateX: tiltX, rotateY: tiltY }}
          initial={{ opacity: 0, scale: 0.85, y: 60 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
          <div className="hero-cup-float">
          <motion.div
            className="hero-drag"
            onPan={reduce ? undefined : onPan}
            onPanStart={reduce ? undefined : onPanStart}
            onPanEnd={reduce ? undefined : onPanEnd}
            whileTap={{ scale: 0.97 }}
            style={{ rotateY: spin, rotateX: lean }}
          >
            <div className="spin-face">
              <img className="hero-cup-img" src={images['ia-hero'].src} alt={images['ia-hero'].alt} width="1250" height="1000" fetchPriority="high" decoding="async" draggable={false} />
            </div>
            <div className="spin-face spin-back" aria-hidden="true">
              <img className="hero-cup-img" src={images['ia-hero'].src} alt="" width="1250" height="1000" decoding="async" draggable={false} />
            </div>
          </motion.div>
          </div>
        </motion.div>
        {!reduce && (
          <button type="button" className={`drag-hint ${used ? 'is-used' : ''}`} onClick={spinOnce} aria-label="Girar os copos 360 graus">
            <span className="drag-hint-dot" aria-hidden="true" />{used ? 'Girar 360°' : 'Arraste para girar 360°'}
          </button>
        )}
      </motion.div>

      <motion.p className="hero-script" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 1 }}>
        Mais que um café,<br /><span>uma experiência.</span>
      </motion.p>

      <div className="hero-foot">
        <a href="#cafeteria" className="scroll-cue" aria-label="Rolar para baixo"><span /></a>
        <p><small>Aberto todos os dias</small><strong>10h — 21h30</strong></p>
        <a href="#cardapio" className="hero-foot-plus" aria-label="Ver cardápio"><Plus /></a>
      </div>
    </section>
  );
}

