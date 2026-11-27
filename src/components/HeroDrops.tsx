import { dropSprite, heroDrops } from '../data/heroDrops';

/**
 * Anima as gotas reais da foto do hero: cada uma nasce perto da coroa do espirro,
 * voa até a posição original, segue um pouco adiante e some — em ciclos desencontrados.
 */
export default function HeroDrops({ src }: { src: string }) {
  return (
    <div className="hero-drops" aria-hidden="true">
      {heroDrops.map((d, i) => (
        <span key={i} className="hdrop" style={{
          left: `${d.x}%`, top: `${d.y}%`, width: `${d.w}%`, height: `${d.h}%`,
          backgroundImage: `url(${src})`,
          backgroundSize: `${(dropSprite.w / d.pw) * 100}% ${(dropSprite.h / d.ph) * 100}%`,
          backgroundPosition: `${(d.sx / (dropSprite.w - d.pw)) * 100}% 0%`,
          ['--dx' as string]: d.dx, ['--dy' as string]: d.dy,
          ['--dur' as string]: `${d.dur}s`, ['--delay' as string]: `${d.delay}s`,
        }} />
      ))}
    </div>
  );
}
