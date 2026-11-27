/**
 * Xícara protagonista do hero — ilustração vetorial em camadas:
 * esmalte verde Viñas, borda e monograma dourados, crema com latte art,
 * luz de recorte (rim light) quente e sombra de contato.
 */
export default function HeroCup() {
  return (
    <svg viewBox="0 0 640 560" className="hero-cup-svg" role="img" aria-label="Xícara de café Viñas com vapor">
      <defs>
        <linearGradient id="glaze" x1="0" x2="1">
          <stop offset="0" stopColor="#021a14" />
          <stop offset=".18" stopColor="#0b4a3a" />
          <stop offset=".34" stopColor="#1d7a5f" />
          <stop offset=".46" stopColor="#0f5a46" />
          <stop offset=".78" stopColor="#06352a" />
          <stop offset=".94" stopColor="#0d4537" />
          <stop offset="1" stopColor="#c99a5b" />
        </linearGradient>
        <linearGradient id="glazeShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset=".7" stopColor="#000" stopOpacity=".15" />
          <stop offset="1" stopColor="#000" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="gold" x1="0" x2="1">
          <stop offset="0" stopColor="#7a5426" />
          <stop offset=".3" stopColor="#f3d39a" />
          <stop offset=".55" stopColor="#c8965a" />
          <stop offset=".8" stopColor="#ffe6b5" />
          <stop offset="1" stopColor="#8c6230" />
        </linearGradient>
        <radialGradient id="crema" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#d9a066" />
          <stop offset=".45" stopColor="#a9652f" />
          <stop offset=".8" stopColor="#5a2c12" />
          <stop offset="1" stopColor="#2a1206" />
        </radialGradient>
        <linearGradient id="inner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6efe2" />
          <stop offset="1" stopColor="#cdbfa4" />
        </linearGradient>
        <radialGradient id="saucer" cx="50%" cy="35%" r="70%">
          <stop offset="0" stopColor="#1a6a52" />
          <stop offset=".55" stopColor="#0a4234" />
          <stop offset="1" stopColor="#021a14" />
        </radialGradient>
        <radialGradient id="contact" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity=".75" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="spec" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="soft2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
        <clipPath id="bodyClip"><path d="M150 236c0 120 52 210 170 210s170-90 170-210z" /></clipPath>
      </defs>

      {/* sombra de contato */}
      <ellipse cx="320" cy="500" rx="250" ry="38" fill="url(#contact)" />

      {/* pires */}
      <ellipse cx="320" cy="468" rx="262" ry="62" fill="url(#saucer)" />
      <ellipse cx="320" cy="462" rx="262" ry="58" fill="none" stroke="url(#gold)" strokeWidth="3" />
      <ellipse cx="320" cy="456" rx="168" ry="30" fill="#021a14" opacity=".55" filter="url(#soft)" />
      <ellipse cx="320" cy="458" rx="200" ry="40" fill="none" stroke="#2c8a6c" strokeOpacity=".35" strokeWidth="1.5" />

      {/* alça */}
      <path d="M478 268c58-14 92 14 88 58-4 46-48 74-110 80l6-26c46-6 74-26 76-54 2-28-22-40-62-30z" fill="url(#glaze)" />
      <path d="M484 276c46-8 70 14 66 46" fill="none" stroke="#f3d39a" strokeOpacity=".55" strokeWidth="2.5" strokeLinecap="round" />

      {/* corpo */}
      <path d="M150 236c0 120 52 210 170 210s170-90 170-210z" fill="url(#glaze)" />
      <g clipPath="url(#bodyClip)">
        <rect x="140" y="230" width="360" height="230" fill="url(#glazeShade)" />
        <path d="M196 250c-6 70 10 140 54 180" stroke="url(#spec)" strokeWidth="18" fill="none" opacity=".55" filter="url(#soft)" />
        <path d="M470 250c2 80-20 150-70 186" stroke="#f0c27a" strokeWidth="10" fill="none" opacity=".45" filter="url(#soft)" />
        {/* monograma VC */}
        <g transform="translate(270 300) scale(.9)" fill="none" stroke="url(#gold)" strokeWidth="5" strokeLinecap="round" opacity=".95">
          <path d="M0 10c16 4 26 24 30 56 10-30 20-52 40-62" />
          <path d="M96 22c-14-12-40-8-48 14s4 44 26 44c10 0 18-4 24-10" />
          <path d="M-6 90c30 8 80 8 116 0" strokeWidth="2.5" />
        </g>
      </g>

      {/* borda + interior */}
      <ellipse cx="320" cy="236" rx="170" ry="44" fill="url(#inner)" />
      <ellipse cx="320" cy="248" rx="152" ry="34" fill="url(#crema)" />
      {/* latte art — coração em camadas (tulipa) em perspectiva */}
      <g fill="#f4e2c4">
        <path d="M320 272c-34-8-52-16-48-26 4-9 26-10 48 2 22-12 44-11 48-2 4 10-14 18-48 26z" />
        <path d="M320 262c-22-5-34-10-31-16 3-6 18-6 31 1 13-7 28-7 31-1 3 6-9 11-31 16z" fill="#b47240" opacity=".9" />
        <path d="M320 257c-14-3-22-6-20-10 2-4 12-4 20 1 8-5 18-5 20-1 2 4-6 7-20 10z" />
        <path d="M320 252c-6-1-10-3-9-5s5-2 9 0c4-2 8-2 9 0s-3 4-9 5z" fill="#b47240" />
        <path d="M320 236v36" stroke="#f4e2c4" strokeWidth="1.6" opacity=".7" />
      </g>
      <ellipse cx="320" cy="248" rx="152" ry="34" fill="none" stroke="#2a1206" strokeOpacity=".6" strokeWidth="3" />
      <ellipse cx="320" cy="236" rx="170" ry="44" fill="none" stroke="url(#gold)" strokeWidth="5" />
      <path d="M180 226c40-18 120-22 180-16" stroke="#fff" strokeOpacity=".7" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#soft)" />

      {/* brilho quente de recorte */}
      <ellipse cx="520" cy="300" rx="40" ry="120" fill="#f0b86a" opacity=".18" filter="url(#soft2)" />
    </svg>
  );
}
