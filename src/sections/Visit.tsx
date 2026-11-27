import { useEffect, useRef, useState } from 'react';
import { business, mapsUrl } from '../data/contact';
import { whatsappLink } from '../lib/menu';

/** Localização e contato. O mapa só carrega quando entra na tela. */
export default function Visit() {
  const a = business.address;
  const mapRef = useRef<HTMLDivElement>(null);
  const [showMap, setShowMap] = useState(false);
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShowMap(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="visite" className="visit" aria-labelledby="visit-title">
      <div className="wrap visit-grid">
        <div>
          <p className="kicker">Como chegar</p>
          <h2 className="h2" id="visit-title">Sobral Shopping, perto da Le Biscuit.</h2>
          <dl className="facts facts-dark">
            <div><dt>Endereço</dt><dd>{a.street}, {a.district}<br />{a.city} – {a.state}, {a.zip}</dd></div>
            <div><dt>Horário</dt><dd>Segunda a domingo, 10h às 21h30</dd></div>
            <div><dt>Telefone e WhatsApp</dt><dd>{business.phoneDisplay}</dd></div>
            <div><dt>Delivery</dt><dd>aiqfome, entrega em {business.delivery.time}</dd></div>
          </dl>
          <div className="visit-ctas">
            <a className="btn btn-primary" href={whatsappLink()} target="_blank" rel="noopener">Pedir pelo WhatsApp</a>
            <a className="btn btn-line" href={business.aiqfome} target="_blank" rel="noopener">Pedir no aiqfome</a>
            <a className="link-arrow" href={mapsUrl} target="_blank" rel="noopener">Abrir no Google Maps</a>
          </div>
        </div>
        <div className="visit-map" ref={mapRef}>
          {import.meta.env.MODE === 'artifact' ? (
            <a className="map-ph" href={mapsUrl} target="_blank" rel="noopener">Ver no Google Maps</a>
          ) : showMap ? (
            <iframe title="Mapa: Viñas Café no Sobral Shopping" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=16&output=embed`} />
          ) : <div className="map-ph">Carregando mapa</div>}
        </div>
      </div>
    </section>
  );
}
