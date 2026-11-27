# PROJECT_CONTEXT — Viñas Café

> Leia este arquivo primeiro ao retomar o projeto. Ele resume o estado, as decisões e as pendências.

## Arquitetura
- **Vite 6 + React 19 + TypeScript**, SPA com `react-router-dom` (rotas `/` e `/cardapio/:slug`).
- **framer-motion** para animações (parallax, entradas, transições entre produtos). `MotionConfig reducedMotion="user"` + CSS `prefers-reduced-motion`.
- CSS puro em `src/index.css` (tokens em `:root`, mobile-first, seções comentadas). Sem Tailwind (decisão: menos dependências, controle fino).
- Fontes auto-hospedadas via `@fontsource` (DM Serif Display + Figtree).
- **Sem Three.js**: a xícara é SVG em camadas + CSS 3D/parallax. Mesmo impacto, ~0 KB extra e melhor desempenho no celular.
- Build: `npm run build` = `tsc -b` → `vite build` → `scripts/prerender.mjs` (HTML estático por produto com title/description/OG/JSON-LD, `sitemap.xml`, `robots.txt`, `404.html`).

```
src/
  data/            ← FONTE ÚNICA DE CONTEÚDO (editar aqui)
    products.ts    ← 120 produtos (nome, descrição, ingredientes, preço, tamanho, disponibilidade, imagem)
    categories.ts  ← 18 categorias + direção de arte de cada cena (paleta, partículas, layout, ilustração)
    images.ts      ← registro de imagens (oficial × ilustrativa) + galeria
    contact.ts     ← endereço, telefone/WhatsApp, horários, links
    types.ts
  lib/menu.ts      ← ordenação, busca por slug, preço BRL, link WhatsApp, partículas por produto
  lib/useSeo.ts    ← meta tags dinâmicas por rota
  components/      ← HeroCup, ProductStage (apresentação individual), ProductCard, ProductVisual, Glyph, Particles, Icons, Reveal
  sections/        ← Nav, Hero, About, Favorites, Menu, Story, Gallery, Visit, Footer(+FAB WhatsApp)
scripts/prerender.mjs
docs/fonte-aiqfome-2026-11-27.json  ← snapshot bruto do cardápio extraído
public/img/oficial | public/img/ilustrativas
```

## Identidade visual
- Paleta derivada da **logomarca oficial** (monograma "VC" em forma de xícara, dourado sobre verde): verde `#072F27`, verde profundo `#021712`, musgo `#56663A`, creme `#F4ECDC`, café `#3A2316`, dourado `#D6A86B`.
- Tipografia: DM Serif Display (títulos, sem itálico) + Figtree (texto/UI).
- Assinatura: “Mais que um café, uma experiência.”
- Hero: imagem fotorrealista dos copos Viñas (gerada por IA no ElevenLabs, arte de campanha) que gira 360° ao arrastar (mouse ou dedo) com inércia; faixa de informações práticas (horário, endereço, delivery).
- **Direção de arte "sem cara de IA"** (decisão do cliente): nada de vidro fosco, brilhos/partículas, texto gigante vazado, números decorativos 01/02, palavra em itálico dourado nos títulos ou grades de estatísticas. Grade editorial, fios de 1px, botões retos (raio 4px), dourado só em preços e detalhes, seções alternando verde e papel creme, cardápio diagramado como menu impresso (nome, pontilhado, preço).

## Apresentação individual dos produtos
Cada produto tem URL própria (`/cardapio/<slug>`) e uma página de apresentação. A composição vem da **categoria** (paleta e formato da moldura da foto: círculo, arco, inclinada, empilhada ou retangular), da **semente do ID** (posição da luz) e de vapor animado nas bebidas quentes, cuscuz e salgados. Sem foto: painel com a logomarca e “Foto em breve”.
Navegação: setas/teclado (←/→), swipe no celular, Esc fecha, lista “Mais em <categoria>”. CTA WhatsApp (mensagem com loja, produto, preço, código) e aiqfome.

## Fontes de dados (pesquisa de 27/11/2026)
- **aiqfome** — cardápio completo, preços, descrições, horários, endereço, telefone, CNPJ, logo, capa e 2 fotos de produto. ✅ fonte principal.
- **Instagram @vinas.cafe** — exige login; nada extraído. ❌
- **iFood** — bloqueado (403) para acesso automatizado; loja não localizada. ❌
- Busca web: só confirmou a listagem do aiqfome (Café, Croissant, 10:00–21:30).

## Skills / ferramentas
- Skills disponíveis no ambiente e usadas: `artifact-design` (não necessária), `run`, `code-review`, `simplify`, `security-review` (built-in). Nenhuma skill externa instalada (ver README → “Skills”).
- Skill do projeto: `.claude/skills/atualizar-cardapio/SKILL.md` (procedimento de atualização de preços/produtos/fotos).
- Teste visual/funcional: Playwright (pré-instalado no ambiente).

## Decisões importantes
- Não inventar dados: textos sem fonte ficam como “Descrição detalhada em breve”; história de fundação não publicada → seção “Nossa história” baseada apenas no cardápio.
- Imagens: selo visível “Foto oficial” / “Ilustrativa” / “Foto em breve”. Ilustrativas = Unsplash, só onde o produto corresponde.
- Itens `available: false` (marcados indisponíveis no aiqfome) aparecem com aviso e podem ser filtrados.
- “Assinaturas Viñas” é seleção editorial (não ranking de vendas).
- Nomes normalizados (capitalização, “Bolo …”, “Torta …”); descrições e preços literais da fonte.

## Pendências (precisam do cliente)
1. Confirmar se **(88) 9 2001-4742** (telefone do aiqfome) é o **WhatsApp oficial**.
2. **Cafés quentes** (espresso, coado, cappuccino, latte…) **não constam no aiqfome** — enviar cardápio de balcão para incluir.
3. Fotos oficiais de ~115 produtos (hoje 2 oficiais + ilustrativas/ilustrações).
4. Link do **iFood** (se existir) → `contact.ts > ifood`.
5. História da marca (fundação, fundadores, conceito) e fotos do ambiente.
6. Descrições/ingredientes de itens sem descrição na fonte (croissants simples, tapiocas, salgados, bolos, tortas…).
7. Domínio definitivo → `SITE_URL=https://dominio npm run build` (padrão provisório `https://vinascafe.com.br`).
8. Conferir preço do **Frapê de Brigadeiro c/ Cookies (R$ 22,90)** — destoa dos outros frapês (R$ 29,90–32,90); mantido como na fonte.
9. Única fonte de preços acessível foi o aiqfome — não houve como comparar divergências com iFood/balcão.

## Próximas tarefas sugeridas
- Substituir imagens conforme chegarem as fotos oficiais (ver skill).
- Opcional: `LazyMotion` do framer-motion para reduzir o bundle (~138 KB gzip hoje).
- Publicar (Vercel/Netlify) e cadastrar sitemap no Google Search Console.
