import { useEffect, useState } from 'react';
import { images } from '../data/images';
import { Close, Menu as MenuIcon } from '../components/Icons';
import { whatsappLink } from '../lib/menu';

const links = [
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#cafeteria', label: 'A cafeteria' },
  { href: '#historia', label: 'História' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#visite', label: 'Como chegar' },
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <header className={`nav ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="wrap nav-row">
        <a href="#inicio" className="nav-brand" aria-label="Viñas Café, início">
          <img src={images['of-logo'].src} alt="" width="34" height="34" />
          <span>Viñas Café</span>
        </a>
        <nav className="nav-links" aria-label="Principal">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <a className="btn btn-primary btn-sm nav-cta" href={whatsappLink()} target="_blank" rel="noopener">Fazer pedido</a>
        <button className="nav-burger" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <Close /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <nav className="nav-sheet" aria-label="Menu">
          {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
          <a className="btn btn-primary" href={whatsappLink()} target="_blank" rel="noopener">Fazer pedido pelo WhatsApp</a>
        </nav>
      )}
    </header>
  );
}
