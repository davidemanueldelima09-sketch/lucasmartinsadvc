import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import ProductVisual, { ImageBadge } from './ProductVisual';
import Particles, { Steam } from './Particles';
import { ArrowLeft, ArrowRight, Close, Bag, WhatsApp } from './Icons';
import { brl, categoryOf, imageOf, orderedProducts, particlesFor, productBySlug, productIndex, seeded, whatsappLink } from '../lib/menu';
import { business } from '../data/contact';
import { useSeo } from '../lib/useSeo';

const isLight = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 > 0.6;
};
const steamy = new Set(['bebidas-cremosas', 'cuscuz', 'salgados']);
const hotChocolate = /quente/i;

/**
 * Apresentação cinematográfica individual de cada produto.
 * A composição (layout, paleta, partículas, tipografia de fundo) é derivada
 * da categoria + palavras-chave do produto + semente única do ID.
 */
export default function ProductStage() {
  const { slug = '' } = useParams();
  const nav = useNavigate();
  const p = productBySlug.get(slug);
  const idx = productIndex.get(slug) ?? 0;
  const total = orderedProducts.length;
  const prev = orderedProducts[(idx - 1 + total) % total];
  const next = orderedProducts[(idx + 1) % total];
  const dir = useRef(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const go = useCallback((to: string, d: number) => { dir.current = d; nav(`/cardapio/${to}`, { replace: true }); }, [nav]);
  const close = useCallback(() => nav('/', { replace: false }), [nav]);

  useSeo(p ? {
    title: `${p.name} — ${brl(p.price)} | Viñas Café Sobral`,
    description: p.description || `${p.name} no cardápio do Viñas Café, Sobral Shopping. ${brl(p.price)}.`,
    image: imageOf(p)?.src,
    path: `/cardapio/${p.slug}`,
  } : null);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('stage-open');
    closeRef.current?.focus({ preventScroll: true });
    return () => html.classList.remove('stage-open');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(next.slug, 1);
      if (e.key === 'ArrowLeft') go(prev.slug, -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close, go, next.slug, prev.slug]);

  // parallax por ponteiro
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 20 }), sy = useSpring(my, { stiffness: 70, damping: 20 });
  const rY = useTransform(sx, (v) => v * 14), rX = useTransform(sy, (v) => v * -10);
  const pX = useTransform(sx, (v) => v * -30), pY = useTransform(sy, (v) => v * -20);
  const fX = useTransform(sx, (v) => v * 10);

  const variant = useMemo(() => {
    if (!p) return null;
    const r = seeded(p.id);
    return { glowX: 30 + r() * 40, glowY: 25 + r() * 30, ghostRot: -6 + r() * 12, ring: Math.round(r() * 360) };
  }, [p]);

  if (!p || !variant) {
    return (
      <div className="stage stage-missing" role="dialog" aria-modal="true" aria-label="Produto não encontrado">
        <p>Produto não encontrado.</p>
        <Link className="btn btn-gold" to="/">Voltar ao cardápio</Link>
      </div>
    );
  }

  const cat = categoryOf(p);
  const sc = cat.scene;
  const related = orderedProducts.filter((o) => o.category === p.category && o.slug !== p.slug).slice(0, 8);
  const img = imageOf(p);
  const showSteam = steamy.has(p.category) && (p.category !== 'bebidas-cremosas' || hotChocolate.test(p.name));
  const kinds = particlesFor(p);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <motion.div
      className={`stage stage--${sc.layout} ${isLight(sc.bg[0]) ? 'is-light' : ''}`}
      role="dialog" aria-modal="true" aria-labelledby="stage-title"
      onPointerMove={onMove}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        ['--bg1' as string]: sc.bg[0], ['--bg2' as string]: sc.bg[1], ['--a' as string]: sc.accent, ['--g' as string]: sc.glow,
        ['--gx' as string]: `${variant.glowX}%`, ['--gy' as string]: `${variant.glowY}%`,
      }}
    >
      <div className="stage-bg" aria-hidden="true" />
      <AnimatePresence mode="popLayout" initial={false} custom={dir.current}>
        <motion.div key={p.slug} className="stage-scene" custom={dir.current}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 80, filter: 'blur(10px)' }),
            center: { opacity: 1, x: 0, filter: 'blur(0px)' },
            exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -80, filter: 'blur(10px)' }),
          }}
          initial="enter" animate="center" exit="exit" transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>

          <motion.div className="stage-ghost" aria-hidden="true" style={{ x: pX, rotate: variant.ghostRot }}>
            <span>{p.name}</span><span>{p.name}</span>
          </motion.div>

          <Particles kinds={kinds} seed={p.id} count={reduce ? 8 : 18} className="stage-particles" />

          <div className="stage-grid">
            <motion.div className="stage-visual" style={{ rotateX: rX, rotateY: rY }}
              drag={reduce ? false : 'x'} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25}
              onDragEnd={(_, i) => { if (i.offset.x < -70) go(next.slug, 1); else if (i.offset.x > 70) go(prev.slug, -1); }}>
              {sc.layout === 'orbit' && (
                <svg className="stage-ring" viewBox="0 0 200 200" aria-hidden="true" style={{ rotate: `${variant.ring}deg` }}>
                  <defs><path id={`ring-${p.id}`} d="M100 100m-86 0a86 86 0 1 1 172 0a86 86 0 1 1-172 0" /></defs>
                  <text><textPath href={`#ring-${p.id}`}>{`VIÑAS CAFÉ • ${cat.name.toUpperCase()} • ${p.name.toUpperCase()} • `.repeat(2)}</textPath></text>
                </svg>
              )}
              {sc.layout === 'stack' && <><span className="stack-l stack-l1" /><span className="stack-l stack-l2" /></>}
              <motion.div className="stage-frame" style={{ x: fX, y: pY }}
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <ProductVisual p={p} size="stage" eager />
                {showSteam && <Steam className="stage-steam" strands={3} />}
              </motion.div>
              <div className="stage-shadow" aria-hidden="true" />
            </motion.div>

            <div className="stage-info">
              <motion.div className="stage-meta" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <span className="stage-chip">{cat.name}</span>
                <span className="stage-count">{String(idx + 1).padStart(3, '0')} / {total}</span>
              </motion.div>
              <motion.p className="stage-mood" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>{sc.mood}</motion.p>
              <motion.h2 id="stage-title" className="stage-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
                {p.name}
              </motion.h2>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                {p.description
                  ? <p className="stage-desc">{p.description}</p>
                  : <p className="stage-desc is-muted">Descrição detalhada em breve. Consulte a equipe pelo WhatsApp para saber mais.</p>}
                {p.ingredients.length > 1 && (
                  <ul className="stage-ings" aria-label="Ingredientes">
                    {p.ingredients.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                )}
                <div className="stage-price">
                  <strong>{brl(p.price)}</strong>
                  {p.size && <span>{p.size}</span>}
                  {p.available === false && <em className="stage-off">Indisponível no momento</em>}
                </div>
                <div className="stage-ctas">
                  <a className="btn btn-gold" href={whatsappLink(p)} target="_blank" rel="noopener"><WhatsApp className="ico" /> Pedir pelo WhatsApp</a>
                  <a className="btn btn-ghost" href={business.aiqfome} target="_blank" rel="noopener"><Bag className="ico" /> Pedir no aiqfome</a>
                </div>
                <p className="stage-fine">
                  Código {p.id} · <ImageBadge p={p} /> {img?.kind === 'ilustrativa' && <>· imagem meramente ilustrativa</>}
                  <br />Preço conforme cardápio do aiqfome (nov/2026), sujeito a alteração.
                </p>
                {related.length > 0 && (
                  <nav className="stage-related-inline" aria-label={`Mais em ${cat.name} (lista)`}>
                    <span>Mais em {cat.name}</span>
                    <div>
                      {related.map((o) => (
                        <button key={o.slug} onClick={() => go(o.slug, (productIndex.get(o.slug) ?? 0) > idx ? 1 : -1)}>{o.name}</button>
                      ))}
                    </div>
                  </nav>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="stage-ui">
        <button ref={closeRef} className="stage-close" onClick={close} aria-label="Fechar apresentação"><Close /></button>
        <div className="stage-nav">
          <button onClick={() => go(prev.slug, -1)} aria-label={`Anterior: ${prev.name}`}><ArrowLeft /><span>{prev.name}</span></button>
          <button onClick={() => go(next.slug, 1)} aria-label={`Próximo: ${next.name}`}><span>{next.name}</span><ArrowRight /></button>
        </div>
        {related.length > 0 && (
          <nav className="stage-related" aria-label={`Mais em ${cat.name}`}>
            <span>Mais em {cat.name}</span>
            <div>
              {related.map((o) => (
                <button key={o.slug} onClick={() => go(o.slug, (productIndex.get(o.slug) ?? 0) > idx ? 1 : -1)}>{o.name}</button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </motion.div>
  );
}
