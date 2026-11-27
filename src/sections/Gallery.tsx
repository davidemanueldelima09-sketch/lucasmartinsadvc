import Reveal from '../components/Reveal';
import { galleryKeys, images } from '../data/images';
import { business } from '../data/contact';
import { Instagram } from '../components/Icons';

export default function Gallery() {
  return (
    <section id="galeria" className="gallery" aria-labelledby="gal-title">
      <div className="gallery-head">
        <Reveal as="p" className="eyebrow">Galeria</Reveal>
        <Reveal as="h2" className="display"><span id="gal-title">Momentos <em>Viñas</em></span></Reveal>
      </div>
      <div className="gallery-grid">
        {galleryKeys.map((k, i) => {
          const img = images[k];
          return (
            <Reveal key={k} delay={(i % 3) * 0.08} className={`g-item g-${i}`}>
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
            </Reveal>
          );
        })}
      </div>
      <a className="btn btn-ghost gallery-ig" href={business.instagram} target="_blank" rel="noopener"><Instagram className="ico" /> Siga {business.instagramHandle}</a>
    </section>
  );
}
