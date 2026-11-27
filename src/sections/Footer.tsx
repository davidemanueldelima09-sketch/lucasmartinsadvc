import { images } from '../data/images';
import { business } from '../data/contact';
import { whatsappLink } from '../lib/menu';
import { WhatsApp } from '../components/Icons';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            <img src={images['of-logo'].src} alt="" width="48" height="48" loading="lazy" />
            <div><strong>Viñas Café</strong><p>{business.tagline}</p></div>
          </div>
          <nav aria-label="Rodapé">
            <a href="#cardapio">Cardápio</a><a href="#cafeteria">A cafeteria</a><a href="#galeria">Galeria</a><a href="#visite">Como chegar</a>
          </nav>
          <div className="footer-contact">
            <a href={business.instagram} target="_blank" rel="noopener">Instagram {business.instagramHandle}</a>
            <a href={business.aiqfome} target="_blank" rel="noopener">Delivery no aiqfome</a>
            <a href={whatsappLink()} target="_blank" rel="noopener">WhatsApp {business.phoneDisplay}</a>
          </div>
        </div>
        <p className="wrap footer-fine">
          © {new Date().getFullYear()} {business.name}. CNPJ {business.cnpj}. {business.address.complement}, {business.address.city}–{business.address.state}.
          Preços conforme o cardápio do aiqfome (nov/2026), sujeitos a alteração. Imagens marcadas como ilustrativas são provisórias e não retratam produtos da casa.
        </p>
      </footer>
      <a className="wa-fab" href={whatsappLink()} target="_blank" rel="noopener" aria-label="Fazer pedido pelo WhatsApp">
        <WhatsApp />
      </a>
    </>
  );
}
