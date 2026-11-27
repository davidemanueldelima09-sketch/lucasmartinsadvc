import type { ImageAsset } from './types';

/**
 * Registro de imagens. Para trocar uma foto provisória por uma oficial:
 * 1) salve o arquivo em public/img/oficial/ (de preferência .webp, ~1200px);
 * 2) altere `src` e mude `kind` para 'oficial'.
 * Fotos "ilustrativa" vêm do Unsplash (licença Unsplash) e NÃO são do Viñas Café.
 */
const of = (file: string, alt: string): ImageAsset => ({ src: `/img/oficial/${file}`, alt, kind: 'oficial', credit: 'Viñas Café (via aiqfome)' });
const il = (file: string, alt: string): ImageAsset => ({ src: `/img/ilustrativas/${file}`, alt, kind: 'ilustrativa', credit: 'Unsplash — imagem ilustrativa provisória' });

export const images: Record<string, ImageAsset> = {
  'of-logo': of('logo.webp', 'Logomarca Viñas Café'),
  'of-capa': of('capa.webp', 'Croissant com morangos e calda de chocolate do Viñas Café'),
  'of-croissant-nutella': of('croissant-nutella-morango.webp', 'Croissant Nutella com morango do Viñas Café'),
  'of-combo-coxinha': of('combo-coxinha-brigadeiro.webp', 'Combo coxinha de frango com requeijão e brigadeiro gourmet'),

  'il-chocolate-quente': il('chocolate-quente.webp', 'Chocolate quente sendo servido na xícara'),
  'il-frape': il('frape.webp', 'Bebida gelada cremosa de café em copo alto'),
  'il-sanduiche-tostado': il('sanduiche-tostado.webp', 'Sanduíche tostado na chapa'),
  'il-sanduiche-natural': il('sanduiche-natural.webp', 'Sanduíche com folhas frescas'),
  'il-croissant': il('croissant.webp', 'Croissant dourado sobre fundo escuro'),
  'il-croissants-vitrine': il('croissants-vitrine.webp', 'Croissants na vitrine'),
  'il-salada': il('salada.webp', 'Salada colorida em prato'),
  'il-bolo-chocolate': il('bolo-chocolate.webp', 'Bolo de chocolate com cobertura'),
  'il-chocolate': il('chocolate.webp', 'Pedaços de chocolate'),
  'il-copo-morango': il('copo-morango.webp', 'Sobremesa no copo com morangos'),
  'il-suco-laranja': il('suco-laranja.webp', 'Suco de laranja natural'),
  'il-limonada': il('limonada.webp', 'Limonada gelada com hortelã'),
  'il-cafe-espresso': il('cafe-espresso.webp', 'Xícara de café coado com crema'),
  'il-latte-art': il('latte-art.webp', 'Latte art em xícara branca'),
  'il-latte-pour': il('latte-pour.webp', 'Leite vaporizado sendo despejado no café'),
  'il-cappuccino': il('cappuccino.webp', 'Cappuccino visto de cima'),
  'il-cafes-mesa': il('cafes-mesa.webp', 'Mesa com cafés e plantas'),
  'il-barista-graos': il('barista-graos.webp', 'Grãos de café, café moído e espresso'),
  'il-brinde-cafe': il('brinde-cafe.webp', 'Amigos brindando com cafés'),
};

export const galleryKeys = [
  'of-capa', 'il-latte-pour', 'of-croissant-nutella', 'il-barista-graos', 'il-cappuccino',
  'of-combo-coxinha', 'il-cafes-mesa', 'il-croissants-vitrine', 'il-brinde-cafe',
];
