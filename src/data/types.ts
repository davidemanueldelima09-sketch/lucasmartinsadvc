export type CategoryId =
  | 'bebidas-cremosas' | 'sanduiches' | 'croissants' | 'tapiocas' | 'crepiocas'
  | 'omeletes' | 'cuscuz' | 'saladas' | 'toasts' | 'salgados' | 'bolos'
  | 'tortas-doces' | 'doces' | 'sucos' | 'sucos-funcionais' | 'gelados'
  | 'bebidas' | 'combos';

export interface Product {
  /** Identificador único usado no site e na mensagem de WhatsApp. */
  id: string;
  /** ID do item no aiqfome (rastreabilidade). */
  sourceId: number;
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  ingredients: string[];
  price: number;
  size?: string;
  /** false = indisponível no aiqfome na data da extração. */
  available?: boolean;
  /** Chave em images.ts. Sem imagem → composição tipográfica com ilustração. */
  image?: string;
}

export type Particle =
  | 'steam' | 'bean' | 'ice' | 'bubble' | 'crumb' | 'leaf' | 'citrus'
  | 'berry' | 'cocoa' | 'sparkle' | 'drop' | 'flake' | 'herb';

export type Layout = 'orbit' | 'split' | 'tilt' | 'stack' | 'float';

export type Glyph =
  | 'cup' | 'frappe' | 'sandwich' | 'croissant' | 'tapioca' | 'crepioca'
  | 'omelete' | 'cuscuz' | 'salad' | 'toast' | 'savory' | 'cake' | 'tart'
  | 'sweet' | 'juice' | 'tall-glass' | 'can' | 'combo';

export interface Category {
  id: CategoryId;
  name: string;
  /** Frase editorial da categoria (texto de marca, não informação factual). */
  tagline: string;
  /** Direção de arte da apresentação cinematográfica. */
  scene: {
    bg: [string, string];
    accent: string;
    glow: string;
    particles: Particle[];
    layout: Layout;
    glyph: Glyph;
    mood: string;
  };
}

export interface ImageAsset {
  src: string;
  alt: string;
  /** oficial = publicada pelo Viñas Café; ilustrativa = provisória, banco de imagens. */
  kind: 'oficial' | 'ilustrativa';
  credit: string;
}
