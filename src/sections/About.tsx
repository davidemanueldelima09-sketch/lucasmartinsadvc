import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '../components/Reveal';
import { Star } from '../components/Icons';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { business } from '../data/contact';
import { images } from '../data/images';

/** A cafeteria — dados verificáveis (aiqfome) + texto de marca. */
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const stats = [
    { n: String(products.length), l: 'itens no cardápio' },
    { n: String(categories.length), l: 'categorias' },
    { n: '7', l: 'dias por semana' },
    { n: business.rating.value.toFixed(1).replace('.', ','), l: `nota no ${business.rating.source} (${business.rating.count} avaliações)`, star: true },
  ];
  return (
    <section id="cafeteria" className="about" ref={ref}>
      <div className="about-media">
        <motion.img style={{ y: imgY }} src={images['of-capa'].src} alt="Croissant com morangos e chocolate sendo finalizado — foto oficial do Viñas Café" loading="lazy" width="906" height="770" />
      </div>
      <div className="about-copy">
        <Reveal as="p" className="eyebrow">A cafeteria</Reveal>
        <Reveal as="h2" className="display">Uma pausa <em>verde e dourada</em> no coração do Sobral Shopping.</Reveal>
        <Reveal as="p" className="lede" delay={0.1}>
          O Viñas Café une a confeitaria de vitrine e a cozinha de café da manhã nordestina: croissants folhados recheados,
          croques gratinados, tapiocas, cuscuz e toasts autorais, ao lado de chocolate quente de receita própria, frapês e sucos naturais.
        </Reveal>
        <Reveal delay={0.2}>
          <dl className="stats">
            {stats.map((s) => (
              <div key={s.l}><dt>{s.star && <Star className="ico-star" />}{s.n}</dt><dd>{s.l}</dd></div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
