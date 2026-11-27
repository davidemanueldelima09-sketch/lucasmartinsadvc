/**
 * Protagonista do hero: dois copos de papel Viñas (estilo take-away) com cinta kraft,
 * o copo da frente aberto com uma coroa de café espirrando, gotas voando e bolhas.
 * Ilustração vetorial em camadas, sem imagens externas.
 */
const drops = [
  { x: 222, y: 118, r: 7 }, { x: 268, y: 60, r: 5 }, { x: 344, y: 34, r: 8 }, { x: 430, y: 44, r: 6 },
  { x: 520, y: 70, r: 9 }, { x: 600, y: 120, r: 6 }, { x: 618, y: 196, r: 4 }, { x: 186, y: 190, r: 4 },
  { x: 560, y: 30, r: 4 }, { x: 300, y: 110, r: 3 },
];
const bubbles = [
  { x: 120, y: 150, r: 10 }, { x: 70, y: 260, r: 6 }, { x: 170, y: 70, r: 5 }, { x: 610, y: 300, r: 9 },
  { x: 630, y: 420, r: 5 }, { x: 90, y: 380, r: 4 }, { x: 470, y: 18, r: 4 },
];
const cupDrops = [
  { x: 330, y: 300, s: 1 }, { x: 470, y: 320, s: 0.8 }, { x: 512, y: 540, s: 1.1 }, { x: 318, y: 560, s: 0.7 }, { x: 440, y: 590, s: 0.9 },
];

export default function HeroCup() {
  return (
    <svg viewBox="0 0 680 680" className="hero-cup-svg" role="img" aria-label="Copos de café Viñas com café espirrando">
      <defs>
        {/* papel creme */}
        <linearGradient id="paper" x1="0" x2="1">
          <stop offset="0" stopColor="#d9ccb4" />
          <stop offset=".18" stopColor="#fffaf1" />
          <stop offset=".45" stopColor="#f6eee0" />
          <stop offset=".8" stopColor="#d8c8ab" />
          <stop offset="1" stopColor="#9c8766" />
        </linearGradient>
        <linearGradient id="paperShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset=".75" stopColor="#3a2316" stopOpacity=".08" />
          <stop offset="1" stopColor="#3a2316" stopOpacity=".35" />
        </linearGradient>
        {/* copo de trás, marrom */}
        <linearGradient id="brownCup" x1="0" x2="1">
          <stop offset="0" stopColor="#2a160b" />
          <stop offset=".25" stopColor="#6b4128" />
          <stop offset=".55" stopColor="#4a2a17" />
          <stop offset="1" stopColor="#1c0e06" />
        </linearGradient>
        <linearGradient id="lid" x1="0" x2="1">
          <stop offset="0" stopColor="#b8b0a4" />
          <stop offset=".3" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#ece6dc" />
          <stop offset="1" stopColor="#8f877b" />
        </linearGradient>
        {/* cinta kraft */}
        <linearGradient id="kraft" x1="0" x2="1">
          <stop offset="0" stopColor="#8a5a2b" />
          <stop offset=".2" stopColor="#d9a866" />
          <stop offset=".5" stopColor="#c8904d" />
          <stop offset=".85" stopColor="#9c6630" />
          <stop offset="1" stopColor="#6e4219" />
        </linearGradient>
        {/* café */}
        <linearGradient id="splash" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#3a1806" />
          <stop offset=".35" stopColor="#8a3f0f" />
          <stop offset=".75" stopColor="#d77a22" />
          <stop offset="1" stopColor="#f7b55a" />
        </linearGradient>
        <linearGradient id="splashHi" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#ffe2b0" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="surface" cx="45%" cy="40%" r="70%">
          <stop offset="0" stopColor="#b8621f" />
          <stop offset=".6" stopColor="#5a2709" />
          <stop offset="1" stopColor="#241004" />
        </radialGradient>
        <radialGradient id="drop" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffd08a" />
          <stop offset=".35" stopColor="#d27a24" />
          <stop offset="1" stopColor="#4a1f06" />
        </radialGradient>
        <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity=".7" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f0a24a" stopOpacity=".45" />
          <stop offset="1" stopColor="#f0a24a" stopOpacity="0" />
        </radialGradient>
        {/* textura de papel / kraft */}
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 .25  0 0 0 0 .15  0 0 0 0 .06  0 0 0 .55 0" />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        <filter id="blur6"><feGaussianBlur stdDeviation="6" /></filter>
        <clipPath id="backSleeveClip"><path d="M119 420Q200 432 281 420L266 560Q200 572 134 560Z" /></clipPath>
      </defs>

      {/* brilho quente atrás */}
      <ellipse cx="400" cy="230" rx="260" ry="200" fill="url(#glow)" />

      {/* bolhas */}
      <g className="hc-bubbles">
        {bubbles.map((b, i) => (
          <g key={i} style={{ ['--i' as string]: i }}>
            <circle cx={b.x} cy={b.y} r={b.r} fill="rgba(255,220,170,.08)" stroke="rgba(255,226,180,.55)" strokeWidth="1" />
            <circle cx={b.x - b.r * 0.35} cy={b.y - b.r * 0.35} r={b.r * 0.25} fill="#fff" opacity=".8" />
          </g>
        ))}
      </g>

      {/* sombra de contato */}
      <ellipse cx="350" cy="640" rx="280" ry="26" fill="url(#shadow)" />

      {/* ===== copo de trás (tampa branca, corpo marrom, cinta canelada) ===== */}
      <g transform="rotate(-7 200 470)">
        <path d="M110 330L140 620Q200 634 260 620L290 330Z" fill="url(#brownCup)" />
        <path d="M110 330L140 620Q200 634 260 620L290 330Z" fill="url(#paperShade)" />
        {/* cinta canelada */}
        <path d="M119 420Q200 432 281 420L266 560Q200 572 134 560Z" fill="url(#kraft)" />
        <g clipPath="url(#backSleeveClip)" stroke="#6e4219" strokeOpacity=".55" strokeWidth="2.2">
          {Array.from({ length: 34 }, (_, i) => <line key={i} x1={112 + i * 5} y1="410" x2={120 + i * 4.6} y2="575" />)}
        </g>
        <path d="M119 420Q200 432 281 420L266 560Q200 572 134 560Z" fill="#000" filter="url(#grain)" opacity=".5" />
        <text x="200" y="505" textAnchor="middle" fontFamily="'Fraunces Variable', Georgia, serif" fontWeight="700" fontSize="36" fill="#f4ecdc" letterSpacing="1" transform="rotate(-4 200 495)">VIÑAS</text>
        {/* tampa */}
        <path d="M98 334L103 304Q200 288 297 304L302 334Q200 348 98 334Z" fill="url(#lid)" />
        <ellipse cx="200" cy="300" rx="94" ry="15" fill="#f7f3ec" />
        <ellipse cx="200" cy="296" rx="70" ry="9" fill="#e2dbcf" />
        <rect x="228" y="290" width="22" height="6" rx="3" fill="#b9b1a5" />
        <path d="M98 334Q200 348 302 334" stroke="#7d756a" strokeWidth="2" fill="none" opacity=".6" />
      </g>

      {/* ===== copo da frente (papel creme, cinta kraft com a marca) ===== */}
      <g transform="rotate(4 400 430)">
        <path d="M250 250L290 604Q400 622 510 604L550 250Z" fill="url(#paper)" />
        <path d="M250 250L290 604Q400 622 510 604L550 250Z" fill="#000" filter="url(#grain)" opacity=".35" />
        <path d="M250 250L290 604Q400 622 510 604L550 250Z" fill="url(#paperShade)" />
        {/* cinta */}
        <path d="M262 360Q400 384 538 360L523 492Q400 514 277 492Z" fill="url(#kraft)" />
        <path d="M262 360Q400 384 538 360L523 492Q400 514 277 492Z" fill="#000" filter="url(#grain)" opacity=".6" />
        <path d="M262 360Q400 384 538 360" stroke="#5c3714" strokeOpacity=".5" strokeWidth="2" fill="none" />
        <path d="M277 492Q400 514 523 492" stroke="#5c3714" strokeOpacity=".5" strokeWidth="2" fill="none" />
        {/* marca na cinta */}
        <g transform="translate(400 434)">
          <text x="0" y="12" textAnchor="middle" fontFamily="'Fraunces Variable', Georgia, serif" fontWeight="800" fontSize="62" fill="#2b1609" letterSpacing="3">VIÑAS</text>
          <text x="0" y="40" textAnchor="middle" fontFamily="'Manrope Variable', system-ui, sans-serif" fontWeight="700" fontSize="12" fill="#2b1609" letterSpacing="8">CAFÉ · SOBRAL</text>
        </g>
        {/* gotas escorrendo no papel */}
        {cupDrops.map((d, i) => (
          <g key={i} transform={`translate(${d.x} ${d.y}) scale(${d.s})`}>
            <path d="M0 -9C-3 -3 -6 0 -6 4a6 6 0 0 0 12 0c0-4-3-7-6-13z" fill="url(#drop)" opacity=".9" />
            <ellipse cx="-2" cy="2" rx="1.6" ry="2.4" fill="#fff" opacity=".7" />
          </g>
        ))}
        {/* borda enrolada + café */}
        <ellipse cx="400" cy="250" rx="152" ry="26" fill="#efe5d3" />
        <ellipse cx="400" cy="254" rx="140" ry="19" fill="url(#surface)" />
        <ellipse cx="400" cy="250" rx="152" ry="26" fill="none" stroke="#fffaf1" strokeWidth="7" />
        <ellipse cx="400" cy="252" rx="152" ry="26" fill="none" stroke="#a8946f" strokeWidth="1.5" opacity=".6" />
        <path d="M262 262c0 18 2 36 6 44a5 5 0 0 0 10-1c-1-12 0-26 2-38z" fill="url(#splash)" />
        <path d="M512 270c-1 12-1 26 2 32a4 4 0 0 0 8-1c0-10 1-20 3-32z" fill="url(#splash)" />
        <path d="M368 278c0 10 1 16 3 20a4 4 0 0 0 7-1c0-6 0-12 1-19z" fill="url(#splash)" />
      </g>

      {/* ===== coroa de café espirrando ===== */}
      <g className="hc-splash">
        {/* véu translúcido de trás */}
        <path d="M272 262C254 214 232 178 206 146C236 164 258 182 276 192C266 152 262 116 274 76C292 118 300 154 312 174C320 128 338 88 352 52C360 98 364 140 374 166C388 124 410 92 438 62C432 106 424 140 430 166C452 132 486 104 524 84C506 124 486 156 482 180C516 160 560 146 606 144C572 172 548 204 544 266C480 284 330 286 272 262Z" fill="#e89a45" opacity=".28" transform="translate(408 268) scale(1.1 1.08) translate(-408 -268)" filter="url(#blur6)" />
        <path d="M272 262C254 214 232 178 206 146C236 164 258 182 276 192C266 152 262 116 274 76C292 118 300 154 312 174C320 128 338 88 352 52C360 98 364 140 374 166C388 124 410 92 438 62C432 106 424 140 430 166C452 132 486 104 524 84C506 124 486 156 482 180C516 160 560 146 606 144C572 172 548 204 544 266C480 284 330 286 272 262Z" fill="url(#splash)" opacity=".93" />
        {/* interior mais escuro (profundidade da coroa) */}
        <path d="M300 262C300 230 318 206 346 196C340 222 344 238 360 246C372 216 398 200 430 198C420 222 424 240 440 248C458 224 488 212 520 214C504 236 504 252 512 266C440 280 350 280 300 262Z" fill="#3a1806" opacity=".6" />
        {/* translucidez nas bordas */}
        <path d="M272 262C254 214 232 178 206 146C236 164 258 182 276 192C266 152 262 116 274 76C292 118 300 154 312 174C320 128 338 88 352 52C360 98 364 140 374 166C388 124 410 92 438 62C432 106 424 140 430 166C452 132 486 104 524 84C506 124 486 156 482 180C516 160 560 146 606 144C572 172 548 204 544 266C480 284 330 286 272 262Z" fill="none" stroke="#ffcf8a" strokeOpacity=".55" strokeWidth="2.5" />
        {/* reflexos especulares */}
        <path d="M280 236C270 200 260 176 238 160" stroke="url(#splashHi)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M322 190C324 150 334 116 348 84" stroke="#fff3dc" strokeOpacity=".75" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M440 160C440 130 446 104 458 86" stroke="#fff3dc" strokeOpacity=".65" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M498 176C512 150 530 130 556 116" stroke="#fff3dc" strokeOpacity=".6" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="296" cy="214" rx="5" ry="12" fill="#fff" opacity=".55" transform="rotate(-25 296 214)" />
        <ellipse cx="470" cy="190" rx="4" ry="10" fill="#fff" opacity=".45" transform="rotate(30 470 190)" />
        {/* anel de café transbordando na borda */}
        <path d="M262 262C330 284 480 284 548 262" stroke="#ffd59a" strokeOpacity=".55" strokeWidth="2" fill="none" />
        {/* gotas nas pontas */}
        <circle cx="210" cy="150" r="10" fill="url(#drop)" />
        <circle cx="207.0" cy="146.5" r="3.2" fill="#fff" opacity=".8" />
        <circle cx="275" cy="82" r="9" fill="url(#drop)" />
        <circle cx="272.3" cy="78.8" r="2.9" fill="#fff" opacity=".8" />
        <circle cx="352" cy="58" r="10" fill="url(#drop)" />
        <circle cx="349.0" cy="54.5" r="3.2" fill="#fff" opacity=".8" />
        <circle cx="436" cy="68" r="9" fill="url(#drop)" />
        <circle cx="433.3" cy="64.8" r="2.9" fill="#fff" opacity=".8" />
        <circle cx="520" cy="90" r="11" fill="url(#drop)" />
        <circle cx="516.7" cy="86.2" r="3.5" fill="#fff" opacity=".8" />
        <circle cx="600" cy="148" r="10" fill="url(#drop)" />
        <circle cx="597.0" cy="144.5" r="3.2" fill="#fff" opacity=".8" />
      </g>

      {/* gotas voando */}
      <g className="hc-drops">
        {drops.map((d, i) => (
          <g key={i} style={{ ['--i' as string]: i }}>
            <circle cx={d.x} cy={d.y} r={d.r} fill="url(#drop)" />
            <circle cx={d.x - d.r * 0.3} cy={d.y - d.r * 0.35} r={d.r * 0.3} fill="#fff" opacity=".75" />
          </g>
        ))}
      </g>
    </svg>
  );
}
