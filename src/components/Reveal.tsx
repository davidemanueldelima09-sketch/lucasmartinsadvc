import { motion } from 'framer-motion';

/** Entrada suave ao rolar (framer-motion respeita prefers-reduced-motion via MotionConfig). */
export default function Reveal({ children, delay = 0, className, as = 'div' }: { children: React.ReactNode; delay?: number; className?: string; as?: 'div' | 'p' | 'h2' }) {
  const M = motion[as];
  return (
    <M className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </M>
  );
}
