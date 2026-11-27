/**
 * Pós-build: gera HTML estático por produto (título, description, OG e JSON-LD próprios),
 * sitemap.xml, robots.txt e 404.html (fallback SPA). Uso: node scripts/prerender.mjs [URL_DO_SITE]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = (process.argv[2] || process.env.SITE_URL || 'https://lucasmartinsadvc.davidemanueldelima09.workers.dev').replace(/\/$/, '');
const load = (f) => {
  const js = ts.transpileModule(readFileSync(join(root, f), 'utf8').replaceAll('${import.meta.env.BASE_URL}', '/'), { compilerOptions: { module: ts.ModuleKind.ES2022 } }).outputText;
  return import('data:text/javascript;base64,' + Buffer.from(js.replace(/^import .*$/gm, '')).toString('base64'));
};
const { products } = await load('src/data/products.ts');
const { images } = await load('src/data/images.ts');
const dist = join(root, 'dist');
const base = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const brl = (v) => 'R$ ' + v.toFixed(2).replace('.', ',');

const abs = (html) => html
  .replace('href="/" rel="canonical"', '').replace('<link rel="canonical" href="/" />', `<link rel="canonical" href="${site}/" />`)
  .replace('content="/og.jpg"', `content="${site}/og.jpg"`);
writeFileSync(join(dist, 'index.html'), abs(base));
writeFileSync(join(dist, '404.html'), abs(base));

for (const p of products) {
  const title = `${p.name} — ${brl(p.price)} | Viñas Café Sobral`;
  const desc = p.description || `${p.name} no cardápio do Viñas Café, Sobral Shopping, Sobral-CE. ${brl(p.price)}.`;
  const img = p.image && images[p.image] ? site + images[p.image].src : `${site}/og.jpg`;
  const ld = { '@context': 'https://schema.org', '@type': 'MenuItem', name: p.name, description: desc, image: img,
    offers: { '@type': 'Offer', price: p.price.toFixed(2), priceCurrency: 'BRL', availability: p.available === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' } };
  const html = base
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(desc)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${esc(title)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${esc(desc)}" />`)
    .replace('content="/og.jpg"', `content="${img}"`)
    .replace('<link rel="canonical" href="/" />', `<link rel="canonical" href="${site}/cardapio/${p.slug}/" />`)
    .replace('</head>', `<script type="application/ld+json">${JSON.stringify(ld)}</script></head>`);
  const dir = join(dist, 'cardapio', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}
const urls = ['/', ...products.map((p) => `/cardapio/${p.slug}/`)];
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${site}${u}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
console.log(`prerender: ${products.length} páginas de produto + sitemap (${site || 'links relativos; defina SITE_URL'})`);
