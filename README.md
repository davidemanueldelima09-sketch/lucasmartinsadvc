# Viñas Café — website

Site premium do **Viñas Café** (Sobral Shopping, Sobral-CE): home cinematográfica com xícara 3D em SVG, cardápio completo (120 itens / 18 categorias, fonte aiqfome) e **apresentação cinematográfica individual para cada produto**, com pedido via WhatsApp e aiqfome.

Contexto completo, decisões e pendências: **[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)**.

## Rodar localmente
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # gera dist/ (+ páginas estáticas por produto e sitemap)
npm run preview    # testa o build
```

## Atualizar o cardápio
Tudo fica em `src/data/`:
| Arquivo | Conteúdo |
|---|---|
| `products.ts` | produtos, preços, descrições, ingredientes, disponibilidade, imagem |
| `categories.ts` | categorias + direção de arte de cada apresentação |
| `images.ts` | fotos (oficial × ilustrativa) e galeria |
| `contact.ts` | endereço, WhatsApp, horários, links de delivery |

Passo a passo em `.claude/skills/atualizar-cardapio/SKILL.md`.

## Publicar
O build é estático (pasta `dist/`). Defina o domínio para canonical/sitemap/OG:
```bash
SITE_URL=https://seu-dominio.com.br npm run build
```
- **Vercel**: importar o repositório → framework “Vite” → variável `SITE_URL`. `vercel.json` já inclui o fallback de rotas.
- **Netlify**: build `npm run build`, publish `dist`. `public/_redirects` já inclui o fallback.
- **Hospedagem comum (cPanel/Hostinger)**: envie o conteúdo de `dist/`; as URLs de produto já existem como `cardapio/<slug>/index.html` e há `404.html` de fallback.

Depois: cadastrar `https://seu-dominio/sitemap.xml` no Google Search Console e atualizar o link do site no Instagram.

## Imagens
- `public/img/oficial/` — logo, capa e fotos publicadas pelo Viñas Café no aiqfome.
- `public/img/ilustrativas/` — **provisórias** (Unsplash, licença Unsplash), sempre exibidas com o selo “Ilustrativa”. Substituir por fotos oficiais assim que possível.
- Produtos sem foto usam ilustração em traço dourado + selo “Foto em breve”.

## Skills
Nenhuma skill externa foi instalada: a busca no catálogo do ambiente não retornou skills de frontend/UI, e o acesso ao GitHub desta sessão é limitado a este repositório. Para adicionar skills oficiais (ex.: `frontend-design` do repositório `anthropics/skills`), no Claude Code do seu computador rode `/plugin marketplace add anthropics/skills` e instale a desejada — revise o `SKILL.md` antes. Este projeto já inclui a skill local `atualizar-cardapio`.
