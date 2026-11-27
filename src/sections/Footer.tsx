import { images } from '../data/images';
import { business } from '../data/contact';
import { whatsappLink } from '../lib/menu';
import { WhatsApp } from '../components/Icons';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-big" aria-hidden="true">Viñas Café</div>
        <div className="footer-grid">
          <div>
            <img src={images['of-logo'].src} alt="Viñas Café" width="64" height="64" loading="lazy" />
            <p className="footer-tag">{business.tagline}</p>
          </div>
          <nav aria-label="Rodapé">
            <a href="#cardapio">Cardápio</a><a href="#historia">Nossa história</a><a href="#galeria">Galeria</a><a href="#visite">Localização</a>
          </nav>
          <div>
            <a href={business.instagram} target="_blank" rel="noopener">Instagram {business.instagramHandle}</a>
            <a href={business.aiqfome} target="_blank" rel="noopener">Delivery aiqfome</a>
            <a href={whatsappLink()} target="_blank" rel="noopener">WhatsApp {business.phoneDisplay}</a>
          </div>
        </div>
        <p className="footer-fine">
          © {new Date().getFullYear()} {business.name} · CNPJ {business.cnpj} · {business.address.complement}, {business.address.city}–{business.address.state}.<br />
          Preços e cardápio conforme aiqfome (nov/2026), sujeitos a alteração.
        </p>
      </footer>
      <a className="wa-fab" href={whatsappLink()} target="_blank" rel="noopener" aria-label="Fazer pedido pelo WhatsApp">
        <WhatsApp /><span>Pedir agora</span>
      </a>
    </>
  );
}
