import { useEffect, useRef, useState } from 'react';
import Reveal from '../components/Reveal';
import { Bag, Clock, Instagram, Phone, Pin, WhatsApp } from '../components/Icons';
import { business, mapsUrl } from '../data/contact';
import { whatsappLink } from '../lib/menu';

/** Localização + contato. O mapa só carrega quando entra na tela. */
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
      <div className="visit-copy">
        <Reveal as="p" className="eyebrow">Localização & contato</Reveal>
        <Reveal as="h2" className="display"><span id="visit-title">Venha nos <em>visitar</em></span></Reveal>
        <Reveal className="visit-cards">
          <div className="vcard"><Pin className="ico" /><div><h3>Endereço</h3><p>{a.complement}<br />{a.street} — {a.district}<br />{a.city} – {a.state}, {a.zip}</p><a href={mapsUrl} target="_blank" rel="noopener">Como chegar →</a></div></div>
          <div className="vcard"><Clock className="ico" /><div><h3>Horário</h3>{business.hours.map((h) => <p key={h.days}>{h.days}<br /><strong>{h.time}</strong></p>)}<small>Conforme aiqfome</small></div></div>
          <div className="vcard"><Bag className="ico" /><div><h3>Delivery</h3><p>Entrega em {business.delivery.time}<br />{business.delivery.payments}</p><a href={business.aiqfome} target="_blank" rel="noopener">Pedir no aiqfome →</a></div></div>
        </Reveal>
        <Reveal className="contact-row" delay={0.1}>
          <a className="btn btn-gold" href={whatsappLink()} target="_blank" rel="noopener"><WhatsApp className="ico" /> WhatsApp</a>
          <a className="btn btn-ghost" href={`tel:+${business.whatsapp}`}><Phone className="ico" /> {business.phoneDisplay}</a>
          <a className="btn btn-ghost" href={business.instagram} target="_blank" rel="noopener"><Instagram className="ico" /> {business.instagramHandle}</a>
        </Reveal>
      </div>
      <div className="visit-map" ref={mapRef}>
        {import.meta.env.MODE === 'artifact' ? (
          <a className="map-ph" href={mapsUrl} target="_blank" rel="noopener">Abrir no Google Maps →</a>
        ) : showMap ? (
          <iframe title="Mapa: Viñas Café no Sobral Shopping" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=16&output=embed`} />
        ) : <div className="map-ph">Carregando mapa…</div>}
      </div>
    </section>
  );
}
