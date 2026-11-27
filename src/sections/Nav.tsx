import { images } from '../data/images';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Close, Menu as MenuIcon } from '../components/Icons';
import { whatsappLink } from '../lib/menu';

const links = [
  { href: '#inicio', label: 'Início' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#historia', label: 'Nossa História' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#visite', label: 'Visite' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <a href="#inicio" className="nav-brand" aria-label="Viñas Café — início">
        <img src={images['of-logo'].src} alt="" width="36" height="36" />
        <span>Viñas <em>Café</em></span>
      </a>
      <nav className="nav-pill" aria-label="Principal">
        {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
      </nav>
      <a className="btn btn-gold nav-cta" href={whatsappLink()} target="_blank" rel="noopener">Fazer pedido</a>
      <button className="nav-burger" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <Close /> : <MenuIcon />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav className="nav-sheet" aria-label="Menu móvel"
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {links.map((l, i) => (
              <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                <span>0{i + 1}</span>{l.label}
              </motion.a>
            ))}
            <a className="btn btn-gold" href={whatsappLink()} target="_blank" rel="noopener">Fazer pedido pelo WhatsApp</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
