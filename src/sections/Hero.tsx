import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Plus } from '../components/Icons';
import CoffeeDrops from '../components/CoffeeDrops';
import { productBySlug, brl } from '../lib/menu';
import { images } from '../data/images';

const mini = ['croissant-nutella-c-morango', 'coxinha-frango-com-requeijao-brigadeiro-gourmet'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 }), sy = useSpring(my, { stiffness: 50, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const cupY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const cupScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const tiltX = useTransform(sy, (v) => v * -5), tiltY = useTransform(sx, (v) => v * 7);
  const glowX = useTransform(sx, (v) => v * 40), glowY = useTransform(sy, (v) => v * 30);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <section id="inicio" className="hero" ref={ref} onPointerMove={onMove}>
      <div className="hero-bg" aria-hidden="true">
        <motion.div className="hero-spot" style={{ x: glowX, y: glowY }} />
        <motion.div className="hero-ghost" style={{ x: ghostX }}>VIÑAS·CAFÉ·VIÑAS·CAFÉ</motion.div>
      </div>

      <motion.div className="hero-copy" style={{ y: reduce ? 0 : textY, opacity: reduce ? 1 : fade }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8, ease }}>
          Cafeteria · Sobral Shopping
        </motion.p>
        <h1 className="hero-title">
          <span className="line"><motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.2 }}>Viñas</motion.span></span>
          <span className="line"><motion.span initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.32 }}><em>Café</em></motion.span></span>
        </h1>
        <motion.p className="hero-lede" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }}>
          Croissants folhados, chocolate quente de receita própria, sabores do Ceará e a pausa que o seu dia merece.
        </motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9, ease }}>
          <a href="#cardapio" className="btn btn-gold">Explorar cardápio <span className="btn-dot"><ArrowRight /></span></a>
          <a href="#cafeteria" className="btn btn-ghost">Conheça nossa cafeteria</a>
        </motion.div>
        <motion.aside className="hero-minis" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9, ease }} aria-label="Destaques">
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

      <motion.div className="hero-stage" style={{ y: reduce ? 0 : cupY, scale: reduce ? 1 : cupScale }}>
        <motion.div className="hero-cup" style={{ rotateX: tiltX, rotateY: tiltY }}
          initial={{ opacity: 0, scale: 0.92, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.6, ease }}>
          <div className="hero-cup-float">
            <img className="hero-cup-img" src={images['ia-hero'].src} alt={images['ia-hero'].alt} width="1250" height="1000" fetchPriority="high" decoding="async" />
            {!reduce && <CoffeeDrops />}
          </div>
        </motion.div>
      </motion.div>

      <motion.p className="hero-script" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1, ease }}>
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
