import Reveal from '../components/Reveal';
import { galleryKeys, images } from '../data/images';
import { business } from '../data/contact';

export default function Gallery() {
  return (
    <section id="galeria" className="gallery paper" aria-labelledby="gal-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="kicker">Galeria</p>
            <h2 className="h2" id="gal-title">No balcão e na mesa</h2>
          </div>
          <a className="link-arrow" href={business.instagram} target="_blank" rel="noopener">{business.instagramHandle} no Instagram</a>
        </div>
        <div className="gallery-grid">
          {galleryKeys.map((k, i) => {
            const img = images[k];
            return (
              <Reveal key={k} delay={(i % 3) * 0.06} className={`g-item g-${i}`}>
                <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                {img.kind === 'ilustrativa' && <span className="g-note">Ilustrativa</span>}
              </Reveal>
            );
          })}
        </div>
        <p className="credit">Fotos sem marcação são do Viñas Café. As marcadas como ilustrativas são provisórias, de banco de imagens.</p>
      </div>
    </section>
  );
}
