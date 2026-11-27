/**
 * Contatos e dados do estabelecimento.
 * Fonte: ficha pública do aiqfome (consultada em 27/11/2026).
 * PENDENTE: confirmar com a loja se o telefone abaixo é o WhatsApp oficial.
 */
export const business = {
  name: 'Viñas Café',
  tagline: 'Mais que um café, uma experiência.',
  phoneDisplay: '(88) 9 2001-4742',
  /** Formato internacional para wa.me (sem +, espaços ou traços). */
  whatsapp: '5588920014742',
  instagram: 'https://www.instagram.com/vinas.cafe/',
  instagramHandle: '@vinas.cafe',
  aiqfome: 'https://aiqfome.com/CE/sobral/vinas-cafe',
  /** iFood: loja não localizada (acesso bloqueado na pesquisa). Preencha quando houver link. */
  ifood: '' as string,
  address: {
    street: 'Av. Monsenhor José Aloísio Pinto, 300',
    complement: 'Sobral Shopping, próximo à Le Biscuit',
    district: 'Dom Expedito',
    city: 'Sobral',
    state: 'CE',
    zip: '62050-255',
  },
  geo: { lat: -3.69787, lng: -40.348095 },
  hours: [{ days: 'Segunda a domingo', time: '10h às 21h30' }],
  hoursSchema: 'Mo-Su 10:00-21:30',
  delivery: { time: '40–60 min', payments: 'Pagamento online, Pix e Nubank (via aiqfome)' },
  cnpj: '52.391.443/0001-54',
  rating: { value: 5, count: 5, source: 'aiqfome' },
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Viñas Café, Sobral Shopping, Sobral - CE')}`;
