import { products } from '../data/products';
import { categories, categoryById } from '../data/categories';
import { images } from '../data/images';
import { business } from '../data/contact';
import type { Particle, Product } from '../data/types';

export const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Produtos na ordem do cardápio (categoria → ordem original). */
export const orderedProducts: Product[] = categories.flatMap((c) => products.filter((p) => p.category === c.id));
export const productBySlug = new Map(orderedProducts.map((p) => [p.slug, p]));
export const productIndex = new Map(orderedProducts.map((p, i) => [p.slug, i]));

export const imageOf = (p: Product) => (p.image ? images[p.image] : undefined);
export const categoryOf = (p: Product) => categoryById[p.category];

/** Seleção editorial da casa (não é ranking de vendas). */
export const signatureSlugs = [
  'croissant-nutella-c-morango', 'chocolate-quente', 'tostex-sertanejo', 'croissant-salmao-defumado',
  'frape-c-doce-de-leite-e-pacoca', 'toast-lampiao', 'salada-nordestina', 'coxinha-frango-com-requeijao-brigadeiro-gourmet',
];

export function whatsappLink(p?: Product) {
  const lines = p
    ? [
        `Olá, ${business.name}! Gostaria de fazer um pedido:`,
        '',
        `• Produto: ${p.name}${p.size ? ` (${p.size})` : ''}`,
        `• Preço apresentado no site: ${brl(p.price)}`,
        `• Código: ${p.id}`,
        '',
        'Poderiam confirmar a disponibilidade?',
      ]
    : [`Olá, ${business.name}! Vim pelo site e gostaria de fazer um pedido.`];
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/* ---------- partículas determinísticas por produto ---------- */
export function seeded(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const keywordParticles: [RegExp, Particle][] = [
  [/morango|frutas vermelhas|red velvet|hibisco|acerola|romeu/i, 'berry'],
  [/lim[aã]o|siciliano|laranja|maracuj|abacaxi|caj[aá]|lemonade|citrus/i, 'citrus'],
  [/chocolate|cacau|nutella|brigadeiro|brownie|kinder|ferrero|ouro branco|cookies/i, 'cocoa'],
  [/pesto|manjeric|ervas|hortel|coentro|endro|couve|alface|verde/i, 'herb'],
  [/mel|doce de leite|caramel|banoffe|pa[cç]oca|canela/i, 'drop'],
  [/caf[eé]|cappuccino/i, 'bean'],
  [/gelad|frap|gelo|mate|lata|[aá]gua/i, 'ice'],
];

export function particlesFor(p: Product): Particle[] {
  const base = categoryOf(p).scene.particles;
  const text = `${p.name} ${p.description}`;
  const extra = keywordParticles.filter(([re]) => re.test(text)).map(([, k]) => k);
  return Array.from(new Set([...extra, ...base])).slice(0, 4);
}
